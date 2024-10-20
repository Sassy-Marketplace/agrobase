"use client";
import NavBar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { Button, Link } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { Bot, Globe } from "lucide-react";
import BusinessBanner from "@/assets/DEZ TEAM UP (2)/businessbanner.svg";
import UserBanner from "@/assets/DEZ TEAM UP (2)/userbanner.svg";
import BusinessProfile from "@/assets/DEZ TEAM UP (2)/businessprofile.svg";
import UserProfile from "@/assets/DEZ TEAM UP (2)/userprofile.svg";
import { lato, mont, space, work } from "@/components/Font";
import { useAgrobaseContext } from "@/context";

const Page = () => {
  const { userData: profile, statusBiz } = useAgrobaseContext();

  return (
    <main className="bg-[#042b2b]">
      <NavBar />
      <div className="flex flex-col items-center bg-[#2b2b2b]">
        <p
          className={`font-semibold py-8  text-xl md:text-5xl lg:text-6xl ${lato.className} leading-normal`}
        >
          MY DASHBOARD
        </p>
        <div className="w-full md:h-[400px] overflow-hidden">
          <Image
            className="w-full"
            src={statusBiz ? BusinessBanner : UserBanner}
            alt="profile"
          />
        </div>
        <div className="py-[3rem] px-6 md:px-[8rem] text-white">
          <div>
            <div
              className={`md:hidden font-semibold text-center md:text-left text-xl md:text-4xl lg:text-5xl ${mont.className}`}
            >
              {profile?.businessName || profile?.name}
            </div>
            <div
              className={`md:hidden mb-4 font-regular text-center md:text-left text-[#858584] text-sm lg:text-xl ${work.className}`}
            >
              {profile?.businessLocation || profile?.location}
            </div>
            <div className="flex flex-col-reverse items-center md:flex-row justify-between md:items-start gap-10 lg:gap-32">
              <div className="md:w-2/3 lg:w-3/4 flex flex-col gap-4">
                <div
                  className={`hidden md:flex font-semibold text-xl md:text-4xl lg:text-5xl ${mont.className}`}
                >
                  {profile?.businessName || profile?.name}
                </div>
                <div
                  className={`hidden md:flex mb-4 font-regular text-[#858584] text-sm lg:text-xl ${work.className}`}
                >
                  {profile?.businessLocation || profile?.location}
                </div>

                <div
                  className={`font-bold text-[#858584]  text-sm lg:text-xl ${space.className}`}
                >
                  Bio
                </div>
                <div
                  className={`flex gap-2 font-semibold  text-sm lg:text-xl ${work.className}`}
                >
                  <span>
                    <Bot className="text-[#858584]" />
                  </span>
                  <span>{profile?.businessLocation || profile?.location}</span>
                </div>
                <div
                  className={`font-bold text-[#858584]  text-sm lg:text-xl ${space.className}`}
                >
                  Description
                </div>
                <div
                  className={`font-regular text-sm lg:text-xl  ${lato.className}`}
                >
                  {profile?.businessDescription || profile?.description}
                </div>
                <div className="flex flex-col gap-4">
                  <p
                    className={`font-bold text-[#858584]  text-sm lg:text-xl ${space.className}`}
                  >
                    Details
                  </p>
                  <div className="flex flex-col gap-2">
                    <div className="flex gap-2">
                      <Globe className="text-[#858584]" />
                      <p
                        className={`font-regular  text-sm lg:text-xl ${lato.className}`}
                      >
                        View On Etherscan
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Globe className="text-[#858584]" />
                      <p
                        className={`font-regular text-sm lg:text-xl ${lato.className}`}
                      >
                        View Original
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col gap-4">
                  <p
                    className={`font-bold text-[#858584]  text-sm lg:text-xl ${space.className}`}
                  >
                    Tags
                  </p>
                  <div
                    className={`flex flex-col md:flex-row items-start md:items-center gap-4 font-bold text-sm ${work.className}`}
                  >
                    <Button>CROPS</Button>
                    <Button>CASH CROPS</Button>
                    <Button>BULK</Button>
                    <Button>FOOD CROPS</Button>
                  </div>
                </div>
              </div>
              <div className="lg:w-1/4 flex flex-col items-center p-6 lg:p-10 gap-8 bg-[#3b3b3b] rounded-3xl">
                <div className="flex flex-col gap-2">
                  {statusBiz && (
                    <div>
                      <p className={`font-regular text-xs ${space.className}`}>
                        Account Balance
                      </p>
                    </div>
                  )}
                  {statusBiz && (
                    <div className="flex gap-2">
                      <div className="flex flex-col items-center">
                        <span
                          className={`font-bold text-4xl ${space.className}`}
                        >
                          59
                        </span>
                        <span
                          className={`font-regular text-xs ${space.className}`}
                        >
                          Hours
                        </span>
                      </div>
                      <div>
                        <span
                          className={`font-bold text-2xl ${space.className}`}
                        >
                          :
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span
                          className={`font-bold text-4xl ${space.className}`}
                        >
                          59
                        </span>
                        <span
                          className={`font-regular text-xs ${space.className}`}
                        >
                          Minutes
                        </span>
                      </div>
                      <div>
                        <span
                          className={`font-bold text-2xl ${space.className}`}
                        >
                          :
                        </span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span
                          className={`font-bold text-4xl ${space.className}`}
                        >
                          59
                        </span>
                        <span
                          className={`font-regular text-xs ${space.className}`}
                        >
                          Seconds
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                {statusBiz && (
                  <div
                    className={`w-full flex flex-col gap-2 font-semibold text-sm ${lato.className}`}
                  >
                    <Button
                      as={Link}
                      href="#"
                      className="bg-[#03ed0e] text-black rounded-full py-7"
                    >
                      Withdraw
                    </Button>
                    <Button
                      as={Link}
                      href="marketplace"
                      className="bg-[#03ed0e] text-black rounded-full py-7"
                    >
                      Add Products
                    </Button>
                    <Button
                      as={Link}
                      href="/campaigns"
                      className="border-[#03ed0e] border-2 bg-transparent rounded-full py-7"
                    >
                      Create Campaign
                    </Button>
                  </div>
                )}
                <Image
                  className="rounded-full w-full"
                  src={statusBiz ? BusinessProfile : UserProfile}
                  alt="profile"
                />
                <div
                  className={`font-regular text-[#858584] text-sm ${lato.className}`}
                >
                  <p>{profile?.businessName || profile?.name}</p>
                  <p>{statusBiz ? "Business Account" : "Investor Account"}</p>
                </div>
                <div
                  className={`w-full flex flex-col gap-2 font-semibold text-sm ${lato.className}`}
                >
                  {statusBiz && (
                    <Button as={Link} href={`/profile/store`}>
                      View Store
                    </Button>
                  )}
                  <Button as={Link} href={`/profile/edit`}>
                    Edit Profile
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
};

export default Page;
