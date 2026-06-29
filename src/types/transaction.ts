export type TransactionType =
  | "income"
  | "expense";

export interface Transaction {
  _id: string;
  type: TransactionType;
  amount: number;
  category: string;
  description?: string;
  date: string;
  createdAt: string;
  updatedAt: string;
}