import { useCallback, useEffect, useState } from "react";
import { transactionService as txService } from "@/services/transaction.service";

export function useDashboard() {
    // Summary State
    const [summary, setSummary] = useState({
        totalIncome: 0,
        totalExpense: 0,
        balance: 0,
        totalTransactions: 0
    })
    // Breakdown & Monthly Trend Analytics State
    const [categoryData, setCategoryData] = useState<{ category: string; expense_amount: number }[]>([]);
    const [monthlyData, setMonthlyData] = useState<{ year: number; month: number; expense_amount: number }[]>([]);
    const [loading, setLoading] = useState(false);

    // Fetch Dashboard Summary & Charts
    const fetchDashboardStats = useCallback(async () => {
        try {
            setLoading(true);
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
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDashboardStats();
    }, [fetchDashboardStats]);

    return {
        summary,
        categoryData,
        monthlyData,
        loading,
        refreshDashboard: fetchDashboardStats,
    };
}
