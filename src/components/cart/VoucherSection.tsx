'use client';

import React, { useState } from 'react';
import { Tag } from 'lucide-react';

export default function VoucherSection() {
  const [voucherCode, setVoucherCode] = useState('');
  const [isApplied, setIsApplied] = useState(false);

  const handleApply = (e: React.FormEvent) => {
    e.preventDefault();
    if (voucherCode.trim()) {
      setIsApplied(true);
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-3">
      <h3 className="text-xs font-bold text-gray-900 flex items-center gap-2">
        <Tag size={14} className="text-amber-500" />
        Voucher Discount
      </h3>

      <form onSubmit={handleApply} className="space-y-2.5">
        <input 
          type="text" 
          placeholder="Enter Your Voucher Here"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          className="w-full bg-gray-50 border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-amber-500 focus:bg-white transition"
        />
        
        <button 
          type="submit"
          className="w-full py-2.5 bg-white border border-amber-500 text-amber-600 font-bold text-xs rounded-xl hover:bg-amber-50 active:bg-amber-100 transition cursor-pointer shadow-2xs"
        >
          {isApplied ? 'Voucher Applied! 🎉' : 'Apply Your Voucher'}
        </button>
      </form>
    </div>
  );
}