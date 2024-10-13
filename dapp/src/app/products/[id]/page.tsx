"use client"
import { Footer, Navbar, ProductButton, ProductsDIsplay, TruncatedText } from "@/components";
import { useRouter } from "next/navigation";
import { products } from "../../marketplace/dummy";
import { IProducts } from "@/components/products/interface";
import React, { useState } from "react";
import profileImg from "@/assets/profile.jpg"
import Image from "next/image";
import { lato, space, work } from "@/components/Font";
import { GlobeIcon } from "lucide-react";
import { Button, Link } from "@nextui-org/react";


const ProductPage: React.FC = ({params}: { params: {id: string} }) => {

   const product = products.find((product: IProducts) => product.id === +params.id);

   const router = useRouter();

   return(
        <>    
            <div className="h-full bg-[#042B2B] flex flex-col justify-between items-center text-white w-full">
                <Navbar/>
            </div>
            
            <div className="w-full h-[70vh]">
                <Image src={product?.image as any} width="100" height="100" alt="product image" className="w-full h-full"/>
            </div>

            <div className="bg-[#042B2B] flex flex-col py-8 w-full justify-between items-center">
                <div className="w-10/12 flex flex-col md:flex-row justify-between mb-[5.5rem]">

                    {/* Display only on small screens */}
                    <div className="md:hidden">
                        <h1 className={`block text-white text-[1.8rem] font-bold pb-4 ${work.className}`}>{product?.name}</h1>
                        <p className={`block text-gray-400 text-[1rem] pb-5 ${work.className}`}>{product?.location}</p>
                        <section className="flex flex-col justify-between w-full md:w-1/3 lg:w-1/4 bg-[#2B2B2B] p-6 rounded-xl shadow-lg h-[13rem] w-[10rem] flex flex-col gap-3 mb-6">
                                
                                <div>
                                    <p className={`text-gray-400 text-[0.9rem] ${space.className}`}>Price</p>
                                    <h1 className={`text-white pl-1 text-[2.2rem] ${space.className}`}>{product?.price}</h1>
                                </div>

                            <Button className={`w-full text-center text-black text-[1rem] py-6 rounded-[3rem] bg-[#03ED0E] ${lato.className}`}>Place Order</Button>
                        </section>
                    </div>

                    <section className="flex flex-col w-full md:w-1/2 lg:w-3/5">
                        <h1 className={`hidden md:inline text-white text-[1.8rem] font-bold pb-4 ${work.className}`}>{product?.name}</h1>
                        <p className={`hidden md:inline text-gray-400 text-[1rem] pb-5 ${work.className}`}>{product?.location}</p>

                        <strong className={`text-gray-400 text-[1.1rem] pb-2 ${space.className}`}>Created By</strong>

                        <div className="flex items-center justify-start gap-3 mb-6">
                            <Image src={profileImg} alt="profile image" width={20} height={20} className="rounded-[100%]"/>
                            <strong className={`text-white text-[1.1rem] ${work.className}`}>MusA Cocoa Farm</strong>
                        </div>

                        <h2 className={`font-bold text-gray-400 text-[1.1rem] pb-4 ${space.className}`}>Description</h2>

                        <TruncatedText maxlength={300} text="Premium Nigerian Cocoa by Musa's Cocoa Farm
                        Product Overview: Discover the rich, authentic taste of Musa’s Premium Cocoa, grown and harvested in the heart of Nigeria. Musa, a dedicated and experienced cocoa farmer, brings you the finest quality cocoa beans, nurtured from his family-run farm. Located in the lush, fertile lands of southwestern Nigeria, Musa’s farm benefits from the perfect climate and soil conditions, producing high-grade cocoa that’s prized for its deep, rich flavor and aromatic profile.

                        About Musa's Cocoa Farm: Musa has been cultivating cocoa for over 20 years, following sustainable farming practices to ensure both quality and environmental responsibility. His commitment to preserving the traditional methods of cocoa farming while embracing modern innovations makes his farm a leading producer in Nigeria. Every cocoa bean is hand-picked and sun-dried to perfection, preserving its natural flavor and enhancing the quality of the final product.
                               "/>


                    <h2 className={`font-bold text-gray-400 text-[1.1rem] pb-4 pt-6 ${space.className}`}>Details</h2>

                     <div className="flex flex-row items-center justify-start gap-1">
                            <GlobeIcon className="text-gray-400"/>
                            <Link href="" className={`text-white p-[1rem] ${work.className}`}>View on Etherscan</Link>
                    </div> 
                     <div className="flex flex-row items-center justify-start gap-1 mb-4">
                            <GlobeIcon className="text-gray-400"/>
                            <Link href="" className={`text-white p-[1rem] ${work.className}`}>View Original</Link>
                    </div> 

                    <h2 className={`font-bold text-gray-400 text-[1.1rem] pb-3 ${space.className}`}>Tags</h2>

                    <div className="flex md:flex-row flex-col md:items-center items-left md:justify-start gap-3">
                        <Button className={`text-white text-center bg-[#2B2B2B] px-5 py-3 rounded-[1.8rem] md:max-w-full max-w-[10rem] ${lato.className}`}>CROPS</Button>
                        <Button className={`text-white text-center bg-[#2B2B2B] px-5 py-3 rounded-[1.8rem] md:max-w-full max-w-[10rem] ${lato.className}`}>COCOA</Button>
                        <Button className={`text-white text-center bg-[#2B2B2B] px-5 py-3 rounded-[1.8rem] md:max-w-full max-w-[10rem] ${lato.className}`}>BULK</Button>
                        <Button className={`text-white text-center bg-[#2B2B2B] px-5 py-3 rounded-[1.8rem] md:max-w-full max-w-[10rem] ${lato.className}`}>CASH CROP</Button>
                    </div>
                    </section>
                    
                    {/* Display only on tablet and above */}
                    <section className="hidden md:flex flex-col justify-between w-full md:w-1/3 lg:w-1/4 bg-[#2B2B2B] p-6 rounded-xl shadow-lg h-[13rem] w-[10rem] flex flex-col gap-3">
                            
                            <div>
                                <p className={`text-gray-400 text-[0.9rem] ${space.className}`}>Price</p>
                                <h1 className={`text-white pl-1 text-[2.2rem] ${space.className}`}>{product?.price}</h1>
                            </div>

                        <Button className={`w-full text-center text-black text-[1rem] py-6 rounded-[3rem] bg-[#03ED0E] ${lato.className}`}>Place Order</Button>
                    </section>
                </div>

                        <section className="w-full flex flex-col items-center md:mb-0 mb-[3.5rem]">
                            <div className="w-10/12 flex flex-col md:mb-[3rem]">
                                <div className="mb-[0.5rem] md:mb-6 flex items-center justify-between md:flex-row flex-col">
                                    <h1 className={`text-white text-4xl font-semibold text-center md:text-left pb-5 ${work.className}`}>More Products From This Farmer</h1>
                                </div>

                                {/* Display products */}
                                <ProductsDIsplay tabContents={products} />
                                
                                <div className="mt-[3rem] flex flex-col  md:w-[250px]">
                                    <Button className={`text-center text-white border-[2px] border-[#03ED0E] text-[1rem] py-6 rounded-xl bg-transparent ${lato.className}`}>More</Button>
                                </div>
                            </div>
                        </section>

                {/* {
                    activeTab === "farmers-products" && (
                        <section className="w-full flex flex-col items-center">
                            <div className="w-10/12 flex flex-col md:mb-[3rem]">
                                    <div className="mb-[0.5rem] md:mb-[2.5rem] flex items-center justify-between md:flex-row flex-col">
                                        <h1 className={`text-white text-4xl font-semibold text-center md:pb-5 pb-2 md:text-left ${work.className}`}>More products</h1>
                                        
                                        <div className="hidden md:flex justify-between items-center">
                                            <ProductButton text="More products" event={() =>{}}/>
                                        </div>
                                    </div>

                                    <ProductsDIsplay tabContents={products}/>

                                    <div className="md:hidden flex flex-col  items-center mt-10">
                                        <ProductButton text="More Products" event={() =>{}}/>
                                    </div>
                            </div>
                        </section>
                    )
                } */}
                <Footer/>
            </div>
        </>
    )
}

export default ProductPage