"use client"
import { useState } from "react"
import Image from "next/image";
import { Footer, Header, ProductsDIsplay } from "@/components";
import MarketPlaceHero from "./hero";
import { campaigns, products } from "./dummy";
// 03ED0E

const MarketPlacePage: React.FC = () => {
    
    const [activeTab, setActiveTab] = useState("products");

    const tabContents = activeTab == "products" ? products : campaigns;

    return(
        <div className="h-full bg-[#042B2B] flex flex-col justify-between items-center text-white w-full">
            {/* Header */}
                <Header/>

            <section className="w-10/12">
                {/* Hero */}
                <MarketPlaceHero/>
                {/* {/* This should contain trending products */}
            </section>

            {/*  */}
            <section className="w-full bg-[#042B2B] text-white">
                <div className="flex flex-col bg-[#2B2B2B] pt-3 w-full items-center">
                    <div className="flex w-10/12 justify-center space-x-10">
                        <button
                            className={`text-lg font-semibold w-1/2 py-2 border-b-[2px]  ${
                                activeTab === 'products' ? 'text-white border-gray-400' : 'text-gray-400 border-transparent'
                            }`}
                            onClick={() => setActiveTab('products')}
                        >
                            Agro Products <span className="hidden md:inline ml-2 px-2 py-1 bg-gray-800 rounded-full text-sm text-center">302</span>
                        </button>
                        <button
                            className={`text-lg font-semibold w-1/2 py-2 border-b-[2px] ${
                                activeTab === 'campaigns' ? 'text-white border-gray-400' : 'text-gray-400 border-transparent'
                            }`}
                            onClick={() => setActiveTab('campaigns')}
                        >
                            Campaigns <span className="hidden md:inline ml-2 px-2 py-1 bg-gray-800 rounded-full text-sm text-center">67</span>
                        </button>
                    </div>
                </div>

               <div className="w-full flex flex-col items-center mb-[80px]">
                <div className="w-10/12">
                 <ProductsDIsplay tabContents={tabContents} />
                 <ProductsDIsplay tabContents={tabContents} />
                </div>
               </div>
            </section>
            
            <Footer/>
        </div>
    )
}

                // <section className="h-full w-full">
                //     <div className="flex flex-col items-center justify-center h-[300px] text-center gap-6">
                //         {/* Trending products heading */}
                //         <h2 className="text-4xl font-bold">
                //             <span
                //             className="text-transparent bg-clip-text bg-gradient-to-r from-[#03ED0E] via-[#03ED0E] to-[#03ED0E]"
                //             >
                //             Trending
                //             </span>{" "}
                //             <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03ED0E] via-[#53C8FE] to-[#7C69EC]">products</span>
                //         </h2>

                //         {/* Search Bar */}
                //         <div className="flex w-full max-w-lg justify-center items-center">
                //             <input
                //                 type="text"
                //                 placeholder="Search Products"
                //                 className="w-[450px] text-center px-6 py-2 text-lg text-gray-300 bg-transparent border border-gray-400 rounded-full focus:outline-none focus:border-[#03ED0E]"
                //             />
                //         </div>
                //     </div>

                //     {/* Display Trending products */}
                    
                //     <div className="flex flex-col justify-between items-center">
                //         <div className="w-10/12 flex justify-between items-center">
                //         <ProductsDIsplay products={products}/>
                //     </div>
                //     </div>

                //     {/* Other products */}
                //     <div className="flex flex-col ">

                //     </div>
                // </section>

export default MarketPlacePage;