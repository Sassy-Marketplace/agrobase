import React from "react";
import { lato, work } from "../Font";
import { Button, Link } from "@nextui-org/react";

export const Jumbotron = ({
  name,
  guide,
  btn1,
  href1,
}: {
  name: string;
  guide: string;
  btn1: string;
  href1: string;
}) => {
  return (
    <div className="md:w-2/3 rounded-xl bg-[#03ed0e] border-2 border-[#042B2B] py-6 px-10 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p
          className={`w-full text-[#042b2b] font-semibold text-2xl ${lato.className}`}
        >
          {name}
        </p>
        <p
          className={`w-full text-[#042b2b] font-semibold text-sm ${lato.className}`}
        >
          {guide}
        </p>
      </div>
      <div className="flex justify-center">
        <Button
          className={`w-full bg-[#042b2b] p-2 text-[#03ed0e] rounded-xl font-regular text-sm ${work.className}`}
          as={Link}
          href={`/${href1}`}
        >
          {btn1}
        </Button>
      </div>
    </div>
  );
};
