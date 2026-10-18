"use client";

import React, { useState, useEffect } from "react";

interface OrderSummaryProps {
  subtotal: number;
  discount: number;
  taxFee: number;
  totalAmount: number;
}

export default function OrderSummary({
  subtotal: initialSubtotal,
  discount: initialDiscount,
  taxFee: initialTaxFee,
  totalAmount: initialTotalAmount,
}: OrderSummaryProps) {
  const [quantity, setQuantity] = useState<number>(1);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedQty = sessionStorage.getItem("chistix_ticket_qty");
      if (savedQty) {
        setQuantity(Number(savedQty));
      }
    }
  }, []);

  // Kalkulasi harga dinamis berdasarkan quantity yang dipilih
  const baseTicketPrice = initialSubtotal > 0 && quantity > 0 ? initialSubtotal / (quantity || 1) : 550000; 
  const subtotal = baseTicketPrice * quantity;
  const discount = initialDiscount;
  const taxFee = subtotal * 0.11; // Pajak 11%
  const totalAmount = (subtotal - discount) + taxFee;

  return (
    <div className="space-y-2.5">
      <h2 className="text-xs font-bold text-slate-700 flex items-center gap-1.5 uppercase tracking-wide">
        <span>📄</span> Order Summary
      </h2>
      
      <div className="space-y-1.5 text-xs text-slate-600">
        {/* Info Jumlah Tiket */}
        <div className="flex justify-between pb-1 border-b border-slate-100">
          <span>Ticket Quantity</span>
          <span className="font-semibold text-slate-800">{quantity}x Ticket</span>
        </div>

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
          <span className="font-bold text-sm text-amber-600">
            Rp {totalAmount.toLocaleString("id-ID")}
          </span>
        </div>
      </div>
    </div>
  );
}