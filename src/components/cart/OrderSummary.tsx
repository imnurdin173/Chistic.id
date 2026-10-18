"use client";

import React from "react";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  taxFee: number;
  totalAmount: number;
}

export default function OrderSummary({
  subtotal,
  discount,
  taxFee,
  totalAmount,
}: OrderSummaryProps) {
  return (
    <div className="space-y-2.5">
      <h2 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
        <span>📄</span> Order Summary
      </h2>
      
      <div className="space-y-1.5 text-xs text-slate-600">
        <div className="flex justify-between">
          <span>Cart Subtotal</span>
          <span className="font-medium text-slate-800">
            Rp {subtotal.toLocaleString("id-ID")}
          </span>
        </div>

        {discount > 0 && (
          <div className="flex justify-between text-emerald-600 font-medium">
            <span>Promo Discount</span>
            <span>- Rp {discount.toLocaleString("id-ID")}</span>
          </div>
        )}

        <div className="flex justify-between">
          <span>Tax Fee (11%)</span>
          <span className="font-medium text-slate-800">
            Rp {taxFee.toLocaleString("id-ID")}
          </span>
        </div>

        <div className="pt-2.5 border-t border-slate-200 flex justify-between items-center text-slate-900">
          <span className="font-bold text-xs text-slate-800">Total Amount</span>
          {/* Angka Total Amount dikecilkan ke text-sm/base agar pas */}
          <span className="font-bold text-sm text-amber-600">
            Rp {totalAmount.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}