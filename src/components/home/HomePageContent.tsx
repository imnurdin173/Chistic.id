'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';

import Navbar from '@/components/menubar/navbar';
import Footer from '@/components/menubar/footer';

import EventCard from '@/components/EventCard';

import { events } from '@/data/events';

export default function HomePage() {
  // Referensi untuk tombol scroll horizontal
  const presaleRef = useRef<HTMLDivElement>(null);
  const hotRef = useRef<HTMLDivElement>(null);
  const popularRef = useRef<HTMLDivElement>(null);

  const handleScroll = (ref: React.RefObject<HTMLDivElement | null>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollAmount = clientWidth * 0.75;
      ref.current.scrollTo({
        left: direction === 'left' ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  // Filter data berdasarkan kategori dari events.ts (sesuaikan key kategori di data kalian jika berbeda)
  const presaleEvents = events.filter((e: any) => e.category === 'presale');
  const hotEvents = events.filter((e: any) => e.category === 'hot');
  const popularEvents = events.filter((e: any) => e.category === 'popular');

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-slate-900">
      {/* 1. Header / Navbar */}
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* 2. Hero Carousel Banner */}
        <section className="relative mb-12 overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
          <div className="relative h-[280px] w-full sm:h-[380px] md:h-[460px]">
            {/* Ganti path gambar banner sesuai aset yang kamu miliki */}
            <Image
              src="/images/banner-neon-odyssey.jpg" 
              alt="Electronic Dance Night: Neon Odyssey"
              fill
              className="object-cover"
              priority
            />
            {/* Indikator Carousel Dot di bawah */}
            <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
              <span className="h-2 w-2 rounded-full bg-amber-400"></span>
              <span className="h-2 w-2 rounded-full bg-white/50"></span>
              <span className="h-2 w-2 rounded-full bg-white/50"></span>
              <span className="h-2 w-2 rounded-full bg-white/50"></span>
            </div>
          </div>
        </section>

        {/* 3. Presale Event Section */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">Presale Event</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll(presaleRef, 'left')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300 bg-white text-amber-700 shadow-sm transition hover:bg-amber-50"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleScroll(presaleRef, 'right')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300 bg-white text-amber-700 shadow-sm transition hover:bg-amber-50"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            ref={presaleRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {presaleEvents.length > 0 ? (
              presaleEvents.map((event: any) => <EventCard key={event.id} {...event} />)
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada data presale event.</p>
            )}
          </div>
        </section>

        {/* 4. Hot Event This Week */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">Hot Event This Week</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll(hotRef, 'left')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300 bg-white text-amber-700 shadow-sm transition hover:bg-amber-50"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleScroll(hotRef, 'right')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300 bg-white text-amber-700 shadow-sm transition hover:bg-amber-50"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            ref={hotRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {hotEvents.length > 0 ? (
              hotEvents.map((event: any) => <EventCard key={event.id} {...event} />)
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada data hot event.</p>
            )}
          </div>
        </section>

        {/* 5. Popular Event */}
        <section className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold tracking-tight md:text-2xl">Popular Event</h2>
            <div className="flex gap-2">
              <button
                onClick={() => handleScroll(popularRef, 'left')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300 bg-white text-amber-700 shadow-sm transition hover:bg-amber-50"
                aria-label="Scroll left"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                onClick={() => handleScroll(popularRef, 'right')}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-amber-300 bg-white text-amber-700 shadow-sm transition hover:bg-amber-50"
                aria-label="Scroll right"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div
            ref={popularRef}
            className="flex gap-4 overflow-x-auto pb-4 scroll-smooth no-scrollbar"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {popularEvents.length > 0 ? (
              popularEvents.map((event: any) => <EventCard key={event.id} {...event} />)
            ) : (
              <p className="text-sm text-muted-foreground">Belum ada data popular event.</p>
            )}
          </div>

          {/* Tombol Lihat Lainnya */}
          <div className="mt-8 flex justify-center">
            <button className="rounded-full border border-amber-400 px-8 py-2.5 text-sm font-semibold text-amber-700 transition hover:bg-amber-50">
              Lihat Lainnya
            </button>
          </div>
        </section>
      </main>

      {/* 6. Footer */}
      <Footer />
    </div>
  );
}