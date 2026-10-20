"use client";

import React, { useState } from "react";
import CustomerSidebar from "@/components/customer/dashboard/CustomerSidebar";
import OverviewTab from "@/components/customer/dashboard/OverviewTab";
import EventsTab from "@/components/customer/dashboard/EventsTab";
import TransactionsTab from "@/components/customer/dashboard/TransactionsTab";
import CheckInTab from "@/components/customer/dashboard/CheckInTab";
import ReviewsTab from "@/components/customer/dashboard/ReviewsTab";
import NavbarNotLoggedIn from "@/components/menubar/navbar";

export type TabType = "overview" | "events" | "transactions" | "checkin" | "reviews";

export default function CustomerDashboardPage() {
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-800 p-4 md:p-8 font-sans">
      <NavbarNotLoggedIn />
      
      {/* Layout utama: Sidebar dan Konten berdampingan */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start mt-6">
        
        {/* Sidebar Navigasi Kiri */}
        <CustomerSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

        {/* Konten Utama Kanan (Dibatasi max-w-3xl agar kotak putihnya tidak terlalu lebar) */}
        <main className="flex-1 w-full max-w-3xl bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-neutral-100">
          {activeTab === "overview" && <OverviewTab setActiveTab={setActiveTab} />}
          {activeTab === "events" && <EventsTab />}
          {activeTab === "transactions" && <TransactionsTab />}
          {activeTab === "checkin" && <CheckInTab setActiveTab={setActiveTab} />}
          {activeTab === "reviews" && <ReviewsTab />}
        </main>
        
      </div>
    </div>
  );
}