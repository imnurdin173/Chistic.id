"use client";

import React from "react";

interface OrderSummaryProps {
  ticketQty: number; // Tambahkan prop ini
  subtotal: number;
  discount: number;
  taxFee: number;
  totalAmount: number;
}

export default function OrderSummary({
  ticketQty,
  subtotal,
  discount,
  taxFee,
  totalAmount,
}: OrderSummaryProps) {
  const formatRupiah = (num: number) => "Rp " + num.toLocaleString("id-ID");

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
        <span>📑</span> ORDER SUMMARY
      </h2>

      <div className="space-y-2 text-xs">
        {/* Jumlah Tiket Dinamis */}
        <div className="flex justify-between items-center text-slate-600">
          <span>Ticket Quantity</span>
          <span className="font-bold text-slate-800">{ticketQty}x Ticket</span>
        </div>

        <div className="flex justify-between items-center text-slate-600">
          <span>Cart Subtotal</span>
          <span className="font-bold text-slate-800">{formatRupiah(subtotal)}</span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between items-center text-emerald-600">
            <span>Discount</span>
            <span className="font-bold">-{formatRupiah(discount)}</span>
          </div>
        )}

        <div className="flex justify-between items-center text-slate-600">
          <span>Tax Fee (11%)</span>
          <span className="font-bold text-slate-800">{formatRupiah(taxFee)}</span>
        </div>

        <div className="flex justify-between items-center pt-2 border-t border-slate-200/80 text-slate-800 font-extrabold text-sm">
          <span>Total Amount</span>
          <span className="text-[#FF8A00]">{formatRupiah(totalAmount)}</span>
        </div>
      </div>
    </div>
  );
}