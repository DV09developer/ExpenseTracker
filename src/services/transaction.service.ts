import { api } from "@/lib/api";

export interface TransactionPayload {
  amount: number;
  description?: string;
  expense_type: "income" | "expense";
  expense_title: string;
  category: string;
  transactionDate?: string;
}

export const transactionService = {
  getTransactions: (params?: {
    page?: number;
    limit?: number;
    expense_type?: string;
    category?: string;
    startDate?: string;
    endDate?: string;
    search?: string;
  }) => api.get("/api/transactions", { params }),

  createTransaction: (data: TransactionPayload) =>
    api.post("/api/transactions", data),

  updateTransaction: (id: string, data: Partial<TransactionPayload>) =>
    api.patch(`/api/transactions/${id}`, data),

  deleteTransaction: (id: string) =>
    api.delete(`/api/transactions/${id}`),

  getDashboard: () => api.get("/api/dashboard"),

  getCategoryBreakdown: () => api.get("/api/dashboard/category-breakdown"),

  getMonthlyExpenses: () => api.get("/api/dashboard/monthly-expenses"),
};
