import React from "react";
import { Card, Cards } from "./Card";
import img1 from "@/assets/DEZ TEAM UP (2)/crops/Photo & Icon.svg";
import img2 from "@/assets/DEZ TEAM UP (2)/crops/Photo & Icon-1.svg";
import img3 from "@/assets/DEZ TEAM UP (2)/crops/Photo & Icon-2.svg";
import img4 from "@/assets/DEZ TEAM UP (2)/crops/Photo & Icon-3.svg";
import img5 from "@/assets/DEZ TEAM UP (2)/crops/Photo & Icon-4.svg";
import img6 from "@/assets/DEZ TEAM UP (2)/crops/Photo & Icon-5.svg";
import img7 from "@/assets/DEZ TEAM UP (2)/crops/Photo & Icon-6.svg";
import img8 from "@/assets/DEZ TEAM UP (2)/crops/Photo & Icon-7.svg";
import { lato, work } from "../../Font";
import { Button } from "@nextui-org/react";

export const business: Cards[] = [
  { src: img1, name: "Cash Crops" },
  { src: img2, name: "Food Crops" },
  { src: img3, name: "Restuarants" },
  { src: img4, name: "Fruits" },
  { src: img5, name: "Vegetables" },
  { src: img6, name: "Farm Animals" },
  { src: img7, name: "Pets" },
  { src: img8, name: "Seeds" },
];

export const Categories = () => {
  return (
    <div className="mt-[8rem] w-full flex flex-col gap-[3rem] px-[3rem]">
      <p className={`${work.className} text-4xl font-semibold`}>
        Browse Categories
      </p>
      <div className="grid grid-cols-4 gap-6">
        {business.map((item, index) => (
          <Card key={index} src={item.src} name={item.name} />
        ))}
      </div>
    </div>
  );
};
