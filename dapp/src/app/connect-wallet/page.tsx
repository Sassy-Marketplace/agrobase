"use client"
import { Footer, Header } from '@/components';
import React, { useState } from 'react';
import logo from "../../assets/logos/white.png"
import { useAccount } from 'wagmi';
import { ConnectWallet } from '@coinbase/onchainkit/wallet';
import checkMark from "../../assets/check_mark.png"
import { Name } from '@coinbase/onchainkit/identity';
import { base } from 'viem/chains';
import Link from 'next/link';

const ConnectionPage: React.FC = () => {
  const { address } = useAccount();
  const account = useAccount();
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
        {!address && (
          <div className="text-left">
          <h1 className="text-white text-3xl font-bold mb-4">Connect Wallet</h1>
          <p className="text-gray-300 mb-6">
            Choose a wallet you want to connect.<br />
            There are several wallet providers.
          </p>
            <ConnectWallet className="px-6 py-3 bg-[#03ED0E] text-[#000] font-semibold rounded-full hover:bg-green-500 transition px-[80px]"/>
        </div>
        )}
        {/*  */}
        {account.status === "connected" && (
          <div className='text-center flex flex-col justify-center items-center'>
              <img src={checkMark.src} alt="check mark" className='mb-2'/>

                  <div className='bg-[#ffffff] opacity-20 p-3 mb-10 rounded-[15px]'>
                    <Name address={account.addresses?.[0]} chain={base}/>
                  </div>

              <button className="py-3 bg-[#03ED0E] text-[#000] font-semibold rounded-full hover:bg-green-500 transition px-[80px]">
                <Link href="/marketplace">Go To Marketplace</Link>
              </button>
          </div>
          )}
      </div>
    </div>
  );
};

export default ConnectionPage;
