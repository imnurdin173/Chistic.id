"use client";
import React, { useState } from "react";
import Link from "next/link";
import Sidebar from "@/components/sidebar/SidebarDashboard";
import EventStatusBadge from "@/components/dashboard/events/EventStatusBadge";
import PublishConfirmAction from "@/components/dashboard/events/PublishConfirmAction";
import AttendeeListAction from "@/components/dashboard/events/AttendeeListAction";
import QRListAction from "@/components/dashboard/events/QRListAction";
import EditEventAction from "@/components/dashboard/events/EditEventAction";
import { EventItem, EventStatus } from "@/types/event";
import { PencilSquareIcon, UserGroupIcon, QrCodeIcon, ArrowUpCircleIcon, ChartBarIcon, MagnifyingGlassIcon, PlusIcon } from "@heroicons/react/24/outline";
import NavbarNotLoggedIn from "@/components/menubar/navbar";
import Footer from "@/components/menubar/footer";

const DUMMY_EVENTS: EventItem[] = [
  {
    id: "EVT-001",
    title: "Resonance Soundfest 2026: Intimate Live Performance",
    category: "Music",
    date: "15 Nov 2026",
    description: "Experience the most spectacular acoustic and indie pop event of the year! Featuring top-tier national musicians with world-class stage lighting and sound acoustics.",
    province: "DKI Jakarta",
    city: "Jakarta Pusat",
    venueMaps: "https://maps.google.com",
    venueDetail: "Istora Senayan Jakarta",
    totalTicket: 500,
    ticketTiers: [
      { id: "t1", name: "VIP", price: 500000, finalPrice: 500000, quota: 100, sold: 80 },
      { id: "t2", name: "Reguler", price: 200000, finalPrice: 200000, quota: 400, sold: 232 },
    ],
    presale: { enabled: false, amount: 0, startDate: "", endDate: "" },
    thumbnailImage: "",
    coverImages: [],
    status: "UPCOMMING",
    organizerId: "ORG-001",
  },
  {
    id: "EVT-002",
    title: "Night Symphony: Classic Meets Rock",
    category: "Music",
    date: "19 Dec 2026",
    description: "A grand blend of classical orchestral grandeur and energetic rock hits from the 90s and 2000s, conducted by renowned maestros.",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    venueMaps: "",
    venueDetail: "Ciputra Artpreneur Theater Jakarta",
    totalTicket: 390,
    ticketTiers: [
      { id: "t3", name: "Presale VIP", price: 300000, finalPrice: 300000, quota: 200, sold: 165 },
      { id: "t4", name: "Reguler", price: 150000, finalPrice: 150000, quota: 190, sold: 110 },
    ],
    presale: { enabled: true, amount: 100, startDate: "2026-10-01", endDate: "2026-11-01" },
    thumbnailImage: "",
    coverImages: [],
    status: "UPCOMMING",
    organizerId: "ORG-002",
  },
  {
    id: "EVT-003",
    title: "Indie Wave Fest Sunset Beach Session",
    category: "Music",
    date: "16 Jan 2027",
    description: "A relaxing open-air beachside festival featuring indie pop soundscapes, food trucks, and beanbag lounge areas.",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    venueMaps: "",
    venueDetail: "Pantai Indah Kapuk (PIK 2), Jakarta",
    totalTicket: 390,
    ticketTiers: [
      { id: "t3", name: "Presale VIP", price: 300000, finalPrice: 300000, quota: 200, sold: 165 },
      { id: "t4", name: "Reguler", price: 150000, finalPrice: 150000, quota: 190, sold: 110 },
    ],
    presale: { enabled: true, amount: 100, startDate: "2026-10-01", endDate: "2026-11-01" },
    thumbnailImage: "",
    coverImages: [],
    status: "DRAFT",
    organizerId: "ORG-003",
  },
  {
    id: "EVT-004",
    title: "Jazz Evening at the Park",
    category: "Music",
    date: "10 Sept 2026",
    description: "Unwind over the weekend with outdoor jazz melodies under city greenery featuring local jazz legends.",
    province: "DKI Jakarta",
    city: "Jakarta Selatan",
    venueMaps: "",
    venueDetail: "Hutan Kota GBK, Jakarta",
    totalTicket: 390,
    ticketTiers: [
      { id: "t3", name: "Presale VIP", price: 300000, finalPrice: 300000, quota: 200, sold: 165 },
      { id: "t4", name: "Reguler", price: 150000, finalPrice: 150000, quota: 190, sold: 110 },
    ],
    presale: { enabled: true, amount: 100, startDate: "2026-10-01", endDate: "2026-11-01" },
    thumbnailImage: "",
    coverImages: [],
    status: "ENDED",
    organizerId: "ORG-004",
  },
];

