// src/app/events/[id]/page.tsx
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { DUMMY_EVENTS } from '@/data/events';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EventDetailPage({ params }: PageProps) {
  const { id } = await params;

  // Cari event berdasarkan ID dari URL
  const event = DUMMY_EVENTS.find((item) => item.id === id);

  if (!event) {
    notFound();
  }

  // Fungsi pembantu format rupiah
  const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  return (
    <main className="max-w-5xl mx-auto px-4 py-8">
      {/* Tombol Kembali */}
      <Link href="/events" className="text-sm font-medium text-amber-600 hover:underline mb-4 inline-block">
        ← Back to Browse Events
      </Link>

      {/* Detail Container */}
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Banner Gambar */}
        <div className="relative w-full h-72 md:h-96 bg-gray-100">
          <Image
            src={event.image}
            alt={event.title}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Info Utama */}
        <div className="p-6 md:p-8 space-y-6">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1 rounded-full">
              {event.category}
            </span>
            <span className="text-sm text-gray-500">
              Organized by {event.organizer || 'Chistix Organizer'}
            </span>
          </div>

          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">{event.title}</h1>
            <p className="text-gray-600 mt-2">
              📍 {event.venueDetail || event.location}
            </p>
            <p className="text-gray-600 mt-1">📅 {event.date}</p>
          </div>

          <hr className="border-gray-200" />

          {/* Deskripsi */}
          <div>
            <h2 className="text-lg font-semibold text-gray-800 mb-2">Description</h2>
            <p className="text-gray-600 leading-relaxed">
              {event.description || 'Tidak ada deskripsi tersedia untuk event ini.'}
            </p>
          </div>

          {/* Box Beli Tiket */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-600">Ticket Price</p>
              <div className="flex items-baseline gap-2">
                <p className="text-2xl font-bold text-gray-900">
                  {formatRupiah(event.price)}
                </p>
                {event.originalPrice && (
                  <p className="text-sm text-gray-400 line-through">
                    {formatRupiah(event.originalPrice)}
                  </p>
                )}
              </div>
            </div>

            <button
              disabled={event.status === 'sold-out'}
              className={`font-semibold px-6 py-3 rounded-lg transition-colors ${
                event.status === 'sold-out'
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-amber-500 hover:bg-amber-600 text-black'
              }`}
            >
              {event.status === 'sold-out' ? 'Sold Out' : 'Buy Ticket Now'}
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}