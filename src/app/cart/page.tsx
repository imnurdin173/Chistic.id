import React from 'react';
import Navbar from '@/components/menubar/navbar'; // Menggunakan navbar utama yang sudah ada
import CartItemTable from '@/components/cart/CartItemTable';
import VoucherSection from '@/components/cart/VoucherSection';
import OrderSummary from '@/components/cart/OrderSummary';
import PaymentMethod from '@/components/cart/PaymentMethod';

export default function CartPage() {
  return (
    <div className="min-h-screen bg-[#FAFAFC] pb-16">
      {/* Navbar Global */}
      <Navbar />

      {/* Container Utama */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <h1 className="text-xl font-extrabold text-gray-900 mb-6">
          Event Cart - Customer Transactions
        </h1>
        
        {/* Layout Grid Utama */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Kolom Kiri: Tabel Keranjang Item Event */}
          <div className="lg:col-span-8">
            <CartItemTable />
          </div>

          {/* Kolom Kanan: Voucher, Ringkasan Order, & Metode Pembayaran */}
          <div className="lg:col-span-4 space-y-4">
            <VoucherSection />
            <OrderSummary />
            <PaymentMethod />
          </div>

        </div>
      </main>
    </div>
  );
}