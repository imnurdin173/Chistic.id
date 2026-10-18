"use client";

import React, { Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";

function TicketSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Ambil parameter nominal dan jumlah tiket dari URL
  const amountParam = searchParams.get("amount");
  const qtyParam = searchParams.get("qty");
  
  const totalAmount = amountParam ? parseInt(amountParam, 10) : 610500;
  const ticketQty = qtyParam ? parseInt(qtyParam, 10) : 1;

  const formatRupiah = (num: number) => "Rp " + num.toLocaleString("id-ID");

  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 flex flex-col items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-3xl shadow-lg border border-slate-200 overflow-hidden print:shadow-none print:border-none print:w-full">
        
        {/* Banner Status Lunas */}
        <div className="bg-emerald-600 text-white p-6 text-center space-y-1">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-white/20 rounded-full text-2xl mb-1">
            ✅
          </div>
          <h2 className="text-xl font-extrabold tracking-wide uppercase">Payment Successful!</h2>
          <p className="text-xs text-emerald-100">Booking ID: #CHX-893201-2026</p>
        </div>

        {/* Detail E-Ticket */}
        <div className="p-6 md:p-8 space-y-6">
          
          {/* Judul Event */}
          <div className="border-b border-dashed border-slate-200 pb-5 space-y-1">
            <span className="px-2.5 py-0.5 bg-amber-100 text-amber-800 text-[10px] font-bold rounded-md uppercase">
              Pre Sale VIP ({ticketQty} Ticket)
            </span>
            <h1 className="text-lg font-bold text-slate-800 leading-snug">
              Resonance Soundfest 2026: Intimate Live Performance
            </h1>
            <p className="text-xs text-slate-500 font-medium">By Soundwave Entertainment</p>
          </div>

          {/* Grid Informasi Acara */}
          <div className="grid grid-cols-2 gap-4 text-xs">
            <div>
              <span className="text-slate-400 block font-medium">📅 Date & Time</span>
              <span className="font-bold text-slate-700">14 Nov 2026, 18:00 WIB</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">📍 Location & Seat</span>
              <span className="font-bold text-slate-700">GBK Stadium, VIP Area</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">👤 Ticket Holder</span>
              <span className="font-bold text-slate-700">Shalihati M. R.</span>
            </div>
            <div>
              <span className="text-slate-400 block font-medium">💳 Total Amount</span>
              <span className="font-bold text-emerald-600">{formatRupiah(totalAmount)}</span>
            </div>
          </div>

          {/* QR Code Check-in */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center space-y-2">
            <div className="w-36 h-36 mx-auto bg-white p-2 rounded-xl border border-slate-200 flex items-center justify-center">
              <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center text-white text-[10px] font-mono">
                [ QR CHECK-IN ]
              </div>
            </div>
            <p className="text-[11px] font-semibold text-slate-600">
              Tunjukkan QR Code ini di pintu masuk acara
            </p>
          </div>

          {/* Tombol Aksi */}
          <div className="space-y-2.5 pt-2 print:hidden">
            <button
              onClick={handleDownloadPDF}
              className="w-full py-3 bg-amber-500 hover:bg-amber-600 active:bg-amber-700 text-white font-bold text-sm rounded-xl transition-colors shadow-xs flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>📥</span> Download E-Ticket (PDF)
            </button>

            <button
              onClick={() => router.push("/")}
              className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-sm rounded-xl transition-colors cursor-pointer"
            >
              Kembali ke Beranda
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function TicketSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-xs text-slate-400">Loading...</div>}>
      <TicketSuccessContent />
    </Suspense>
  );
}