import Image from "next/image";
import React from "react";
import { space, work } from "../../Font";

export interface Cards {
  num: number;
  src: string;
  name: string;
}

export const Card = ({
  num,
  src,
  name,
}: {
  num: number;
  src: string;
  name: string;
}) => {
  return (
    <div className="rounded-xl bg-[#3b3b3b] p-4 hover:scale-105 transition-transform">
      <div className="flex gap-6 mb-0 md:mb-6">
        <div className="flex justify-center items-center text-[#858584] bg-[#212121] rounded-full w-[24px] h-[24px]">
          {num}
        </div>
        <div className="hidden md:flex md:justify-center md:items-start">
          <Image
            className=""
            src={src}
            alt="profile"
            width={120}
            height={120}
          />
        </div>
      </div>
      <div className="md:hidden mb-6 md:mb-0 flex justify-center items-start">
        <Image className="" src={src} alt="profile" width={120} height={120} />
      </div>
      <div
        className={`text-center mb-1 text-white font-bold text-xl ${work.className}`}
      >
        {name}
      </div>
      <div className="flex justify-center gap-2">
        <span className={`text-[#858584] text-sm ${work.className}`}>
          Total Sales:
        </span>
        <span className={`text-white text-sm ${space.className}`}>
          34.53 ETH
        </span>
      </div>
    </div>
  );
};
