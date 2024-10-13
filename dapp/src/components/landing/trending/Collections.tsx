import React from "react";
import { Collection } from "./Collection";
import ava1 from "@/assets/trending/avatars/Avatar.svg";
import ava2 from "@/assets/trending/avatars/Avatar-1.svg";
import ava3 from "@/assets/trending/avatars/Avatar.svg";
import big1 from "@/assets/trending/bigcrops/image.svg";
import big2 from "@/assets/trending/bigcrops/image-3.svg";
import big3 from "@/assets/trending/bigcrops/image-6.svg";
import small1 from "@/assets/trending/small crops/image-1.svg";
import small2 from "@/assets/trending/small crops/image-2.svg";
import small3 from "@/assets/trending/small crops/image-4.svg";
import small4 from "@/assets/trending/small crops/image-5.svg";
import small5 from "@/assets/trending/small crops/image-7.svg";
import small6 from "@/assets/trending/small crops/image-8.svg";

export const Collections = () => {
  return (
    <div className="flex flex-col lg:flex-row items-center gap-8">
      <Collection
        img0={big1}
        img1={small1}
        img2={small2}
        product={`Cocoa Farm`}
        src={ava1}
        location={`Nigeria`}
      />
      <Collection
        img0={big2}
        img1={small3}
        img2={small4}
        product={`Olonto Pig Farm`}
        src={ava2}
        location={`Zambia`}
      />
      <Collection
        img0={big3}
        img1={small5}
        img2={small6}
        product={`Sweet Grapes`}
        src={ava3}
        location={`Algeria`}
      />
    </div>
  );
};
