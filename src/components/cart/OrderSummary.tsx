'use client';

import React from 'react';
import { FileText } from 'lucide-react';

export default function OrderSummary() {
  const basePrice = 550000;
  const couponDiscount = 0;
  const voucherDiscount = 0;
  const totalPrice = basePrice;

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm space-y-3">
      <h3 className="text-xs font-bold text-gray-900 flex items-center gap-2">
        <FileText size={14} className="text-amber-500" />
        Order Summary
      </h3>

      <div className="space-y-2 text-xs text-gray-600 divide-y divide-gray-50">
        <div className="flex justify-between pt-1">
          <span>Event</span>
          <span className="font-semibold text-gray-900 truncate max-w-[150px]">Resonance Soundfest</span>
        </div>
        
        <div className="flex justify-between pt-2">
          <span>Price</span>
          <span className="font-semibold text-gray-900">Rp. {basePrice.toLocaleString('id-ID')}</span>
        </div>
        
        <div className="flex justify-between pt-2">
          <span>Coupon</span>
          <span className="font-semibold text-emerald-600">-Rp. {couponDiscount.toLocaleString('id-ID')}</span>
        </div>
        
        <div className="flex justify-between pt-2">
          <span>Voucher</span>
          <span className="font-semibold text-emerald-600">-Rp. {voucherDiscount.toLocaleString('id-ID')}</span>
        </div>
        
        <div className="flex justify-between pt-2 font-bold text-gray-900 text-xs">
          <span>Total Price</span>
          <span className="text-amber-600">Rp. {totalPrice.toLocaleString('id-ID')}</span>
        </div>
      </div>
    </div>
  );
}