import { Footer, Navbar, ProductsDIsplay } from "@/components";
import { useRouter } from "next/navigation";
import { products } from "../../marketplace/dummy";
import { IProducts } from "@/components/products/interface";
import React from "react";
import productImg from "@/assets/productplaceholder.png"
import profileImg from "@/assets/profile.jpg"
import Image from "next/image";
import { fontGrotesk } from "@/components/Font";
import { ArrowRightIcon, GlobeIcon } from "lucide-react";
import { Button, Link } from "@nextui-org/react";

const ProductPage: React.FC = ({params}: { params: {id: string} }) => {

   const product = products.find((product: IProducts) => product.id === +params.id);

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
                        <h1 className="block text-white text-[1.8rem] font-bold pb-4">{product?.name}</h1>
                        <p className="block text-gray-400 text-[1rem] pb-5">{product?.location}</p>
                        <section className="flex flex-col justify-between w-full md:w-1/3 bg-[#2B2B2B] p-6 rounded-xl shadow-lg h-[13rem] w-[10rem] flex flex-col gap-3 mb-6">
                                
                                <div>
                                    <p className={`text-gray-400 text-[0.9rem] ${fontGrotesk.className}`}>Price</p>
                                    <h1 className="text-white pl-1 text-[2.2rem]">{product?.price}</h1>
                                </div>

                            <Button className="w-full text-center text-black text-[1rem] py-6 rounded-[3rem] bg-[#03ED0E]">Place Order</Button>
                        </section>
                    </div>

                    <section className="flex flex-col w-full md:w-1/2">
                        <h1 className="hidden md:inline text-white text-[1.8rem] font-bold pb-4">{product?.name}</h1>
                        <p className="hidden md:inline text-gray-400 text-[1rem] pb-5">{product?.location}</p>

                        <strong className={`text-gray-400 text-[1.1rem] pb-2 ${fontGrotesk.className}`}>Created By</strong>

                        <div className="flex items-center justify-start gap-3 mb-6">
                            <Image src={profileImg} alt="profile image" width={20} height={20} className="rounded-[100%]"/>
                            <strong className="text-white text-[1.1rem]">MusA Cocoa Farm</strong>
                        </div>

                        <h2 className={`font-bold text-gray-400 text-[1.1rem] pb-4 ${fontGrotesk.className}`}>Description</h2>

                        <p className="text-left text-white mb-6">
                                Premium Nigerian Cocoa by Musa's Cocoa Farm
                                Product Overview:Discover the rich, authentic taste of Musa’s Premium Cocoa, grown and harvested in the heart of Nigeria. Musa, a dedicated and experienced cocoa farmer, brings you the finest quality cocoa beans, nurtured from his family-run farm. Located in the lush, fertile lands of southwestern Nigeria, Musa’s farm benefits from the perfect climate and soil conditions, producing high-grade cocoa that’s prized for its deep, rich flavor and aromatic profile.
                                <br />
                                <br />

                                About Musa's Cocoa Farm:Musa has been cultivating cocoa for over 20 years, following sustainable farming practices to ensure both quality and environmental responsibility. His commitment to preserving the traditional methods of cocoa farming while embracing modern innovations makes his farm a leading producer in Nigeria. Every cocoa bean is hand-picked and sun-dried to perfection, preserving its natural flavor and enhancing the quality of the final product.
                                Product Features:
                                <br />
                                <br />
                                Origin: Southwestern Nigeria
                                <br />
                                <br />
                                Type: Premium-grade cocoa beans
                                <br />
                                <br />
                                Flavor Profile: Rich, bold cocoa taste with subtle earthy and nutty undertones
                                <br />
                                <br />
                                Cultivation: Grown sustainably with organic farming practices
                                <br />
                                <br />
                                Processing: Sun-dried and hand-sorted for premium quality
                                <br />
                                <br />
                                Cocoa Varieties Available:
                                <br />
                                <br />
                                Raw Cocoa Beans: Unprocessed beans ideal for further roasting or direct use in artisanal chocolate production.
                                <br />
                                <br />
                                Cocoa Nibs: Small, crunchy pieces of dried cocoa beans, perfect for baking or as a topping.
                                <br />
                                <br />
                                Cocoa Powder: Finely ground cocoa powder for baking, desserts, and beverages.
                                <br />
                                <br />
                                Packaging Options:
                                <br />
                                <br />
                                1kg Bag (Whole Beans or Powder)
                                5kg Bulk Pack (Ideal for businesses)
                                Custom packaging available upon request
                                <br />
                                <br />
                                Contact Us: For inquiries or bulk orders, please contact:
                                <br />
                                <br />
                                Email: musa@cocoafarmersng.com
                                <br />
                                <br />
                                Phone: +234-123-4567
                        </p>


                    <h2 className={`font-bold text-gray-400 text-[1.1rem] pb-4 ${fontGrotesk.className}`}>Details</h2>

                     <div className="flex flex-row items-center justify-start gap-1">
                            <GlobeIcon className="text-gray-400"/>
                            <Link href="" className="text-white p-[1rem]">View on Etherscan</Link>
                    </div> 
                     <div className="flex flex-row items-center justify-start gap-1 mb-4">
                            <GlobeIcon className="text-gray-400"/>
                            <Link href="" className="text-white p-[1rem]">View Original</Link>
                    </div> 

                    <h2 className={`font-bold text-gray-400 text-[1.1rem] pb-3 ${fontGrotesk.className}`}>Tags</h2>

                    <div className="flex md:flex-row flex-col md:items-center items-left md:justify-start gap-3">
                        <Button className="text-white text-center bg-[#2B2B2B] px-5 py-3 rounded-[1.8rem] md:max-w-full max-w-[10rem]">CROPS</Button>
                        <Button className="text-white text-center bg-[#2B2B2B] px-5 py-3 rounded-[1.8rem] md:max-w-full max-w-[10rem]">COCOA</Button>
                        <Button className="text-white text-center bg-[#2B2B2B] px-5 py-3 rounded-[1.8rem] md:max-w-full max-w-[10rem]">BULK</Button>
                        <Button className="text-white text-center bg-[#2B2B2B] px-5 py-3 rounded-[1.8rem] md:max-w-full max-w-[10rem]">CASH CROP</Button>
                    </div>
                    </section>
                    
                    {/* Display only on tablet and above */}
                    <section className="hidden md:flex flex-col justify-between w-full md:w-1/3 bg-[#2B2B2B] p-6 rounded-xl shadow-lg h-[13rem] w-[10rem] flex flex-col gap-3">
                            
                            <div>
                                <p className={`text-gray-400 text-[0.9rem] ${fontGrotesk.className}`}>Price</p>
                                <h1 className="text-white pl-1 text-[2.2rem]">{product?.price}</h1>
                            </div>

                        <Button className="w-full text-center text-black text-[1rem] py-6 rounded-[3rem] bg-[#03ED0E]">Place Order</Button>
                    </section>
                </div>

                <section className="w-full flex flex-col items-center md:mb-0 mb-[3.5rem]">
                    <div className="w-10/12 flex flex-col md:mb-[3rem]">
                        <div className="mb-[0.5rem] md:mb-[2.5rem] flex items-center justify-between md:flex-row flex-col">
                            <h1 className="hidden md:inline text-white text-[2.3rem] text-left pb-5">More Products</h1>
                            <Button className="px-[3rem] py-[1.7rem] rounded-[0.9rem] border-[2px] border-[#03ED0E] mb-[5rem] md:mb-0">
                                <ArrowRightIcon className="text-[#A259FF]"/>
                                <span className="text-[1.1rem] text-white">Go To Campaigns</span>
                            </Button>
                            <h1 className="md:hidden inline text-white text-[1.5rem] text-center pb-2">More Products</h1>
                        </div>

                        {/* Display products */}
                        <ProductsDIsplay tabContents={products}/>
                    </div>
                </section>

                <Footer/>
            </div>
        </>
    )
}

export default ProductPage