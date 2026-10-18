"use client";

import React, { useState } from "react";
import CartItemTable from "@/components/cart/CartItemTable";
import VoucherSection from "@/components/cart/VoucherSection";
import OrderSummary from "@/components/cart/OrderSummary";
import PaymentMethod from "@/components/cart/PaymentMethod";

export default function CartPage() {
  const [ticketQty, setTicketQty] = useState(1);
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Kalkulasi harga dinamis berdasarkan ticketQty
  const basePricePerTicket = 550000;
  const rawSubtotal = basePricePerTicket * ticketQty;
  const taxFee = Math.round(rawSubtotal * 0.11); // PPN 11%
  const totalAmount = Math.max(0, rawSubtotal - appliedDiscount + taxFee);

  const handleApplyVoucher = (code: string) => {
    if (code.toUpperCase() === "DISCOUNT50" || code.toUpperCase() === "CHISTIX50K") {
      setAppliedDiscount(50000);
      alert("Voucher berhasil dipasang! Potongan Rp 50.000");
    } else if (code.trim() !== "") {
      alert("Kode voucher tidak valid.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      {/* Container Utama Berada di Tengah */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
        {/* Header Title */}
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
            <span>🛒</span> Event Cart
          </h1>
          <button
            onClick={() => setTicketQty(0)}
            className="text-xs font-medium text-slate-400 hover:text-red-500 transition-colors"
          >
            Clear Cart
          </button>
        </div>

        {/* 1. Item Cart Section */}
        <section>
          <CartItemTable quantity={ticketQty} setQuantity={setTicketQty} />
        </section>

        {/* 2. Voucher Discount Section */}
        <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <VoucherSection onApplyVoucher={handleApplyVoucher} />
        </section>

        {/* 3. Order Summary Section */}
        <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
          <OrderSummary
            subtotal={rawSubtotal}
            discount={appliedDiscount}
            taxFee={taxFee}
            totalAmount={totalAmount}
          />
        </section>

        {/* 4. Payment Method & Checkout Button */}
        <section className="pt-2">
          {/* PASTI KAN totalAmount DAN quantity TERKIRIM DENGAN BENAR DI SINI */}
          <PaymentMethod totalAmount={totalAmount} quantity={ticketQty} />
        </section>
      </div>
    </div>
  );
}