'use client';

import React, { useState } from 'react';
import SidebarPortal from '@/components/SidebarPortal';
import EventCard from '@/components/EventCard';
import Pagination from '@/components/Pagination';
import { DUMMY_EVENTS, EventItem } from '@/data/events';

export default function BrowseEventPage() {
  const extendedEvents: EventItem[] = [
    ...DUMMY_EVENTS,
    {
      id: '9',
      title: 'Acoustic Sunset Gathering',
      category: 'Concert',
      location: 'South Jakarta, Jakarta',
      city: 'Jakarta',
      price: 50000,
      originalPrice: 75000,
      date: '30 Desember 2026',
      image: '/images/img-event-10-sq.jpg',
      status: 'normal',
    },
  ];

  const [events] = useState<EventItem[]>(extendedEvents);
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [activeFilters, setActiveFilters] = useState({
    category: 'All',
    location: 'All',
    minPrice: '',
    maxPrice: '',
  });

  const handleFilterChange = (filters: typeof activeFilters) => {
    setActiveFilters(filters);
    setCurrentPage(1);
  };

  const handleResetFilter = () => {
    setActiveFilters({
      category: 'All',
      location: 'All',
      minPrice: '',
      maxPrice: '',
    });
    setCurrentPage(1);
  };

  const filteredEvents = events.filter((item) => {
    if (activeFilters.category !== 'All' && item.category !== activeFilters.category) return false;
    if (activeFilters.location !== 'All' && !item.location.includes(activeFilters.location)) return false;
    if (activeFilters.minPrice && item.price < Number(activeFilters.minPrice)) return false;
    if (activeFilters.maxPrice && item.price > Number(activeFilters.maxPrice)) return false;
    return true;
  }).sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    return 0;
  });

  const totalPages = Math.ceil(filteredEvents.length / itemsPerPage) || 1;
  const paginatedEvents = filteredEvents.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="min-h-screen bg-[#FFFDF7] flex flex-col font-sans">
      
      {/* Header Placeholder Slot */}
      <header className="w-full py-3 px-6 bg-white border-b border-gray-100 text-xs text-gray-400">
        {/* [Header Component Slot] */}
      </header>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-8 flex flex-col lg:flex-row gap-6 items-start">
        
        {/* Sidebar Portal */}
        <SidebarPortal onFilterChange={handleFilterChange} onReset={handleResetFilter} />

        {/* Content Area */}
        <div className="flex-1 space-y-6 w-full">
          
          {/* Sorting Bar */}
          <div className="bg-white border border-gray-200 px-4 py-3 rounded-lg flex items-center gap-4 shadow-sm">
            <span className="text-sm font-semibold text-gray-800">Sort</span>
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="appearance-none bg-white border border-gray-200 rounded-md px-3 py-1.5 pr-8 text-sm text-gray-500 focus:outline-none focus:ring-1 focus:ring-amber-500 cursor-pointer"
              >
                <option value="" disabled>Select option</option>
                <option value="latest">Latest Event</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-400">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Wrapper White Container */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm space-y-6">
            
            {/* Search Result Text */}
            <div>
              <h2 className="text-base font-semibold text-gray-800">
                Berikut Hasil Pencarian <span className="text-black font-bold">Night Symphony</span>
              </h2>
            </div>

            {/* Grid Card Event */}
            {paginatedEvents.length === 0 ? (
              <div className="text-center py-12 text-gray-500 text-sm">
                Tidak ada event yang ditemukan sesuai filter.
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {paginatedEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            )}

            {/* Pagination Component */}
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />

          </div>

        </div>
      </main>

      {/* Footer Placeholder Slot */}
      <footer className="w-full py-4 px-6 bg-[#FFFBF0] border-t border-gray-100 text-xs text-gray-400 text-center">
        {/* [Footer Component Slot] */}
      </footer>
    </div>
  );
}