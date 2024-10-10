import { Footer, Header } from '@/components';
import React from 'react';


const ConnectionPage: React.FC = () => {
   return (
    <div className="h-screen bg-gradient-to-r from-[#0f4c13] to-[#022B28] flex flex-col justify-between items-center text-white">
      {/* Header */}
      <Header/>

      {/* Main content */}
      <main className="flex flex-col items-center justify-center flex-1">
        <button className="bg-[#03ED0E] text-[#fff] text-lg font-medium py-3 px-10 rounded-[50px] mb-6 hover:bg-[#02D00B]">
          Connect Wallet
        </button>
        <button className="bg-[#444444] text-[#fff] text-lg font-medium py-3 px-11 border-[1px] border-[#03ED0E] rounded-[50px] hover:bg-[#333333]">
          Create Profile
        </button>
      </main>

      {/* Footer */}
      <Footer/>
    </div>
  );
};

export default ConnectionPage;
