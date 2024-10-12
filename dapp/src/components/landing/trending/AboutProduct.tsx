import Image from "next/image";
import React from "react";
import { work } from "../../Font";

interface Types {
  product: string;
  src: string;
  location: string;
}

export const AboutProduct = ({ product, src, location }: Types) => {
  return (
    <div className="flex flex-col gap-2">
      <p className={`text-xl font-bold ${work.className}`}>{product}</p>
      <div className="flex gap-4">
        <Image src={src} alt="avatar" width={24} height={24} />
        <p className={`text-sm ${work.className}`}>{location}</p>
      </div>
    </div>
  );
};
