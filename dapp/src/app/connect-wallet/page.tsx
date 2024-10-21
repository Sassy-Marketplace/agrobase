"use client";
import { Navbar } from "@/components";
import React, { useEffect, useState } from "react";
import AfroBaseLogo from "@/assets/logo.svg";
import { useAccount } from "wagmi";
import { ConnectWallet } from "@coinbase/onchainkit/wallet";
import checkMark from "../../assets/check_mark.png";
import { Name } from "@coinbase/onchainkit/identity";
import { base } from "viem/chains";
import Link from "next/link";
import Image from "next/image";
import { fontGrotesk, lato, libre, work } from "@/components/Font";
import { useRead } from "@/utils/fetchContracts";
import { useRouter } from "next/navigation";
import { Basenames } from "@/components/basenames";
import { Button } from "@nextui-org/react";

const ConnectionPage: React.FC = () => {
  const [isLoading, setLoading] = useState(false);

  const { address: connectedAddress, isConnected } = useAccount();
  const account = useAccount();
  const route = useRouter();

  const { data: statusBiz } = useRead({
    contractName: "core",
    functionName: "isBusiness",
    args: [connectedAddress],
  });

  const { data: statusInv } = useRead({
    contractName: "core",
    functionName: "isInvestor",
    args: [connectedAddress],
  });

  console.log(connectedAddress);

  useEffect(() => {
    if (typeof statusBiz === "boolean" || typeof statusInv === "boolean") {
      if (isConnected == true) {
        if (statusBiz == true || statusInv == true) {
          console.log(statusBiz, statusInv);
          route.push("/marketplace");
        } else {
          console.log(connectedAddress);
          route.push("/create-account");
        }
      }
    }
  }, [statusBiz, statusInv]);

  //
  return (
    <>
      <div className="lg:hidden flex flex-col bg-[#042B2B] ">
        <Navbar />
      </div>

      <div className="flex flex-col md:flex-row lg:flex-row h-screen bg-[#042B2B] lg:p-4 p-0">
        {/* Left section with the logo */}
        <div className="md:w-1/2 w-full bg-[#2B2B2B] md:bg-[#115436] flex items-center justify-center py-1 md:py-0">
          <div className="flex items-center justify-center gap-1">
            <Image
              src={AfroBaseLogo}
              alt="Agrobase logo"
              width={200}
              height={200}
              className="w-200 h-200"
            />
          </div>
        </div>

        {/* Right section with connect wallet */}
        <div
          className={`md:w-1/2 w-full bg-[#042B2B] flex flex-col items-center justify-center py-8 md:py-0 h-full ${libre.className}`}
        >
          {!connectedAddress && (
            <div className="text-center md:text-left">
              <h1
                className={`text-white md:text-5xl text-4xl font-bold mb-4 ${work.className}`}
              >
                Connect Wallet
              </h1>
              <p
                className={`text-gray-300 mb-6 text-[18px] md:text-[19px] ${work.className}`}
              >
                Choose a wallet you want to connect.
                <br />
                There are several wallet providers.
              </p>
              <div
                className={`py-3 bg-[#03ED0E] text-[#000] font-semibold rounded-full hover:bg-green-500 transition px-[80px] w-full ${lato.className}`}
              >
                <Basenames address={connectedAddress} />
              </div>
            </div>
          )}
          {account.status == "connected" && !(statusBiz || statusInv) && (
            <div className="text-center flex flex-col justify-center items-center">
              <img src={checkMark.src} alt="check mark" className="mb-2" />

              <div
                className={`p-3 text-white mb-10 rounded-[15px] text-[18px] md:text-[20px] ${work.className}`}
              >
                <Name address={account.addresses?.[0]} chain={base} />
              </div>
              <Button
                as={Link}
                href="/create-account"
                isLoading={isLoading}
                onClick={() => setLoading(true)}
                className={`py-2 bg-[#03ED0E] text-[#000] font-semibold rounded-full hover:bg-green-500 transition px-[80px] text-[18px] md:text-[20px] ${lato.className}`}
              >
                {isLoading ? "loading" : "Create Account"}
              </Button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ConnectionPage;
