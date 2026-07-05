"use client";

import { useEffect, useState, useCallback } from "react";
import ProtectedRoute from "../Components/auth/ProtectedRoute";
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
      <div className="space-y-8 animate-fade-in pb-12">
        {/* Header Title */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-white">Dashboard Overview</h1>
            <p className="text-gray-400 text-sm">Welcome back! Real-time snapshot of your transactions.</p>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold px-5 py-3 rounded-2xl transition shadow-lg shadow-indigo-500/25 cursor-pointer w-fit"
          >
            <Plus size={18} />
            <span>Add Transaction</span>
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Balance */}
          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Net Balance</span>
              <h3 className="text-3xl font-black text-white">₹{summary.balance.toLocaleString()}</h3>
            </div>
            <div className="bg-indigo-500/10 p-4 rounded-2xl text-indigo-400 border border-indigo-500/20">
              <DollarSign size={24} />
            </div>
          </div>

          {/* Card 2: Income */}
          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Earnings</span>
              <h3 className="text-3xl font-black text-emerald-400">₹{summary.totalIncome.toLocaleString()}</h3>
            </div>
            <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-400 border border-emerald-500/20">
              <TrendingUp size={24} />
            </div>
          </div>

          {/* Card 3: Expenses */}
          <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-xl">
            <div className="space-y-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Total Expenses</span>
              <h3 className="text-3xl font-black text-rose-400">₹{summary.totalExpense.toLocaleString()}</h3>
            </div>
            <div className="bg-rose-500/10 p-4 rounded-2xl text-rose-400 border border-rose-500/20">
              <TrendingDown size={24} />
            </div>
          </div>
        </div>

        {/* Charts & Analytics */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Doughnut Chart */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <PieIcon size={18} className="text-cyan-400" />
              <h3 className="text-lg font-bold text-white">Category Breakdown</h3>
            </div>
            <div className="h-64 flex justify-center items-center">
              {categoryData.length > 0 ? (
                <Doughnut
                  data={doughnutData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        position: "right",
                        labels: {
                          color: "#9ca3af",
                          font: { size: 11 }
                        }
                      }
                    }
                  }}
                />
              ) : (
                <span className="text-xs text-gray-500">No expense records found.</span>
              )}
            </div>
          </div>

          {/* Bar Chart */}
          <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl space-y-4">
            <div className="flex items-center gap-2">
              <BarChart2 size={18} className="text-indigo-400" />
              <h3 className="text-lg font-bold text-white">Monthly Expense Trend</h3>
            </div>
            <div className="h-64 flex justify-center items-center">
              {monthlyData.length > 0 ? (
                <Bar
                  data={barData}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: { display: false }
                    },
                    scales: {
                      y: {
                        grid: { color: "rgba(255, 255, 255, 0.05)" },
                        ticks: { color: "#9ca3af" }
                      },
                      x: {
                        grid: { display: false },
                        ticks: { color: "#9ca3af" }
                      }
                    }
                  }}
                />
              ) : (
                <span className="text-xs text-gray-500">No monthly trends recorded.</span>
              )}
            </div>
          </div>
        </div>

        {/* Transactions Panel */}
        <div className="glass-card rounded-3xl border border-white/5 shadow-xl overflow-hidden">
          {/* Filtering Header */}
          <div className="p-6 border-b border-white/5 space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <h3 className="text-lg font-bold text-white">Transaction Logs</h3>
              <div className="flex flex-wrap items-center gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={15} />
                  <input
                    type="text"
                    placeholder="Search logs..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    className="pl-9 pr-4 py-2 text-xs rounded-xl border border-white/5 bg-white/5 text-white focus:border-cyan-500 focus:outline-none w-48 transition"
                  />
                </div>
                {/* Type Filter */}
                <select
                  value={filterType}
                  onChange={(e) => { setFilterType(e.target.value); setPage(1); }}
                  className="px-3 py-2 text-xs rounded-xl border border-white/5 bg-white/5 text-gray-300 focus:border-cyan-500 focus:outline-none transition"
                >
                  <option value="" className="bg-gray-900 text-white">All Types</option>
                  <option value="income" className="bg-gray-900 text-white">Income Only</option>
                  <option value="expense" className="bg-gray-900 text-white">Expense Only</option>
                </select>
                {/* Category Filter */}
                <select
                  value={filterCategory}
                  onChange={(e) => { setFilterCategory(e.target.value); setPage(1); }}
                  className="px-3 py-2 text-xs rounded-xl border border-white/5 bg-white/5 text-gray-300 focus:border-cyan-500 focus:outline-none transition"
                >
                  <option value="" className="bg-gray-900 text-white">All Categories</option>
                  <option value="Food" className="bg-gray-900 text-white">Food</option>
                  <option value="Travel" className="bg-gray-900 text-white">Travel</option>
                  <option value="Shopping" className="bg-gray-900 text-white">Shopping</option>
                  <option value="Bills" className="bg-gray-900 text-white">Bills</option>
                  <option value="Salary" className="bg-gray-900 text-white">Salary</option>
                  <option value="Entertainment" className="bg-gray-900 text-white">Entertainment</option>
                  <option value="Other" className="bg-gray-900 text-white">Other</option>
                </select>
              </div>
            </div>

            {/* Date Filters */}
            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
              <span className="flex items-center gap-1.5"><Calendar size={13} /> Filter dates:</span>
              <input
                type="date"
                value={startDate}
                onChange={(e) => { setStartDate(e.target.value); setPage(1); }}
                className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none text-[11px]"
              />
              <span>to</span>
              <input
                type="date"
                value={endDate}
                onChange={(e) => { setEndDate(e.target.value); setPage(1); }}
                className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white focus:outline-none text-[11px]"
              />
              {(startDate || endDate || filterType || filterCategory || search) && (
                <button
                  onClick={() => {
                    setStartDate("");
                    setEndDate("");
                    setFilterType("");
                    setFilterCategory("");
                    setSearch("");
                    setPage(1);
                  }}
                  className="text-cyan-400 hover:text-cyan-300 font-bold ml-2 underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto">
            {loadingTransactions ? (
              <div className="py-20 flex justify-center items-center gap-2">
                <Loader2 className="animate-spin text-cyan-400" size={24} />
                <span className="text-sm text-gray-400">Loading transactions...</span>
              </div>
            ) : transactions.length > 0 ? (
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Title</th>
                    <th className="py-4 px-6">Category</th>
                    <th className="py-4 px-6">Type</th>
                    <th className="py-4 px-6">Amount</th>
                    <th className="py-4 px-6">Date</th>
                    <th className="py-4 px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 text-sm text-gray-200">
                  {transactions.map((tx) => (
                    <tr key={tx._id} className="hover:bg-white/5 transition">
                      <td className="py-4.5 px-6 font-semibold">{tx.expense_title}</td>
                      <td className="py-4.5 px-6">
                        <span className="bg-white/5 px-2.5 py-1 rounded-full text-xs border border-white/5">
                          {tx.category}
                        </span>
                      </td>
                      <td className="py-4.5 px-6">
                        <span className={`text-xs font-bold uppercase tracking-wider ${tx.expense_type === "income" ? "text-emerald-400" : "text-rose-400"
                          }`}>
                          {tx.expense_type}
                        </span>
                      </td>
                      <td className="py-4.5 px-6 font-bold">
                        ₹{tx.amount.toLocaleString()}
                      </td>
                      <td className="py-4.5 px-6 text-gray-400">
                        {tx.transactionDate ? new Date(tx.transactionDate).toLocaleDateString() : ""}
                      </td>
                      <td className="py-4.5 px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleStartEdit(tx)}
                            className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/10 transition cursor-pointer"
                          >
                            <Edit3 size={14} />
                          </button>
                          <button
                            onClick={() => handleDelete(tx._id)}
                            className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/10 transition cursor-pointer"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="py-20 text-center text-gray-400 text-sm">
                No matching transactions recorded yet.
              </div>
            )}
          </div>

          {/* Pagination Footer */}
          {totalPages > 1 && (
            <div className="p-4 border-t border-white/5 flex items-center justify-between">
              <span className="text-xs text-gray-400">Page {page} of {totalPages}</span>
              <div className="flex items-center gap-2">
                <button
                  disabled={page <= 1}
                  onClick={() => setPage(p => Math.max(p - 1, 1))}
                  className="p-1.5 rounded-lg border border-white/5 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <ChevronLeft size={16} />
                </button>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage(p => Math.min(p + 1, totalPages))}
                  className="p-1.5 rounded-lg border border-white/5 text-gray-400 hover:text-white disabled:opacity-30 cursor-pointer"
                >
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal: Add/Edit Transaction */}
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">
            <div className="w-full max-w-md rounded-3xl glass-card border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-bold text-white">
                  {editingTx ? "Edit Transaction" : "New Transaction"}
                </h3>
                <button
                  onClick={handleCloseModal}
                  className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition cursor-pointer"
                >
                  <X size={20} />
                </button>
              </div>

              {formError && (
                <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">
                  <AlertCircle size={16} />
                  <span>{formError}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-3 bg-white/5 p-1 rounded-xl border border-white/5">
                  <button
                    type="button"
                    onClick={() => setFormType("expense")}
                    className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${formType === "expense"
                        ? "bg-rose-500 text-white shadow-md shadow-rose-500/20"
                        : "text-gray-400 hover:text-white"
                      }`}
                  >
                    Expense
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType("income")}
                    className={`py-2 rounded-lg text-xs font-bold transition cursor-pointer ${formType === "income"
                        ? "bg-emerald-500 text-white shadow-md shadow-emerald-500/20"
                        : "text-gray-400 hover:text-white"
                      }`}
                  >
                    Income
                  </button>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-gray-300">
                    Amount (INR) *
                  </label>
                  <input
                    type="number"
                    step="any"
                    placeholder="Enter amount..."
                    value={formAmount}
                    onChange={(e) => setFormAmount(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-gray-300">
                    Title *
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Grocery Store"
                    value={formTitle}
                    onChange={(e) => setFormTitle(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-gray-300">
                    Category *
                  </label>
                  <select
                    value={formCategory}
                    onChange={(e) => setFormCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-gray-300 focus:border-cyan-500 focus:outline-none transition"
                  >
                    <option value="Food" className="bg-gray-900 text-white">Food</option>
                    <option value="Travel" className="bg-gray-900 text-white">Travel</option>
                    <option value="Shopping" className="bg-gray-900 text-white">Shopping</option>
                    <option value="Bills" className="bg-gray-900 text-white">Bills</option>
                    <option value="Salary" className="bg-gray-900 text-white">Salary</option>
                    <option value="Entertainment" className="bg-gray-900 text-white">Entertainment</option>
                    <option value="Other" className="bg-gray-900 text-white">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-gray-300">
                    Transaction Date
                  </label>
                  <input
                    type="date"
                    value={formDate}
                    onChange={(e) => setFormDate(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition"
                  />
                </div>

                <div>
                  <label className="block mb-1.5 text-xs font-semibold text-gray-300">
                    Description
                  </label>
                  <textarea
                    placeholder="Memo details..."
                    value={formDescription}
                    onChange={(e) => setFormDescription(e.target.value)}
                    className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-2.5 text-sm text-white focus:border-cyan-500 focus:outline-none transition h-20 resize-none"
                  />
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseModal}
                    className="w-1/2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 py-3 font-semibold text-white transition cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-1/2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 py-3 font-bold text-white transition shadow-lg shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
                  >
                    {submitting ? "Saving..." : "Save"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
