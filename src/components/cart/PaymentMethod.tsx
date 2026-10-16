'use client';

import React from 'react';
import { CreditCard } from 'lucide-react';
import Link from 'next/link';

export default function PaymentMethod() {
  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-4">
      <h3 className="text-xs font-bold text-gray-900 flex items-center gap-2">
        <CreditCard size={14} className="text-amber-500" />
        Payment Method
      </h3>
      
      {/* Pilihan Metode Pembayaran */}
      <div className="grid grid-cols-4 gap-2 py-1">
        <div className="border border-gray-200 rounded-lg p-2.5 flex items-center justify-center bg-gray-50 hover:border-amber-400 cursor-pointer transition">
          <span className="text-[10px] font-bold text-blue-600">DANA</span>
        </div>
        <div className="border border-gray-200 rounded-lg p-2.5 flex items-center justify-center bg-gray-50 hover:border-amber-400 cursor-pointer transition">
          <span className="text-[10px] font-bold text-red-600">QRIS</span>
        </div>
        <div className="border border-gray-200 rounded-lg p-2.5 flex items-center justify-center bg-gray-50 hover:border-amber-400 cursor-pointer transition">
          <span className="text-[10px] font-bold text-orange-600">Shopee</span>
        </div>
        <div className="border border-gray-200 rounded-lg p-2.5 flex items-center justify-center bg-gray-50 hover:border-amber-400 cursor-pointer transition">
          <span className="text-[10px] font-bold text-sky-600">midtrans</span>
        </div>
      </div>

      {/* Tombol Check Out */}
      <div className="pt-1">
        <button className="w-full py-3 bg-[#FFA000] text-white font-bold text-xs rounded-full shadow-md hover:bg-amber-600 transition cursor-pointer">
          Check Out
        </button>
      </div>
    </div>
  );
}