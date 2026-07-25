"use client";

import { useCallback, useEffect, useState } from "react";
import { transactionService as txService } from "@/services/transaction.service";
import { Transaction } from "@/types/transaction";

interface UseTransactionsProps {
    refreshDashboard: () => Promise<void>;
}

export default function useTransactions({
    refreshDashboard,
}: UseTransactionsProps) {
    //   const limit = 10;

    // Transactions list with filters & pagination
    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [loadingTransactions, setLoadingTransactions] = useState(false);
    const [page, setPage] = useState(1);
    const [limit] = useState(5);
    const [totalPages, setTotalPages] = useState(1);

    // Filter States
    const [search, setSearch] = useState("");
    const [filterType, setFilterType] = useState("");
    const [filterCategory, setFilterCategory] = useState("");
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");

    const fetchTransactions = useCallback(async () => {
        setLoadingTransactions(true);

        try {
        const params = {
            page,
            limit,
            expense_type: filterType || undefined,
            category: filterCategory || undefined,
            search: search || undefined,
            startDate: startDate || undefined,
            endDate: endDate || undefined,
        };

        const res = await txService.getTransactions(params);
        if (res.data?.data) {
            setTransactions(res.data.data.transactions || []);
            setTotalPages(res.data.data.pagination?.totalPages || 1);
        }
        } catch (err) {
            console.error(err);
        } finally {
            setLoadingTransactions(false);
        }
    }, [page, limit, filterType, filterCategory, search, startDate, endDate]);

    useEffect(() => {
        fetchTransactions();
    }, [fetchTransactions]);

    const deleteTransaction = async (id: string) => {
        if (!confirm("Are you sure you want to delete this transaction?")) return;

        try {
            await txService.deleteTransaction(id);
            await refreshDashboard();
            await fetchTransactions();
        } catch (err) {
            console.error(err);
        }
    };

    return {
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
    };
}
