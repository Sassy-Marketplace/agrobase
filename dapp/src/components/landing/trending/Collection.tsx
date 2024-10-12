import React from "react";
import { AboutProduct } from "./AboutProduct";
import Image from "next/image";
import { space } from "../../Font";

export interface Types {
  img0: string;
  img1: string;
  img2: string;
  product: string;
  src: string;
  location: string;
}
export const Collection = ({
  img0,
  img1,
  img2,
  product,
  src,
  location,
}: Types) => {
  return (
    <div className="flex flex-col gap-4 hover:scale-95 transition-transform">
      <Image
        className="rounded-xl"
        src={img0}
        alt="product image"
        width={300}
        height={300}
      />{" "}
      <div className="flex justify-evenly gap-2">
        <Image
          className="rounded-xl"
          src={img1}
          alt="crop"
          width={90}
          height={100}
        />
        <Image
          className="rounded-xl"
          src={img2}
          alt="crop"
          width={90}
          height={100}
        />
        <div
          className={`w-[90px] flex flex-row justify-center items-center rounded-2xl font-bold ${space.className} bg-[#a259ff] text-lg`}
        >
          1025+
        </div>
      </div>
      <AboutProduct product={product} src={src} location={location} />
    </div>
  );
};
