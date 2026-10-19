"use client";

import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";

interface EventItem {
  id: number;
  title: string;
  image: string;
  isSoldOut: boolean;
}

export default function EventsTab() {
  const [searchQuery, setSearchQuery] = useState("");

  const events: EventItem[] = [
    {
      id: 1,
      title: "Night Symphony Classic Meets Rock",
      image:
        "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=500&auto=format&fit=crop&q=60",
      isSoldOut: false,
    },
    {
      id: 2,
      title: "Jazz Evening at the Park",
      image:
        "https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=500&auto=format&fit=crop&q=60",
      isSoldOut: false,
    },
    {
      id: 3,
      title: "Electronic Dance Night",
      image:
        "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=500&auto=format&fit=crop&q=60",
      isSoldOut: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-neutral-900">Events</h1>
        <p className="mt-0.5 text-xs text-neutral-500">Find events and order ticket</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search event name, location or organizer"
            className="w-full rounded-xl border border-neutral-200 bg-white pl-9 pr-4 py-2 text-xs text-neutral-800 placeholder-neutral-400 focus:border-amber-500 focus:outline-none"
          />
        </div>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          <span>Category</span>
          <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
        </button>

        <button
          type="button"
          className="flex items-center gap-2 rounded-xl border border-neutral-200 bg-white px-4 py-2 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
        >
          <span>Location</span>
          <ChevronDown className="h-3.5 w-3.5 text-neutral-500" />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col overflow-hidden rounded-2xl border border-neutral-100 bg-white p-2.5 shadow-xs transition-shadow hover:shadow-md"
          >
            <div className="relative h-36 w-full overflow-hidden rounded-xl bg-neutral-100">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between pt-3 pb-1 px-1">
              <h3 className="text-xs font-bold text-neutral-900 line-clamp-1">
                {event.title}
              </h3>

              <button
                type="button"
                disabled={event.isSoldOut}
                className={`mt-3 w-full rounded-xl py-2 text-xs font-bold transition-all ${
                  event.isSoldOut
                    ? "bg-neutral-300 text-white cursor-not-allowed"
                    : "bg-amber-500 text-white hover:bg-amber-600 shadow-xs"
                }`}
              >
                {event.isSoldOut ? "Sold Out" : "Order Ticket"}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}