'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'; // 👈 1. IMPORT LINK DARI NEXT.JS

import Navbar from '@/components/menubar/navbar';
import Footer from '@/components/menubar/footer';
import EventSectionSlider from '@/components/home/EventSectionSlider';

import { DUMMY_EVENTS as events } from '@/data/events';

const heroSlides = [
  { id: 1, title: 'RESONANCE', image: '/images/img-event-5-ls.jpg' },
  { id: 2, title: 'ELECTRONIC DANCE NIGHT', image: '/images/img-event-6-ls.jpg' },
  { id: 3, title: 'CLASSIC & ROCK', image: '/images/img-event-7-ls.jpg' },
  { id: 4, title: 'JAZZ EVENING', image: '/images/img-event-8-ls.jpg' },
];

export default function HomePageContent() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Filter Data Event
  const presaleEvents = events.slice(0, 4);
  const hotEvents = events.slice(0, 6);
  const popularEvents = events.slice(2, 8);

  return (
    <div className="min-h-screen bg-[#FFFBF0] text-slate-900">
      {/* 1. Header Navigation */}
      <Navbar />

      <main className="mx-auto max-w-7xl px-4 py-8 md:px-8">
        {/* 2. Hero Banner Carousel */}
        <section className="relative mb-10 overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
          <div className="relative h-[260px] w-full sm:h-[360px] md:h-[440px]">
            {heroSlides.map((slide, index) => (
              <div
                key={slide.id}
                className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                  index === currentSlide ? 'z-10 opacity-100' : 'z-0 opacity-0'
                }`}
              >
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />
              </div>
            ))}

            {/* Indikator Carousel Dot */}
            <div className="absolute bottom-4 left-1/2 z-20 flex -translate-x-1/2 gap-2">
              {heroSlides.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentSlide ? 'w-6 bg-amber-400' : 'w-2 bg-white/50'
                  }`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </section>

        {/* 3. Section Presale Event */}
        <EventSectionSlider
          title="Presale Event"
          events={presaleEvents}
          isPresale={true}
        />

        {/* 4. Section Hot Event This Week */}
        <EventSectionSlider
          title="Hot Event This Week"
          events={hotEvents}
        />

        {/* 5. Section Popular Event */}
        <EventSectionSlider
          title="Popular Event"
          events={popularEvents}
        />

        {/* 6. Tombol "Lihat Lainnya" - Tersambung ke halaman Browse Event List */}
        <div className="mt-12 flex justify-center">
          {/* 👈 2. BUNGKUS / DENGAN HREF KE ROUTE BROWSE EVENT LIST */}
          <Link 
            href="/events" // ⚠️ Sesuaikan /events dengan nama folder route browse event kamu (misal: /events, /browse, dll)
            className="w-full max-w-xs sm:max-w-md rounded-full border-2 border-amber-400/80 bg-amber-50/20 py-3 text-center text-sm font-bold text-amber-500 transition hover:bg-amber-400 hover:text-white shadow-xs block"
          >
            Lihat Lainnya
          </Link>
        </div>
      </main>

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}