import React from "react";
import { Mail } from "lucide-react";
import { work } from "../Font";
import Image from "next/image";
import pic from "@/assets/DEZ TEAM UP (2)/person/Photo.svg";

export const Subscribe = () => {
  return (
    <div className="w-full bg-[#042b2b] mt-[4rem]">
      <div className="w-[90%] md:w-[70%] mx-auto my-[4rem] flex flex-col md:flex-row justify-center items-center gap-[3rem]">
        <div className="md:w-1/2 m-8">
          <Image src={pic} alt="farmer" />
        </div>
        <div className="">
          <h2
            className={`text-4xl text-center md:text-left text-white font-semibold ${work.className} mb-4`}
          >
            Join Our Weekly Digest
          </h2>
          <p
            className={`text-xl text-center md:text-left text-white mb-8 ${work.className}`}
          >
            Get Exclusive Promotions & Updates <br /> Straight To Your Inbox.
          </p>
          <div className="flex items-center justify-left w-full">
            {/* Show only on medium and large screens */}
            <div className="hidden md:flex md:flex-row md:justify-between rounded-[15px] bg-white overflow-hidden shadow-md w-full md:w-[500px] lg:w-full ">
              {/* Input field */}
              <input
                type="email"
                placeholder="Enter your email here"
                className={`px-4 py-3 text-black bg-transparent placeholder-gray-500 focus:outline-none ${work.className}`}
              />
              {/* Subscribe Button */}
              <button
                className={`px-6 py-3 bg-[#03ED0E] rounded-l-2xl flex gap-3 text-center text-black font-semibold hover:bg-green-500 ${work.className}`}
              >
                <Mail className="text-white" /> Subscribe
              </button>
            </div>

            {/* Show only on small screens */}
            <div className="flex md:hidden shadow-md w-full flex-col">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                className={`px-4 py-3 bg-white rounded-[25px] text-black placeholder-gray-500 w-full focus:outline-none mb-[20px] ${work.className}`}
              />
              {/* Subscribe Button */}
              <button
                className={`px-6 py-3 bg-[#03ED0E] rounded-[25px]  text-center text-black font-semibold w-full hover:bg-green-500 flex items-center justify-center gap-3 ${work.className}`}
              >
                <Mail className="text-white" /> Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
