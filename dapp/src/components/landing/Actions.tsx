import React from "react";
import { fontGrotesk } from "../Font";
import bg from "@/assets/DEZ TEAM UP (2)/actionbg.svg";

export const Actions = () => {
  return (
    <div
      className="relative h-[30vh] md:h-[50vh] lg:h-[80vh] w-full mt-[4rem] bg-[rgb(0,0,0,0)] bg-center bg-cover flex items-center justify-center"
      style={{
        backgroundImage: `url(${bg.src})`,
        // backgroundColor: "rgba(50,100,50,0.9)",
        backgroundBlendMode: "darken",
      }}
    >
      <div className="absolute w-full h-full bg-[#042b2b]/50 backdrop-blur-sm"></div>
      <div
        className={`flex gap-5 md:gap-10 lg:gap-20 text-xl md:text-2xl lg:text-6xl font-bold items-center justify-center z-10 ${fontGrotesk.className}`}
      >
        <p className="py-10">OWN</p>
        <p className="border-x-5 lg:border-x-8 border-white px-5 md:px-10 lg:px-20 py-10">
          TRADE
        </p>
        <p className="py-10">INVEST</p>
      </div>
    </div>
  );
};
