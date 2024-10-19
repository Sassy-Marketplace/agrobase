"use client"
import { campaigns } from "@/app/campaigns/dummy";
import { Footer, Navbar } from "@/components";
import CampaignsDisplay from "@/components/campaigns/CampaignsDisplay";
import { fontGrotesk, lato, mont, space, work } from "@/components/Font";
import { Button } from "@nextui-org/react";
import CampaignForm from "./CampaignForm";
import Image from "next/image";
import BusinessBanner from "@/assets/DEZ TEAM UP (2)/businessbanner.svg";
import UserBanner from "@/assets/DEZ TEAM UP (2)/userbanner.svg";
import { useAgrobaseContext } from "@/context";

const ProfileCampaigns: React.FC = () => {

  const { userData: profile, statusBiz } = useAgrobaseContext();

    return(
        <main>
        <Navbar/>

          <div className="flex flex-col items-center bg-[#2b2b2b]">
        <p
          className={`font-semibold py-8  text-xl md:text-5xl lg:text-6xl ${lato.className} leading-normal`}
        >
          MY CAMPAIGNS
        </p>
        <div className="w-full md:h-[400px] overflow-hidden">
          <Image
            className="w-full"
            src={statusBiz ? BusinessBanner : UserBanner}
            alt="profile"
          />
        </div>
        
        <div className="md:py-[4rem] py-6 w-10/12 flex flex-col md:flex-row justify-between md:gap-[5rem] gap-7">
            
            <div className="flex flex-col text-white md:w-1/2 w-full lg:w-3/5">
                <h1 className={`${lato.className} pb-8 font-semibold md:text-3xl text-2xl leading-10 text-center md:text-left`}>Empower Your Marketplace <br className="hidden md:flex"/> With Targeted Campaigns </h1>

                <p className={`leading-8 ${space.className} text-lg text-center md:text-left`}>
                    Unlock the full potential of your marketplace with customized campaigns designed to drive engagement and boost sales.
                    Whether you're launching a new product, promoting a special offer, or enhancing brand visibility, our powerful campaign tools help you reach the right audience at the right time. 
                    Maximize your ROI with data-driven strategies, seamless integration, and real-time insights that keep your marketplace thriving.
                    <br /> 
                    Our platform simplifies campaign creation, offering flexible options for segmentation, personalized messaging, and automated workflows. Track performance effortlessly with our intuitive dashboard and optimize your campaigns on the fly to ensure maximum impact.
                </p>
            </div>

            <div className="flex flex-col w-full md:w-1/2 lg:w-2/5">
                <div className="w-full flex flex-col gap-2 bg-[#3b3b3b] shadow-lg p-8 rounded-3xl">
                    <CampaignForm/>
                </div>
            </div>
        </div>

        

      </div>

        <section className={`w-full flex flex-col items-center md:mb-0 mb-[3.5rem] ${fontGrotesk.className}`}>
            
            <div className="w-10/12 flex flex-col md:mb-[3rem]">
                <div className={`mt-10 md:mb-5 flex items-center flex-col ${work.className}`}>
                        </div>

                                {/* Display products */}
                    <CampaignsDisplay campaigns={campaigns} />

                    <div className="mt-[3rem] flex flex-col  md:w-[200px]">
                        <Button className={`text-center text-white border-[2px] border-[#03ED0E] text-[1rem] py-6 rounded-[3rem] bg-transparent ${lato.className}`}>More</Button>
                            </div>
                        </div>
        </section>

        <Footer/>
        </main>
    )
};

export default ProfileCampaigns;