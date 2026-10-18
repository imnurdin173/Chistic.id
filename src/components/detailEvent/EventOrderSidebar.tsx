'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function EventOrderSidebar({ event }: { event: any }) {
  const router = useRouter();
  const [ticketAmount, setTicketAmount] = useState<number>(1);
  const [selectedVariant, setSelectedVariant] = useState<string>('Presale');

  const handleOrder = () => {
    // Simpan data quantity dan variant ke sessionStorage agar bisa dibaca di halaman cart/order summary
    if (typeof window !== "undefined") {
      sessionStorage.setItem("chistix_ticket_qty", ticketAmount.toString());
      sessionStorage.setItem("chistix_ticket_variant", selectedVariant);
    }

    // Mengarahkan ke halaman cart (pastikan folder src/app/cart/page.tsx sudah ada)
    router.push(`/cart?eventId=${event.id}&variant=${selectedVariant}&qty=${ticketAmount}`);
  };

  return (
    <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-4">
      {/* Dropdown Variant */}
      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1">Variant</label>
        <select 
          value={selectedVariant}
          onChange={(e) => setSelectedVariant(e.target.value)}
          className="w-full text-xs p-2.5 border border-amber-500 rounded-xl outline-none"
        >
          <option value="Presale">Presale</option>
          <option value="VIP">Pre Sale VIP</option>
          <option value="Regular">Regular</option>
        </select>
      </div>

      {/* Counter Ticket Amount */}
      <div>
        <label className="text-xs font-bold text-gray-700 block mb-1">Ticket Amount</label>
        <div className="flex items-center gap-3 border border-gray-200 w-fit px-3 py-1.5 rounded-full">
          <button 
            type="button" 
            onClick={() => setTicketAmount((prev) => Math.max(1, prev - 1))}
            className="text-gray-400 hover:text-gray-700 font-bold"
          >
            -
          </button>
          <span className="text-xs font-bold w-4 text-center">{ticketAmount}</span>
          <button 
            type="button" 
            onClick={() => setTicketAmount((prev) => prev + 1)}
            className="text-gray-400 hover:text-gray-700 font-bold"
          >
            +
          </button>
        </div>
      </div>

      {/* Tombol Order Ticket */}
      <button
        type="button"
        onClick={handleOrder}
        className="w-full bg-amber-500 hover:bg-amber-600 text-white text-xs font-bold py-3 rounded-xl transition cursor-pointer"
      >
        Order Ticket
      </button>
    </div>
  );
}