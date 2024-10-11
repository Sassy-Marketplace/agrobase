import Link from "next/link"
import React from "react"
import {SocialIcon} from "react-social-icons"
import {MessageSquare} from "lucide-react"

const Footer: React.FC =() => {
    return(
    <footer className="bg-[#042B2B] text-white py-8  border-t border-[#2B2B2B] w-full flex flex-col items-center">
     <div className="w-10/12">
         <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1 lg:grid-cols-3 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-7">Agrobase</h2>
          <p className="text-sm text-gray-400 mb-4">
            Real World Agro marketplace
            <br/>
             powered by Base
          </p>
          <p className="text-sm text-gray-400 mb-4">Join our community</p>
          {/* Social Media Icons */}
          <div className="flex space-x-0 justify-left items-center mt-[-10px]">
            <SocialIcon url="www.twitch.com" fgColor="#9CA3AF" bgColor="none" style={{width: "40px"}}/>
            <SocialIcon url="www.youtube.com" fgColor="#9CA3AF" bgColor="none"  style={{width: "40px"}}/>
            <SocialIcon url="www.x.com" fgColor="#9CA3AF" bgColor="none"  style={{width: "40px"}}/>
            <SocialIcon url="www.instagram.com" fgColor="#9CA3AF" bgColor="none"  style={{width: "40px"}}/>
          </div>
        </div>

        {/* Explore Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Explore</h2>
          <ul className="space-y-2 text-sm text-gray-400">
            <li >
                {/* <Link className="hover:underline" href={window?.location?.pathname == "/marketplace"? "/": "marketplace"}>
                {window?.location?.pathname == "/marketplace"? "Home": "Marketplace"}</Link> */}
            </li>
            <li >
                <Link className="hover:underline" href="rankings">Rankings</Link>
            </li >
            <li ><Link className="hover:underline" href="whitepaper">Whitepaper</Link></li>
          </ul>
         </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Join Our Weekly Digest</h2>
          <p className="text-sm text-gray-400 mb-4">
            Get exclusive promotions & updates <br/> straight to your inbox.
          </p>
          {/* <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <input
              type="email"
              placeholder="Enter your email here"
              className="px-4 py-3 rounded-[10px] bg-white text-black placeholder-gray-500 focus:outline-none"
            />
            <button className="px-6 py-3 bg-[#03ED0E] rounded-[10px] text-black font-semibold hover:bg-green-500">
              Subscribe
            </button>
          </div> */}
          <div className="flex items-center justify-left w-full">
            {/* Show only on medium and large screens */}
            <div className="hidden sm:flex rounded-[15px] overflow-hidden shadow-md lg:w-full md:w-[500px]">
                {/* Input field */}
                <input
                type="email"
                placeholder="Enter your email here"
                className="px-4 py-3 bg-white text-black placeholder-gray-500 w-2/3 focus:outline-none"
                />
                {/* Subscribe Button */}
                <button className="px-6 py-3 bg-[#03ED0E] text-center text-black font-semibold w-1/3 hover:bg-green-500">
                Subscribe
                </button>
            </div>

            {/* Show only on small screens */}
            <div className="sm:flex md:hidden lg:hidden shadow-md w-full flex-col">
                 <input
                type="email"
                placeholder="Enter Your Email Address"
                className="px-4 py-3 bg-white rounded-[25px] text-black placeholder-gray-500 w-full focus:outline-none mb-[20px]"
                />
                {/* Subscribe Button */}
                <button className="px-6 py-3 bg-[#03ED0E] rounded-[25px]  text-center text-black font-semibold w-full hover:bg-green-500 flex items-center justify-center gap-3">
                <MessageSquare/> Subscribe
                </button>
            </div>
            </div>
        </div>
      </div>
     </div>

     <div className="w-full flex flex-col items-center">
         <div className="mt-8 border-t border-gray-600 pt-4 text-sm text-gray-400 w-10/12 text-left">
        © Agrobase Marketplace. Use this template freely.
      </div>
     </div>
    </footer>
    )
}

export default Footer