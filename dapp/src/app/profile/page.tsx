import NavBar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import { profileDetails } from "./mockinfo";
import { Bot, Globe } from "lucide-react";
import BannerImg from "@/assets/DEZ TEAM UP (2)/Image PlaceHolder.svg";
import ProfileIng from "@/assets/DEZ TEAM UP (2)/Ellipse 56.svg";
import { lato, mont, space, work } from "@/components/Font";
import { Products } from "./Products";

const Page = () => {
  return (
    <main className="bg-[#042b2b]">
      <NavBar />
      <div className="flex flex-col items-center bg-[#2b2b2b]">
        <p
          className={`font-semibold py-8  text-xl md:text-5xl lg:text-6xl ${lato.className}`}
        >
          MY DASHBOARD
        </p>
        <Image src={BannerImg} alt="profile" />
        <div className="py-[3rem] px-6 md:px-[8rem] text-white">
          {profileDetails.map((profile, index) => (
            <div key={index}>
              <div
                className={`md:hidden font-semibold text-center md:text-left text-xl md:text-4xl lg:text-5xl ${mont.className}`}
              >
                {profile.business}
              </div>
              <div
                className={`md:hidden mb-4 font-regular text-center md:text-left text-[#858584] text-sm lg:text-xl ${work.className}`}
              >
                {profile.location}
              </div>
              <div className="flex flex-col-reverse items-center md:flex-row justify-between md:items-start gap-10 lg:gap-32">
                <div className="md:w-2/3 lg:w-3/4 flex flex-col gap-4">
                  <div
                    className={`hidden md:flex font-semibold text-xl md:text-4xl lg:text-5xl ${mont.className}`}
                  >
                    {profile.business}
                  </div>
                  <div
                    className={`hidden md:flex mb-4 font-regular text-[#858584] text-sm lg:text-xl ${work.className}`}
                  >
                    {profile.location}
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
                    <span>{profile.location}</span>
                  </div>
                  <div
                    className={`font-bold text-[#858584]  text-sm lg:text-xl ${space.className}`}
                  >
                    Description
                  </div>
                  <div
                    className={`font-regular text-sm lg:text-xl  ${lato.className}`}
                  >
                    {profile.description}
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
                      <Button>{profile.tags.one}</Button>
                      <Button>{profile.tags.two}</Button>
                      <Button>{profile.tags.three}</Button>
                      <Button>{profile.tags.four}</Button>
                    </div>
                  </div>
                </div>
                <div className="lg:w-1/4 flex flex-col items-center p-6 gap-8 bg-[#3b3b3b] rounded-3xl">
                  <div className="flex flex-col gap-2">
                    <div>
                      <p className={`font-regular text-xs ${space.className}`}>
                        Account Balance
                      </p>
                    </div>
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
                  </div>
                  <div
                    className={`w-full flex flex-col gap-2 font-semibold text-sm ${lato.className}`}
                  >
                    <Button className="bg-[#03ed0e] text-black rounded-full py-7">
                      Withdraw
                    </Button>
                    <Button className="bg-[#03ed0e] text-black rounded-full py-7">
                      Add Products
                    </Button>
                    <Button className="border-[#03ed0e] border-2 bg-transparent rounded-full py-7">
                      Create Campaign
                    </Button>
                  </div>
                  <Image src={ProfileIng} alt="profile" />
                  <div
                    className={`font-regular text-[#858584] text-sm ${lato.className}`}
                  >
                    <p>{profile.name}</p>
                    <p>{profile.type}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <Products />
      <Footer />
    </main>
  );
};

export default Page;
