"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Youtube, Twitter, Instagram } from "lucide-react";
import discord from "@/assets/DiscordLogo.svg";
import { fontGrotesk, space, work } from "../Font";
import Image from "next/image";
import AfroBaseLogo from "@/assets/logo.svg";

const Footer: React.FC = () => {
  const [pathName, setPathName] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setPathName(window.location?.pathname);
    }
  }, []);

  return (
    <footer
      className={`bg-[#042B2B] text-white py-8  border-t border-[#2B2B2B] w-full flex flex-col items-center ${fontGrotesk.className}`}
    >
      <div className="w-10/12">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-3 gap-6 lg:gap-0">
          <div>
            <Image className="mb-7" src={AfroBaseLogo} alt="logo" />
            <p className={`text-sm text-[#cccccc] mb-4 ${work.className}`}>
              Real World Agro marketplace
              <br />
              powered by Base
            </p>
            <p className={`text-sm text-[#cccccc] mb-4 ${work.className}`}>
              Join our community
            </p>
            {/* Social Media Icons */}
            <div className="flex space-x-0 justify-left items-center mt-[-10px] gap-2">
              <Image src={discord} alt="discord logo" width={32} height={32} />
              <Youtube className="text-[#858584] w-[32px] h-[32px]" />
              <Twitter className="text-[#858584] w-[32px] h-[32px]" />
              <Instagram className="text-[#858584] w-[32px] h-[32px]" />
            </div>
          </div>

          {/* Explore Section */}
          <div>
            <h2 className={`text-2xl font-bold mb-4 ${space.className}`}>
              Explore
            </h2>
            <ul
              className={`space-y-2 text-sm text-[#cccccc] ${work.className}`}
            >
              <li>
                <Link
                  className="hover:underline"
                  href={pathName == "/marketplace" ? "/" : "/marketplace"}
                >
                  {pathName == "/marketplace" ? "Home" : "Marketplace"}
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/community">
                  Community
                </Link>
              </li>
              <li>
                <Link className="hover:underline" href="/rankings">
                  Rankings
                </Link>
              </li>
              <li>
                <Link
                  className="hover:underline"
                  href={pathName == "/connect-wallet" ? "/" : "/connect-wallet"}
                >
                  {pathName == "/connect-wallet" ? "Home" : "Connect a wallet"}
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full">
            <h2 className={`text-2xl font-bold mb-4 ${space.className}`}>
              Join Our Weekly Digest
            </h2>
            <p className={`text-sm text-[#cccccc] mb-4 ${work.className}`}>
              Get exclusive promotions & updates <br /> straight to your inbox.
            </p>
            <div className="flex items-center w-full">
              {/* Show only on medium and large screens */}
              <div className="hidden md:flex md:flex-row md:justify-between rounded-[15px] bg-white shadow-md w-full md:w-[500px] lg:w-full ">
                {/* Input field */}
                <input
                  type="email"
                  placeholder="Enter your email here"
                  className={`px-4 py-3 text-black bg-transparent placeholder-gray-500 focus:outline-none ${work.className}`}
                />
                {/* Subscribe Button */}
                <button
                  className={`px-6 py-3 bg-[#03ED0E] rounded-2xl flex gap-3 text-center text-black font-semibold hover:bg-green-500 ${work.className}`}
                >
                  Subscribe
                </button>
              </div>

              {/* Show only on small screens */}
              <div className="flex md:hidden shadow-md w-full flex-col">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="px-4 py-3 bg-white rounded-[25px] text-black placeholder-gray-500 w-full focus:outline-none mb-[20px]"
                />
                {/* Subscribe Button */}
                <button className="px-6 py-3 bg-[#03ED0E] rounded-[25px]  text-center text-black font-semibold w-full hover:bg-green-500 flex items-center justify-center gap-3">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full flex flex-col items-center">
        <div className="mt-8 border-t border-gray-600 pt-4 text-sm text-[#cccccc] w-10/12 text-left">
          © Agrobase Marketplace.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
