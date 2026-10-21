"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { DUMMY_EVENTS } from "@/data/events";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function formatEventDate(dateString?: string) {
  if (!dateString) return "15 November 2026 • 16:00";
  const d = new Date(dateString);
  if (isNaN(d.getTime())) return dateString;
  return new Intl.DateTimeFormat("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(d).replace(".", ":");
}

function PaymentSuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const eventIdParam = searchParams.get("eventId");
  const amountParam = searchParams.get("amount");
  const qtyParam = searchParams.get("qty");
  const variantParam = searchParams.get("variant");
  const customerParam = searchParams.get("customer") || "mutiara";

  const selectedEvent =
    DUMMY_EVENTS.find((e) => e.id.toString() === eventIdParam) || DUMMY_EVENTS[0];

  const totalAmount = amountParam ? parseInt(amountParam, 10) : selectedEvent.price;
  const ticketQty = qtyParam ? parseInt(qtyParam, 10) : 1;
  const ticketVariant = variantParam || "Presale";

  const [tickets, setTickets] = useState<{ id: string }[]>([]);
  const [isDownloading, setIsDownloading] = useState(false);

  const pdfContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const generatedTickets = Array.from({ length: ticketQty }, () => {
      const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
      return { id: randomId };
    });
    setTickets(generatedTickets);
  }, [ticketQty]);

  const formatRupiah = (num: number) => "Rp " + num.toLocaleString("id-ID");

  const handleDownloadPDF = async () => {
    if (!pdfContainerRef.current) return;
    setIsDownloading(true);

    try {
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const ticketCards =
        pdfContainerRef.current.querySelectorAll<HTMLElement>(".pdf-ticket-page");

      for (let i = 0; i < ticketCards.length; i++) {
        const card = ticketCards[i];

        const canvas = await html2canvas(card, {
          scale: 2,
          useCORS: true,
          backgroundColor: "#ffffff",
          ignoreElements: (el) => el.tagName === "STYLE" || el.tagName === "LINK",
        });

        const imgData = canvas.toDataURL("image/png");

        const imgWidth = pdfWidth - 40;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;
        const xPos = (pdfWidth - imgWidth) / 2;
        const yPos = (pdfHeight - imgHeight) / 2;

        if (i > 0) {
          pdf.addPage();
        }

        pdf.addImage(imgData, "PNG", xPos, yPos, imgWidth, imgHeight);
      }

      pdf.save(`E-Ticket-${selectedEvent.title.replace(/\s+/g, "_")}.pdf`);
    } catch (error) {
      console.error("Gagal mendownload PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 py-10 px-4 flex flex-col items-center justify-center font-sans">
      {/* 1. TAMPILAN DI LAYAR (Payment Successful) */}
      <div className="w-full max-w-md bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200">
        <div className="flex justify-center mb-3">
          <div className="w-16 h-16 bg-emerald-500 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white stroke-current"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="3"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-slate-900">Payment Successful!</h1>
          <p className="text-xs text-slate-400 mt-1">Valid ticket. Guest may enter.</p>
        </div>

        <div className="space-y-3 text-xs font-medium border-t border-slate-100 pt-4 mb-6">
          <div className="flex justify-between items-start">
            <span className="text-slate-400">Events</span>
            <span className="font-bold text-right text-slate-900 max-w-[200px]">
              {selectedEvent.title}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Customer</span>
            <span className="font-bold text-slate-900">{customerParam}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Ticket Type</span>
            <span className="font-bold text-slate-900">
              {ticketVariant} ({ticketQty}x Ticket)
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Date & Time</span>
            <span className="font-bold text-slate-900">
              {selectedEvent.date || "2026-11-15T16:00:00"}
            </span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-400">Location</span>
            <span className="font-bold text-slate-900">
              {selectedEvent.location || "Bandung, West Java"}
            </span>
          </div>
          <div className="flex justify-between items-center pt-2 border-t border-slate-100">
            <span className="text-slate-400">Total Amount</span>
            <span className="font-bold text-emerald-600 text-sm">
              {formatRupiah(totalAmount)}
            </span>
          </div>
        </div>

        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 text-center mb-2">
          <div className="p-3 bg-white border border-slate-200 rounded-2xl inline-block mb-3">
            <QRCodeSVG
              value={`CHISTIX-ORDER-${selectedEvent.id}-${ticketQty}`}
              size={160}
              level="M"
            />
          </div>
          <p className="text-[11px] text-slate-400">
            Tunjukkan QR Code ini di pintu masuk acara
          </p>
        </div>
      </div>

      <div className="w-full max-w-md mt-4 space-y-2">
        <button
          onClick={handleDownloadPDF}
          disabled={isDownloading}
          className="w-full py-3.5 bg-amber-500 hover:bg-amber-600 text-white font-bold text-xs rounded-2xl transition cursor-pointer shadow-xs disabled:opacity-50"
        >
          {isDownloading ? "Generating PDF..." : "Download E-Ticket (PDF)"}
        </button>
        <button
          onClick={() => router.push("/")}
          className="w-full py-3.5 bg-slate-200/70 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-2xl transition cursor-pointer text-center block"
        >
          Kembali ke Beranda
        </button>
      </div>

      {/* 2. TEMPLATE PDF TERSEMBUNYI (Menggunakan tag <img> API QR agar aman dari error SVG lab()) */}
      <div style={{ position: "absolute", left: "-9999px", top: "-9999px" }}>
        <div ref={pdfContainerRef} style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          {tickets.map((ticket) => (
            <div
              key={ticket.id}
              className="pdf-ticket-page"
              style={{
                width: "420px",
                backgroundColor: "#ffffff",
                border: "2px solid #1e293b",
                borderRadius: "20px",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                color: "#0f172a",
                fontFamily: "Arial, sans-serif",
                boxSizing: "border-box",
              }}
            >
              {/* Header */}
              <div style={{ textAlign: "center", marginBottom: "24px", width: "100%" }}>
                <h1 style={{ fontSize: "24px", fontWeight: "800", letterSpacing: "1px", margin: "0 0 8px 0", color: "#000000" }}>
                  E-TICKET
                </h1>
                <h2 style={{ fontSize: "16px", fontWeight: "700", margin: "0 0 6px 0", color: "#000000" }}>
                  The bill has been paid
                </h2>
                <p style={{ fontSize: "11px", color: "#475569", margin: 0 }}>
                  Valid ticket. Guest may enter.
                </p>
              </div>

              {/* Detail Info */}
              <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "14px", margin: "10px 0", fontSize: "12px", fontWeight: "500" }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569" }}>Events</span>
                  <span style={{ fontWeight: "700", textAlign: "right", maxWidth: "220px", color: "#000000" }}>
                    {selectedEvent.title}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569" }}>Customer</span>
                  <span style={{ fontWeight: "700", color: "#000000" }}>{customerParam}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569" }}>Ticket Type</span>
                  <span style={{ fontWeight: "700", color: "#000000" }}>{ticketVariant}</span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569" }}>Date & Time</span>
                  <span style={{ fontWeight: "700", color: "#000000" }}>
                    {formatEventDate(selectedEvent.date)}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569" }}>Location</span>
                  <span style={{ fontWeight: "700", color: "#000000" }}>
                    {selectedEvent.location || "Bandung, West Java"}
                  </span>
                </div>

                <div style={{ paddingTop: "10px", borderTop: "1px solid #cbd5e1", display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569" }}>Total Amount</span>
                  <span style={{ fontWeight: "700", color: "#000000" }}>
                    {formatRupiah(totalAmount)}
                  </span>
                </div>

                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ color: "#475569" }}>Ticket ID</span>
                  <span style={{ fontFamily: "monospace", fontWeight: "700", fontSize: "13px", letterSpacing: "1px", color: "#000000" }}>
                    {ticket.id}
                  </span>
                </div>
              </div>

              {/* QR Code menggunakan Image URL agar html2canvas tidak crash pada elemen SVG */}
              <div style={{ marginTop: "24px", marginBottom: "8px", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <img
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=TIX-${ticket.id}`}
                  alt="QR Code"
                  width={160}
                  height={160}
                  style={{ border: "1px solid #e2e8f0", borderRadius: "12px", padding: "8px", background: "#ffffff" }}
                  crossOrigin="anonymous"
                />
                <p style={{ fontSize: "10px", color: "#475569", marginTop: "16px", textAlign: "center", margin: "16px 0 0 0" }}>
                  Tunjukkan QR Code ini di pintu masuk acara
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function PaymentSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center text-xs text-slate-400">
          Loading...
        </div>
      }
    >
      <PaymentSuccessContent />
    </Suspense>
  );
}