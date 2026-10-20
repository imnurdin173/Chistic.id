"use client";

import React, { useState } from "react";
import UploadPaymentModal from "./UploadPaymentModal";

export default function TransactionsTab() {
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
              <th className="pb-3 font-medium">Ticket Type</th>
              <th className="pb-3 font-medium">Date</th>
              <th className="pb-3 font-medium">Status</th>
              <th className="pb-3 text-right font-medium">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-50 text-neutral-700">
            <tr>
              <td className="py-4 font-semibold">Resonance Soundfest 2026: Live Performance</td>
              <td className="py-4">Presale VIP (x1)</td>
              <td className="py-4">20 Oct 2026</td>
              <td className="py-4 font-semibold text-amber-500">Waiting Payment</td>
              <td className="py-4 text-right">
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
                >
                  Upload Proof
                </button>
              </td>
            </tr>
            <tr>
              <td className="py-4 font-semibold">Jazz Evening at the Park</td>
              <td className="py-4">Regular (x2)</td>
              <td className="py-4">15 Sep 2026</td>
              <td className="py-4 font-semibold text-emerald-600">Done</td>
              <td className="py-4 text-right text-neutral-400">-</td>
            </tr>
          </tbody>
        </table>
      </div>

      <UploadPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}