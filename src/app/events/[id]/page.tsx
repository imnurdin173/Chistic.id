import EventOrderSidebar from '@/components/detailEvent/EventOrderSidebar';
import EventHeaderInfo from '@/components/detailEvent/EventHeaderInfo';
import EventContent from '@/components/detailEvent/EventContent';
import EventReviews from '@/components/detailEvent/EventReviews';
import EventCard from '@/components/EventCard';
import { DUMMY_EVENTS } from '@/data/events';

interface EventDetailPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EventDetailPage({ params }: EventDetailPageProps) {
  const { id } = await params;

  // Mengambil 4 event dari DUMMY_EVENTS untuk section "Similar Event For You"
  const similarEvents = DUMMY_EVENTS.slice(0, 4);

  return (
    <main className="max-w-6xl mx-auto px-4 py-8 flex flex-col gap-8 bg-amber-50/20 min-h-screen">
      {/* Title Header */}
      <h1 className="text-2xl md:text-3xl font-extrabold text-gray-900 tracking-tight">
        Night Symphony: Classic Meets Rock
      </h1>

      {/* Main Content Layout (2 Columns) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        {/* Left Column */}
        <div className="lg:col-span-2 flex flex-col gap-6">
          {/* Poster Image / Banner */}
          <div className="w-full aspect-[16/9] bg-slate-900 rounded-2xl overflow-hidden shadow-md border border-gray-200 relative">
            <img
              src="https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=1200&auto=format&fit=crop&q=80"
              alt="Night Symphony Banner"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Event Info Table */}
          <EventHeaderInfo />

          {/* Description & Terms Conditions */}
          <EventContent />

          {/* User Reviews */}
          <EventReviews />
        </div>

        {/* Right Column (Sticky Order Sidebar) */}
        <div className="lg:col-span-1 lg:sticky lg:top-24">
          <EventOrderSidebar eventId={id} />
        </div>
      </div>

      {/* Bottom Section: Similar Event For You */}
      <section className="mt-10 flex flex-col gap-4">
        <h2 className="text-xl font-bold text-gray-900">
          Similar Event For You
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          {similarEvents.map((event: any) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
      </section>
    </main>
  );
}