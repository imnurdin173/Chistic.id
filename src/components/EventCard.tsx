'use client';

import React from 'react';
import { EventItem } from '@/data/events';

interface EventCardProps {
  event: EventItem;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <div className="relative bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden flex flex-col justify-between transition-transform hover:-translate-y-1 w-full">
      {event.status === 'almost-sold' && (
        <div className="absolute top-3 left-0 z-10 bg-amber-600 text-white text-xs font-bold px-3 py-1.5 rounded-r shadow-md uppercase tracking-wider">
          Almost Sold Out!
        </div>
      )}
      {event.status === 'sold-out' && (
        <div className="absolute top-3 left-0 z-10 bg-red-800 text-white text-xs font-bold px-3 py-1.5 rounded-r shadow-md uppercase tracking-wider">
          Sold Out
        </div>
      )}

      {/* Poster Image Area */}
      <div className={`relative h-44 bg-slate-900 ${event.status === 'sold-out' ? 'opacity-60' : ''}`} />

      {/* Card Body */}
      <div className={`p-4 flex flex-col justify-between flex-1 ${event.status === 'sold-out' ? 'bg-gray-100' : 'bg-white'}`}>
        <div>
          <p className="text-xs text-gray-500">{event.location}</p>
          <h4 className="font-bold text-gray-900 text-sm mt-1 line-clamp-2 leading-snug">
            {event.title}
          </h4>
        </div>

        {/* Price Section */}
        <div className="mt-3 flex flex-col">
          {event.status === 'sold-out' ? (
            <span className="text-red-800 font-bold text-sm mt-2">Sold Out</span>
          ) : (
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-gray-400">Start from</span>
                {event.almostSoldText && (
                  <span className="text-[10px] text-amber-700 italic font-medium">
                    {event.almostSoldText}
                  </span>
                )}
              </div>
              
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-amber-600 font-bold text-base">
                  Rp{event.price.toLocaleString('id-ID')}
                </span>
                {event.originalPrice && (
                  <span className="text-xs text-gray-400 line-through">
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