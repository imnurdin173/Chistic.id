'use client';

import React from 'react';
import Image from 'next/image';
import CountdownTimer from '@/components/home/CountdownTimer';
import { EventItem } from '@/data/events';

export interface EventCardProps {
  variant?: 'presale' | 'standard';
  event: EventItem;
}

export default function EventCard({ variant = 'standard', event }: EventCardProps) {
  const priceFormatted = `Rp${event.price.toLocaleString('id-ID')}`;
  const originalPriceFormatted = event.originalPrice ? `Rp${event.originalPrice.toLocaleString('id-ID')}` : undefined;

  const isPresale = variant === 'presale';

  // 1. Presale Variant Card
  if (isPresale) {
    return (
      <div className="relative flex flex-col w-[270px] min-w-[270px] h-[310px] bg-white rounded-xl shadow-md overflow-hidden flex-shrink-0">
        <div className="absolute top-2 left-2 z-10 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded shadow-md">
          Limited Stock
        </div>

        <div className="relative w-full h-[155px] bg-gray-900 flex-shrink-0">
          <Image src={event.image} alt={event.title} fill className="object-cover" />
        </div>

        <div className="p-3 flex flex-col justify-between flex-1 bg-white">
          <div>
            <p className="text-[10px] text-gray-400 font-medium truncate">{event.location}</p>
            <h3 className="text-xs font-bold text-gray-900 line-clamp-1 mt-0.5">{event.title}</h3>
          </div>

          <div className="mt-3 flex items-end justify-between">
            <div>
              <span className="inline-block bg-gradient-to-r from-amber-500 to-red-600 text-white text-[9px] font-bold px-2 py-0.5 rounded shadow-sm mb-1">
                {event.presaleTag || 'Presale'} ⚡
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xs font-bold text-orange-600">{priceFormatted}</span>
                {originalPriceFormatted && (
                  <span className="text-[10px] text-gray-400 line-through">{originalPriceFormatted}</span>
                )}
              </div>
            </div>

            <CountdownTimer targetDate={event.date} />
          </div>
        </div>
      </div>
    );
  }

  // 2. Standard Variant Card - Lebar w-full Fleksibel Mengikuti Grid
  return (
    <div className="relative flex flex-col w-full min-w-0 h-[320px] bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
      {event.status === 'sold-out' && (
        <div className="absolute inset-0 bg-black/50 z-20 flex items-center justify-center">
          <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded shadow">Sold Out</span>
        </div>
      )}

      {/* Gambar Poster */}
      <div className="relative w-full h-[180px] bg-gray-900 flex-shrink-0">
        <Image src={event.image} alt={event.title} fill className="object-cover" />
      </div>

      {/* Konten Text */}
      <div className="p-3 flex flex-col justify-between flex-1 bg-white">
        <div>
          <p className="text-[10px] text-gray-400 font-medium truncate">{event.location}</p>
          <h3 className="text-xs font-bold text-gray-900 line-clamp-2 mt-0.5 leading-tight h-[32px]">
            {event.title}
          </h3>
        </div>

        <div className="mt-auto pt-2 border-t border-gray-50">
          <p className="text-[9px] text-gray-400">Start from</p>
          <div className="flex items-baseline gap-1">
            <span className="text-xs font-bold text-orange-600">{priceFormatted}</span>
            {originalPriceFormatted && (
              <span className="text-[10px] text-gray-400 line-through">{originalPriceFormatted}</span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}