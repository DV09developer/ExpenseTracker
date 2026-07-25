"use client";

import { Edit3, Loader2, Trash2 } from "lucide-react";
import { Transaction } from "@/types/transaction";

interface TransactionTableProps {
    transactions: Transaction[];
    loading: boolean;
    onEdit: (transaction: Transaction) => void;
    onDelete: (id: string) => void;
}

export default function TransactionTable({
    transactions,
    loading,
    onEdit,
    onDelete,
}: TransactionTableProps) {
    if (loading) {
        return (
            <div className="py-20 flex justify-center items-center gap-2">
                <Loader2
                    className="animate-spin text-cyan-400"
                    size={24}
                />
                <span className="text-sm text-gray-400">
                    Loading transactions...
                </span>
            </div>
        );
    }

    if (transactions.length === 0) {
        return (
            <div className="py-20 text-center text-gray-400 text-sm">
                No matching transactions recorded yet.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">

                <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-[11px] font-bold text-gray-400 uppercase tracking-wider">

                        <th className="py-4 px-6">Title</th>

                        <th className="py-4 px-6">Category</th>

                        <th className="py-4 px-6">Type</th>

                        <th className="py-4 px-6">Amount</th>

                        <th className="py-4 px-6">Date</th>

                        <th className="py-4 px-6 text-right">
                            Actions
                        </th>

                    </tr>
                </thead>

                <tbody className="divide-y divide-white/5 text-sm text-gray-200">

                    {transactions.map((tx) => (
                        <tr
                            key={tx._id}
                            className="hover:bg-white/5 transition"
                        >
                            <td className="py-4.5 px-6 font-semibold">
                                {tx.expense_title}
                            </td>

                            <td className="py-4.5 px-6">
                                <span className="bg-white/5 px-2.5 py-1 rounded-full text-xs border border-white/5">
                                    {tx.category}
                                </span>
                            </td>

                            <td className="py-4.5 px-6">
                                <span
                                    className={`text-xs font-bold uppercase tracking-wider ${tx.expense_type === "income"
                                            ? "text-emerald-400"
                                            : "text-rose-400"
                                        }`}
                                >
                                    {tx.expense_type}
                                </span>
                            </td>

                            <td className="py-4.5 px-6 font-bold">
                                ₹{tx.amount.toLocaleString()}
                            </td>

                            <td className="py-4.5 px-6 text-gray-400">
                                {tx.transactionDate
                                    ? new Date(
                                        tx.transactionDate
                                    ).toLocaleDateString()
                                    : ""}
                            </td>

                            <td className="py-4.5 px-6 text-right">
                                <div className="flex items-center justify-end gap-2">

                                    <button
                                        onClick={() => onEdit(tx)}
                                        className="p-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/10 transition cursor-pointer"
                                    >
                                        <Edit3 size={14} />
                                    </button>

                                    <button
                                        onClick={() => onDelete(tx._id)}
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
        </div>
    );
}