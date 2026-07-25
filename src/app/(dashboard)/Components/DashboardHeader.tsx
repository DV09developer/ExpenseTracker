import { Plus } from "lucide-react";

interface DashboardHeaderProps {
    onAddTransaction: () => void;
}

export default function DashboardHeader({
    onAddTransaction,
}: DashboardHeaderProps) {
    return (
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
                <h1 className="text-3xl font-extrabold text-white">
                    Dashboard Overview
                </h1>
                <p className="text-gray-400 text-sm">
                    Welcome back! Real-time snapshot of your transactions.
                </p>
            </div>

            <button
                onClick={onAddTransaction}
                className="flex items-center gap-2 bg-gradient-to-r from-indigo-500 to-cyan-500 hover:from-indigo-600 hover:to-cyan-600 text-white font-bold px-5 py-3 rounded-2xl transition shadow-lg shadow-indigo-500/25 cursor-pointer w-fit"
            >
                <Plus size={18} />
                <span>Add Transaction</span>
            </button>
        </div>
    );
}