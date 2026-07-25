"use client";

import { Calendar, Search } from "lucide-react";

interface TransactionFiltersProps {
    search: string;
    filterType: string;
    filterCategory: string;
    startDate: string;
    endDate: string;

    setSearch: React.Dispatch<React.SetStateAction<string>>;
    setFilterType: React.Dispatch<React.SetStateAction<string>>;
    setFilterCategory: React.Dispatch<React.SetStateAction<string>>;
    setStartDate: React.Dispatch<React.SetStateAction<string>>;
    setEndDate: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<number>>;
}

export default function TransactionFilters({
    search,
    filterType,
    filterCategory,
    startDate,
    endDate,
    setSearch,
    setFilterType,
    setFilterCategory,
    setStartDate,
    setEndDate,
    setPage,
}: TransactionFiltersProps) {
    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

                <h3 className="text-lg font-bold text-white">
                    Transaction Logs
                </h3>

                <div className="flex flex-wrap items-center gap-3">

                    {/* Search */}

                    <div className="relative">
                        <Search
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            size={15}
                        />

                        <input
                            type="text"
                            placeholder="Search logs..."
                            value={search}
                            onChange={(e) => {
                                setSearch(e.target.value);
                                setPage(1);
                            }}
                            className="pl-9 pr-4 py-2 text-xs rounded-xl border border-white/5 bg-white/5 text-white focus:border-cyan-500 focus:outline-none w-48 transition"
                        />
                    </div>

                    {/* Type */}

                    <select
                        value={filterType}
                        onChange={(e) => {
                            setFilterType(e.target.value);
                            setPage(1);
                        }}
                        className="px-3 py-2 text-xs rounded-xl border border-white/5 bg-white/5 text-gray-300 focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="" className="bg-gray-900">
                            All Types
                        </option>

                        <option value="income" className="bg-gray-900">
                            Income
                        </option>

                        <option value="expense" className="bg-gray-900">
                            Expense
                        </option>
                    </select>

                    {/* Category */}

                    <select
                        value={filterCategory}
                        onChange={(e) => {
                            setFilterCategory(e.target.value);
                            setPage(1);
                        }}
                        className="px-3 py-2 text-xs rounded-xl border border-white/5 bg-white/5 text-gray-300 focus:border-cyan-500 focus:outline-none"
                    >
                        <option value="">All Categories</option>

                        <option value="Food">Food</option>

                        <option value="Travel">Travel</option>

                        <option value="Shopping">Shopping</option>

                        <option value="Bills">Bills</option>

                        <option value="Salary">Salary</option>

                        <option value="Entertainment">
                            Entertainment
                        </option>

                        <option value="Other">Other</option>
                    </select>
                </div>
            </div>

            {/* Date Filters */}

            <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">

                <span className="flex items-center gap-1.5">
                    <Calendar size={13} />
                    Filter dates:
                </span>

                <input
                    type="date"
                    value={startDate}
                    onChange={(e) => {
                        setStartDate(e.target.value);
                        setPage(1);
                    }}
                    className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white"
                />

                <span>to</span>

                <input
                    type="date"
                    value={endDate}
                    onChange={(e) => {
                        setEndDate(e.target.value);
                        setPage(1);
                    }}
                    className="px-2.5 py-1.5 rounded-lg border border-white/5 bg-white/5 text-white"
                />

                {(search ||
                    filterType ||
                    filterCategory ||
                    startDate ||
                    endDate) && (
                        <button
                            onClick={() => {
                                setSearch("");
                                setFilterType("");
                                setFilterCategory("");
                                setStartDate("");
                                setEndDate("");
                                setPage(1);
                            }}
                            className="text-cyan-400 underline font-bold cursor-pointer"
                        >
                            Reset Filters
                        </button>
                    )}
            </div>
        </>
    );
}