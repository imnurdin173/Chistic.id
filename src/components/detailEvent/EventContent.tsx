'use client';

import React, { useState } from 'react';
import { EventItem } from '@/data/events';

interface EventContentProps {
  event: EventItem;
}

export default function EventContent({ event }: EventContentProps) {
  const [isTermsExpanded, setIsTermsExpanded] = useState(false);

  const descriptionText = event.description || 'Rasakan pengalaman musik elektronik visual dengan pencahayaan neon futuristik dan DJ Internasional.';
  const fullTerms = '1. Ticket is non-refundable.\n2. Attendees must show valid ID upon entry.\n3. Follow health and safety protocols throughout the event.';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 space-y-4">
      {/* Description (Tanpa Read More karena teksnya langsung tampil penuh) */}
      <div>
        <h3 className="font-bold text-gray-900 mb-2">Description</h3>
        <p className="text-sm text-gray-600 leading-relaxed">
          {descriptionText}
        </p>
      </div>

      <hr className="border-gray-100" />

      {/* Terms & Conditions (Dengan Read More di bagian bawahnya) */}
      <div>
        <h3 className="font-bold text-gray-900 mb-2">Terms & Conditions</h3>
        <p className="text-sm text-gray-600 whitespace-pre-line">
          {isTermsExpanded ? fullTerms : `${fullTerms.substring(0, 70)}...`}
        </p>
        <div className="text-center mt-3">
          <button
            onClick={() => setIsTermsExpanded(!isTermsExpanded)}
            className="text-xs text-amber-600 font-semibold hover:underline focus:outline-none"
          >
            {isTermsExpanded ? 'Show Less' : 'Read More'}
          </button>
        </div>
      </div>
    </div>
  );
}