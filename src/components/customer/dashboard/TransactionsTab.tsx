"use client";

import React, { useState } from "react";
import UploadPaymentModal from "./UploadPaymentModal";
import { TransactionItem } from "@/app/customer/dashboard/page";

interface TransactionsTabProps {
  transactions?: TransactionItem[];
}

export default function TransactionsTab({ transactions = [] }: TransactionsTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Transactions</h1>
        <p className="mt-0.5 text-xs text-neutral-500">Manage and view your order history</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-neutral-100 text-neutral-400">
            <tr>
              <th className="pb-3 font-medium">Event Name</th>
              <th className="pb-3 font-medium text-center px-3">Ticket Type</th>
              <th className="pb-3 font-medium text-center px-3">Qty</th>
              <th className="pb-3 font-medium text-center px-3">Status</th>
              <th className="pb-3 font-medium text-right">Price / Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-neutral-700">
            {transactions.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-6 text-center text-neutral-400">
                  Belum ada riwayat transaksi.
                </td>
              </tr>
            ) : (
              transactions.map((trx) => (
                <tr key={trx.id}>
                  <td className="py-4 font-semibold text-neutral-900 pr-4">{trx.title}</td>
                  <td className="py-4 text-center px-3 whitespace-nowrap">{trx.ticketType}</td>
                  <td className="py-4 text-center px-3 whitespace-nowrap">{trx.qty}</td>
                  <td
                    className={`py-4 text-center px-3 font-semibold whitespace-nowrap ${
                      trx.status === "Waiting Payment"
                        ? "text-amber-500"
                        : trx.status === "Done"
                        ? "text-emerald-600"
                        : "text-red-500"
                    }`}
                  >
                    {trx.status}
                  </td>
                  <td className="py-4 text-right font-semibold text-neutral-900 whitespace-nowrap">
                    <div className="flex items-center justify-end gap-3">
                      <span>{trx.price}</span>
                      {trx.status === "Waiting Payment" && (
                        <button
                          type="button"
                          onClick={() => setIsModalOpen(true)}
                          className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
                        >
                          Upload Proof
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <UploadPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}