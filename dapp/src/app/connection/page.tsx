"use client"
import { Footer, Header } from '@/components';
import { Basenames } from '@/components/basenames';
import React, { useState } from 'react';
import logo from "../../assets/logos/white.png"

const ConnectionPage: React.FC = () => {

  const [address, setAddress] = useState<`0x${string}`| undefined>(undefined);

  // 
   return (
   <div className="flex h-screen bg-[#042B2B] p-4">
      {/* Left section with the logo */}
      <div className="w-1/2 bg-[#115436] flex items-center justify-center">
        <div className="flex flex items-center justify-center gap-1">
          <img src={logo.src} alt='Agrobase logo' className='w-50 h-24'/>
          <h2 className="text-white text-xl font-semibold">Agrobase</h2>
        </div>
      </div>

      {/* Right section with connect wallet */}
      <div className="w-1/2 bg-[#042B2B] flex items-center justify-center">
        <div className="text-left">
          <h1 className="text-white text-3xl font-bold mb-4 w-full">Connect Wallet</h1>
          <p className="text-gray-300 mb-6">
            Choose a wallet you want to connect.<br />
            There are several wallet providers.
          </p>
          <Basenames address={address} key={1}/>
        </div>
      </div>
    </div>
  );
};

export default ConnectionPage;
