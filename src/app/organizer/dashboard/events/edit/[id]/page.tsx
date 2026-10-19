"use client";

import React, { useState, useEffect, use } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SidebarDashboard from "@/components/sidebar/SidebarDashboard";
import NavbarNotLoggedIn from "@/components/menubar/navbar";
import Footer from "@/components/menubar/footer";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { EventFormData, EventStatus } from "@/types/event";

const PROVINCES = [
  "DKI Jakarta",
  "Jawa Barat",
  "Jawa Tengah",
  "Jawa Timur",
  "Bali",
  "Sumatera Utara",
];

const CITIES: Record<string, string[]> = {
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"],
  "Jawa Barat": ["Bandung", "Bekasi", "Depok", "Bogor", "Cimahi"],
  "Jawa Tengah": ["Semarang", "Solo", "Magelang", "Yogyakarta"],
  "Jawa Timur": ["Surabaya", "Malang", "Sidoarjo", "Gresik"],
  "Bali": ["Denpasar", "Kuta", "Ubud", "Seminyak"],
  "Sumatera Utara": ["Medan", "Binjai", "Pematang Siantar"],
};

export default function EditEventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const resolvedParams = use(params);
  const eventId = resolvedParams.id;

  // State Form Lengkap Sama Persis Seperti Create Event
  const [form, setForm] = useState<Partial<EventFormData & { status: EventStatus }>>({
    title: "",
    category: "",
    date: "",
    description: "",
    province: "",
    city: "",
    venueMaps: "",
    venueDetail: "",
    totalTicket: 0,
    ticketTiers: [
      { id: "vip", name: "VIP", price: 0, finalPrice: 0, quota: 0, sold: 0 },
      { id: "reguler", name: "Regular", price: 0, finalPrice: 0, quota: 0, sold: 0 },
    ],
    presale: { enabled: false, amount: 0, startDate: "", endDate: "" },
    thumbnailImage: "",
    coverImages: [],
    videoUrl: "",
    scheduledPublishStart: "",
    scheduledPublishEnd: "",
    status: "UPCOMING",
  });

  const [agreedToTerms, setAgreedToTerms] = useState(true);

  // Helper ganti data form
  const handleChange = (field: string, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  // Helper ubah tier tiket VIP / Regular
  const handleTierChange = (index: number, field: "quota" | "price" | "finalPrice", value: number) => {
    setForm((prev) => {
      const updatedTiers = [...(prev.ticketTiers || [])];
      if (updatedTiers[index]) {
        updatedTiers[index] = { ...updatedTiers[index], [field]: value };
      }
      return { ...prev, ticketTiers: updatedTiers };
    });
  };

  // Pre-fill data event saat halaman dimuat (Nanti: fetch GET /api/events/:id)
  useEffect(() => {
    setForm({
      title: "Resonance Soundfest 2026: Intimate Live Performance",
      category: "Music",
      date: "2026-11-15",
      description: "Nikmati pengalaman musik akustik dan indie pop paling spektakuler tahun ini!",
      province: "DKI Jakarta",
      city: "Jakarta Pusat",
      venueMaps: "https://maps.google.com/?q=Istora+Senayan",
      venueDetail: "Istora Senayan, Jakarta",
      totalTicket: 500,
      ticketTiers: [
        { id: "vip", name: "VIP", price: 650000, finalPrice: 650000, quota: 100, sold: 80 },
        { id: "reguler", name: "Regular", price: 400000, finalPrice: 400000, quota: 400, sold: 232 },
      ],
      presale: {
        enabled: true,
        amount: 100,
        startDate: "2026-10-01",
        endDate: "2026-10-31",
      },
      thumbnailImage: "",
      coverImages: [],
      videoUrl: "",
      status: "UPCOMING",
    });
  }, [eventId]);

  const handleSaveUpdate = (newStatus?: EventStatus) => {
    const finalData = {
      id: eventId,
      ...form,
      status: newStatus || form.status,
    };

    console.log("UPDATE EVENT PAYLOAD:", finalData);
    // Nanti saat integrasi backend Neon/Prisma:
    // await fetch(`/api/events/${eventId}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(finalData) })

    alert(`Perubahan event "${form.title}" berhasil disimpan!`);
    router.push("/organizer/dashboard/events");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-800 font-sans flex flex-col justify-between">
      <NavbarNotLoggedIn />

      <div className="flex-1 w-full p-4 md:p-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">
          <SidebarDashboard />

          <div className="flex-1 w-full space-y-4">
            
            {/* Breadcrumb Nav */}
            <nav className="flex items-center gap-1.5 text-xs md:text-sm text-neutral-500">
              <Link
                href="/organizer/dashboard"
                className="flex items-center gap-1 hover:text-[#BB4D00] transition-colors font-medium"
              >
                <HomeIcon className="w-3.5 h-3.5" />
                <span>Dashboard</span>
              </Link>

              <ChevronRightIcon className="w-3.5 h-3.5 text-neutral-300" />

              <Link
                href="/organizer/dashboard/events"
                className="hover:text-[#BB4D00] transition-colors font-medium"
              >
                Events
              </Link>

              <ChevronRightIcon className="w-3.5 h-3.5 text-neutral-300" />

              <span className="text-neutral-900 font-semibold">Edit Event</span>
            </nav>

            {/* Card Form Lengkap */}
            <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden">
              <div className="p-6 md:p-8 space-y-5">
                
                {/* Header Edit + Status Badge */}
                <div className="flex items-center justify-between pb-2 border-b border-neutral-100">
                  <div>
                    <h1 className="text-xl font-bold text-neutral-900">Edit Event</h1>
                    <p className="text-xs text-neutral-400 mt-0.5">Perbarui rincian dan pengaturan tiket event</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-neutral-400 font-mono">ID: #{eventId}</span>
                    <span className={`text-xs font-bold px-3 py-1 rounded-full ${
                      form.status === "ON STAGE" 
                        ? "bg-rose-100 text-rose-700 border border-rose-300"
                        : "bg-emerald-100 text-emerald-700 border border-emerald-200"
                    }`}>
                      {form.status}
                    </span>
                  </div>
                </div>

                {/* Event Title */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Title</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => handleChange("title", e.target.value)}
                    className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                  />
                </div>

                {/* Event Category */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => handleChange("category", e.target.value)}
                    className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 cursor-pointer"
                  >
                    <option value="Music">Music</option>
                    <option value="Art">Art</option>
                    <option value="Sports">Sports</option>
                    <option value="Technology">Technology</option>
                    <option value="Business">Business</option>
                  </select>
                </div>

                {/* Event Date */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => handleChange("date", e.target.value)}
                    className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                  />
                </div>

                {/* Event Description */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Description</label>
                  <textarea
                    rows={4}
                    value={form.description}
                    onChange={(e) => handleChange("description", e.target.value)}
                    className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 resize-none"
                  />
                </div>

                {/* Province */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700 pt-2.5">Location Province</label>
                  <select
                    value={form.province}
                    onChange={(e) => {
                      handleChange("province", e.target.value);
                      handleChange("city", "");
                    }}
                    className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 cursor-pointer"
                  >
                    <option value="">Select Province</option>
                    {PROVINCES.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>

                {/* City */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700 pt-2.5">Location City</label>
                  <select
                    value={form.city}
                    onChange={(e) => handleChange("city", e.target.value)}
                    disabled={!form.province}
                    className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 disabled:opacity-50 cursor-pointer"
                  >
                    <option value="">Select City</option>
                    {(CITIES[form.province ?? ""] ?? []).map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                {/* Venue Maps URL */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700 pt-2.5">Venue Location Maps</label>
                  <input
                    type="url"
                    placeholder="https://maps.google.com/..."
                    value={form.venueMaps}
                    onChange={(e) => handleChange("venueMaps", e.target.value)}
                    className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                  />
                </div>

                {/* Venue Detail */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700 pt-2.5">Venue Location Detail</label>
                  <input
                    type="text"
                    value={form.venueDetail}
                    onChange={(e) => handleChange("venueDetail", e.target.value)}
                    className="sm:col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                  />
                </div>

                {/* Total Ticket */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                  <label className="text-sm font-medium text-neutral-700">Total Ticket Amount</label>
                  <input
                    type="number"
                    min={0}
                    value={form.totalTicket}
                    onChange={(e) => handleChange("totalTicket", Number(e.target.value))}
                    className="w-28 border border-neutral-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                  />
                </div>

                <div className="border-t border-neutral-100 pt-2" />

                {/* VIP Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                  <label className="text-sm font-medium text-neutral-700 pl-2">VIP Tier</label>
                  <div className="sm:col-span-2 flex flex-wrap gap-2.5 items-center text-xs text-neutral-500">
                    <input
                      type="number"
                      placeholder="Quota"
                      value={form.ticketTiers?.[0]?.quota || 0}
                      onChange={(e) => handleTierChange(0, "quota", Number(e.target.value))}
                      className="w-20 border border-neutral-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                    />
                    <span>Price Normal</span>
                    <input
                      type="number"
                      placeholder="Normal"
                      value={form.ticketTiers?.[0]?.price || 0}
                      onChange={(e) => handleTierChange(0, "price", Number(e.target.value))}
                      className="w-28 border border-neutral-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                    />
                    <span>Final Price</span>
                    <input
                      type="number"
                      placeholder="Final"
                      value={form.ticketTiers?.[0]?.finalPrice || 0}
                      onChange={(e) => handleTierChange(0, "finalPrice", Number(e.target.value))}
                      className="w-28 border border-neutral-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                    />
                  </div>
                </div>

                {/* Regular Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                  <label className="text-sm font-medium text-neutral-700 pl-2">Regular Tier</label>
                  <div className="sm:col-span-2 flex flex-wrap gap-2.5 items-center text-xs text-neutral-500">
                    <input
                      type="number"
                      placeholder="Quota"
                      value={form.ticketTiers?.[1]?.quota || 0}
                      onChange={(e) => handleTierChange(1, "quota", Number(e.target.value))}
                      className="w-20 border border-neutral-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                    />
                    <span>Price Normal</span>
                    <input
                      type="number"
                      placeholder="Normal"
                      value={form.ticketTiers?.[1]?.price || 0}
                      onChange={(e) => handleTierChange(1, "price", Number(e.target.value))}
                      className="w-28 border border-neutral-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                    />
                    <span>Final Price</span>
                    <input
                      type="number"
                      placeholder="Final"
                      value={form.ticketTiers?.[1]?.finalPrice || 0}
                      onChange={(e) => handleTierChange(1, "finalPrice", Number(e.target.value))}
                      className="w-28 border border-neutral-200 rounded-lg px-2.5 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                    />
                  </div>
                </div>

                {/* Presale Toggle */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-center">
                  <label className="text-sm font-medium text-neutral-700 pl-2">Presale Ticket</label>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleChange("presale", {
                          ...form.presale,
                          enabled: !form.presale?.enabled,
                        })
                      }
                      className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${
                        form.presale?.enabled ? "bg-[#EA580C]" : "bg-neutral-200"
                      }`}
                    >
                      <span
                        className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-xs transition-all ${
                          form.presale?.enabled ? "left-4.5" : "left-0.5"
                        }`}
                      />
                    </button>
                    <span className="text-xs text-neutral-500 font-medium">
                      {form.presale?.enabled ? "Aktif" : "Tidak Aktif"}
                    </span>
                  </div>
                </div>

                {/* Presale Detail Form */}
                {form.presale?.enabled && (
                  <div className="ml-2 sm:ml-4 space-y-4 p-4 bg-orange-50/40 border border-orange-200 rounded-xl">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <label className="text-xs font-semibold text-neutral-700">Presale Quota</label>
                      <input
                        type="number"
                        min={0}
                        value={form.presale?.amount || 0}
                        onChange={(e) =>
                          handleChange("presale", {
                            ...form.presale,
                            amount: Number(e.target.value),
                          })
                        }
                        className="w-28 border border-neutral-200 rounded-xl px-3 py-1.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-white"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 items-center">
                      <label className="text-xs font-semibold text-neutral-700">Presale Period</label>
                      <div className="sm:col-span-2 flex items-center gap-2 text-xs text-neutral-500">
                        <input
                          type="date"
                          value={form.presale?.startDate || ""}
                          onChange={(e) =>
                            handleChange("presale", {
                              ...form.presale,
                              startDate: e.target.value,
                            })
                          }
                          className="border border-neutral-200 rounded-xl px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-[#BB4D00]"
                        />
                        <span>until</span>
                        <input
                          type="date"
                          value={form.presale?.endDate || ""}
                          onChange={(e) =>
                            handleChange("presale", {
                              ...form.presale,
                              endDate: e.target.value,
                            })
                          }
                          className="border border-neutral-200 rounded-xl px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-[#BB4D00]"
                        />
                      </div>
                    </div>
                  </div>
                )}

                {/* File Upload: Thumbnail (1:1) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700">Thumbnail Image</label>
                  <div className="sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      className="text-sm text-neutral-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-neutral-200 file:text-xs file:font-semibold file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100 file:cursor-pointer cursor-pointer"
                    />
                    <p className="text-xs text-neutral-400 mt-1">Aspect ratio 1:1</p>
                  </div>
                </div>

                {/* File Upload: Cover (2:1) */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700">Cover Images</label>
                  <div className="sm:col-span-2">
                    <input
                      type="file"
                      accept="image/*"
                      multiple
                      className="text-sm text-neutral-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-neutral-200 file:text-xs file:font-semibold file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100 file:cursor-pointer cursor-pointer"
                    />
                    <p className="text-xs text-neutral-400 mt-1">Aspect ratio 2:1</p>
                  </div>
                </div>

                {/* File Upload: Video Cover */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4 items-start">
                  <label className="text-sm font-medium text-neutral-700">Video Cover (Optional)</label>
                  <div className="sm:col-span-2">
                    <input
                      type="file"
                      accept="video/*"
                      className="text-sm text-neutral-600 file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-neutral-200 file:text-xs file:font-semibold file:bg-neutral-50 file:text-neutral-700 hover:file:bg-neutral-100 file:cursor-pointer cursor-pointer"
                    />
                    <p className="text-xs text-neutral-400 mt-1">Aspect ratio 2:1</p>
                  </div>
                </div>

              </div>

              {/* Bottom Publishing Bar */}
              <div className="border-t border-neutral-100 bg-neutral-50/50 px-6 md:px-8 py-5">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  
                  {/* Status Selector & T&C */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <label className="text-xs font-semibold text-neutral-700">Update Status:</label>
                      <select
                        value={form.status}
                        onChange={(e) => handleChange("status", e.target.value as EventStatus)}
                        className="border border-neutral-200 rounded-lg px-2.5 py-1 text-xs font-bold text-neutral-800 bg-white focus:outline-none focus:border-[#BB4D00]"
                      >
                        <option value="DRAFT">DRAFT</option>
                        <option value="UPCOMING">UPCOMING</option>
                        <option value="ON STAGE">ON STAGE (LIVE)</option>
                        <option value="ENDED">ENDED</option>
                      </select>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <input
                        type="checkbox"
                        id="terms"
                        checked={agreedToTerms}
                        onChange={(e) => setAgreedToTerms(e.target.checked)}
                        className="rounded"
                      />
                      <label htmlFor="terms" className="text-xs text-neutral-600">
                        Confirm update terms & conditions
                      </label>
                    </div>
                  </div>

                  {/* Tombol Simpan & Batal */}
                  <div className="flex items-center gap-2.5">
                    <Link
                      href="/organizer/dashboard/events"
                      className="px-5 py-2.5 rounded-full text-sm font-semibold text-neutral-700 border border-neutral-200 hover:bg-neutral-100 transition-colors"
                    >
                      Cancel
                    </Link>
                    <button
                      type="button"
                      onClick={() => handleSaveUpdate()}
                      className="px-6 py-2.5 rounded-full text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#BB4D00] transition-colors cursor-pointer shadow-xs"
                    >
                      Save Changes
                    </button>
                  </div>

                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}