export default function Eventspage() {
  const [events, setEvents] = useState<EventItem[]>(DUMMY_EVENTS);

  const [searchQuery, setSearchQuery] = useState<string>("");
  const [activeStatusFilter, setActiveStatusFilter] = useState<string>("All");

  const [publishTarget, setPublishTarget] = useState<EventItem | null>(null);
  const [isPublishActionOpen, setIsPublishActionOpen] = useState(false);

  const [attendeeTarget, setAttendeeTarget] = useState<EventItem | null>(null);
  const [isAttendeeActionOpen, setIsAttendeeActionOpen] = useState(false);

  const [qrTarget, setQrTarget] = useState<EventItem | null>(null);
  const [isQRActionOpen, setIsQRActionOpen] = useState(false);

  const [editTarget, setEditTarget] = useState<EventItem | null>(null);
  const [isEditActionOpen, setIsEditActionOpen] = useState(false);

  const filteredEvents = events.filter((event) => {
    const mathSearch = event.title.toLowerCase().includes(searchQuery.toLocaleLowerCase()) || event.city.toLowerCase().includes(searchQuery.toLocaleLowerCase());
    const matchStatus = activeStatusFilter === "All" ? true : event.status === activeStatusFilter.toUpperCase();
    return mathSearch && matchStatus;
  });

  const handleConfirmPublish = () => {
    if (!publishTarget) return;
    setEvents((prev) => prev.map((e) => (e.id === publishTarget.id ? { ...e, status: "UPCOMMING" } : e)));
    setIsPublishActionOpen(false);
    setPublishTarget(null);
  };

  const statusFilters: string[] = ["All", "Upcomming", "Draft", "Ended"];

  const handleSaveEdit = (updateEvent: EventItem) => {
    setEvents((prev) => prev.map((e) => (e.id === updateEvent.id ? updateEvent : e)));
    setIsEditActionOpen(false);
    setEditTarget(null);
  };

  const handleEndEvent = (eventId: string) => {
    setEvents((prev) =>
    prev.map((e) => (e.id === eventId ? {...e, status: "ENDED"}: e))
    )
  }

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-800 font-sans flex flex-col justify-between">
      <NavbarNotLoggedIn />
      <div className="flex-1 w-full p-4 md:p-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        <Sidebar />

        <main className="flex-1 w-full bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-neutral-100">
          <div className="flex justify-between items-center mb-5">
            <h1 className="text-xl md:text-2xl font-bold text-neutral-900">Your Events</h1>
            <Link href="/organizer/dashboard/events/create" className="flex items-center gap-1.5 bg-[#EA580C] hover:bg-[#BB4D00] text-white px-4 py-2 rounded-full text-sm font-semibold transition-all shadow-xs cursor-pointer">
              <PlusIcon className="w-4 h-4" />
              <span>Create Event</span>
            </Link>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
            <div className="relative w-full sm:max-w-xs">
              <MagnifyingGlassIcon className="w-4 h-4 text-neutral-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search event name, location ..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-neutral-200 rounded-full bg-neutral-50 focus:outline-none focus:border-[#BB4D00] placeholder:text-neutral-400"
              />
            </div>

            <div className="flex gap-2 flex-wrap">
              {statusFilters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveStatusFilter(filter)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    activeStatusFilter === filter ? "bg-[#FFF5ED] text-[#BB4D00] border border-[#BB4D00]/40" : "bg-white text-neutral-600 border border-neutral-200 hover:bg-neutral-50"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs md:text-sm">
              <thead>
                <tr className="text-neutral-900 font-semibold border-b border-neutral-100">
                  <th className="pb-3.5 px-4">Event</th>
                  <th className="pb-3.5">Date</th>
                  <th className="pb-3.5 px-4">Ticket Sold</th>
                  <th className="pb-3.5 px-4 text-center">Status</th>
                  <th className="pb-3.5 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100">
                {filteredEvents.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center py-12 text-neutral-400 text-sm">
                      No events found matching your search
                    </td>
                  </tr>
                ) : (
                  filteredEvents.map((event) => {
                    const totalSold = event.ticketTiers.reduce((sum, t) => sum + t.sold, 0);
                    return (
                      <tr key={event.id} className="hover:bg-neutral-50/50 transition-colors">
                        <td className="py-4 pr-4 max-w-64">
                          <p className="font-semibold text-neutral-900 leading-snug line-clamp-2 px-4">{event.title}</p>
                          <p className="text-neutral-400 text-xs mt-0.5 px-4">{event.venueDetail}</p>
                        </td>
                        <td className="py-4 pr-4 whitespace-nowrap text-neutral-600">{event.date}</td>
                        <td className="py-4 pr-4 px-4 whitespace-nowrap text-neutral-600 font-medium">
                          {totalSold} / {event.totalTicket}
                        </td>
                        <td className="py-4 pr-4 px-4 text-center">
                          <EventStatusBadge status={event.status} />
                        </td>
                        <td className="py-4 text-center">
                          <div className="flex items-center justify-center gap-2">
                            {event.status !== "ENDED" && (
                              <button
                                onClick={() => {
                                  setEditTarget(event);
                                  setIsEditActionOpen(true);
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-[#BB4D00] hover:bg-[#FFF5ED] transition-colors cursor-pointer"
                                title="Edit Event"
                              >
                                <PencilSquareIcon className="w-4.5 h-4.5 text-black/80 hover:text-[#BB4D00]" />
                              </button>
                            )}

                            {(event.status === "UPCOMMING" || event.status === "ENDED") && (
                              <button
                                onClick={() => {
                                  setAttendeeTarget(event);
                                  setIsAttendeeActionOpen(true);
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors cursor-pointer"
                                title="See Attendee List"
                              >
                                <UserGroupIcon className="w-4.5 h-4.5 text-black/80 hover:text-emerald-600" />
                              </button>
                            )}

                            {event.status === "UPCOMMING" && (
                              <button
                                onClick={() => {
                                  setQrTarget(event);
                                  setIsQRActionOpen(true);
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-blue-600 hover:bg-blue-50 transition-colors cursor-pointer"
                                title="Scan QR"
                              >
                                <QrCodeIcon className="w-4.5 h-4.5 text-black/80 hover:text-blue-600" />
                              </button>
                            )}

                            {event.status === "DRAFT" && (
                              <button
                                onClick={() => {
                                  setPublishTarget(event);
                                  setIsPublishActionOpen(true);
                                }}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-amber-400 hover:text-amber-500 hover:bg-amber-50 transition-colors cursor-pointer"
                                title="Publish Event"
                              >
                                <ArrowUpCircleIcon className="w-4.5 h-4.5 text-amber-500" />
                              </button>
                            )}

                            {event.status === "ENDED" && (
                              <button
                                onClick={() => alert(`Event Summary Report: ${event.title}`)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg text-neutral-400 hover:text-purple-500 hover:bg-purple-50 transition-colors cursor-pointer"
                                title="View Summary Event"
                              >
                                <ChartBarIcon className="w-4.5 h-4.5 text-black/80 hover:text-purple-500" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </main>
      </div>
      </div>

      <PublishConfirmAction
        isOpen={isPublishActionOpen}
        eventTitle={publishTarget?.title ?? ""}
        onClose={() => {
          setIsPublishActionOpen(false);
          setPublishTarget(null);
        }}
        onConfirmPublish={handleConfirmPublish}
      />

      <AttendeeListAction
        isOpen={isAttendeeActionOpen}
        eventTitle={attendeeTarget?.title ?? ""}
        onClose={() => {
          setIsAttendeeActionOpen(false);
          setAttendeeTarget(null);
        }}
      />

      <QRListAction
        isOpen={isQRActionOpen}
        eventTitle={qrTarget?.title ?? ""}
        onClose={() => {
          setIsQRActionOpen(false);
          setQrTarget(null);
        }}
      />

      <EditEventAction
        isOpen={isEditActionOpen}
        event={editTarget}
        onClose={() => {
          setIsEditActionOpen(false);
          setEditTarget(null);
        }}
        onSave={handleSaveEdit}
        onEndEvent={handleEndEvent}
      />
      <Footer />
    </div>
  );
}
