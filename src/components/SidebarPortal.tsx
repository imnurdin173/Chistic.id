'use client';

import React, { useState } from 'react';

interface SidebarPortalProps {
  onFilterChange?: (filters: { category: string; location: string; minPrice: string; maxPrice: string }) => void;
  onReset?: () => void;
}

export default function SidebarPortal({ onFilterChange, onReset }: SidebarPortalProps) {
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  const handleSave = () => {
    if (onFilterChange) {
      onFilterChange({ category, location, minPrice, maxPrice });
    }
  };

  const handleResetClick = () => {
    setCategory('');
    setLocation('');
    setMinPrice('');
    setMaxPrice('');
    if (onReset) {
      onReset();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-200/80 p-5 shadow-sm w-full max-w-[280px]">
      
      {/* Category Section */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-800 mb-1.5">
          Category
        </label>
        <div className="relative">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className={`w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 cursor-pointer pr-8 ${
              category === '' ? 'text-gray-400' : 'text-gray-700 font-medium'
            }`}
          >
            <option value="" disabled className="text-gray-400">
              Concert, Seminar, etc
            </option>
            <option value="Concert" className="text-gray-700">Concert</option>
            <option value="Festival" className="text-gray-700">Festival</option>
            <option value="Workshop" className="text-gray-700">Workshop</option>
            <option value="Standup Comedy" className="text-gray-700">Standup Comedy</option>
            <option value="EDM Party" className="text-gray-700">EDM Party</option>
          </select>
          {/* Custom Arrow Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Location Section */}
      <div className="mb-4">
        <label className="block text-xs font-bold text-gray-800 mb-1.5">
          Location
        </label>
        <div className="relative">
          <select
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className={`w-full appearance-none bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500 cursor-pointer pr-8 ${
              location === '' ? 'text-gray-400' : 'text-gray-700 font-medium'
            }`}
          >
            <option value="" disabled className="text-gray-400">
              Province, City
            </option>
            <option value="North Jakarta" className="text-gray-700">North Jakarta</option>
            <option value="Central Jakarta" className="text-gray-700">Central Jakarta</option>
            <option value="South Jakarta" className="text-gray-700">South Jakarta</option>
            <option value="Bandung" className="text-gray-700">Bandung</option>
            <option value="Bali" className="text-gray-700">Bali</option>
            <option value="Surabaya" className="text-gray-700">Surabaya</option>
            <option value="Yogyakarta" className="text-gray-700">Yogyakarta</option>
          </select>
          {/* Custom Arrow Icon */}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="m6 9 6 6 6-6"/>
            </svg>
          </div>
        </div>
      </div>

      {/* Price Range Section */}
      <div className="mb-6">
        <label className="block text-xs font-bold text-gray-800 mb-1.5">
          Price Range
        </label>
        <div className="space-y-2">
          <input
            type="text"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-500"
          />
          <input
            type="text"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs text-gray-700 placeholder-gray-400 focus:outline-none focus:border-amber-500"
          />
        </div>
      </div>

      {/* Action Buttons (Reset & Save) */}
      <div className="flex items-center gap-2.5">
        <button
          onClick={handleResetClick}
          className="w-1/2 py-2 border border-amber-500 text-amber-600 font-bold text-xs rounded-xl hover:bg-amber-50 transition cursor-pointer"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="w-1/2 py-2 bg-amber-500 text-white font-bold text-xs rounded-xl shadow-sm hover:bg-amber-600 transition cursor-pointer"
        >
          Save
        </button>
      </div>

    </div>
  );
}