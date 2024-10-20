"use client";
import { useEffect, useState } from "react";
import { fontGrotesk, libre } from "@/components/Font";
import { Navbar, ProductsDIsplay } from "@/components";
import Footer from "@/components/landing/Footer";
import MarketPlaceHero from "./hero";
import { products } from "./dummy";
import { campaigns } from "../campaigns/dummy";
import CampaignsDisplay from "@/components/campaigns/CampaignsDisplay";
import { useRead } from "@/utils/fetchContracts";
import { useAccount } from "wagmi";
import { Address } from "viem";
import { arrayBuffer } from "stream/consumers";
// 03ED0E

const MarketPlacePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState("products");
  const [marketItems, setMarketItems] = useState<any[]>([]);

  const tabContents = activeTab == "products" ? products : campaigns;

  const {
    data: marketPlaceItems,
    error: marketPlaceError,
    isLoading: marketPlaceLoading,
  } = useRead({
    functionName: "fetchAllMarketItems",
    contractName: "marketFactory",
  });
  console.log("Marketplace items", marketPlaceItems);

  useEffect(() => {
    if (marketPlaceError) {
      console.error("Error fetching marketplace data: ", marketPlaceError);
    }
  }, [marketPlaceError]);

  useEffect(() => {
    if (marketPlaceItems) {
      //@ts-expect-error
      setMarketItems(marketPlaceItems);
    }
  }, [marketPlaceItems, marketItems]);

  return (
    <div className="h-full bg-[#042B2B] flex flex-col justify-between items-center text-white w-full">
      {/* Header */}
      <Navbar />
      {/* <Header/> */}

      <section className={`w-10/12 ${fontGrotesk.className}`}>
        {/* Hero */}
        <MarketPlaceHero />
        {/* {/* This should contain trending products */}
      </section>

      {/*  */}
      <section
        className={`w-full bg-[#042B2B] text-white ${fontGrotesk.className}`}
      >
        <div className="flex flex-col bg-[#2B2B2B] pt-3 w-full items-center">
          <div className="flex w-10/12 justify-center space-x-10">
            <button
              className={`text-lg font-semibold w-1/2 py-2 border-b-[2px]  ${
                activeTab === "products"
                  ? "text-white border-gray-400"
                  : "text-gray-400 border-transparent"
              }`}
              onClick={() => setActiveTab("products")}
            >
              Agro Products{" "}
              <span className="hidden md:inline ml-2 px-2 py-1 bg-gray-800 rounded-full text-sm text-center">
                302
              </span>
            </button>
            <button
              className={`text-lg font-semibold w-1/2 py-2 border-b-[2px] ${
                activeTab === "campaigns"
                  ? "text-white border-gray-400"
                  : "text-gray-400 border-transparent"
              }`}
              onClick={() => setActiveTab("campaigns")}
            >
              Campaigns{" "}
              <span className="hidden md:inline ml-2 px-2 py-1 bg-gray-800 rounded-full text-sm text-center">
                67
              </span>
            </button>
          </div>
        </div>

        <div className="w-full flex flex-col items-center mb-[80px]">
          <div className="w-10/12">
            {activeTab === "products" ? (
              <ProductsDIsplay tabContents={marketItems} />
            ) : (
              <CampaignsDisplay campaigns={tabContents} />
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default MarketPlacePage;
