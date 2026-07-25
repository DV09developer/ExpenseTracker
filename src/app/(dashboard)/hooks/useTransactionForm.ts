"use client";

import { useState } from "react";
import { transactionService as txService } from "@/services/transaction.service";
import { Transaction, TransactionType } from "@/types/transaction";

export default function useTransactionForm({ refreshDashboard, fetchTransactions }: { refreshDashboard: () => void; fetchTransactions: () => void }) {

    // Add / Edit Transaction Modal State
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTx, setEditingTx] = useState<Transaction | null>(null);

    // Form State
    const [formAmount, setFormAmount] = useState("");
    const [formTitle, setFormTitle] = useState("");
    const [formType, setFormType] = useState<TransactionType>("expense");
    const [formCategory, setFormCategory] = useState("Food");
    const [formDescription, setFormDescription] = useState("");
    const [formDate, setFormDate] = useState("");
    const [formError, setFormError] = useState<string | null>(null);
    const [submitting, setSubmitting] = useState(false);

    // Open modal for editing
    const handleStartEdit = (tx: Transaction) => {
        setEditingTx(tx);
        setFormAmount(tx.amount.toString());
        setFormTitle(tx.expense_title);
        setFormType(tx.expense_type);
        setFormCategory(tx.category);
        setFormDescription(tx.description || "");
        setFormDate(tx.transactionDate ? new Date(tx.transactionDate).toISOString().split('T')[0] : "");
        setFormError(null);
        setIsModalOpen(true);
    };

    // Reset & close Modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setEditingTx(null);
        setFormAmount("");
        setFormTitle("");
        setFormType("expense");
        setFormCategory("Food");
        setFormDescription("");
        setFormDate("");
        setFormError(null);
    };

    // Add / Edit Form Submit Handler
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormError(null);

        const amountNum = parseFloat(formAmount);
        if (isNaN(amountNum) || amountNum <= 0) {
            setFormError("Please enter a valid amount greater than 0");
            return;
        }

        if (!formTitle.trim()) {
            setFormError("Title is required");
            return;
        }

        setSubmitting(true);
        try {
        const payload = {
            amount: amountNum,
            expense_title: formTitle.trim(),
            expense_type: formType,
            category: formCategory,
            description: formDescription.trim() || undefined,
            transactionDate: formDate ? new Date(formDate).toISOString() : undefined
        };

        if (editingTx) {
            await txService.updateTransaction(editingTx._id, payload);
        } else {
            await txService.createTransaction(payload);
        }

        handleCloseModal();
        refreshDashboard();
        fetchTransactions();
        } catch (err: any) {
        console.error(err);
        setFormError(err?.response?.data?.message || "Operation failed. Please try again.");
        } finally {
        setSubmitting(false);
        }
    };

    return {

        isModalOpen,
        setIsModalOpen,

        editingTx,
        setEditingTx,

        formAmount,
        setFormAmount,

        formTitle,
        setFormTitle,

        formType,
        setFormType,

        formCategory,
        setFormCategory,

        formDescription,
        setFormDescription,

        formDate,
        setFormDate,

        formError,
        setFormError,

        submitting,
        setSubmitting,

        handleStartEdit,
        handleCloseModal,
        handleSubmit
    };

}