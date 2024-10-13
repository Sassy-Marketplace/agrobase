import { Button, LinkIcon } from "@nextui-org/react";
import Image from "next/image";
import React from "react";
import HeroImage from "@/assets/heroImage.png";
import { fontGrotesk, libre } from "../Font";
import Link from "next/link";

const Hero = () => {
  return (
    <main className="w-full mt-[3rem] md:mt-[9rem] h-auto">
      <section className="flex ml-auto md:gap-20">
        <section className="flex flex-col justify-between gap-10">
          <div className="flex flex-col gap-10">
            <div className="flex flex-col justify-center items-center md:items-start">
              <span
                className={`font-normal text-[20px]  md:text-[36px] ${fontGrotesk.className}`}
              >
                World's Leading
              </span>
              <span
                className={`font-semibold text-[32px] md:text-[64px] ${fontGrotesk.className}`}
              >
                Onchain
              </span>
              <span
                className={`font-semibold text-[32px] md:text-[64px] ${fontGrotesk.className} text-[#03ed0e]`}
              >
                Agro-Marketplace
              </span>
            </div>
            <div>
              <p className="text-lg text-center md:text-left">
                Revolutionizing the $2.7 trillion global agriculture industry by
                <br />
                bringing it on-chain, starting from Africa
              </p>
            </div>
            <div className="flex justify-center md:justify-start">
              <Button
                as={Link}
                href="/connect-wallet"
                className="bg-[#03ed0e] rounded-full text-black px-[4rem]"
              >
                Get Started
              </Button>
            </div>
            <div className="flex gap-8 md:gap-4 justify-center md:justify-start">
              <div className="flex flex-col">
                <span
                  className={`font-bold text-[20px] md:text-[36px] ${libre.className}`}
                >
                  432K+
                </span>
                <span>Assets</span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-[20px] md:text-[36px] ${libre.className}`}
                >
                  200K+
                </span>
                <span>Farmers</span>
              </div>
              <div className="flex flex-col">
                <span
                  className={`font-bold text-[20px] md:text-[36px] ${libre.className}`}
                >
                  10K+
                </span>
                <span>Community</span>
              </div>
            </div>
          </div>
          <Link
            href={`#`}
            className="bg-transparent text-left text-lg font-bold self-start"
          >
            <span className="flex gap-2">
              Download Whitepaper <LinkIcon />
            </span>
          </Link>
        </section>
        <section className="hidden md:flex flex-col justify-between">
          <div className="hover:scale-90 transition-transform">
            <Image src={HeroImage} alt="hero image" width={450} />
          </div>
          <div className="flex justify-center text-lg font-bold">
            <p>Agrobase MP</p>
          </div>
        </section>
      </section>
    </main>
  );
};

export default Hero;
