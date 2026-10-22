"use client";

import Link from "next/link";
import React, { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/SidebarDashboard";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import NavbarOrganizer from "@/components/menubar/navbarOrganizer";
import Footer from "@/components/menubar/footer";

const DUMMY_DB = [
  {
    id: "VCH-001",
    code: "CHEESY10",
    eventName: "Resonance Soundfest",
    discount: "10%",
    validPeriod: "1 - 31 Oct 2026",
    status: "ACTIVE",
    scheduledAt: "",
  },
  {
    id: "VCH-002",
    code: "EARLYBIRD",
    eventName: "Night Symphony",
    discount: "50.000",
    validPeriod: "15 Nov - 1 Dec 2026",
    status: "SCHEDULED",
    scheduledAt: "2026-11-15T00:00",
  },
  {
    id: "VCH-003",
    code: "OREOxINDIE",
    eventName: "Indie Wave Fest",
    discount: "20%",
    validPeriod: "1 - 30 Aug 2026",
    status: "EXPIRED",
    scheduledAt: "",
  },
];

export default function EditVoucherPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const resolvedParams = use(params);
  const voucherId = resolvedParams.id;

  const [code, setCode] = useState("");
  const [eventName, setEventName] = useState("");
  const [discount, setDiscount] = useState("");
  const [validPeriod, setValidPeriod] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [scheduledAt, setScheduledAt] = useState("");

  useEffect(() => {
    const found = DUMMY_DB.find((v) => v.id === voucherId);
    if (found) {
      setCode(found.code);
      setEventName(found.eventName);
      setDiscount(found.discount);
      setValidPeriod(found.validPeriod);
      setStatus(found.status);
      setScheduledAt(found.scheduledAt || "");
    }
  }, [voucherId]);

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();

    const updatedData = {
      id: voucherId,
      code,
      eventName,
      discount,
      validPeriod,
      status,
      scheduledAt: status === "SCHEDULED" ? scheduledAt : null,
    };

    alert(`Voucher "${code}" berhasil diperbarui!`);
    router.push("/organizer/dashboard/vouchers");
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] text-neutral-800 font-sans flex flex-col justify-between">
      <NavbarOrganizer />
      <div className="flex-1 w-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        <Sidebar />

        <div className="flex-1 w-full space-y-4">
          {/* Breadcrumb Nav */}
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-neutral-500">
            <Link
              href="/organizer/dashboard"
              className="flex items-center gap-1 hover:text-[#bb4d00] transition-colors font-medium"
            >
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <ChevronRightIcon className="w-3.5 h-3.5 text-neutral-300" />

            <Link
              href="/organizer/dashboard/vouchers"
              className="hover:text-[#bb4d00] transition-colors font-medium"
            >
              Voucher
            </Link>

            <ChevronRightIcon className="w-3.5 h-3.5 text-neutral-300" />

            <span className="text-neutral-900 font-semibold">Edit Voucher</span>
          </nav>

          {/* Form Card */}
          <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs p-6 md:p-8">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-xl font-bold text-neutral-900">Edit Voucher</h1>
              <span className="text-xs font-mono text-neutral-400 bg-neutral-100 px-2.5 py-1 rounded-md">
                ID: {voucherId}
              </span>
            </div>

            <form onSubmit={handleUpdate} className="space-y-4 max-w-xl">
              {/* Code */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#bb4d00] bg-neutral-50 font-mono"
                  required
                />
              </div>

              {/* Event */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">Event</label>
                <select
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 cursor-pointer"
                  required
                >
                  <option value="Resonance Soundfest">Resonance Soundfest</option>
                  <option value="Night Symphony">Night Symphony</option>
                  <option value="Indie Wave Fest">Indie Wave Fest</option>
                </select>
              </div>

              {/* Discount */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">Discount</label>
                <input
                  type="text"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                  required
                />
              </div>

              {/* Valid Period */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">Valid Period</label>
                <input
                  type="text"
                  value={validPeriod}
                  onChange={(e) => setValidPeriod(e.target.value)}
                  className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 cursor-pointer"
                >
                  <option value="ACTIVE">Active</option>
                  <option value="SCHEDULED">Scheduled</option>
                  <option value="EXPIRED">Expired</option>
                </select>
              </div>

              {status === "SCHEDULED" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl animate-in fade-in duration-200">
                  <label className="text-sm font-semibold text-amber-900">
                    Schedule Release
                  </label>
                  <div className="sm:col-span-2">
                    <input
                      type="datetime-local"
                      value={scheduledAt}
                      onChange={(e) => setScheduledAt(e.target.value)}
                      className="w-full border border-neutral-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-white cursor-pointer"
                      required
                    />
                  </div>
                </div>
              )}


              <div className="pt-4 flex items-center gap-3">
                <button
                  type="submit"
                  className="px-8 py-2.5 rounded-full text-sm font-semibold text-white bg-[#ea580c] hover:bg-[#bb4d00] transition-colors cursor-pointer shadow-xs"
                >
                  Update
                </button>
                <Link
                  href="/organizer/dashboard/vouchers"
                  className="px-8 py-2.5 rounded-full text-sm font-semibold text-neutral-600 border border-neutral-200 hover:bg-neutral-100 transition-colors text-center"
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
      </div>
      <Footer />
    </div>
  );
}