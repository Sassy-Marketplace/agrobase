import React from "react";
import { Card, Cards } from "./Card";
import img1 from "@/assets/DEZ TEAM UP (2)/icons/Icon.svg";
import img2 from "@/assets/DEZ TEAM UP (2)/icons/Icon (1).svg";
import img3 from "@/assets/DEZ TEAM UP (2)/icons/Icon (2).svg";
import { lato, work } from "../../Font";
import { Button } from "@nextui-org/react";

const steps = [
  {
    icon: img1,
    title: "Setup Your Wallet",
    description:
      "Once you’ve set up your wallet of choice, connect it to OpenSea by clicking the wallet icon in the top right corner. Learn about the wallets we support.",
  },
  {
    icon: img2,
    title: "Create Collection",
    description:
      "Upload your work then Click My Collections and set up your collection. Add social links, a description, profile & banner images, and set a secondary sales fee.",
  },
  {
    icon: img3,
    title: "Start Earning",
    description:
      "Choose between auctions, fixed-price listings, and declining-price listings. You choose how you want to sell your Agroproducts  and we help you sell them",
  },
];

const HowItWorks = () => {
  return (
    <div className="mt-[4rem] w-full lg:w-[80%] mx-auto flex flex-col gap-[3rem] px-[3rem]">
      <div className="flex flex-col items-center md:items-start gap-4">
        <p className={`${work.className} text-4xl font-semibold`}>
          How It Works
        </p>
        <p className={`text-xl font-normal ${lato.className}`}>
          Find Out How To Get Started{" "}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-items-center">
        {steps.map((item, index) => (
          <Card
            key={index}
            icon={item.icon}
            title={item.title}
            description={item.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HowItWorks;
