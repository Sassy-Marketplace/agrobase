import { space, work } from "@/components/Font";
import { AboutProduct } from "@/components/landing/trending/AboutProduct";
import Image from "next/image";
import React from "react";
import { Cards } from "./interface";

export const Card = ({ icon, src, name, location }: Cards) => {
  return (
    <div className="rounded-t-xl flex flex-col hover:scale-95 transition-transform mt-4">
      <Image
        className="w-full"
        src={src}
        alt="profile"
        width={240}
        height={240}
      />
      <div
        className={`mb-1 p-6 rounded-b-3xl bg-[#2b2b2b] flex flex-col gap-6`}
      >
        <AboutProduct product={name} src={icon} location={location} />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span
              className={`font-regular text-[#858584] text-xs ${space.className}`}
            >
              Price
            </span>
            <span
              className={`font-regular text-white text-sm ${space.className}`}
            >
              1.63 ETH
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`font-regular text-[#858584] text-xs ${space.className}`}
            >
              Highest Bid
            </span>
            <span
              className={`font-regular text-white text-sm ${space.className}`}
            >
              0.33 wETH
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
