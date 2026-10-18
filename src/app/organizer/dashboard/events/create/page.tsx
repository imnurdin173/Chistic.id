"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import SidebarDashboard from "@/components/sidebar/SidebarDashboard";
import { ChevronRightIcon, HomeIcon } from "@heroicons/react/24/outline";
import { EventFormData } from "@/types/event";

const PROVINCES = ["DKI Jakarta", "Jawa Barat", "Jawa Tengah", "Jawa Timur", "Bali", "Sumatera Utara"];
const CITIES: Record<string, string[]> = {
  "DKI Jakarta": ["Jakarta Pusat", "Jakarta Selatan", "Jakarta Barat", "Jakarta Timur", "Jakarta Utara"],
  "Jawa Barat": ["Bandung", "Bekasi", "Depok", "Bogor", "Cimahi"],
  "Jawa Tengah": ["Semarang", "Solo", "Magelang", "Yogyakarta"],
  "Jawa Timur": ["Surabaya", "Malang", "Sidoarjo", "Gresik"],
  "Bali": ["Denpasar", "Kuta", "Ubud", "Seminyak"],
  "Sumatera Utara": ["Medan", "Binjai", "Pematang Siantar"],
};

export default function CreateEventPage() {
  const router = useRouter();

  const [form, setForm] = useState<Partial<EventFormData>>({
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
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleChange = (field: keyof EventFormData, value: unknown) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveDraft = () => {
    console.log("Save as DRAFT:", form);
    alert("Event saved as Draft!");
    router.push("/organizer/dashboard/events");
  };

  const handlePublish = () => {
    if (!agreedToTerms) {
      alert("You need to agree Terms & Conditions");
      return;
    }
    console.log("PUBLISH event:", form);

    alert("Event Published. Now your event can see as a Public");
    router.push("/organizer/dashboard/events");
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-800 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        <SidebarDashboard />

        <div className="flex-1 w-full space-y-4">

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


            <span className="text-neutral-900 font-semibold">Create New Event</span>
          </nav>

          <div className="bg-white rounded-2xl border border-neutral-100 shadow-xs overflow-hidden">
            <div className="p-6 md:p-8 space-y-5">
              <h1 className="text-xl font-bold text-neutral-900">Create New Event</h1>

              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Title</label>
                <input
                  type="text"
                  placeholder="Input Value"
                  value={form.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  className="col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Category</label>
                <select
                  value={form.category}
                  onChange={(e) => handleChange("category", e.target.value)}
                  className="col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                >
                  <option value="">Select Category</option>
                  <option value="Music">Music</option>
                  <option value="Art">Art</option>
                  <option value="Sports">Sports</option>
                  <option value="Technology">Technology</option>
                  <option value="Business">Business</option>
                  <option value="Education">Education</option>
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Date</label>
                <input
                  type="date"
                  value={form.date}
                  onChange={(e) => handleChange("date", e.target.value)}
                  className="col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Description</label>
                <textarea
                  placeholder="Write your short description..."
                  value={form.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                  className="col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 resize-none"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Location Province</label>
                <select
                  value={form.province}
                  onChange={(e) => {
                    handleChange("province", e.target.value);
                    handleChange("city", "");
                  }}
                  className="col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                >
                  <option value="">Select option</option>
                  {PROVINCES.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>


              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700 pt-2.5">Event Location City</label>
                <select
                  value={form.city}
                  onChange={(e) => handleChange("city", e.target.value)}
                  disabled={!form.province} // Kota tidak bisa dipilih jika provinsi belum dipilih
                  className="col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50 disabled:opacity-50"
                >
                  <option value="">Select option</option>
                  {(CITIES[form.province ?? ""] ?? []).map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700 pt-2.5">Venue Location Maps</label>
                <input
                  type="url"
                  placeholder="https://maps.google.com/..."
                  value={form.venueMaps}
                  onChange={(e) => handleChange("venueMaps", e.target.value)}
                  className="col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700 pt-2.5">Venue Location Detail</label>
                <input
                  type="text"
                  placeholder="Nama gedung, jalan, detail lokasi..."
                  value={form.venueDetail}
                  onChange={(e) => handleChange("venueDetail", e.target.value)}
                  className="col-span-2 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                />
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-neutral-700">Total Ticket Amount</label>
                <input
                  type="number"
                  min={0}
                  value={form.totalTicket}
                  onChange={(e) => handleChange("totalTicket", Number(e.target.value))}
                  className="w-24 border border-neutral-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#BB4D00] bg-neutral-50"
                />
              </div>

              <div className="border-t border-neutral-100 pt-2" />

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-neutral-700 pl-4">VIP</label>
                <div className="col-span-2 flex flex-wrap gap-3 items-center text-xs text-neutral-500">
                  <input type="number" min={0} placeholder="0"
                    className="w-20 border border-neutral-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#BB4D00] bg-neutral-50 text-sm"
                  />
                  <span>Price Normal</span>
                  <input type="number" min={0} placeholder="0"
                    className="w-24 border border-neutral-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#BB4D00] bg-neutral-50 text-sm"
                  />
                  <span>Final Price</span>
                  <input type="number" min={0} placeholder="0"
                    className="w-24 border border-neutral-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#BB4D00] bg-neutral-50 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-neutral-700 pl-4">Regular</label>
                <div className="col-span-2 flex flex-wrap gap-3 items-center text-xs text-neutral-500">
                  <input type="number" min={0} placeholder="0"
                    className="w-20 border border-neutral-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#BB4D00] bg-neutral-50 text-sm"
                  />
                  <span>Price Normal</span>
                  <input type="number" min={0} placeholder="0"
                    className="w-24 border border-neutral-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#BB4D00] bg-neutral-50 text-sm"
                  />
                  <span>Final Price</span>
                  <input type="number" min={0} placeholder="0"
                    className="w-24 border border-neutral-200 rounded-lg px-2.5 py-2 focus:outline-none focus:border-[#BB4D00] bg-neutral-50 text-sm"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-center">
                <label className="text-sm font-medium text-neutral-700 pl-4">Presale Ticket</label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleChange("presale", { ...form.presale, enabled: !form.presale?.enabled })}
                    className={`relative w-10 h-6 rounded-full transition-colors cursor-pointer ${
                      form.presale?.enabled ? "bg-[#EA580C]" : "bg-neutral-200"
                    }`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-sm transition-all ${
                      form.presale?.enabled ? "left-4.5" : "left-0.5"
                    }`} />
                  </button>
                  <span className="text-xs text-neutral-500">
                    {form.presale?.enabled ? "Aktif" : "Tidak Aktif"}
                  </span>
                </div>
              </div>

              {form.presale?.enabled && (
                <div className="ml-4 space-y-4 p-4 bg-orange-50/30 border border-orange-100 rounded-xl">
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-neutral-700">Presale amount</label>
                    <input type="number" min={0} placeholder="0"
                      value={form.presale?.amount}
                      onChange={(e) => handleChange("presale", { ...form.presale, amount: Number(e.target.value) })}
                      className="w-24 border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-3 gap-4 items-center">
                    <label className="text-sm font-medium text-neutral-700">Presale Start Date</label>
                    <div className="col-span-2 flex items-center gap-2 text-sm text-neutral-500">
                      <input type="date"
                        value={form.presale?.startDate}
                        onChange={(e) => handleChange("presale", { ...form.presale, startDate: e.target.value })}
                        className="border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-white"
                      />
                      <span>until</span>
                      <input type="date"
                        value={form.presale?.endDate}
                        onChange={(e) => handleChange("presale", { ...form.presale, endDate: e.target.value })}
                        className="border border-neutral-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-[#BB4D00] bg-white"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-3 gap-4 items-start">
                <div>
                  <label className="text-sm font-medium text-neutral-700">Thumbnail Images</label>
                </div>
                <div className="col-span-2">
                  <input type="file" accept="image/*" className="text-sm text-neutral-600
                    file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-neutral-200
                    file:text-xs file:font-semibold file:bg-neutral-50 file:text-neutral-700
                    hover:file:bg-neutral-100 file:cursor-pointer cursor-pointer"
                  />
                  <p className="text-xs text-neutral-400 mt-1">You file must be in 1:1 Aspect Ratio</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-start">
                <label className="text-sm font-medium text-neutral-700">Images Cover</label>
                <div className="col-span-2">
                  <input type="file" accept="image/*" multiple className="text-sm text-neutral-600
                    file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-neutral-200
                    file:text-xs file:font-semibold file:bg-neutral-50 file:text-neutral-700
                    hover:file:bg-neutral-100 file:cursor-pointer cursor-pointer"
                  />
                  <p className="text-xs text-neutral-400 mt-1">You file must be in 2:1 Aspect Ratio</p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 items-start">
                <div>
                  <label className="text-sm font-medium text-neutral-700">Video Cover</label>
                  <p className="text-xs text-neutral-400">Optional</p>
                </div>
                <div className="col-span-2">
                  <input type="file" accept="video/*" className="text-sm text-neutral-600
                    file:mr-3 file:py-1.5 file:px-4 file:rounded-lg file:border file:border-neutral-200
                    file:text-xs file:font-semibold file:bg-neutral-50 file:text-neutral-700
                    hover:file:bg-neutral-100 file:cursor-pointer cursor-pointer"
                  />
                  <p className="text-xs text-neutral-400 mt-1">The file must be in 2:1 Aspect Ratio</p>
                </div>
              </div>
            </div>

            <div className="border-t border-neutral-100 bg-neutral-50/50 px-6 md:px-8 py-5">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                
                <div className="space-y-2">
                  <p className="text-sm font-semibold text-neutral-700">Publishing</p>
                  <div className="flex items-center gap-2">
                    <input type="checkbox" id="scheduling" className="rounded" />
                    <label htmlFor="scheduling" className="text-xs text-neutral-600">
                      Scheduling Public
                    </label>
                    <input type="date" className="border border-neutral-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#BB4D00] bg-white" />
                    <span className="text-xs text-neutral-400">until</span>
                    <input type="date" className="border border-neutral-200 rounded-lg px-2 py-1 text-xs focus:outline-none focus:border-[#BB4D00] bg-white" />
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
                      I agree with{" "}
                      <span className="text-[#BB4D00] underline cursor-pointer">terms & conditions</span>
                    </label>
                  </div>
                </div>

                <div className="flex gap-2.5">
                  <button
                    onClick={handleSaveDraft}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-neutral-700 border border-neutral-200 hover:bg-neutral-100 transition-colors cursor-pointer"
                  >
                    Draft
                  </button>
                  <button
                    onClick={handlePublish}
                    className="px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-[#EA580C] hover:bg-[#BB4D00] transition-colors cursor-pointer shadow-xs"
                  >
                    Publish
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}