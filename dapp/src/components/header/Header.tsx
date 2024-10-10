"use client"
import React, { useState } from "react";
import styles from  "./header.module.css";
import { IHeaderProps } from "./interface";

const Header: React.FC<IHeaderProps> = ({background}) => {
    
    // Todo:move this to the root component or use global state
    const [currentPage, setCurrentPage] = useState("home");

    return (
        <header className={`w-10/12 py-10 flex justify-between items-center`}>
        <div className="flex items-center w-1/3">
          <img src="logo.png" alt="Agrobase" className="w-10 mr-2" />
          <h1 className="text-2xl font-bold opacity-90">Agrobase</h1>
        </div>
        <nav className="flex gap-6 justify-center items-center w-3/9">
          <a href="/" className={`text-lg font-medium text-gray-300 hover:text-white ${currentPage === "home"? styles.active_nav: ""}`}>Home</a>
          <a href="/blog" className={`text-lg font-medium text-gray-300 hover:text-white ${currentPage === "blog"? styles.active_nav: ""}`}>Blog</a>
          <a href="/whitepaper" className={`text-lg font-medium text-gray-300 hover:text-white ${currentPage === "whitepaper"? styles.active_nav: ""}`}>Whitepaper</a>
        </nav>

        <nav className='flex gap-6 justify-center items-center w-1/3'>
            
        </nav>
      </header>
    )
}

export default Header;