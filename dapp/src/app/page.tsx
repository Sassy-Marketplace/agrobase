"use client";
// import Footer from "src/components/Footer";
// import { ONCHAINKIT_LINK } from "src/links";
import { useAccount } from "wagmi";
// import LoginButton from "../components/LoginButton";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";
import { TrendCollection } from "@/components/trending/TrendCollection";

export default function Page() {
  const { address } = useAccount();
  const account = useAccount();

  return (
    <main className="flex flex-col items-center h-full w-full max-w-full md:w-[1008px]">
      <Navbar />
      <div className="flex flex-col items-center">
        <Hero />
        <TrendCollection />
      </div>
    </main>
  );
}
