"use client"
import { useState } from "react"
import styles from "@/components/header/header.module.css"
import profile from "../../../assets/profile.jpg";
import Image from "next/image";
import { Header, ProductsDIsplay } from "@/components";
import {products} from "./dummy"
import MarketPlaceHero from "./hero";
// 03ED0E

const MarketPlacePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState("home");

    return(
        <div className="h-full bg-[#042B2B] flex flex-col justify-between items-center text-white w-full">
            {/* Header */}
                <Header/>

            <main className="w-10/12">
            {/* Hero */}
                <MarketPlaceHero/>
            </main>
                {/* {/* This should contain trending products */}

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