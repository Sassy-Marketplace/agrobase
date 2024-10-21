import { Button, Link } from "@nextui-org/react";
import React, { useState } from "react";
import { lato, work } from "../Font";

export const CTA = ({
  motive,
  guide,
  btn1,
  href1,
}: {
  motive: string;
  guide: string;
  btn1: string;
  href1: string;
}) => {
  const [isLoading, setLoading] = useState(false);

  return (
    <div className="lg:w-1/3 rounded-xl shadow-[#03ed0e] shadow-md bg-[#042B2B] p-4 flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <p
          className={`w-full text-[#03ed0e] font-semibold text-lg ${lato.className}`}
        >
          {motive}
        </p>
        <p
          className={`w-full text-[#03ed0e] font-regular text-xs ${lato.className}`}
        >
          {guide}
        </p>
      </div>
      <div>
        <Button
          isLoading={isLoading}
          onClick={() => setLoading(true)}
          className={`w-full text-[#042b2b] bg-[#03ed0e] rounded-xl font-semibold text-sm ${work.className}`}
          as={Link}
          href={`/${href1}`}
        >
          {btn1}
        </Button>
      </div>
    </div>
  );
};
