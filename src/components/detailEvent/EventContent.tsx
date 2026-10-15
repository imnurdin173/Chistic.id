'use client';

import { useState } from 'react';

interface EventContentProps {
  description?: string;
  termsAndConditions?: string;
}

export default function EventContent({
  description = 'A grand blend of classical orchestral grandeur and energetic rock hits from the 90s and 2000s, conducted by renowned maestros.',
  termsAndConditions = '1. Tiket yang sudah dibeli tidak dapat dikembalikan atau ditukar.\n2. Wajib menunjukkan kartu identitas resmi yang sesuai dengan data pemesan.\n3. Anak-anak di atas usia 5 tahun wajib memiliki tiket tersendiri.\n4. Dilarang membawa makanan, minuman, dan senjata tajam ke dalam area pertunjukan.',
}: EventContentProps) {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  return (
    <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm flex flex-col gap-5">
      {/* Description Section */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold text-gray-900">Description</h3>
        <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-line">
          {description}
        </p>
      </div>

      {/* Terms & Conditions Section */}
      <div className="flex flex-col gap-2">
        <h3 className="text-base font-bold text-gray-900">Terms & Conditions</h3>
        <div className="relative">
          <p
            className={`text-sm text-gray-600 leading-relaxed whitespace-pre-line transition-all duration-200 ${
              !isExpanded ? 'line-clamp-2' : ''
            }`}
          >
            {termsAndConditions}
          </p>

          {/* Toggle Read More / Show Less */}
          <div className="flex justify-center mt-3">
            <button
              type="button"
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-xs font-semibold text-gray-500 hover:text-amber-600 transition-colors underline underline-offset-2"
            >
              {isExpanded ? 'show less' : 'read more'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}