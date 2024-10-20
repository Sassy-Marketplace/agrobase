"use client";
import React from "react";
import { Products } from "../Products";
import NavBar from "@/components/Navbar";
import Footer from "@/components/landing/Footer";
import { Jumbotron } from "@/components/profile/Jumbotron";
import { CTA } from "@/components/profile/CTA";
import { useAgrobaseContext } from "@/context";

const Store = () => {
  const { userData } = useAgrobaseContext();
  return (
    <main>
      <NavBar />
      <div className="flex flex-col md:flex-row justify-between w-[80%] mx-auto mt-[3rem] gap-20">
        <Jumbotron
          guide={"Create and Sell Healthy Agro-Products"}
          name={`Welcome back, ${userData?.businessName}`}
          href1={"list-items"}
          href2={"create-products"}
          btn1={"List New Item"}
          btn2={"Create Market Item"}
        />
        <CTA
          motive={"Uniting Hearts for a Better tomorrow"}
          guide={"Create a Campaign and Achieve that Life Changing Goal"}
          btn1={"My Campaign"}
          href1={"profile/campaigns"}
        />
      </div>
      <Products />
      <Footer />
    </main>
  );
};

export default Store;
