import { space, work } from "@/components/Font";
import { AboutProduct } from "@/components/landing/trending/AboutProduct";
import React from "react";
import { useAgrobaseContext } from "@/context";
import marketAbi from "@/utils/abis/marketAbi.json";
import { useReadContract } from "wagmi";
import { GetImage } from "@/components/products/ProductsDisplay";

export const Card = ({ item }: { item: any }) => {
  const { userData } = useAgrobaseContext();
  return (
    <div className="rounded-t-xl flex flex-col hover:scale-95 transition-transform mt-4">
      {/* {data?.map((item, index) => { */}
      {/* <div> */}
      <GetImage nftContract={item?.nftContract} tokenId={item?.tokenId} />
      <div
        className={`mb-1 p-6 rounded-b-3xl bg-[#2b2b2b] flex flex-col gap-6`}
      >
        <AboutProduct
          product={item?.name}
          src={""}
          location={userData?.businessLocation}
        />
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <span
              className={`font-regular text-[#858584] text-xs ${space.className}`}
            >
              Price
            </span>
            <span
              className={`font-regular text-white text-sm ${space.className}`}
            >
              {Number(item?.price)} ETH
            </span>
          </div>
          <div className="flex flex-col items-end gap-2">
            <span
              className={`font-regular text-[#858584] text-xs ${space.className}`}
            >
              Highest Bid
            </span>
            <span
              className={`font-regular text-white text-sm ${space.className}`}
            >
              0.33 wETH
            </span>
          </div>
        </div>
      </div>
      {/* </div> */}
      {/* })} */}
    </div>
  );
};
