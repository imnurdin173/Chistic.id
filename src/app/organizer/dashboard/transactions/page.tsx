"use client";

import React, { useState } from "react";
import Sidebar from "@/components/SidebarDashboard";
import TransactionFilters from "@/components/dashboard/transactions/TransactionFilters";
import TransactionTable from "@/components/dashboard/transactions/TransactionTable";
import Pagination from "@/components/dashboard/transactions/Pagination";
import { TransactionItem } from "@/types/transaction";

const DUMMY_TRANSACTIONS: TransactionItem[] = [
  {
    id: "TRX-1024",
    customerName: "Budi_Santoso",
    eventName: "Resonance Soundfest 2026: Intimate Live Performance",
    ticketTier: "Presale VIP",
    quantity: 1,
    totalPrice: 300000,
    status: "WAITING_CONFIRM",
    autoCancelCountdown: "Auto cancel in 2d 4h",
  },
  {
    id: "TRX-1025",
    customerName: "Siti_Aminah",
    eventName: "Resonance Soundfest 2026: Intimate Live Performance",
    ticketTier: "Presale VIP",
    quantity: 1,
    totalPrice: 300000,
    status: "WAITING_CONFIRM",
    autoCancelCountdown: "Auto cancel in 2d 23h",
  },
  {
    id: "TRX-1026",
    customerName: "Rani_Putri",
    eventName: "Resonance Soundfest 2026: Intimate Live Performance",
    ticketTier: "Presale VIP",
    quantity: 1,
    totalPrice: 300000,
    status: "DONE",
  },
  {
    id: "TRX-1027",
    customerName: "Dimas_Putra",
    eventName: "Resonance Soundfest 2026: Intimate Live Performance",
    ticketTier: "Presale VIP",
    quantity: 1,
    totalPrice: 300000,
    status: "REJECTED",
  },
  {
    id: "TRX-1028",
    customerName: "Budiono_Siregar",
    eventName: "Resonance Soundfest 2026: Intimate Live Performance",
    ticketTier: "Presale VIP",
    quantity: 1,
    totalPrice: 300000,
    status: "CANCELED",
    autoCancelCountdown: "Auto cancel in 0h 0s",
  },
  {
    id: "TRX-1029",
    customerName: "Eko_Patrio",
    eventName: "Resonance Soundfest 2026: Intimate Live Performance",
    ticketTier: "Presale VIP",
    quantity: 1,
    totalPrice: 300000,
    status: "EXPIRED",
  },
  {
    id: "TRX-1030",
    customerName: "Andi_Wijaya",
    eventName: "Resonance Soundfest 2026: Intimate Live Performance",
    ticketTier: "Reguler",
    quantity: 2,
    totalPrice: 300000,
    status: "DONE",
  },
  {
    id: "TRX-1031",
    customerName: "Dewi_Lestari",
    eventName: "Resonance Soundfest 2026: Intimate Live Performance",
    ticketTier: "Presale VIP",
    quantity: 1,
    totalPrice: 300000,
    status: "WAITING_CONFIRM",
    autoCancelCountdown: "Auto cancel in 1d 12h",
  },
];

export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState<string>("ALL");
  const [selectedEvent, setSelectedEvent] = useState<string>("All Event");
  const [selectedDateRange, setSelectedDataRange] = useState<string>("Last 30 Days");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 6;

  const filteredData = DUMMY_TRANSACTIONS.filter((trx) => {
    if (activeTab === "ALL") return true;
    return trx.status === activeTab;
  });

  const totalItems = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage) || 1;
  const paginatedData = filteredData.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const handleReview = (trx: TransactionItem) => {
    const confirmation = window.confirm(
      `[SIMULASI REVIEW BUKTI BAYAR]\n\n` +
        `No Transaction: #${trx.id}\n` +
        `Customer: ${trx.customerName}\n` +
        `Ticket: ${trx.ticketTier} (${trx.quantity} ticket)\n` +
        `Total: Rp. ${trx.totalPrice.toLocaleString("id-ID")}\n\n` +
        `PILIHAN ORGANIZER: \n` +
        `Click 'OK' for ACCEPT (Change Status to DONE & Create E-Ticket PDF)\n` +
        `Click 'Cancel' for REJECT (Change Status to REJECTED & Return the Quota)`,
    );

    if (confirmation) {
      alert(`Transaction #${trx.id} SUCCESS ACCEPTED! Status has changed to DONE`);
    } else {
      alert(`Transaction #${trx.id} REJECTED! Return the quota ticet`);
    }
  };

  const handleView = (trx: TransactionItem) => {
    alert(
      `Detail Transaction #${trx.id}\nCustomer:
      ${trx.customerName}\nStatus: ${trx.status}\nTier: ${trx.ticketTier}x${trx.quantity}
      `
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-800 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">

        <Sidebar />

        <main className="flex-1 w-full bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-neutral-100">

          <TransactionFilters 
            activeTab={activeTab}
            onTabChange={(tab) => {
              setActiveTab(tab)
              setCurrentPage(1)
            }}
            selectedEvent={selectedEvent}
            onEventChange={setSelectedEvent}
            selectedDateRange={selectedDateRange}
            onDateRangeChange={setSelectedDataRange}
          />

          <TransactionTable 
            transactions={paginatedData}
            onReview={handleReview}
            onView={handleView}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={itemsPerPage}
            onPageChange={(page) => setCurrentPage(page)}
          />
        </main>
      </div>
    </div>
  );
}
