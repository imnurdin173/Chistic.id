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
    image: '/images/event-symphony.jpg',
    status: 'normal',
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
    image: '/images/event-symphony.jpg',
    status: 'normal',
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
    image: '/images/event-symphony.jpg',
    status: 'normal',
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
    image: '/images/event-symphony.jpg',
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
    image: '/images/event-symphony.jpg',
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
    image: '/images/event-symphony.jpg',
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
    image: '/images/event-symphony.jpg',
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
    image: '/images/event-symphony.jpg',
    status: 'normal',
  },
];

export const CATEGORIES = ['All', 'Concert', 'Festival', 'Comedy', 'Seminar'];
export const LOCATIONS = ['All', 'Jakarta', 'Bandung', 'Surabaya', 'Yogyakarta'];