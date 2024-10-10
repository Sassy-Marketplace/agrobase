"use client"
import { useState } from "react"
import styles from "../../components/header/header.module.css"
import profile from "../../../assets/profile.jpg";
import Image from "next/image";
// 03ED0E

const MarketPlacePage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState("home");

    return(
        <div className="h-full bg-gradient-to-r from-[#0f4c13] to-[#022B28] flex flex-col justify-between items-center text-white">
            {/* Header */}
            
            <header className="w-10/12 py-4 mt-[50px] flex justify-between items-center h-16 px-8 rounded-[50px] bg-opacity-10" style={{backgroundColor: 'rgba(255, 255, 255, 0.1)'}}>
                <div className="flex items-center w-1/3">
                    <img src="logo.png" alt="Agrobase" className="w-12 h-12" />
                </div>
                <nav className="flex gap-8 justify-center items-center w-1/3">
                    <a href="/" className={`text-lg font-medium text-gray-300 hover:text-white ${currentPage === "home"? styles.active_nav: ""}`}>Home</a>
                    <a href="/blog" className={`text-lg font-medium text-gray-300 hover:text-white ${currentPage === "blog"? styles.active_nav: ""}`}>Blog</a>
                    <a href="/whitepaper" className={`text-lg font-medium text-gray-300 hover:text-white ${currentPage === "whitepaper"? styles.active_nav: ""}`}>Whitepaper</a>
                </nav>

                {/* User Profile Info */}
                <div className="flex items-center justify-end space-x-2 items-center w-1/3">
                    <Image src={profile} alt="Profile" className="w-10 h-10 rounded-full object-cover"/>
                    <div className="text-left">
                    <p className="text-sm font-semibold text-[#ccc]">Faith Roberts</p>
                    <p className="text-xs opacity-70">Business Account</p>
                    </div>
                </div>
            </header>

            <main className="flex flex-col items-center justify-center h-full gap-3">
                    <section className="flex flex-col items-center items-center justify-start h-full text-center mt-[100px] mb-[150px]">
                    {/* First line */}
                    <h2 className="text-white text-[40px] font-medium mb-2">
                        Discover
                    </h2>

                    {/* Second line */}
                    <h2 className="text-white text-[40px] font-medium mb-2">
                        Collect And Sell
                    </h2>

                    {/* Third line - larger text */}
                    <h1 className="text-[#03ED0E] text-6xl font-bold">
                        Agro-products
                    </h1>
                </section>

                <section className="w-full mb-[30px] h-full">
                    <div className="flex items-center justify-center gap-8 text-white">
                        <div className="flex flex-col gap-[10px] items-center">
                            <strong className="text-[25px] font-bold">432K+</strong>
                            <span className="text-[15px] font-normal">Collections</span>
                        </div>
                        <div className="flex flex-col gap-[10px] items-center">
                            <strong className="text-[25px] font-bold">200K+</strong>
                            <span className="text-[15px] font-normal">Farmers</span>
                        </div>
                        <div className="flex flex-col gap-[10px] items-center">
                            <strong className="text-[25px] font-bold">10K</strong>
                            <span className="text-[15px] font-normal">Communities</span>
                        </div>
                    </div>
                </section>

                {/* {/* This should contain trending products */}
                <section className="h-full">
                    <div className="flex flex-col items-center justify-center h-[300px] text-center gap-6">
                        {/* Trending products heading */}
                        <h2 className="text-4xl font-bold">
                            <span
                            className="text-transparent bg-clip-text bg-gradient-to-r from-[#03ED0E] via-[#03ED0E] to-[#03ED0E]"
                            >
                            Trending
                            </span>{" "}
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#03ED0E] via-[#53C8FE] to-[#7C69EC]">products</span>
                        </h2>

                        {/* Search Bar */}
                        <div className="flex w-full max-w-lg justify-center items-center">
                            <input
                            type="text"
                            placeholder="Search Products"
                            className="w-[450px] text-center px-6 py-2 text-lg text-gray-300 bg-transparent border border-gray-400 rounded-full focus:outline-none focus:border-[#03ED0E]"
                            />
                        </div>
                        </div>
                </section>
            </main>

        </div>
    )
}

export default MarketPlacePage;