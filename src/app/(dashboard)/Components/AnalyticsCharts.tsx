"use client";

import { Doughnut, Bar } from "react-chartjs-2";
import { PieChart as PieIcon, BarChart2 } from "lucide-react";

interface CategoryData {
    category: string;
    expense_amount: number;
}

interface MonthlyData {
    year: number;
    month: number;
    expense_amount: number;
}

interface AnalyticsChartsProps {
    categoryData: CategoryData[];
    monthlyData: MonthlyData[];
}

export default function AnalyticsCharts({
    categoryData,
    monthlyData,
}: AnalyticsChartsProps) {

    const monthNames = [
        "",
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
    ];

    // Category Aggregation for Doughnut Chart
    const doughnutData = {
        labels: categoryData.map((item) => item.category),
        datasets: [
            {
                data: categoryData.map((item) => item.expense_amount),
                backgroundColor: [
                    "#3b82f6",
                    "#06b6d4",
                    "#10b981",
                    "#f59e0b",
                    "#ec4899",
                    "#8b5cf6",
                    "#6b7280",
                ],
                borderWidth: 1,
                borderColor: "rgba(255,255,255,0.1)",
            },
        ],
    };

    // Monthly expenses Bar Chart
    const barData = {
        labels: monthlyData.map(
            (item) => `${monthNames[item.month]} ${item.year}`
        ),
        datasets: [
            {
                label: "Expenses",
                data: monthlyData.map((item) => item.expense_amount),
                backgroundColor: "rgba(6,182,212,0.6)",
                borderColor: "#06b6d4",
                borderWidth: 1,
                borderRadius: 8,
            },
        ],
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

            {/* Doughnut */}

            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl space-y-4">

                <div className="flex items-center gap-2">
                    <PieIcon size={18} className="text-cyan-400" />
                    <h3 className="text-lg font-bold text-white">
                        Category Breakdown
                    </h3>
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
                                            font: {
                                                size: 11,
                                            },
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <span className="text-xs text-gray-500">
                            No expense records found.
                        </span>
                    )}
                </div>
            </div>

            {/* Bar Chart */}

            <div className="glass-card p-6 md:p-8 rounded-3xl border border-white/5 shadow-xl space-y-4">

                <div className="flex items-center gap-2">
                    <BarChart2
                        size={18}
                        className="text-indigo-400"
                    />
                    <h3 className="text-lg font-bold text-white">
                        Monthly Expense Trend
                    </h3>
                </div>

                <div className="h-64 flex justify-center items-center">
                    {monthlyData.length > 0 ? (
                        <Bar
                            data={barData}
                            options={{
                                responsive: true,
                                maintainAspectRatio: false,
                                plugins: {
                                    legend: {
                                        display: false,
                                    },
                                },
                                scales: {
                                    y: {
                                        grid: {
                                            color: "rgba(255,255,255,0.05)",
                                        },
                                        ticks: {
                                            color: "#9ca3af",
                                        },
                                    },
                                    x: {
                                        grid: {
                                            display: false,
                                        },
                                        ticks: {
                                            color: "#9ca3af",
                                        },
                                    },
                                },
                            }}
                        />
                    ) : (
                        <span className="text-xs text-gray-500">
                            No monthly trends recorded.
                        </span>
                    )}
                </div>

            </div>
        </div>
    );
}