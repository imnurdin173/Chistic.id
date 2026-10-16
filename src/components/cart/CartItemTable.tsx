'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';

export default function CartItemTable() {
  const [quantity, setQuantity] = useState(1);
  const basePrice = 550000;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-6 shadow-sm space-y-6">
      {/* Header Cart */}
      <h2 className="text-base font-bold text-gray-900 flex items-center gap-2">
        <ShoppingBag size={18} className="text-amber-500" />
        Event Cart
      </h2>

      {/* Tabel Cart Item */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="border-b border-gray-100 text-gray-400 font-medium">
              <th className="pb-3 w-[45%]">Event Ticket</th>
              <th className="pb-3 w-[20%]">Organizer</th>
              <th className="pb-3 w-[15%] text-center">Quantity</th>
              <th className="pb-3 w-[20%] text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="align-middle">
              {/* Event Ticket Info */}
              <td className="py-4 pr-4">
                <div className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-xl bg-gray-100 overflow-hidden flex-shrink-0 border border-gray-100">
                    <Image 
                      src="/images/img-event-1.jpg" 
                      alt="Resonance Soundfest" 
                      fill 
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 line-clamp-1 text-xs">
                      Resonance Soundfest 2026: Intimate Live Performance
                    </h3>
                    <p className="text-[10px] text-gray-400 mt-0.5">Location: Istora, Senayan Jakarta</p>
                    <p className="text-[10px] font-semibold text-amber-600 mt-0.5">Variants: Pre Sale VIP</p>
                  </div>
                </div>
              </td>

              {/* Organizer */}
              <td className="py-4 text-amber-600 font-medium text-xs">
                Soundwave Entertainment
              </td>

              {/* Quantity Counter */}
              <td className="py-4 text-center">
                <div className="inline-flex items-center bg-[#EFEFF3] border border-gray-200/85 rounded-lg overflow-hidden text-xs shadow-2xs">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-7 py-1 bg-[#EFEFF3] text-gray-700 hover:bg-gray-200 transition cursor-pointer flex items-center justify-center font-bold"
                  >
                    <Minus size={10} />
                  </button>
                  
                  <span className="w-8 py-1 text-xs font-semibold text-gray-800 bg-white text-center border-x border-gray-200/70">
                    {quantity}
                  </span>
                  
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-7 py-1 bg-[#EFEFF3] text-gray-700 hover:bg-gray-200 transition cursor-pointer flex items-center justify-center font-bold"
                  >
                    <Plus size={10} />
                  </button>
                </div>
                <p className="text-[9px] text-gray-400 mt-1">Slot 30</p>
              </td>

              {/* Price & Trash Icon */}
              <td className="py-4 text-right">
                <div className="flex items-center justify-end gap-2.5">
                  <span className="font-bold text-gray-900 text-xs">
                    IDR. {(basePrice * quantity).toLocaleString('id-ID')},00
                  </span>
                  <button 
                    className="text-red-500 hover:text-red-700 transition cursor-pointer p-1" 
                    title="Remove Item"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Rincian Total Amount di kanan bawah kotak */}
      <div className="pt-4 border-t border-gray-100 flex justify-end">
        <div className="text-right space-y-0.5">
          <span className="text-[11px] text-gray-400 block font-medium">Total Amount</span>
          <div className="flex items-center justify-end gap-2">
            <span className="text-xs text-gray-400 line-through">Rp400.000</span>
            <span className="text-sm font-bold text-gray-900">Rp89.000</span>
          </div>
          <span className="text-[10px] text-gray-400 block">Tax fee (11%) Rp9.790</span>
        </div>
      </div>
    </div>
  );
}