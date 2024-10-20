import { lato, work } from "@/components/Font";
import { Button, Link } from "@nextui-org/react";
import React from "react";
import { products } from "./mockinfo";
import { Card } from "./Card";
import { useReadContract } from "wagmi";
import marketAbi from "@/utils/abis/marketAbi.json";
import { useAgrobaseContext } from "@/context";

export const Products = () => {
  const { userData } = useAgrobaseContext();
  const { data, isLoading, error } = useReadContract({
    abi: marketAbi,
    address: userData?.store,
    functionName: "fetchMarketItems",
  });
  console.log("Get market items", data);

  return (
    <div className="my-[4rem] w-[80%] mx-auto flex flex-col gap-[3rem]">
      <div className="flex justify-between">
        <p className={`${work.className} text-2xl lg:text-4xl font-semibold`}>
          Products
        </p>

        <Button
          as={Link}
          href="/marketplace"
          className={`hidden md:flex bg-transparent border-2 border-[#03ed0e] rounded-full px-16 py-6 text-sm ${lato.className} mr-2`}
        >
          Go to Marketplace
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 md:gap-6">
        {data?.map((item, index) => <Card item={item} />)}
      </div>
      <Button
        as={Link}
        href="/marketplace"
        className={`md:hidden bg-transparent border-2 border-[#03ed0e] rounded-full px-16 py-6 text-sm ${lato.className} mr-2`}
      >
        Go to Marketplace
      </Button>
    </div>
  );
};
