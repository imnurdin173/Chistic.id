'use client';

import React, { useState } from 'react';
import { CATEGORIES, LOCATIONS } from '@/data/events';

interface SidebarPortalProps {
  onFilterChange: (filters: { category: string; location: string; minPrice: string; maxPrice: string }) => void;
  onReset: () => void;
}

export default function SidebarPortal({ onFilterChange, onReset }: SidebarPortalProps) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedLocation, setSelectedLocation] = useState('All');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Fungsi untuk hanya memperbolehkan angka murni (menghapus titik, koma, minus, dll)
  const handlePriceChange = (value: string, setter: (val: string) => void) => {
    const cleanValue = value.replace(/\D/g, ''); // Hapus semua karakter selain 0-9
    setter(cleanValue);
  };

  const handleSave = () => {
    onFilterChange({
      category: selectedCategory,
      location: selectedLocation,
      minPrice,
      maxPrice,
    });
  };

  const handleResetFilter = () => {
    setSelectedCategory('All');
    setSelectedLocation('All');
    setMinPrice('');
    setMaxPrice('');
    onReset();
  };

  return (
    <aside className="w-full lg:w-64 h-fit bg-white border border-gray-200 rounded-lg p-5 shadow-sm space-y-5">
      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {CATEGORIES.map((cat) => (
            <option key={cat} value={cat}>
              {cat === 'All' ? 'Concert, Seminar, etc' : cat}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Location</label>
        <select
          value={selectedLocation}
          onChange={(e) => setSelectedLocation(e.target.value)}
          className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
        >
          {LOCATIONS.map((loc) => (
            <option key={loc} value={loc}>
              {loc === 'All' ? 'Province, City' : loc}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-800 mb-2">Price Range</label>
        <div className="space-y-2">
          <input
            type="text"
            inputMode="numeric"
            placeholder="Minimum Price"
            value={minPrice}
            onChange={(e) => handlePriceChange(e.target.value, setMinPrice)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
          <input
            type="text"
            inputMode="numeric"
            placeholder="Maximum Price"
            value={maxPrice}
            onChange={(e) => handlePriceChange(e.target.value, setMaxPrice)}
            className="w-full border border-gray-300 rounded-md p-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 pt-1">
        <button
          onClick={handleResetFilter}
          className="w-1/2 border border-amber-500 text-black hover:bg-amber-50 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Reset
        </button>
        <button
          onClick={handleSave}
          className="w-1/2 bg-amber-500 hover:bg-amber-600 text-black py-2 rounded-md text-sm font-medium transition-colors"
        >
          Save
        </button>
      </div>
    </aside>
  );
}