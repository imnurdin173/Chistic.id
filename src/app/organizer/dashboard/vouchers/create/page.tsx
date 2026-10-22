"use client";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Sidebar from "@/components/sidebar/SidebarDashboard";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import NavbarOrganizer from "@/components/menubar/navbarOrganizer";
import Footer from "@/components/menubar/footer";

export default function CreateVoucherPage() {
  const router = useRouter();

  const [code, setCode] = useState("");
  const [eventName, setEventName] = useState("");
  const [discount, setDiscount] = useState("");
  const [validPeriod, setValidPeriod] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [scheduledAt, setScheduledAt] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newVoucher = {
      code,
      eventName,
      discount,
      validPeriod,
      status,
      scheduledAt
    };
    alert(`Success created "${code}" voucher!`);
    router.push("/organizer/dashboard/vouchers");
  };

  return (
    <div className="min-h-screen bg-[#faf8f4] text-neutral-800 font-sans flex flex-col justify-between">
      <NavbarOrganizer />
      <div className="flex-1 w-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        <Sidebar />

        <div className="flex-1 w-full space-y-4">
          <nav className="flex items-center gap-1.5 text-xs md:text-sm text-neutral-500">
            <Link href="/organizer/dashboard" className="flex items-center gap-1 hover:text-[#bb4d00] transition-colors font-medium">
              <HomeIcon className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </Link>

            <ChevronRightIcon className="w-3.5 h-3.5 text-neutral-300" />

            <Link href="/organizer/dashboard/vouchers" className="hover:text-[#bb4d00] transition-colors font-medium">
              Voucher
            </Link>

            <ChevronRightIcon className="w-3.5 h-3.5 text-neutral-300" />

            <span className="text-neutral-900 font-semibold">Create New Voucher</span>
          </nav>

          <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs p-6 md:p-8">
            <h1 className="text-xl font-bold text-neutral-900 mb-6">Create New Voucher</h1>
            <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">Code</label>
                <input
                  type="text"
                  placeholder="Code Voucher (ex: DISC50)"
                  value={code}
                  onChange={(e) => setCode(e.target.value.toUpperCase())}
                  className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#bb4d00] bg-neutral-50 font-mono"
                  required
                />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">Event</label>
                <select
                  value={eventName}
                  onChange={(e) => setEventName(e.target.value)}
                  className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 cursor-pointer"
                  required
                >
                  <option value="">Choose Event</option>
                  <option value="Resonance Soundfest">Resonance Soundfest</option>
                  <option value="Night Symphony">Night Symphony</option>
                  <option value="Indie Wave Fest">Indie Wave Fest</option>
                </select>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">Discount</label>
                <input
                  type="text"
                  placeholder="Discount Amount (ex: 10% or 50.000)"
                  value={discount}
                  onChange={(e) => setDiscount(e.target.value)}
                  className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                <label className="text-sm font-semibold text-neutral-700">
                    Valid Period
                </label>
                <input
                  type="text"
                  placeholder="ex: 1 - 31 Oct 2026"
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
                </select>
              </div>

              {status === "SCHEDULED" && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center p-3 bg-amber-50/60 border border-amber-200/80 rounded-xl animate-in fade-in duration-200">
                    <label className="text-sm font-semibold text-amber-900">Schedule Release</label>
                    <div className="sm:col-span-2">
                        <input 
                        type="datetime-local"
                        value={scheduledAt}
                        onChange={(e) => setScheduledAt(e.target.value)}
                        className="w-full border border-neutral-200 rounded-xl px-3.5 py-2 text-sm focus:outline-none focus:border-[#bb4d00] bg-white cursor-pointer"
                        />
                        <p className="text-[11px] text-amber-700 mt-1">
                            Voucher will be active at the scheduled time
                        </p>
                    </div>
                </div>
              )}

              <div className="flex justify-end pt-4 gap-4">
                <Link
                href="/organizer/dashboard/vouchers"
                className="px-8 py-2.5 rounded-full text-sm font-semibold text-neutral-600 border border-neutral-200 hover:bg-neutral-100 transition-colors text-center"
                >
                Cancel
                </Link>
                <button
                type="submit"
                className="w-full sm:w-auto px-8 py-2.5 rounded-full text-sm font-semibold text-white bg-[#ea580c] hover:bg-[#bb4d00] transition-colors cursor-pointer shadow-xs"
                >
                    Create
                </button>
                
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
