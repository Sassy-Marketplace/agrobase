"use client"
import CampaignsDisplay from "@/components/campaigns/CampaignsDisplay";
import NavBar from "@/components/Navbar";
import { campaigns } from "./dummy";
import { Button } from "@nextui-org/react";
import { lato, work } from "@/components/Font";
import { Footer } from "@/components";

const Campaigns: React.FC = () => {
    
    return(
        <div>
            <NavBar/>
                 <section className="w-full flex flex-col items-center md:mb-0 mb-[3.5rem]">
                    <div className="w-10/12 flex flex-col md:mb-[3rem]">
                        <div className={`mt-10 md:mb-5 flex items-center flex-col ${work.className}`}>
                            <h1 className="text-4xl font-semibold">Ongoing Campaigns</h1>
                        </div>

                                {/* Display products */}
                            <CampaignsDisplay campaigns={campaigns} />

                            <div className="mt-[3rem] flex flex-col  md:w-[200px]">
                                <Button className={`text-center text-white border-[2px] border-[#03ED0E] text-[1rem] py-6 rounded-[3rem] bg-transparent ${lato.className}`}>More</Button>
                            </div>
                        </div>
                    </section>
                <Footer/>
        </div>
    )
};

export default Campaigns;