"use client";

import React from "react";
import { useRouter } from "next/navigation";

interface PaymentMethodProps {
  totalAmount: number;
  quantity?: number;
}

export default function PaymentMethod({ totalAmount, quantity = 1 }: PaymentMethodProps) {
  const router = useRouter();

  const handleCheckout = () => {
    // Simpan totalAmount dan quantity ke sessionStorage agar dibaca di halaman /cart/payment
    if (typeof window !== "undefined") {
      sessionStorage.setItem("chistix_total_amount", totalAmount.toString());
      sessionStorage.setItem("chistix_ticket_qty", quantity.toString());
    }
    
    // Pindah ke halaman payment (bisa juga bawa query param sebagai fallback)
    router.push(`/cart/payment?amount=${totalAmount}&qty=${quantity}`);
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
        <span>💳</span> PAYMENT METHOD
      </h2>

      {/* Baris Logo Pembayaran */}
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

      {/* Tombol Check Out */}
      <button
        type="button"
        onClick={handleCheckout}
        disabled={totalAmount <= 0}
        className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 disabled:bg-slate-300 text-white font-bold text-sm rounded-xl transition-colors shadow-xs cursor-pointer"
      >
        Check Out
      </button>
    </div>
  );
}