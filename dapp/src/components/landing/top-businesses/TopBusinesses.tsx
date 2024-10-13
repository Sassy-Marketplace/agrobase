import React from "react";
import { Card, Cards } from "./Card";
import img1 from "@/assets/topCreators/Avatar Placeholder.svg";
import img2 from "@/assets/topCreators/Avatar Placeholder-1.svg";
import img3 from "@/assets/topCreators/Avatar Placeholder-2.svg";
import img4 from "@/assets/topCreators/Avatar Placeholder-3.svg";
import img5 from "@/assets/topCreators/Avatar Placeholder-4.svg";
import img6 from "@/assets/topCreators/Avatar Placeholder-5.svg";
import img7 from "@/assets/topCreators/Avatar Placeholder-6.svg";
import img8 from "@/assets/topCreators/Avatar Placeholder-7.svg";
import img9 from "@/assets/topCreators/Avatar Placeholder-8.svg";
import img10 from "@/assets/topCreators/Avatar Placeholder-9.svg";
import img11 from "@/assets/topCreators/Avatar Placeholder-10.svg";
import img12 from "@/assets/topCreators/Avatar Placeholder-11.svg";
import { lato, work } from "../../Font";
import { Button } from "@nextui-org/react";

export const business: Cards[] = [
  {
    num: 1,
    src: img1,
    name: "Keepitreal",
  },
  {
    num: 2,
    src: img2,
    name: "DigiLab",
  },
  {
    num: 3,
    src: img3,
    name: "GravityOne",
  },
  {
    num: 4,
    src: img4,
    name: "Juanie",
  },
  {
    num: 5,
    src: img5,
    name: "BlueWhale",
  },
  {
    num: 6,
    src: img6,
    name: "Mr Fox",
  },
  {
    num: 7,
    src: img7,
    name: "Shroomie",
  },
  {
    num: 8,
    src: img8,
    name: "Robotica",
  },
  {
    num: 9,
    src: img9,
    name: "RustyRobot",
  },
  {
    num: 10,
    src: img10,
    name: "Animakid",
  },
  {
    num: 11,
    src: img11,
    name: "Dotgu",
  },
  {
    num: 12,
    src: img12,
    name: "Ghiblier",
  },
];

export const TopBusinesses = () => {
  return (
    <div className="mt-[8rem] w-full flex flex-col gap-[3rem]">
      <div className="flex flex-col gap-3">
        <p
          className={`${work.className} text-2xl text-center md:text-left lg:text-4xl font-semibold`}
        >
          Top Farmers/Businesses
        </p>
        <div className="flex justify-between">
          <p
            className={`text-xl text-center md:text-left font-normal ${lato.className}`}
          >
            Checkout Top Rated Farmers And Business On The Marketplace.
          </p>
          <Button
            className={`hidden md:flex bg-transparent border-2 border-[#03ed0e] rounded-full px-16 py-6 text-sm ${lato.className} mr-2`}
          >
            View Rankings
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-4 lg:gap-6 justify-items-center">
        {business.map((item, index) => (
          <Card key={index} num={item.num} src={item.src} name={item.name} />
        ))}
      </div>
      <Button
        className={`md:hidden bg-transparent border-2 border-[#03ed0e] rounded-full px-16 py-6 text-sm ${lato.className} mr-2`}
      >
        View Rankings
      </Button>
    </div>
  );
};
