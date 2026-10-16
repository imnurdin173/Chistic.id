'use client';

import React from 'react';
import { EventItem } from '@/data/events';

interface EventCardProps {
  event: EventItem;
  isPresaleSection?: boolean;
}

export default function EventCard({ event, isPresaleSection = false }: EventCardProps) {
  return (
    <div className="relative flex w-full flex-col justify-between overflow-hidden rounded-2xl bg-white shadow-sm transition-transform hover:-translate-y-1">
      
      {/* Poster Image Container */}
      <div className={`relative h-44 w-full overflow-hidden bg-slate-900 ${event.status === 'sold-out' ? 'opacity-50' : ''}`}>
        
        {/* Badge Limited Stock (#FD9A00) */}
        {isPresaleSection && (
          <div className="absolute top-2 left-0 z-10 rounded-r-md bg-[#FD9A00] px-2.5 py-1 text-[10px] font-black leading-tight text-white uppercase shadow-sm">
            Limited<br />Stock
          </div>
        )}

        <img
          src={event.image}
          alt={event.title}
          className="h-full w-full object-cover"
        />
      </div>

      {/* Content Body */}
      <div className="flex flex-1 flex-col justify-between p-3.5 bg-white">
        <div>
          <p className="text-[11px] text-gray-400 font-medium">{event.location}</p>
          <h3 className="mt-0.5 line-clamp-2 text-xs font-bold leading-snug text-gray-900 md:text-sm">
            {event.title}
          </h3>
        </div>

        <div className="mt-3">
          {/* TAMPILAN PRESALE */}
          {isPresaleSection ? (
            <div className="space-y-2">
              <div className="flex items-end justify-between">
                {/* Tag Presale dengan gradasi #FD9A00 ke #8D0F0F */}
                <div 
                  className="flex items-center gap-1 rounded-md px-2.5 py-1 text-white shadow-xs"
                  style={{ background: 'linear-gradient(90deg, #FD9A00 0%, #8D0F0F 100%)' }}
                >
                  <span className="text-[11px] font-black tracking-wide">Presale</span>
                  <span className="text-[10px]">⚡</span>
                </div>

                <div className="flex flex-col items-end">
                  <span className="text-[9px] text-gray-400 font-semibold mb-0.5">Ends at</span>
                  <div className="flex items-center gap-1 text-[11px] font-bold text-gray-700">
                    <span className="rounded bg-gray-200/80 px-1.5 py-0.5">60</span>
                    <span>:</span>
                    <span className="rounded bg-gray-200/80 px-1.5 py-0.5">60</span>
                    <span>:</span>
                    <span className="rounded bg-gray-200/80 px-1.5 py-0.5">60</span>
                  </div>
                </div>
              </div>

              {/* Teks Harga Presale (#8D0F0F) */}
              <div className="flex items-baseline gap-1.5 pt-0.5">
                <span className="text-base font-extrabold text-[#8D0F0F]">
                  Rp{event.price.toLocaleString('id-ID')}
                </span>
                {event.originalPrice && (
                  <span className="text-[11px] text-gray-400 line-through">
                    Rp{event.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>

              {/* Progress Bar dengan gradasi #FD9A00 ke #8D0F0F */}
              <div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-gray-200">
                  <div
                    className="h-full rounded-full"
                    style={{ 
                      width: `${event.progressPercent || 80}%`,
                      background: 'linear-gradient(90deg, #FD9A00 0%, #8D0F0F 100%)'
                    }}
                  />
                </div>
                <div className="mt-1 text-right text-[9px] font-extrabold text-[#8D0F0F]">
                  Hampir Habis
                </div>
              </div>
            </div>
          ) : (
            /* TAMPILAN HOT & POPULAR EVENT (CARD POLOS) - Warna Harga Amber/Oranye Terang Sesuai Desain */
            <div className="flex flex-col pt-1">
              <span className="text-[10px] text-gray-400 font-medium">Start from</span>
              <div className="mt-0.5 flex items-baseline gap-1.5">
                <span className="text-base font-extrabold text-[#FD9A00]">
                  Rp{event.price.toLocaleString('id-ID')}
                </span>
                {event.originalPrice && (
                  <span className="text-[11px] text-gray-400 line-through">
                    Rp{event.originalPrice.toLocaleString('id-ID')}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}