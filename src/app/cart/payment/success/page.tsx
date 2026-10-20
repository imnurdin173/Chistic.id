"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function CartSuccessPage() {
  const router = useRouter();
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPDF = async () => {
    const ticketElement = document.getElementById("e-ticket-card");

    if (!ticketElement) {
      console.error("Elemen E-Ticket tidak ditemukan");
      return;
    }

    try {
      setIsDownloading(true);

      // Tangkap elemen dengan menunggu gambar selesai (imageTimeout)
      const canvas = await html2canvas(ticketElement, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: "#ffffff",
        imageTimeout: 15000, // Menunggu gambar QR code selesai dimuat (15 detik)
        onclone: (clonedDoc) => {
          const allElements = clonedDoc.querySelectorAll("*");
          allElements.forEach((el) => {
            const htmlEl = el as HTMLElement;
            const computedStyle = window.getComputedStyle(htmlEl);

            if (computedStyle.color.includes("lab") || computedStyle.color.includes("oklch")) {
              htmlEl.style.color = "#1e293b";
            }
            if (computedStyle.backgroundColor.includes("lab") || computedStyle.backgroundColor.includes("oklch")) {
              htmlEl.style.backgroundColor = "#ffffff";
            }
            if (computedStyle.borderColor.includes("lab") || computedStyle.borderColor.includes("oklch")) {
              htmlEl.style.borderColor = "#e2e8f0";
            }
          });
        },
      });

      const imgData = canvas.toDataURL("image/png");

      // Inisialisasi jsPDF ukuran A4
      const pdf = new jsPDF("portrait", "mm", "a4");
      const pageWidth = pdf.internal.pageSize.getWidth(); // Lebar A4 (~210mm)
      const pageHeight = pdf.internal.pageSize.getHeight(); // Tinggi A4 (~297mm)

      // Hitung ukuran proporsional tiket agar pas di tengah halaman A4
      const imgWidth = 140; // Lebar cetak tiket dalam mm (pas di tengah A4)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Posisikan tiket di tengah secara horizontal (X) dan vertikal (Y)
      const xPos = (pageWidth - imgWidth) / 2;
      const yPos = (pageHeight - imgHeight) / 2;

      pdf.addImage(imgData, "PNG", xPos, yPos > 10 ? yPos : 10, imgWidth, imgHeight);
      pdf.save("Chistix_E-Ticket.pdf");
    } catch (error) {
      console.error("Gagal mengunduh PDF:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4" style={{ backgroundColor: "#f8fafc" }}>
      <div className="w-full max-w-md space-y-4">
        
        {/* AREA KARTU TIKET */}
        <div
          id="e-ticket-card"
          className="rounded-3xl p-6 border shadow-sm space-y-6 bg-white"
          style={{
            backgroundColor: "#ffffff",
            borderColor: "#e2e8f0",
            color: "#1e293b",
          }}
        >
          {/* Status Pembayaran */}
          <div className="text-center space-y-2">
            <div 
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto text-white text-2xl font-bold shadow-sm"
              style={{ backgroundColor: "#10B981" }}
            >
              ✓
            </div>
            <h1 className="text-xl font-bold" style={{ color: "#0f172a" }}>
              Payment Successful!
            </h1>
            <p className="text-xs" style={{ color: "#94a3b8" }}>
              Valid ticket. Guest may enter.
            </p>
          </div>

          {/* Rincian Transaksi */}
          <div 
            className="space-y-3 text-xs pt-4" 
            style={{ borderTop: "1px solid #f1f5f9" }}
          >
            <div className="flex justify-between items-center">
              <span style={{ color: "#94a3b8" }}>Events</span>
              <span className="font-bold text-right" style={{ color: "#0f172a" }}>
                Indie Music Summit & Showcase
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span style={{ color: "#94a3b8" }}>Customer</span>
              <span className="font-bold" style={{ color: "#0f172a" }}>
                mutiara
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span style={{ color: "#94a3b8" }}>Ticket Type</span>
              <span className="font-bold" style={{ color: "#0f172a" }}>
                Presale (3x Ticket)
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span style={{ color: "#94a3b8" }}>Date & Time</span>
              <span className="font-bold" style={{ color: "#0f172a" }}>
                2026-11-15T16:00:00
              </span>
            </div>

            <div className="flex justify-between items-center">
              <span style={{ color: "#94a3b8" }}>Location</span>
              <span className="font-bold" style={{ color: "#0f172a" }}>
                Bandung, West Java
              </span>
            </div>

            <div 
              className="flex justify-between items-center pt-2" 
              style={{ borderTop: "1px solid #f1f5f9" }}
            >
              <span style={{ color: "#94a3b8" }}>Total Amount</span>
              <span className="font-bold text-sm" style={{ color: "#059669" }}>
                Rp 216.450
              </span>
            </div>
          </div>

          {/* Area QR Code */}
          <div 
            className="p-6 rounded-2xl border text-center space-y-3"
            style={{ backgroundColor: "#f8fafc", borderColor: "#f1f5f9" }}
          >
            <div 
              className="p-3 rounded-xl inline-block border"
              style={{ backgroundColor: "#ffffff", borderColor: "#e2e8f0" }}
            >
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=Chistix-Ticket-Mutiara"
                alt="QR Code Ticket"
                className="w-36 h-36 mx-auto object-contain"
                crossOrigin="anonymous"
              />
            </div>
            <p className="text-[11px]" style={{ color: "#94a3b8" }}>
              Tunjukkan QR Code ini di pintu masuk acara
            </p>
          </div>
        </div>

        {/* tombol aksi */}
        <div className="space-y-2 pt-1">
          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isDownloading}
            className="w-full py-3 bg-[#FF8A00] hover:bg-[#E07B00] disabled:bg-amber-300 text-white font-bold text-xs rounded-xl transition-colors cursor-pointer shadow-xs text-center"
          >
            {isDownloading ? "Mengunduh PDF..." : "Download E-Ticket (PDF)"}
          </button>

          <button
            type="button"
            onClick={() => router.push("/")}
            className="w-full py-3 bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold text-xs rounded-xl transition-colors cursor-pointer text-center"
          >
            Kembali ke Beranda
          </button>
        </div>

      </div>
    </div>
  );
}