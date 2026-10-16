"use client";

import React, { useState, useRef } from "react";
import Sidebar from "@/components/sidebar/SidebarDashboard";
import html2canvas from "html2canvas-pro";
import jsPDF from "jspdf";
import {
  ArrowUpTrayIcon,
  ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function OrganizerOverviewPage() {
  const [selectedEventFilter, setSelectedEventFilter] = useState("All event");
  const [selectedTimeFilter, setSelectedTimeFilter] = useState("This Year");
  const [chartPeriod, setChartPeriod] = useState<"Day" | "Month" | "Years">("Years");

  const chartData = [
    { label: "Jan", height: "35%" },
    { label: "Feb", height: "60%" },
    { label: "Mar", height: "85%" },
    { label: "Apr", height: "65%" },
    { label: "May", height: "45%" },
    { label: "Jun", height: "35%" },
    { label: "Jul", height: "70%" },
    { label: "Aug", height: "20%" },
    { label: "Sep", height: "72%" },
    { label: "Oct", height: "40%" },
    { label: "Nov", height: "95%" },
    { label: "Dec", height: "75%" },
  ];

  const popularEvents = [
    { name: "Orchestra", attendees: 100, location: "Nepal", date: "01/10/2026", views: 100 },
    { name: "Orchestra", attendees: 50, location: "Netherlands", date: "01/10/2026", views: 99 },
    { name: "Orchestra", attendees: 50, location: "Canada", date: "01/10/2026", views: 50 },
    { name: "Savannah Orchestra", attendees: 50, location: "Germany", date: "01/10/2026", views: 12 },
  ];

  const reportRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const handleExportPDF = async () => {
    if(!reportRef.current) return

    try {
      setIsExporting(true)
      
      const canvas = await html2canvas(reportRef.current, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff"
      })

      const imgData = canvas.toDataURL("image/png")

      const pdf = new jsPDF("p", "mm", "a4")
      const pageWidth = pdf.internal.pageSize.getWidth()
      const pageHeight = pdf.internal.pageSize.getHeight()

      const imgWidth = pageWidth
      const imgHeight = (canvas.height * imgWidth) / canvas.width

      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
      heightLeft -= pageHeight

      while (heightLeft > 0) {
        position = heightLeft - imgHeight
        pdf.addPage()
        pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight)
        heightLeft -= pageHeight
      }

      pdf.save("overview-report-organizer.pdf")
    }
    catch (error) {
      console.error("Gagal export PDF: ", error)
    } finally {
      setIsExporting(false)
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] text-neutral-800 p-4 md:p-8 font-sans">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 items-start">
        
        {/* Pasang Sidebar */}
        <Sidebar />

        {/* Konten Utama Overview */}
        <main 
        ref={reportRef}
        className="flex-1 w-full bg-white rounded-2xl p-6 md:p-8 shadow-xs border border-neutral-100">
          
          {/* Header & Filter Controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <h1 className="text-xl md:text-2xl font-bold text-neutral-900">
              Overview
            </h1>

            {/* Filter Dropdowns & Export Button */}
            <div 
            data-html2canvas-ignore="true"
            className="flex flex-wrap items-center gap-2.5">
              {/* Filter 1: Event */}
              <div className="relative">
                <select
                  value={selectedEventFilter}
                  onChange={(e) => setSelectedEventFilter(e.target.value)}
                  className="appearance-none bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs md:text-sm font-medium py-2 pl-3 pr-8 rounded-full focus:outline-none focus:border-[#BB4D00] cursor-pointer"
                >
                  <option value="All event">All event</option>
                  <option value="Orchestra 2026">Orchestra 2026</option>
                  <option value="Savannah Concert">Savannah Concert</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Filter 2: Periode Waktu */}
              <div className="relative">
                <select
                  value={selectedTimeFilter}
                  onChange={(e) => setSelectedTimeFilter(e.target.value)}
                  className="appearance-none bg-neutral-50 border border-neutral-200 text-neutral-700 text-xs md:text-sm font-medium py-2 pl-3 pr-8 rounded-full focus:outline-none focus:border-[#BB4D00] cursor-pointer"
                >
                  <option value="This Year">This Year</option>
                  <option value="This Month">This Month</option>
                  <option value="All Time">All Time</option>
                </select>
                <ChevronDownIcon className="w-4 h-4 text-neutral-400 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>

              {/* Button Export PDF dengan ArrowUpTrayIcon */}
              <button
                onClick={handleExportPDF}
                disabled={isExporting}
                className="flex items-center gap-1.5 bg-[#EA580C] hover:bg-[#BB4D00] text-white px-3.5 py-2 rounded-full text-xs md:text-sm font-semibold transition-all shadow-xs cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <ArrowUpTrayIcon className="w-4 h-4" />
                <span>{isExporting ? "Exporting..." : "Export to PDF"}</span>
              </button>
            </div>
          </div>

          {/* Stats Cards (4 Kotak Metrik) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <div className="border border-neutral-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-500 mb-2">Revenue</p>
                <p className="text-xl md:text-2xl font-bold text-neutral-900">
                  Rp. 480.2 M
                </p>
              </div>
              <p className="text-xs text-emerald-600 font-semibold mt-3">
                + 12 % vs last month
              </p>
            </div>

            <div className="border border-neutral-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-500 mb-2">Ticket sold</p>
                <p className="text-xl md:text-2xl font-bold text-neutral-900">
                  1212
                </p>
              </div>
              <p className="text-xs text-neutral-400 font-medium mt-3">
                of 500 quota
              </p>
            </div>

            <div className="border border-neutral-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-500 mb-2">Pending Review</p>
                <p className="text-xl md:text-2xl font-bold text-neutral-900">
                  3
                </p>
              </div>
              <p className="text-xs text-neutral-400 font-medium mt-3">
                Needs approval
              </p>
            </div>

            <div className="border border-neutral-200 rounded-xl p-4 flex flex-col justify-between">
              <div>
                <p className="text-xs font-semibold text-neutral-500 mb-2">Check in rate</p>
                <p className="text-xl md:text-2xl font-bold text-neutral-900">
                  71,8%
                </p>
              </div>
              <p className="text-xs text-neutral-400 font-medium mt-3">
                870 of 1212 attended
              </p>
            </div>
          </div>

          {/* Bar Chart */}
          <div className="border border-neutral-200 rounded-xl p-5 mb-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-base font-bold text-neutral-900">
                Ticket Sales, 2026
              </h2>

              <div className="flex items-center gap-1 border border-neutral-200 rounded-full p-0.5 text-xs">
                {(["Day", "Month", "Years"] as const).map((period) => (
                  <button
                    key={period}
                    onClick={() => setChartPeriod(period)}
                    className={`px-3 py-1 rounded-full font-medium transition-colors cursor-pointer ${
                      chartPeriod === period
                        ? "bg-amber-100/70 text-amber-800 font-bold border border-amber-300"
                        : "text-neutral-500 hover:text-neutral-800"
                    }`}
                  >
                    {period}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-48 w-full flex items-end justify-between gap-1.5 sm:gap-3 px-2 pt-4">
              {chartData.map((bar, index) => (
                <div key={index} className="flex-1 flex flex-col items-center h-full justify-end group">
                  <div
                    style={{ height: bar.height }}
                    className="w-full bg-[#F6D268] hover:bg-[#F3C43D] rounded-t-sm transition-all duration-300 relative cursor-pointer"
                  >
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-7 left-1/2 -translate-x-1/2 bg-neutral-800 text-white text-[10px] px-1.5 py-0.5 rounded pointer-events-none whitespace-nowrap">
                      {bar.label}: {bar.height}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Popular Events Table */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-base font-bold text-neutral-900">
                The most your popular event
              </h2>
              <button 
                onClick={() => alert("Navigasi ke Manage Events")}
                className="text-xs md:text-sm font-semibold text-[#BB4D00] hover:underline cursor-pointer"
              >
                Manage events
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs md:text-sm">
                <thead>
                  <tr className="text-neutral-400 font-normal border-b border-neutral-100">
                    <th className="pb-3 font-medium">Event</th>
                    <th className="pb-3 font-medium">Attendee</th>
                    <th className="pb-3 font-medium">Location</th>
                    <th className="pb-3 font-medium">Date</th>
                    <th className="pb-3 font-medium">Views</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-neutral-100">
                  {popularEvents.map((event, idx) => (
                    <tr key={idx} className="hover:bg-neutral-50/60 transition-colors">
                      <td className="py-3.5 font-medium text-neutral-800 max-w-32.5 truncate" title={event.name}>{event.name}</td>
                      <td className="py-3.5 text-neutral-600">{event.attendees}</td>
                      <td className="py-3.5 text-neutral-600">{event.location}</td>
                      <td className="py-3.5 text-neutral-600">{event.date}</td>
                      <td className="py-3.5 text-neutral-600">{event.views}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

        </main>
      </div>
    </div>
  );
}