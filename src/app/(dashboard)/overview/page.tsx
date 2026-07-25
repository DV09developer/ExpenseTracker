"use client";

import ProtectedRoute from "../../(auth)/Components/ProtectedRoute";
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
import { useDashboard } from "../hooks/useDashboard";
import useTransactions from "../hooks/useTransactions";
import useTransactionForm from "../hooks/useTransactionForm";

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
  const {
    summary,
    categoryData,
    monthlyData,
    refreshDashboard,
  } = useDashboard();

  const {
    transactions,
    loadingTransactions,

    page,
    totalPages,

    search,
    filterType,
    filterCategory,
    startDate,
    endDate,

    setPage,
    setSearch,
    setFilterType,
    setFilterCategory,
    setStartDate,
    setEndDate,

    fetchTransactions,

    deleteTransaction,
  } = useTransactions({
    refreshDashboard,
  });

  const transactionForm = useTransactionForm({ refreshDashboard, fetchTransactions });

  return (
    <ProtectedRoute>
      <div className={`space-y-8 animate-fade-in pb-12 ${transactionForm.isModalOpen ? 'h-[calc(100dvh-100px)] absolute overflow-hidden' : ''}`}>
        {/* Header Title */}
        <DashboardHeader
          onAddTransaction={() => transactionForm.setIsModalOpen(true)}
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
            onEdit={transactionForm.handleStartEdit}
            onDelete={deleteTransaction}
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
          form={transactionForm}
        />
      </div>
    </ProtectedRoute>
  );
}