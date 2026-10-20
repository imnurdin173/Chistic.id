"use client";

import React, { useState } from "react";
import { AlertCircle, Copy, Check } from "lucide-react";
import { TabType } from "@/app/customer/dashboard/page";
import UploadPaymentModal from "./UploadPaymentModal";

interface OverviewTabProps {
  setActiveTab: (tab: TabType) => void;
}

export default function OverviewTab({ setActiveTab }: OverviewTabProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  // Contoh variabel logika untuk review (bisa diganti state/props dari data asli nantinya)
  const pendingReviewsCount = 1; // Ubah jadi 0 jika semua sudah direview

  const handleCopy = () => {
    navigator.clipboard.writeText("CHX-7K2P9");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-neutral-900">Hi User!</h1>
        <p className="text-xs text-neutral-500 mt-1">Here is your ticket rewards and orders</p>
      </div>

      {/* Banner Alert Payment Needed */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-amber-200 bg-amber-50/50 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-amber-100">
            <AlertCircle className="h-4 w-4 text-amber-600" />
          </div>
          <div>
            <p className="text-xs font-bold text-neutral-900">
              Payment Needed for Resonance Soundfest 2026: Live Performance
            </p>
            <p className="text-[11px] text-neutral-500 mt-0.5">
              Presale VIP x1, Rp. 430.000{" "}
              <span className="ml-2 font-bold text-red-500">1: 59: 59</span>
            </p>
          </div>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="rounded-lg bg-amber-500 px-4 py-2 text-xs font-semibold text-white hover:bg-amber-600 transition-colors"
        >
          Upload Proof
        </button>
      </div>

      {/* 4 Stats Cards */}
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
        <div className="rounded-xl bg-[#38383A] p-4 text-white">
          <p className="text-[11px] text-neutral-300">Points Balance</p>
          <p className="mt-1 text-xl font-bold">20.000 P</p>
          <p className="mt-2 text-[10px] text-neutral-400">Expires at 28 Dec 2026</p>
        </div>

        <div className="rounded-xl bg-[#38383A] p-4 text-white">
          <p className="text-[11px] text-neutral-300">Coupons</p>
          <p className="mt-1 text-xl font-bold">1</p>
          <p className="mt-2 text-[10px] text-neutral-400">Valid until 28 Dec 2026</p>
        </div>

        <div className="rounded-xl bg-[#38383A] p-4 text-white">
          <p className="text-[11px] text-neutral-300">Upcoming Tickets</p>
          <p className="mt-1 text-xl font-bold">2</p>
          <p className="mt-2 text-[10px] text-neutral-400">Next ticket 2 Nov 2026</p>
        </div>

        {/* Card ke-4 dengan logika dinamis */}
        <div className="rounded-xl bg-[#38383A] p-4 text-white">
          <p className="text-[11px] text-neutral-300">Events attended</p>
          <p className="mt-1 text-xl font-bold">3</p>
          <p className="mt-2 text-[10px] text-amber-400">
            {pendingReviewsCount > 0
              ? `${pendingReviewsCount} event${pendingReviewsCount > 1 ? "s" : ""} need to review`
              : "All events already reviewed"}
          </p>
        </div>
      </div>

      {/* Recent Transactions & Invite Friends */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3 pt-2">
        <div className="lg:col-span-2">
          <h3 className="mb-3 text-xs font-bold text-neutral-900">Recent Transactions</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-[11px]">
              <thead className="border-b border-neutral-100 text-neutral-400">
                <tr>
                  <th className="pb-2 font-medium text-left">Event</th>
                  <th className="pb-2 font-medium text-center px-3">Qty</th>
                  <th className="pb-2 font-medium text-center px-3">Ticket</th>
                  <th className="pb-2 font-medium text-center px-3">Status</th>
                  <th className="pb-2 font-medium text-right">Price</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-50 text-neutral-600 align-top">
                <tr>
                  <td className="py-3 font-medium text-neutral-800 pr-4">
                    Resonance Soundfest 2026: Intimate Live Performance
                  </td>
                  <td className="py-3 text-center px-3 whitespace-nowrap">x1</td>
                  <td className="py-3 text-center px-3 whitespace-nowrap">VIP</td>
                  <td className="py-3 text-center px-3 font-semibold text-amber-500 whitespace-nowrap">Waiting Payment</td>
                  <td className="py-3 text-right font-semibold text-neutral-900 whitespace-nowrap">Rp. 550.000,00</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-neutral-800 pr-4">
                    Jazz evening at the Park
                  </td>
                  <td className="py-3 text-center px-3 whitespace-nowrap">x2</td>
                  <td className="py-3 text-center px-3 whitespace-nowrap">Regular</td>
                  <td className="py-3 text-center px-3 font-semibold text-emerald-600 whitespace-nowrap">Done</td>
                  <td className="py-3 text-right font-semibold text-neutral-900 whitespace-nowrap">Rp. 300.000,00</td>
                </tr>
                <tr>
                  <td className="py-3 font-medium text-neutral-800 pr-4">
                    Indie Wave Fest: Sunset Beach Session
                  </td>
                  <td className="py-3 text-center px-3 whitespace-nowrap">x1</td>
                  <td className="py-3 text-center px-3 whitespace-nowrap">Presale</td>
                  <td className="py-3 text-center px-3 font-semibold text-red-500 whitespace-nowrap">Canceled</td>
                  <td className="py-3 text-right font-semibold text-neutral-900 whitespace-nowrap">Rp. 550.000,00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Invite Friends */}
        <div className="flex flex-col justify-between rounded-xl border border-neutral-100 bg-neutral-50/50 p-4">
          <div>
            <h3 className="text-xs font-bold text-neutral-900">Invite Friends</h3>
            <p className="mt-1 text-[11px] text-neutral-500 leading-relaxed">
              Invite your friends to join Chistix and you&apos;ll get 10.000 Points
            </p>
          </div>
          <div className="mt-4 flex items-center justify-between rounded-lg border border-sky-200 bg-white p-2.5">
            <span className="text-xs font-bold tracking-wider text-sky-500">CHX-7K2P9</span>
            <button
              onClick={handleCopy}
              className="rounded-md p-1 text-sky-500 hover:bg-sky-50 transition-colors"
            >
              {copied ? <Check className="h-4 w-4 text-emerald-600" /> : <Copy className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </div>

      {/* Special events for you */}
      <div className="pt-2">
        <h3 className="mb-3 text-xs font-bold text-neutral-900">Special events for you</h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="h-24 rounded-xl bg-neutral-200/80" />
          <div className="h-24 rounded-xl bg-neutral-200/80" />
          <div className="h-24 rounded-xl bg-neutral-200/80" />
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => setActiveTab("events")}
            className="text-xs font-bold text-amber-500 hover:underline"
          >
            View All
          </button>
        </div>
      </div>

      <UploadPaymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
}