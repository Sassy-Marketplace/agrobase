"use client";
// import Footer from "src/components/Footer";
// import { ONCHAINKIT_LINK } from "src/links";
import { useAccount } from "wagmi";
// import LoginButton from "../components/LoginButton";
import Navbar from "../components/Navbar";

export default function Page() {
  const { address } = useAccount();
  const account = useAccount();

  return (
    <div className="flex h-full w-96 max-w-full px-1 md:w-[1008px]">
      <Navbar />
    </div>
  );
}
