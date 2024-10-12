import React from "react";
import { Collections } from "./Collections";
import { lato, work } from "../Font";

export const TrendCollection = () => {
  return (
    <div className="mt-[5rem] w-full flex flex-col gap-[3rem]">
      <div className="flex flex-col gap-3">
        <p className={`${work.className} text-4xl font-semibold`}>
          Trending Collection
        </p>
        <p className={`text-xl font-normal ${lato.className}`}>
          Checkout Our Weekly Updated Trending Collection.
        </p>
      </div>
      <Collections />
    </div>
  );
};
