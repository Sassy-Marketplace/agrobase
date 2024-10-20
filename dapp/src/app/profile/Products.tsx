import { lato, work } from "@/components/Font";
import { Button, Link } from "@nextui-org/react";
import React from "react";
import { products } from "./mockinfo";
import { Card } from "./Card";

export const Products = () => {
  return (
    <div className="my-[4rem] w-[80%] mx-auto flex flex-col gap-[3rem]">
      <div className="flex justify-between">
        <p className={`${work.className} text-2xl lg:text-4xl font-semibold`}>
          My Listings
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
        {products.map((item, index) => (
          <Card
            key={index}
            icon={item.icon}
            location={item.location}
            src={item.src}
            name={item.name}
          />
        ))}
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
