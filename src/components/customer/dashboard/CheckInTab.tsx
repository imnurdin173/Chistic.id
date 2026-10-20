"use client";

import React, { useState } from "react";
import { Download, QrCode } from "lucide-react";
import { TabType } from "@/app/customer/dashboard/page";

interface CheckInTabProps {
  setActiveTab?: (tab: TabType) => void;
}

export default function CheckInTab({ setActiveTab }: CheckInTabProps) {
  const [filter, setFilter] = useState<"all" | "upcoming" | "attended">("all");

  return (
    <div className="space-y-6">
      {/* Header Section */}
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Check- in</h1>
        <p className="mt-0.5 text-xs text-neutral-500">
          Show your QR at the venue, after the event please leave a review
        </p>
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2">
        {(["all", "upcoming", "attended"] as const).map((item) => (
          <button
            key={item}
            onClick={() => setFilter(item)}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold capitalize transition-all ${
              filter === item
                ? "bg-[#BB4D00]/10 text-[#BB4D00]"
                : "bg-neutral-100 text-neutral-600 hover:bg-neutral-200"
            }`}
          >
            {item === "upcoming" ? "Upcoming" : item}
          </button>
        ))}
      </div>

      {/* Ticket List Container */}
      <div className="space-y-4">
        {/* Ticket Registered / Upcoming */}
        {(filter === "all" || filter === "upcoming") && (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-white p-5 shadow-xs">
            <div className="space-y-2">
              <span className="inline-block rounded-md bg-amber-500 px-2 py-0.5 text-[10px] font-bold text-white">
                Registered
              </span>
              <h3 className="text-sm font-bold text-neutral-900">
                Resonance Soundfest 2026: Intimate Live Performance
              </h3>
              <p className="text-xs text-neutral-500">Istora Senayan Jakarta</p>
              <p className="text-xs font-semibold text-neutral-800">Ticket: VIP 1 of 1</p>
              <p className="text-[11px] text-neutral-400">Code: CHX-AB1F-22</p>

              <div className="flex flex-wrap gap-2 pt-2">
                <button
                  type="button"
                  className="flex items-center gap-1.5 rounded-xl bg-[#BB4D00] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#a34300] transition-colors"
                >
                  <Download className="h-3.5 w-3.5" /> Download PDF
                </button>
                <button
                  type="button"
                  className="rounded-xl border border-neutral-200 bg-white px-3.5 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
                >
                  Event Details
                </button>
              </div>
            </div>

            {/* QR Box */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-100 bg-neutral-50 p-4">
              <QrCode className="h-20 w-20 text-neutral-800" />
              <span className="mt-2 text-[10px] font-medium text-neutral-500">Scan at entrance</span>
            </div>
          </div>
        )}

        {/* Ticket Attended */}
        {(filter === "all" || filter === "attended") && (
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-neutral-100 bg-neutral-50/60 p-5 shadow-xs">
            <div className="space-y-2">
              <span className="inline-block rounded-md bg-emerald-600 px-2 py-0.5 text-[10px] font-bold text-white">
                Attended
              </span>
              <h3 className="text-sm font-bold text-neutral-900">
                Content Creator Talkshow: Turning Passion into Career
              </h3>
              <p className="text-xs text-neutral-500">Checked in 20 Sept 2026, 09:15</p>

              <div className="pt-2">
                <p className="text-xs font-medium text-neutral-700 mb-1.5">How was the event?</p>
                <button
                  type="button"
                  onClick={() => setActiveTab && setActiveTab("reviews")}
                  className="rounded-xl bg-[#BB4D00] px-3.5 py-2 text-xs font-bold text-white shadow-xs hover:bg-[#a34300] transition-colors"
                >
                  Write a Review
                </button>
              </div>
            </div>

            {/* QR Box (Already Used) */}
            <div className="flex flex-col items-center justify-center rounded-xl border border-neutral-200 bg-neutral-100 p-4 opacity-60">
              <QrCode className="h-20 w-20 text-neutral-400" />
              <span className="mt-2 text-[10px] font-medium text-neutral-400">already used</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}