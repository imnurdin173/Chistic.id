export interface EventItem {
  id: string;
  title: string;
  category: string;
  location: string;
  city: string;
  price: number;
  originalPrice?: number;
  date: string;
  image: string;
  status: 'normal' | 'almost-sold' | 'sold-out';
  almostSoldText?: string;
  // Field Tambahan untuk Presale & Progress
  isPresale?: boolean;
  presaleTag?: string; // contoh: 'Presale 1'
  presaleEndAt?: {
    days: number;
    hours: number;
    minutes: number;
  };
  progressPercent?: number; // Nilai 0 - 100 untuk progress bar
  stockStatusText?: string; // contoh: 'Hampir Habis' atau 'Limited Stock'
}

export const DUMMY_EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'Night Symphony: Classic Meets Rock',
    category: 'Concert',
    location: 'North Jakarta, Jakarta',
    city: 'Jakarta',
    price: 89000,
    originalPrice: 150000,
    date: '19 Desember 2026',
    image: '/images/img-event-1-sq.jpg',
    status: 'almost-sold',
    isPresale: true,
    presaleTag: 'Presale 1',
    presaleEndAt: { days: 0, hours: 2, minutes: 15 },
    progressPercent: 85,
    stockStatusText: 'Hampir Habis',
  },
  {
    id: '2',
    title: 'Electronic Space Night: Neon Odyssey',
    category: 'Concert',
    location: 'North Jakarta, Jakarta',
    city: 'Jakarta',
    price: 120000,
    originalPrice: 180000,
    date: '20 Desember 2026',
    image: '/images/img-event-2-sq.jpg',
    status: 'normal',
    isPresale: true,
    presaleTag: 'Presale 2',
    presaleEndAt: { days: 1, hours: 5, minutes: 30 },
    progressPercent: 60,
    stockStatusText: 'Hampir Habis',
  },
  {
    id: '3',
    title: 'Jazz Evening at the Park',
    category: 'Festival',
    location: 'South Jakarta, Jakarta',
    city: 'Jakarta',
    price: 75000,
    originalPrice: 100000,
    date: '21 Desember 2026',
    image: '/images/img-event-3-sq.jpg',
    status: 'normal',
    isPresale: true,
    presaleTag: 'Presale 1',
    presaleEndAt: { days: 0, hours: 8, minutes: 45 },
    progressPercent: 90,
    stockStatusText: 'Hampir Habis',
  },
  {
    id: '4',
    title: 'Indie Music Summit & Showcase',
    category: 'Festival',
    location: 'Bandung, West Java',
    city: 'Bandung',
    price: 60000,
    originalPrice: 90000,
    date: '22 Desember 2026',
    image: '/images/img-event-4-sq.jpg',
    status: 'almost-sold',
    almostSoldText: 'Only 10 Spot Left!',
  },
  {
    id: '5',
    title: 'Tech Startup Conference 2026',
    category: 'Seminar',
    location: 'Central Jakarta, Jakarta',
    city: 'Jakarta',
    price: 250000,
    originalPrice: 350000,
    date: '23 Desember 2026',
    image: '/images/img-event-5-sq.jpg',
    status: 'sold-out',
  },
  {
    id: '6',
    title: 'Standup Comedy Special: Local Pride',
    category: 'Comedy',
    location: 'Bandung, West Java',
    city: 'Bandung',
    price: 50000,
    date: '24 Desember 2026',
    image: '/images/img-event-6-sq.jpg',
    status: 'normal',
  },
  {
    id: '7',
    title: 'Yogyakarta Cultural Art Festival',
    category: 'Festival',
    location: 'Yogyakarta City, Yogyakarta',
    city: 'Yogyakarta',
    price: 35000,
    originalPrice: 50000,
    date: '27 Desember 2026',
    image: '/images/img-event-7-sq.jpg',
    status: 'almost-sold',
    almostSoldText: 'Only 5 Spot Left!',
  },
  {
    id: '8',
    title: 'Surabaya Youth Creative Expo',
    category: 'Seminar',
    location: 'Surabaya, East Java',
    city: 'Surabaya',
    price: 45000,
    date: '29 Desember 2026',
    image: '/images/img-event-8-sq.jpg',
    status: 'normal',
  },
];

export const CATEGORIES = ['All', 'Concert', 'Festival', 'Comedy', 'Seminar'];
export const LOCATIONS = ['All', 'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'];