import { DollarSign, TrendingDown, TrendingUp } from "lucide-react";
import { Summary } from "@/types/dashboard";

interface SummaryCardsProps {
    summary: Summary;
}

export default function SummaryCards({
    summary,
}: SummaryCardsProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {/* Balance */}
            <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-xl">
                <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Total Net Balance
                    </span>

                    <h3 className="text-3xl font-black text-white">
                        ₹{summary.balance.toLocaleString()}
                    </h3>
                </div>

                <div className="bg-indigo-500/10 p-4 rounded-2xl text-indigo-400 border border-indigo-500/20">
                    <DollarSign size={24} />
                </div>
            </div>

            {/* Income */}
            <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-xl">
                <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Total Earnings
                    </span>

                    <h3 className="text-3xl font-black text-emerald-400">
                        ₹{summary.totalIncome.toLocaleString()}
                    </h3>
                </div>

                <div className="bg-emerald-500/10 p-4 rounded-2xl text-emerald-400 border border-emerald-500/20">
                    <TrendingUp size={24} />
                </div>
            </div>

            {/* Expense */}
            <div className="glass-card p-6 rounded-3xl border border-white/5 flex items-center justify-between shadow-xl">
                <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">
                        Total Expenses
                    </span>

                    <h3 className="text-3xl font-black text-rose-400">
                        ₹{summary.totalExpense.toLocaleString()}
                    </h3>
                </div>

                <div className="bg-rose-500/10 p-4 rounded-2xl text-rose-400 border border-rose-500/20">
                    <TrendingDown size={24} />
                </div>
            </div>

        </div>
    );
}