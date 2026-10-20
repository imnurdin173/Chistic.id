"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";

interface PaymentMethodProps {
  totalAmount: number;
  quantity?: number;
}

export default function PaymentMethod({ totalAmount, quantity = 1 }: PaymentMethodProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleCheckout = () => {
    const eventId = searchParams.get("eventId") || "1";
    const variant = searchParams.get("variant") || "Presale";

    if (typeof window !== "undefined") {
      sessionStorage.setItem("chistix_total_amount", totalAmount.toString());
      sessionStorage.setItem("chistix_ticket_qty", quantity.toString());
    }

    router.push(
      `/cart/payment?eventId=${eventId}&amount=${totalAmount}&qty=${quantity}&variant=${encodeURIComponent(variant)}`
    );
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
        <span>💳</span> PAYMENT METHOD
      </h2>

      <div className="flex items-center justify-center gap-3 p-3 bg-slate-50 border border-slate-200 rounded-xl">
        <span className="px-3 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-blue-600 shadow-2xs">
          DANA
        </span>
        <span className="px-3 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-slate-800 shadow-2xs">
          QRIS
        </span>
        <span className="px-3 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-orange-600 shadow-2xs">
          ShopeePay
        </span>
        <span className="px-3 py-1 bg-white rounded border border-slate-200 text-xs font-bold text-sky-600 shadow-2xs">
          midtrans
        </span>
      </div>

      {/* Posisikan tombol di tengah (center) */}
      <div className="flex justify-center pt-1">
        <button
          type="button"
          onClick={handleCheckout}
          disabled={totalAmount <= 0}
          className="px-10 py-2.5 bg-[#FF8A00] hover:bg-[#E07B00] active:bg-amber-700 disabled:bg-slate-300 text-white font-bold text-xs rounded-full transition-all shadow-xs cursor-pointer"
        >
          Check Out
        </button>
      </div>
    </div>
  );
}