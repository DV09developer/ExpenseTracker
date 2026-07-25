"use client";

import { useEffect, useState, useCallback } from "react";
import ProtectedRoute from "../../(auth)/Components/ProtectedRoute";
import { useAuth } from "@/hooks/useAuth";
import { transactionService as txService } from "@/services/transaction.service";
import { Transaction, TransactionType } from "@/types/transaction";
import {
  Plus,
  TrendingUp,
  TrendingDown,
  DollarSign,
  Trash2,
  Edit3,
  ChevronLeft,
  ChevronRight,
  Filter,
  Search,
  Loader2,
  Calendar,
  X,
  PieChart as PieIcon,
  BarChart2,
  AlertCircle
} from "lucide-react";
import { Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import DashboardHeader from "../Components/DashboardHeader";
import SummaryCards from "../Components/SummaryCards";
import AnalyticsCharts from "../Components/AnalyticsCharts";
import TransactionFilters from "../Components/TransactionFilters";
import TransactionTable from "../Components/TransactionTable";
import Pagination from "../Components/Pagination";
import TransactionModal from "../Components/TransactionModal";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

export default function DashboardPage() {
  const { user } = useAuth();

  // Summary State
  const [summary, setSummary] = useState({
    totalIncome: 0,
    totalExpense: 0,
    balance: 0,
    totalTransactions: 0
  });

  // Transactions list with filters & pagination
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [totalPages, setTotalPages] = useState(1);

  // Filter States
  const [filterType, setFilterType] = useState<string>("");
  const [filterCategory, setFilterCategory] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  // Breakdown & Monthly Trend Analytics State
  const [categoryData, setCategoryData] = useState<{ category: string; expense_amount: number }[]>([]);
  const [monthlyData, setMonthlyData] = useState<{ year: number; month: number; expense_amount: number }[]>([]);

  // Add / Edit Transaction Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState<Transaction | null>(null);

  // Form State
  const [formAmount, setFormAmount] = useState("");
  const [formTitle, setFormTitle] = useState("");
  const [formType, setFormType] = useState<TransactionType>("expense");
  const [formCategory, setFormCategory] = useState("Food");
  const [formDescription, setFormDescription] = useState("");
  const [formDate, setFormDate] = useState("");
  const [formError, setFormError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // Fetch Dashboard Summary & Charts
  const fetchDashboardStats = useCallback(async () => {
    try {
      const summaryRes = await txService.getDashboard();
      if (summaryRes.data?.data?.summary) {
        setSummary(summaryRes.data.data.summary);
      }

      const breakdownRes = await txService.getCategoryBreakdown();
      if (breakdownRes.data?.data) {
        setCategoryData(breakdownRes.data.data);
      }

      const monthlyRes = await txService.getMonthlyExpenses();
      if (monthlyRes.data?.data) {
        setMonthlyData(monthlyRes.data.data);
      }
    } catch (err) {
      console.error("Error fetching stats:", err);
    }
  }, []);

  // Fetch Transactions List
  const fetchTransactions = useCallback(async () => {
    setLoadingTransactions(true);
    try {
      const params = {
        page,
        limit,
        expense_type: filterType || undefined,
        category: filterCategory || undefined,
        search: search || undefined,
        startDate: startDate || undefined,
        endDate: endDate || undefined
      };

      const res = await txService.getTransactions(params);
      if (res.data?.data) {
        setTransactions(res.data.data.transactions || []);
        if (res.data.data.pagination) {
          setTotalPages(res.data.data.pagination.totalPages || 1);
        }
      }
    } catch (err) {
      console.error("Error fetching transactions:", err);
    } finally {
      setLoadingTransactions(false);
    }
  }, [page, limit, filterType, filterCategory, search, startDate, endDate]);

  // Initial load & when filters/pagination change
  useEffect(() => {
    fetchDashboardStats();
  }, [fetchDashboardStats]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  // Delete Transaction Handler
  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this transaction?")) return;
    try {
      await txService.deleteTransaction(id);
      fetchDashboardStats();
      fetchTransactions();
    } catch (err) {
      console.error("Error deleting transaction:", err);
    }
  };

  // Open modal for editing
  const handleStartEdit = (tx: Transaction) => {
    setEditingTx(tx);
    setFormAmount(tx.amount.toString());
    setFormTitle(tx.expense_title);
    setFormType(tx.expense_type);
    setFormCategory(tx.category);
    setFormDescription(tx.description || "");
    setFormDate(tx.transactionDate ? new Date(tx.transactionDate).toISOString().split('T')[0] : "");
    setFormError(null);
    setIsModalOpen(true);
  };

  // Reset & close Modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTx(null);
    setFormAmount("");
    setFormTitle("");
    setFormType("expense");
    setFormCategory("Food");
    setFormDescription("");
    setFormDate("");
    setFormError(null);
  };

  // Add / Edit Form Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    const amountNum = parseFloat(formAmount);
    if (isNaN(amountNum) || amountNum <= 0) {
      setFormError("Please enter a valid amount greater than 0");
      return;
    }

    if (!formTitle.trim()) {
      setFormError("Title is required");
      return;
    }

    setSubmitting(true);
    try {
      const payload = {
        amount: amountNum,
        expense_title: formTitle.trim(),
        expense_type: formType,
        category: formCategory,
        description: formDescription.trim() || undefined,
        transactionDate: formDate ? new Date(formDate).toISOString() : undefined
      };

      if (editingTx) {
        await txService.updateTransaction(editingTx._id, payload);
      } else {
        await txService.createTransaction(payload);
      }

      handleCloseModal();
      fetchDashboardStats();
      fetchTransactions();
    } catch (err: any) {
      console.error(err);
      setFormError(err?.response?.data?.message || "Operation failed. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  // Category Aggregation for Doughnut Chart
  const doughnutData = {
    labels: categoryData.map(c => c.category),
    datasets: [
      {
        data: categoryData.map(c => c.expense_amount),
        backgroundColor: [
          "#3b82f6", // blue
          "#06b6d4", // cyan
          "#10b981", // emerald
          "#f59e0b", // amber
          "#ec4899", // pink
          "#8b5cf6", // violet
          "#6b7280", // gray
        ],
        borderWidth: 1,
        borderColor: "rgba(255, 255, 255, 0.1)",
      },
    ],
  };

  const monthNames = ["", "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Monthly expenses Bar Chart
  const barData = {
    labels: monthlyData.map(m => `${monthNames[m.month]} ${m.year}`),
    datasets: [
      {
        label: "Expenses",
        data: monthlyData.map(m => m.expense_amount),
        backgroundColor: "rgba(6, 182, 212, 0.6)",
        borderColor: "#06b6d4",
        borderWidth: 1,
        borderRadius: 8,
      },
    ],
  };

  return (
    <ProtectedRoute>
      <div className={`space-y-8 animate-fade-in pb-12 ${isModalOpen ? 'h-[calc(100dvh-100px)] absolute overflow-hidden' : ''}`}>
        {/* Header Title */}
        <DashboardHeader
          onAddTransaction={() => setIsModalOpen(true)}
        />

        {/* Stats Cards */}
        <SummaryCards
          summary={summary}
        />

        {/* Charts & Analytics */}
        <AnalyticsCharts
          categoryData={categoryData}
          monthlyData={monthlyData}
        />

        {/* Transactions Panel */}
        <div className="glass-card rounded-3xl border border-white/5 shadow-xl overflow-hidden">
          {/* Filtering Header */}
          <div className="p-6 border-b border-white/5 space-y-4">

            <TransactionFilters
              search={search}
              filterType={filterType}
              filterCategory={filterCategory}
              startDate={startDate}
              endDate={endDate}
              setSearch={setSearch}
              setFilterType={setFilterType}
              setFilterCategory={setFilterCategory}
              setStartDate={setStartDate}
              setEndDate={setEndDate}
              setPage={setPage}
            />

          </div>

          {/* Table Container */}
          <TransactionTable
            transactions={transactions}
            loading={loadingTransactions}
            onEdit={handleStartEdit}
            onDelete={handleDelete}
          />

          {/* Pagination Footer */}
          <Pagination
            page={page}
            totalPages={totalPages}
            onPrevious={() => setPage((p) => Math.max(p - 1, 1))}
            onNext={() => setPage((p) => Math.min(p + 1, totalPages))}
          />
        </div>

        {/* Modal: Add/Edit Transaction */}
        <TransactionModal
          isOpen={isModalOpen}
          editing={!!editingTx}
          formAmount={formAmount}
          formTitle={formTitle}
          formType={formType}
          formCategory={formCategory}
          formDescription={formDescription}
          formDate={formDate}
          formError={formError}
          submitting={submitting}
          setFormAmount={setFormAmount}
          setFormTitle={setFormTitle}
          setFormType={setFormType}
          setFormCategory={setFormCategory}
          setFormDescription={setFormDescription}
          setFormDate={setFormDate}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      </div>
    </ProtectedRoute>
  );
}
