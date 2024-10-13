"use client";
import { useAccount } from "wagmi";
import Navbar from "../components/Navbar";
import Hero from "@/components/landing/Hero";
import { TrendCollection } from "@/components/landing/trending/TrendCollection";
import { TopBusinesses } from "@/components/landing/top-businesses/TopBusinesses";
import { Categories } from "@/components/landing/categories/Categories";
import HowItWorks from "@/components/landing/how-it-works/HowItWorks";
import Footer from "@/components/landing/Footer";
import { Subscribe } from "@/components/landing/Subscribe";
import { Actions } from "@/components/landing/Actions";

export default function Page() {
  return (
    <main className="flex flex-col items-center h-full w-full max-w-full">
      <Navbar />
      <div className="w-[85%] mx-auto">
        <Hero />
        <TrendCollection />
        <TopBusinesses />
        <Categories />
      </div>
      <Actions />
      <HowItWorks />
      <Subscribe />
      <Footer />
    </main>
  );
}
