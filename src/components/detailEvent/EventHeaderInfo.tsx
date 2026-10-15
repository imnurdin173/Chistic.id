import { MapPin } from 'lucide-react';

interface EventHeaderInfoProps {
  date?: string;
  location?: string;
  organizer?: string;
  category?: string;
  onOpenMap?: () => void;
}

export default function EventHeaderInfo({
  date = '19 Desember 2026',
  location = 'Ciputra Artpreneur Theater, Jakarta',
  organizer = 'Nusantara Orchestra Productions',
  category = 'Concert, Music',
  onOpenMap,
}: EventHeaderInfoProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
      <div className="divide-y divide-gray-200 text-sm">
        {/* Date Row */}
        <div className="grid grid-cols-3 p-4">
          <span className="font-medium text-gray-500">Date</span>
          <span className="col-span-2 font-semibold text-gray-800">{date}</span>
        </div>

        {/* Location Row */}
        <div className="grid grid-cols-3 p-4 items-center">
          <span className="font-medium text-gray-500">Location</span>
          <div className="col-span-2 flex items-center justify-between">
            <span className="font-semibold text-gray-800">{location}</span>
            <button
              type="button"
              onClick={onOpenMap}
              className="inline-flex items-center gap-1.5 px-3 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 text-xs font-semibold rounded-full border border-amber-200 transition-colors"
            >
              <MapPin className="w-3.5 h-3.5" />
              Lihat di Maps
            </button>
          </div>
        </div>

        {/* Organizers Row */}
        <div className="grid grid-cols-3 p-4">
          <span className="font-medium text-gray-500">Organizers</span>
          <span className="col-span-2 font-semibold text-amber-600">
            {organizer}
          </span>
        </div>

        {/* Category Row */}
        <div className="grid grid-cols-3 p-4">
          <span className="font-medium text-gray-500">Category</span>
          <span className="col-span-2 font-semibold text-amber-600">
            {category}
          </span>
        </div>
      </div>
    </div>
  );
}