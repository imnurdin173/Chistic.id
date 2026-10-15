'use client';

import { useState } from 'react';
import { Plus, Minus, Share2 } from 'lucide-react';

interface TicketVariant {
  id: string;
  name: string;
  price: number;
}

interface EventOrderSidebarProps {
  eventId: string;
  variants?: TicketVariant[];
}

const defaultVariants: TicketVariant[] = [
  { id: '1', name: 'Presale, VIP, Regular', price: 150000 },
  { id: '2', name: 'Presale', price: 150000 },
  { id: '3', name: 'VIP', price: 350000 },
  { id: '4', name: 'Regular', price: 200000 },
];

export default function EventOrderSidebar({
  eventId,
  variants = defaultVariants,
}: EventOrderSidebarProps) {
  const [selectedVariant, setSelectedVariant] = useState<string>(
    variants[0]?.id || ''
  );
  const [amount, setAmount] = useState<number>(1);

  const handleIncrement = () => setAmount((prev) => prev + 1);
  const handleDecrement = () => setAmount((prev) => (prev > 1 ? prev - 1 : 1));

  const handleOrder = () => {
    alert(`Order triggered for Event ID: ${eventId}, Variant: ${selectedVariant}, Amount: ${amount}`);
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Container Box Tiket */}
      <div className="bg-[#f8f9fa] border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-4">
        {/* Dropdown Select Variant */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">
            Variant
          </label>
          <select
            value={selectedVariant}
            onChange={(e) => setSelectedVariant(e.target.value)}
            className="w-full bg-white border border-gray-300 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500 cursor-pointer"
          >
            {variants.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>
        </div>

        {/* Ticket Amount Stepper */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-gray-600">
            Ticket Amount
          </label>
          <div className="flex items-center justify-between border border-gray-300 rounded-lg bg-white p-1">
            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100 disabled:opacity-40 disabled:hover:bg-transparent"
              onClick={handleDecrement}
              disabled={amount <= 1}
            >
              <Minus className="h-4 w-4" />
            </button>

            <span className="text-sm font-semibold text-gray-800 px-4">
              {amount}
            </span>

            <button
              type="button"
              className="h-8 w-8 flex items-center justify-center rounded text-gray-600 hover:bg-gray-100"
              onClick={handleIncrement}
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Order Ticket Button */}
        <button
          type="button"
          onClick={handleOrder}
          className="w-full bg-[#f39c12] hover:bg-[#e08e0b] text-white font-bold py-3 px-4 rounded-lg shadow transition-colors mt-1"
        >
          Order Ticket
        </button>
      </div>

      {/* Social Share Section */}
      <div className="flex items-center gap-2 text-amber-500 px-1 pt-1">
        <Share2 className="w-4 h-4" />
        <span className="text-xs font-medium text-gray-500">Share this event</span>
      </div>
    </div>
  );
}