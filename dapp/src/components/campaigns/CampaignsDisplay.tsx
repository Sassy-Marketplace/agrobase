import Image from "next/image";
import { ICampaign } from "./interfacet";
import { Button } from "@nextui-org/react";

const CampaignsDisplay : React.FC<{campaigns: ICampaign[]}> = ({campaigns}) => {
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                {campaigns.map((campaign, index) => (
                <div key={index} className="bg-[#2B2B2B] rounded-xl pb-5 shadow-md hover:scale-55 transition-transform">
                    {/* Product Image */}
                    <div className="overflow-hidden rounded-tl-xl rounded-tr-xl mb-4">
                    <Image
                        src={campaign.image}
                        alt={campaign.name}
                        width={300}
                        height={300}
                        className="object-cover rounded-tl-xl rounded-tr-xl w-full h-[300px]"
                    />
                    </div>

                    {/* campaign Info */}
                    <div className="flex flex-col justify-between gap-5">
                            <div className="text-white px-5">
                                <h3 className="text-lg font-bold text-left">{campaign.name}</h3>
                                <p className="text-sm text-gray-400 text-left">{campaign.location}</p>
                            </div>

                            {/* Price Info */}
                            <div className="mt-4 text-gray-300 px-5 flex flex-row justify-between  gap-3">
                                <p className="flex flex-col">
                                    <strong className="text-gray-400 text-sm text-left">Price</strong> <span className="text-lg">{campaign.price}</span>
                                </p>
                                <p className="flex flex-col">
                                    <strong className="text-gray-400 text-sm text-right">Highest Bid</strong> <span className="text-lg">{campaign.highestBid}</span>
                                </p>
                            </div>
                        
                            <Button className="px-[3rem] py-[1.7rem] rounded-[0.9rem] bg-[#2B2B2B] text-white border-[1px] border-gray-400 mx-5" onClick={()=>{}}>
                                Invest
                            </Button>
                    </div>
                </div>
                ))}
            </div>
    )
};

export default CampaignsDisplay;