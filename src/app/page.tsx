'use client';

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import styles from "./page.module.css";
import { prisma } from '@/lib/prisma'; //cara ketika butuh query ke database (di Server Components atau API Routes) cukup gunakan ini
import HomePageContent from "@/components/home/HomePageContent";
import Navbar from "@/components/menubar/navbar";
import Footer from "@/components/menubar/footer";

export default function Home() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if(searchParams.get("verified") === "true") {
      setShowPopup(true);
      router.replace("/", { scroll: false });
    }
  }, [searchParams, router]);

  return (
    <div className={styles.page}>
      <Navbar />
      <main className={styles.main}>
        <HomePageContent />
      </main>
      <Footer />
    </div>
  );
}