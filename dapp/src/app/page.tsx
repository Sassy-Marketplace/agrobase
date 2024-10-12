"use client";
// import Footer from "src/components/Footer";
// import { ONCHAINKIT_LINK } from "src/links";
import { useAccount } from "wagmi";
// import LoginButton from "../components/LoginButton";
import Navbar from "../components/Navbar";
import Hero from "@/components/Hero";

export default function Page() {
  const { address } = useAccount();
  const account = useAccount();

  return (
    <div className="flex flex-col h-full w-full max-w-full px-1 md:w-[1008px]">
      <Navbar />
      <Hero />
    </div>
  );
}
