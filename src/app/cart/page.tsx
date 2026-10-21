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

  // 5. State Diskon Voucher & Point Balance
  const [appliedDiscount, setAppliedDiscount] = useState<number>(0);
  const [pointBalance] = useState<number>(150);
  const [isPointsClaimed, setIsPointsClaimed] = useState<boolean>(false);

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
        return baseEventPrice * 2;
      case "Presale":
      case "Regular":
      default:
        return baseEventPrice;
    }
  };

  const basePricePerTicket = getPriceByVariant(ticketVariant, selectedEvent.price);
  const rawSubtotal = basePricePerTicket * ticketQty;
  const taxFee = Math.round(rawSubtotal * 0.11); // PPN 11%

  // Hitung total setelah voucher
  const subtotalAfterVoucher = Math.max(0, rawSubtotal - appliedDiscount);
  
  // Nilai potongan poin (150 poin = potongan Rp 150)
  const pointDiscountValue = isPointsClaimed ? pointBalance : 0;
  const totalAmount = Math.max(0, subtotalAfterVoucher + taxFee - pointDiscountValue);

  const handleApplyVoucher = (code: string) => {
    if (code.toUpperCase() === "DISCOUNT50" || code.toUpperCase() === "CHISTIX50K") {
      setAppliedDiscount(50000);
    }
  };

  return (
    <div className="w-full max-w-xl bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8 space-y-6">
      
      {/* Header Cart */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h1 className="text-xl font-bold text-slate-800 flex items-center gap-2">
          <span>🛒</span> Event Cart
        </h1>
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

      {/* 3. Point Balance Section (Dengan Ceklis Hijau Lingkaran) */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-3">
        <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
          <span>⭐</span> Point Balance
        </div>
        <div className="flex gap-2">
          {/* Kotak Putih Ber-border */}
          <div className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-xl bg-white flex items-center justify-between">
            <span className="text-slate-500 font-medium">
              Kamu punya <span className="font-bold text-amber-600">{pointBalance} Poin</span>
            </span>
            {isPointsClaimed && (
              <span className="w-5 h-5 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center text-emerald-600 font-bold text-[10px]">
                ✓
              </span>
            )}
          </div>

          {/* Tombol Claim / Remove */}
          <button
            type="button"
            onClick={() => setIsPointsClaimed(!isPointsClaimed)}
            disabled={pointBalance === 0}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition shadow-xs cursor-pointer ${
              pointBalance === 0
                ? "bg-slate-200 text-slate-400 cursor-not-allowed"
                : isPointsClaimed
                ? "bg-slate-100 hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 hover:border-red-200"
                : "bg-amber-500 hover:bg-amber-600 text-white"
            }`}
          >
            {isPointsClaimed ? "Remove" : "Claim"}
          </button>
        </div>
      </section>

      {/* 4. Order Summary Section */}
      <section className="bg-slate-50 p-4 rounded-xl border border-slate-100">
        <OrderSummary
          ticketQty={ticketQty}
          subtotal={rawSubtotal}
          discount={appliedDiscount + pointDiscountValue}
          taxFee={taxFee}
          totalAmount={totalAmount}
        />
      </section>

      {/* 5. Payment Method & Checkout */}
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