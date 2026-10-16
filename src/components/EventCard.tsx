'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { EventItem } from '@/data/events';

interface EventCardProps {
  variant?: 'presale' | 'standard';
  event: EventItem;
}

// Helper format angka ke Rupiah
const formatRupiah = (val?: number) => {
  if (val === undefined || val === null) return 'Rp0';
  return `Rp${val.toLocaleString('id-ID')}`;
};

export default function EventCard({ variant = 'standard', event }: EventCardProps) {
  const isPresale = variant === 'presale';

  // State untuk Live Countdown Timer
  const [timeLeft, setTimeLeft] = useState({
    hours: '00',
    minutes: '00',
    seconds: '00',
  });

  useEffect(() => {
    if (!isPresale || !event.date) return;

    const targetTime = new Date(event.date).getTime();

    const updateCountdown = () => {
      const now = new Date().getTime();
      const difference = targetTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: '00', minutes: '00', seconds: '00' });
        return;
      }

      const totalSeconds = Math.floor(difference / 1000);
      const h = Math.floor((totalSeconds % (3600 * 24)) / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;

      setTimeLeft({
        hours: String(h).padStart(2, '0'),
        minutes: String(m).padStart(2, '0'),
        seconds: String(s).padStart(2, '0'),
      });
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer);
  }, [isPresale, event.date]);

  // =======================================================
  // 1. VARIANT PRESALE CARD (Dimensi Figma: 331px x 325px)
  // =======================================================
  if (isPresale) {
    return (
      <div className="w-[331px] h-[325px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between relative group">
        
        {/* Container Poster & Badge Limited Stock */}
        <div className="relative w-full h-[175px] bg-gray-900 overflow-hidden m-0 p-0">
          <Image
            src={event.landscapeImage || event.image}
            alt={event.title}
            fill
            className="object-cover"
          />
          
          {/* Badge Limited Stock menempel rapat di border kiri atas poster */}
          <div className="absolute top-0 left-0 bg-gradient-to-r from-[#FF8A00] to-[#E05300] text-white text-[10px] font-bold px-3 py-1.5 rounded-br-2xl shadow-md leading-tight text-center z-30">
            Limited<br />Stock
          </div>
        </div>

        {/* Detail Konten Presale */}
        <div className="p-3.5 flex flex-col justify-between flex-1">
          <div>
            <p className="text-[10px] text-gray-400 font-medium truncate">
              {event.location}
            </p>
            <h3 className="text-xs font-bold text-gray-900 line-clamp-1 leading-snug">
              {event.title}
            </h3>
          </div>

          {/* Baris Badge Presale & Live Countdown Timer */}
          <div className="flex items-end justify-between mt-1">
            {/* Tag / Badge Presale */}
            <div className="bg-gradient-to-r from-[#FF8A00] to-[#D95300] text-white text-[11px] font-extrabold px-3 py-1 rounded-md flex items-center gap-1 shadow-sm">
              <span>{event.presaleTag || 'Presale'}</span>
              <span className="text-[10px]">⚡</span>
            </div>

            {/* Live Countdown Timer */}
            <div className="flex flex-col items-end">
              <span className="text-[9px] text-gray-400 font-medium mb-0.5">Ends at</span>
              <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                <span className="bg-gray-200/90 px-1.5 py-0.5 rounded text-gray-800 min-w-[22px] text-center">
                  {timeLeft.hours}
                </span>
                <span className="text-gray-400">:</span>
                <span className="bg-gray-200/90 px-1.5 py-0.5 rounded text-gray-800 min-w-[22px] text-center">
                  {timeLeft.minutes}
                </span>
                <span className="text-gray-400">:</span>
                <span className="bg-gray-200/90 px-1.5 py-0.5 rounded text-gray-800 min-w-[22px] text-center">
                  {timeLeft.seconds}
                </span>
              </div>
            </div>
          </div>

          {/* Harga Utama & Harga Coret */}
          <div className="flex items-baseline gap-1.5 mt-1">
            <span className="text-sm font-extrabold text-[#D95300]">
              {formatRupiah(event.price)}
            </span>
            {event.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                {formatRupiah(event.originalPrice)}
              </span>
            )}
          </div>

          {/* Progress Bar Stok */}
          <div className="w-full mt-1">
            <div className="w-full bg-gray-200/80 rounded-full h-1.5 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#FF8A00] via-[#D95300] to-[#A82B00] h-1.5 rounded-full"
                style={{ width: '85%' }}
              />
            </div>
            <div className="text-right mt-0.5">
              <span className="text-[9px] font-bold text-[#A82B00]">
                Hampir Habis
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =======================================================
  // 2. VARIANT STANDARD / HOT / POPULAR CARD (242px x 341px)
  // =======================================================
  return (
    <div className="w-[242px] h-[341px] bg-white rounded-2xl shadow-md overflow-hidden flex flex-col justify-between relative group">
      {/* Gambar Poster Event */}
      <div className="relative w-full h-[220px] bg-gray-900 overflow-hidden">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover"
        />
        {event.status === 'sold-out' && (
          <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-10">
            <span className="bg-red-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Detail Konten Event Standard */}
      <div className="p-3.5 flex flex-col justify-between flex-1">
        <div>
          <p className="text-[10px] text-gray-400 font-medium truncate">
            {event.location}
          </p>
          <h3 className="text-xs font-bold text-gray-900 line-clamp-2 leading-snug">
            {event.title}
          </h3>
        </div>

        {/* Bagian Harga */}
        <div className="mt-2 pt-1">
          <span className="text-[10px] text-gray-400 block font-medium">Start from</span>
          <div className="flex items-baseline gap-1.5">
            <span className="text-sm font-extrabold text-[#D95300]">
              {formatRupiah(event.price)}
            </span>
            {event.originalPrice && (
              <span className="text-[11px] text-gray-400 line-through">
                {formatRupiah(event.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}