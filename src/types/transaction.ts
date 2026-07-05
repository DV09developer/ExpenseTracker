export type TransactionType = "income" | "expense";

export interface Transaction {
  _id: string;
  userId: string;
  expense_type: TransactionType;
  expense_title: string;
  amount: number;
  category: string;
  description?: string;
  transactionDate: string;
  createdAt: string;
  updatedAt: string;
}