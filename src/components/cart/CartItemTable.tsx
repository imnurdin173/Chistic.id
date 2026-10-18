"use client";

import React from "react";

interface CartItemTableProps {
  quantity: number;
  setQuantity: (qty: number) => void;
}

export default function CartItemTable({ quantity, setQuantity }: CartItemTableProps) {
  const basePricePerTicket = 550000;
  const totalPrice = basePricePerTicket * quantity;

  const handleDecrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
  };

  const formatRupiah = (num: number) => {
    return "Rp " + num.toLocaleString("id-ID");
  };

  return (
    <div className="space-y-3">
      <h2 className="text-xs font-bold text-slate-700 uppercase tracking-wide">
        Event Ticket
      </h2>

      <div className="bg-white border border-slate-200 rounded-2xl p-4 shadow-2xs space-y-4">
        {/* Detail Event & Kategori */}
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 bg-emerald-100 rounded-xl flex items-center justify-center shrink-0 border border-emerald-200">
            <span className="text-2xl">🎫</span>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-bold text-slate-800 truncate">
              Resonance Soundfest 2026: Intimate Live Performance
            </h3>
            <p className="text-xs text-slate-500">Soundwave Entertainment</p>
            <div className="mt-1.5 inline-block px-2.5 py-0.5 bg-amber-50 border border-amber-200 rounded-md text-[11px] font-bold text-amber-700">
              Pre Sale VIP
            </div>
          </div>
        </div>

        {/* Tombol Kontrol Kuantitas & Harga */}
        <div className="flex items-center justify-between pt-2 border-t border-slate-100">
          {/* Tombol - dan + */}
          <div className="flex items-center border border-slate-200 rounded-xl bg-slate-50 overflow-hidden shadow-2xs">
            <button
              type="button"
              onClick={handleDecrease}
              disabled={quantity <= 1}
              className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors cursor-pointer"
            >
              -
            </button>
            <span className="px-3 py-1.5 text-xs font-bold text-slate-800 min-w-[32px] text-center bg-white border-x border-slate-200">
              {quantity}
            </span>
            <button
              type="button"
              onClick={handleIncrease}
              className="px-3 py-1.5 text-xs font-bold text-slate-600 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>

          {/* Total Harga per Item & Harga Satuan */}
          <div className="text-right">
            <div className="text-base font-extrabold text-slate-800">
              {formatRupiah(totalPrice)}
            </div>
            <div className="text-[11px] text-slate-400 font-medium">
              @ {formatRupiah(basePricePerTicket)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}