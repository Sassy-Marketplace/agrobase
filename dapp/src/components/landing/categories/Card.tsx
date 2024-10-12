import Image from "next/image";
import React from "react";
import { work } from "../../Font";

export interface Cards {
  src: string;
  name: string;
}

export const Card = ({ src, name }: Cards) => {
  return (
    <div className="rounded-t-xl flex flex-col hover:scale-95 transition-transform">
      <Image
        className="w-full"
        src={src}
        alt="profile"
        width={240}
        height={240}
      />
      <span
        className={`text-center mb-1 font-bold text-xl ${work.className} py-6 rounded-b-3xl bg-[#3b3b3b]`}
      >
        {name}
      </span>
    </div>
  );
};
