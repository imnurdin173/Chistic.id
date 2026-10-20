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
  
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isLocationOpen, setIsLocationOpen] = useState(false);
  
  const [selectedCategory, setSelectedCategory] = useState("Category");
  const [selectedLocation, setSelectedLocation] = useState("Location");

  // Kategori: Concert ditambahkan, Sports & Art & Exhibition dihapus
  const categories = [
    "All Categories",
    "Concert",
    "Workshop",
    "Stand Up Comedy",
    "Festival",
  ];
  
  const locations = ["All Locations", "Jakarta", "Bandung", "Surabaya", "Yogyakarta"];

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

      {/* Filter & Search Bar */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-neutral-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search event name, location or organizer"
            className="w-full rounded-2xl border border-neutral-200 bg-white pl-9 pr-4 py-2.5 text-xs text-neutral-800 placeholder-neutral-400 focus:border-amber-500 focus:outline-none"
          />
        </div>

        {/* Dropdown Category */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsCategoryOpen(!isCategoryOpen);
              setIsLocationOpen(false);
            }}
            className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <span>{selectedCategory}</span>
            <ChevronDown className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${isCategoryOpen ? "rotate-180" : ""}`} />
          </button>

          {isCategoryOpen && (
            <div className="absolute left-0 mt-2 w-48 rounded-2xl border border-neutral-100 bg-white py-2 shadow-lg z-20">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    setSelectedCategory(cat);
                    setIsCategoryOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-neutral-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Dropdown Location */}
        <div className="relative">
          <button
            type="button"
            onClick={() => {
              setIsLocationOpen(!isLocationOpen);
              setIsCategoryOpen(false);
            }}
            className="flex items-center justify-between gap-4 rounded-2xl border border-neutral-200 bg-white px-4 py-2.5 text-xs font-medium text-neutral-700 hover:bg-neutral-50 transition-colors"
          >
            <span>{selectedLocation}</span>
            <ChevronDown className={`h-3.5 w-3.5 text-neutral-400 transition-transform ${isLocationOpen ? "rotate-180" : ""}`} />
          </button>

          {isLocationOpen && (
            <div className="absolute left-0 mt-2 w-48 rounded-2xl border border-neutral-100 bg-white py-2 shadow-lg z-20">
              {locations.map((loc) => (
                <button
                  key={loc}
                  onClick={() => {
                    setSelectedLocation(loc);
                    setIsLocationOpen(false);
                  }}
                  className="w-full px-4 py-2 text-left text-xs text-neutral-700 hover:bg-amber-50 hover:text-amber-600 transition-colors"
                >
                  {loc}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Event Cards Grid */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="flex flex-col overflow-hidden rounded-3xl border border-neutral-100 bg-white p-3 shadow-xs transition-all hover:shadow-md"
          >
            <div className="relative h-44 w-full overflow-hidden rounded-2xl bg-neutral-100">
              <img
                src={event.image}
                alt={event.title}
                className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between pt-3 pb-1 px-1">
              <h3 className="text-xs font-bold text-neutral-900 line-clamp-1 mb-3">
                {event.title}
              </h3>

              <button
                type="button"
                disabled={event.isSoldOut}
                className={`w-full rounded-2xl py-2.5 text-xs font-bold transition-all ${
                  event.isSoldOut
                    ? "bg-neutral-200 text-neutral-500 cursor-not-allowed"
                    : "bg-amber-400 text-white hover:bg-amber-500 shadow-xs"
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