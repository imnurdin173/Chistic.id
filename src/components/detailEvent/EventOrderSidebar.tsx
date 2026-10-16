'use client';

import React, { useState } from 'react';
import { EventItem } from '@/data/events';

interface EventOrderSidebarProps {
  event?: EventItem;
}

export default function EventOrderSidebar({ event }: EventOrderSidebarProps) {
  // 1. Amankan dulu jika event bernilai undefined
  if (!event) {
    return (
      <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-200/60">
        <p className="text-sm text-slate-500">Loading order info...</p>
      </div>
    );
  }

  // 2. State aman digunakan karena event sudah pasti ada
  const [ticketAmount, setTicketAmount] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState(event.presaleTag || 'Regular');

  const totalPrice = event.price * ticketAmount;

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-amber-200/60 space-y-4 sticky top-6">
      {/* Variant Selection */}
      <div>
        <label className="text-xs text-slate-500 font-medium block mb-1">
          Variant
        </label>
        <select
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          className="w-full border border-amber-200 rounded-xl p-2.5 text-sm bg-white text-slate-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          <option value={event.presaleTag || 'Presale'}>
            {event.presaleTag || 'Presale'}
          </option>
          <option value="VIP">VIP</option>
          <option value="Regular">Regular</option>
        </select>
      </div>

      {/* Harga Dinamis */}
      <div className="flex items-center justify-between pt-2 border-t border-amber-100">
        <span className="text-xs text-slate-500 font-medium">Harga</span>
        <span className="text-lg font-extrabold text-amber-600">
          Rp {totalPrice.toLocaleString('id-ID')}
        </span>
      </div>

      {/* Ticket Amount Counter */}
      <div>
        <label className="text-xs text-slate-500 font-medium block mb-1">
          Ticket Amount
        </label>
        <div className="flex items-center border border-amber-200 rounded-xl overflow-hidden bg-white">
          <button
            onClick={() => setTicketAmount(Math.max(1, ticketAmount - 1))}
            className="px-4 py-2.5 bg-amber-50/60 hover:bg-amber-100 text-slate-600 transition-colors font-semibold"
          >
            -
          </button>
          <span className="flex-1 text-center text-sm font-bold text-slate-800">
            {ticketAmount}
          </span>
          <button
            onClick={() => setTicketAmount(ticketAmount + 1)}
            className="px-4 py-2.5 bg-amber-50/60 hover:bg-amber-100 text-slate-600 transition-colors font-semibold"
          >
            +
          </button>
        </div>
      </div>

      {/* Order Button */}
      <button className="w-full bg-amber-500 hover:bg-amber-600 text-white font-bold py-3 rounded-xl shadow-md transition-all">
        Order Ticket
      </button>

      {/* Social Share Icons */}
      <div className="flex justify-center gap-2 pt-3">
        <a href="#" className="w-8 h-8 rounded-full border border-amber-300 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors" aria-label="Twitter">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
        </a>
        <a href="#" className="w-8 h-8 rounded-full border border-amber-300 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors" aria-label="Instagram">
          <svg className="w-3.5 h-3.5 fill-none stroke-current stroke-2" viewBox="0 0 24 24"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
        </a>
        <a href="#" className="w-8 h-8 rounded-full border border-amber-300 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors" aria-label="Facebook">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
        </a>
        <a href="#" className="w-8 h-8 rounded-full border border-amber-300 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors" aria-label="YouTube">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46a2.78 2.78 0 0 0-1.95 1.96A29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58zM9.75 15.02V8.98L15.5 12l-5.75 3.02z"/></svg>
        </a>
        <a href="#" className="w-8 h-8 rounded-full border border-amber-300 flex items-center justify-center text-amber-600 hover:bg-amber-50 transition-colors" aria-label="WhatsApp">
          <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.096 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>
        </a>
      </div>
    </div>
  );
}