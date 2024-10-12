import Image from "next/image";
import React from "react";
import { lato, work } from "../../Font";

export interface Cards {
  icon: string;
  title: string;
  description: string;
}

export const Card = ({ icon, title, description }: Cards) => {
  return (
    <div className="rounded-xl flex flex-col items-center bg-[#3b3b3b] w-[300px] py-4 px-[2rem] hover:scale-95 transition-transform">
      <Image src={icon} alt="profile" width={300} height={300} />
      <div className="my-4">
        <p
          className={`mb-1 text-white font-semibold text-xl ${lato.className}`}
        >
          {title}
        </p>
        <p className={`mb-1 text-white font-regular text-sm ${lato.className}`}>
          {description}
        </p>
      </div>
    </div>
  );
};
