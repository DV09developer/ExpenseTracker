"use client";

import { AlertCircle, X } from "lucide-react";
// import { TransactionType } from "@/types/transaction";
import useTransactionForm from "../hooks/useTransactionForm";

interface TransactionModalProps {
    form: ReturnType<typeof useTransactionForm>;
    // isOpen: boolean;
    // editing: boolean;

    // formAmount: string;
    // formTitle: string;
    // formType: TransactionType;
    // formCategory: string;
    // formDescription: string;
    // formDate: string;

    // formError: string | null;
    // submitting: boolean;

    // setFormAmount: React.Dispatch<React.SetStateAction<string>>;
    // setFormTitle: React.Dispatch<React.SetStateAction<string>>;
    // setFormType: React.Dispatch<React.SetStateAction<TransactionType>>;
    // setFormCategory: React.Dispatch<React.SetStateAction<string>>;
    // setFormDescription: React.Dispatch<React.SetStateAction<string>>;
    // setFormDate: React.Dispatch<React.SetStateAction<string>>;

    // onClose: () => void;
    // onSubmit: (e: React.FormEvent) => void;
}

export default function TransactionModal({ form }: TransactionModalProps) {
    const {

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
    } = form;

    if (!isModalOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fade-in">

            <div className="w-full max-w-md rounded-3xl glass-card border border-white/10 p-6 md:p-8 shadow-2xl space-y-6">

                <div className="flex items-center justify-between">

                    <h3 className="text-xl font-bold text-white">
                        {editingTx ? "Edit Transaction" : "New Transaction"}
                    </h3>

                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="p-1 rounded-lg text-gray-400 hover:text-white hover:bg-white/5"
                    >
                        <X size={20} />
                    </button>

                </div>

                {formError && (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 text-red-400 text-sm px-4 py-3 rounded-xl">

                        <AlertCircle size={16} />

                        <span>{formError}</span>

                    </div>
                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-4"
                >
                    {/* Type */}

                    <div className="grid grid-cols-2 gap-3 bg-white/5 p-1 rounded-xl border border-white/5">

                        <button
                            type="button"
                            onClick={() => setFormType("expense")}
                            className={`py-2 rounded-lg text-xs font-bold transition ${formType === "expense"
                                    ? "bg-rose-500 text-white"
                                    : "text-gray-400"
                                }`}
                        >
                            Expense
                        </button>

                        <button
                            type="button"
                            onClick={() => setFormType("income")}
                            className={`py-2 rounded-lg text-xs font-bold transition ${formType === "income"
                                    ? "bg-emerald-500 text-white"
                                    : "text-gray-400"
                                }`}
                        >
                            Income
                        </button>

                    </div>

                    {/* Amount */}

                    <input
                        type="number"
                        value={formAmount}
                        onChange={(e) => setFormAmount(e.target.value)}
                        placeholder="Amount"
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3"
                    />

                    {/* Title */}

                    <input
                        type="text"
                        value={formTitle}
                        onChange={(e) => setFormTitle(e.target.value)}
                        placeholder="Title"
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3"
                    />

                    {/* Category */}

                    <select
                        value={formCategory}
                        onChange={(e) => setFormCategory(e.target.value)}
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3"
                    >
                        <option value="Food" className="bg-gray-900 text-white">Food</option>
                        <option value="Travel" className="bg-gray-900 text-white">Travel</option>
                        <option value="Shopping" className="bg-gray-900 text-white">Shopping</option>
                        <option value="Bills" className="bg-gray-900 text-white">Bills</option>
                        <option value="Salary" className="bg-gray-900 text-white">Salary</option>
                        <option value="Entertainment" className="bg-gray-900 text-white">Entertainment</option>
                        <option value="Other" className="bg-gray-900 text-white">Other</option>
                    </select>

                    {/* Date */}

                    <input
                        type="date"
                        value={formDate}
                        onChange={(e) => setFormDate(e.target.value)}
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3"
                    />

                    {/* Description */}

                    <textarea
                        value={formDescription}
                        onChange={(e) => setFormDescription(e.target.value)}
                        placeholder="Description"
                        className="w-full rounded-xl border border-white/5 bg-white/5 px-4 py-3 h-24 resize-none"
                    />

                    <div className="flex gap-3">

                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="w-1/2 rounded-xl border border-white/10 py-3"
                        >
                            Cancel
                        </button>

                        <button
                            type="submit"
                            disabled={submitting}
                            className="w-1/2 rounded-xl bg-gradient-to-r from-indigo-500 to-cyan-500 py-3 text-white disabled:opacity-50"
                        >
                            {submitting ? "Saving..." : "Save"}
                        </button>

                    </div>

                </form>

            </div>

        </div>
    );
}