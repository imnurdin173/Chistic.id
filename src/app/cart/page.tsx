"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import CartItemTable from "@/components/cart/CartItemTable";
import VoucherSection from "@/components/cart/VoucherSection";
import OrderSummary from "@/components/cart/OrderSummary";
import PaymentMethod from "@/components/cart/PaymentMethod";
import { DUMMY_EVENTS } from "@/data/events";

function CartContent() {
  const searchParams = useSearchParams();

  // 1. Ambil query parameter dari URL
  const queryEventId = searchParams.get("eventId");
  const queryQty = searchParams.get("qty");
  const queryVariant = searchParams.get("variant");

  // 2. Ambil data event asli berdasarkan eventId dari URL
  const selectedEvent =
    DUMMY_EVENTS.find((e) => e.id.toString() === queryEventId) || DUMMY_EVENTS[0];

  // 3. State Jumlah Tiket
  const [ticketQty, setTicketQty] = useState<number>(() => {
    if (queryQty && Number(queryQty) > 0) return Number(queryQty);
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("chistix_ticket_qty");
      if (saved && Number(saved) > 0) return Number(saved);
    }
    return 1;
  });

  // 4. State Varian Tiket
  const [ticketVariant, setTicketVariant] = useState<string>(() => {
    if (queryVariant) return queryVariant;
    if (typeof window !== "undefined") {
      const saved = sessionStorage.getItem("chistix_ticket_variant");
      if (saved) return saved;
    }
    return "Presale";
  });

  // 5. State Diskon Voucher
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);

  // Sync state dengan URL Query Parameter saat URL berubah
  useEffect(() => {
    const qty = searchParams.get("qty");
    const variant = searchParams.get("variant");

    if (qty && Number(qty) > 0) setTicketQty(Number(qty));
    if (variant) setTicketVariant(variant);
  }, [searchParams]);

  // 6. Penentuan Harga Berdasarkan Varian & Harga Dasar Event Dinamis
  const getPriceByVariant = (variantName: string, baseEventPrice: number) => {
    switch (variantName) {
      case "VIP":
        return baseEventPrice * 2; // VIP 2x lipat dari harga dasar
      case "Presale":
      case "Regular":
      default:
        return baseEventPrice; // Presale & Regular sama dengan harga dasar
    }
  };

  const basePricePerTicket = getPriceByVariant(ticketVariant, selectedEvent.price);
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
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
      {/* Header Cart */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>🛒</span> Event Cart
        </h1>
        <button
          onClick={() => {
            setTicketQty(1);
            if (typeof window !== "undefined") {
              sessionStorage.removeItem("chistix_ticket_qty");
              sessionStorage.removeItem("chistix_ticket_variant");
            }
          }}
          className="text-xs font-medium text-slate-400 hover:text-red-500 transition cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      {/* 1. Event Ticket Section */}
      <section>
        <CartItemTable
          eventTitle={selectedEvent.title}
          organizerName={selectedEvent.organizer || "Nusantara Orchestra Productions"}
          quantity={ticketQty}
          setQuantity={(newQty) => {
            setTicketQty(newQty);
            if (typeof window !== "undefined") {
              sessionStorage.setItem("chistix_ticket_qty", newQty.toString());
            }
          }}
          variant={ticketVariant}
          basePrice={basePricePerTicket}
        />
      </section>

      {/* 2. Voucher Discount Section */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <VoucherSection onApplyVoucher={handleApplyVoucher} />
      </section>

      {/* 3. Order Summary Section (Propping ticketQty secara presisi) */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <OrderSummary
          ticketQty={ticketQty}
          subtotal={rawSubtotal}
          discount={appliedDiscount}
          taxFee={taxFee}
          totalAmount={totalAmount}
        />
      </section>

      {/* 4. Payment Method & Checkout */}
      <section className="pt-2">
        <PaymentMethod totalAmount={totalAmount} quantity={ticketQty} />
      </section>
    </div>
  );
}

export default function CartPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4 flex flex-col items-center">
      <Suspense fallback={<div className="text-sm text-slate-500 py-10">Loading cart...</div>}>
        <CartContent />
      </Suspense>
    </div>
  );
}