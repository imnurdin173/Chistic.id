import Image from "next/image";
import styles from "./page.module.css";
import { prisma } from '@/lib/prisma'; //cara ketika butuh query ke database (di Server Components atau API Routes) cukup impor ini
import Navbar from "@/components/menubar/navbar";
import Footer from "@/components/menubar/footer";

export default function Home() {
  return (
    <div className={styles.page}>
        <Navbar />
      <main className={styles.main}>
        <div>
          <h1 className="text-xl font-bold underline text-blue-600">Hello Imam, Kiel, Muti</h1>
        </div>
        <p className="text-3xl">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Deserunt accusantium quisquam aliquid enim quae eum voluptatum maiores tenetur commodi corporis, dignissimos odit, hic fuga numquam totam sit placeat error ipsum!
        </p>
      </main>
      <Footer />
    </div>
  );
}
