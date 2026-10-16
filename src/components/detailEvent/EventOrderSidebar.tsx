'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus } from 'lucide-react';
import { EventItem } from '@/data/events';

interface EventOrderSidebarProps {
  event: EventItem;
}

export default function EventOrderSidebar({ event }: EventOrderSidebarProps) {
  const [selectedVariant, setSelectedVariant] = useState('Presale');
  const [ticketAmount, setTicketAmount] = useState(1);

  // Fungsi interaktif untuk mengurangi dan menambah jumlah tiket
  const handleDecrease = () => {
    setTicketAmount((prev) => (prev > 1 ? prev - 1 : 1));
  };

  const handleIncrease = () => {
    setTicketAmount((prev) => prev + 1);
  };

  return (
    <div className="bg-[#F8F9FA] p-5 rounded-2xl border border-gray-200/80 shadow-sm space-y-4 w-full">
      {/* 1. Variant Dropdown */}
      <div className="space-y-1">
        <label className="block text-xs font-bold text-gray-700">Variant</label>
        <div className="relative">
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="w-full appearance-none bg-white border border-amber-500 rounded-xl px-3.5 py-2 text-xs font-medium text-gray-700 focus:outline-none cursor-pointer pr-8"
          >
            <option value="Presale">Presale</option>
            <option value="VIP">VIP</option>
            <option value="Regular">Regular</option>
          </select>
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-600">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* 2. Ticket Amount Counter (Tombol - dan + Aktif) */}
      <div className="space-y-1">
        <label className="block text-xs font-bold text-gray-700">Ticket Amount</label>
        <div className="flex items-center gap-3 bg-white border border-gray-200 rounded-xl px-3 py-1.5 w-fit">
          <button
            type="button"
            onClick={handleDecrease}
            className="text-gray-500 hover:text-gray-900 p-1 cursor-pointer transition"
            aria-label="Decrease quantity"
          >
            <Minus size={14} />
          </button>
          
          <span className="text-xs font-bold text-gray-800 min-w-[16px] text-center">
            {ticketAmount}
          </span>

          <button
            type="button"
            onClick={handleIncrease}
            className="text-gray-500 hover:text-gray-900 p-1 cursor-pointer transition"
            aria-label="Increase quantity"
          >
            <Plus size={14} />
          </button>
        </div>
      </div>

      {/* 3. Button Order Ticket */}
      <Link href={`/cart?eventId=${event.id}&variant=${selectedVariant}&qty=${ticketAmount}`} className="block">
        <button
          type="button"
          className="w-full bg-[#FF8A00] hover:bg-[#E07B00] text-white font-extrabold text-xs py-3 rounded-xl shadow-md transition cursor-pointer text-center"
        >
          Order Ticket
        </button>
      </Link>

      {/* 4. Tiga Ikon Media Sosial */}
      <div className="flex items-center justify-center gap-4 pt-2 text-amber-500">
        <a
          href="https://x.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-600 transition"
          aria-label="Share on X"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>

        <a
          href="https://instagram.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-600 transition"
          aria-label="Share on Instagram"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
          </svg>
        </a>

        <a
          href="https://facebook.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-amber-600 transition"
          aria-label="Share on Facebook"
        >
          <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
      </div>
    </div>
  );
}