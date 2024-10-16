import Image from "next/image";
import { ICampaign } from "./interfacet";
import { Button } from "@nextui-org/react";
import { lato, space, work } from "../Font";
import { useRouter } from "next/navigation";

    // event CampaignCreated(
    //     bytes32 indexed campaignId,
    //     address campaignAddress,
    //     string name,
    //     uint256 duration,
    //     uint256 goal,
    //     address tokenAddress,
    //     address nftAddress
    // );

const CampaignsDisplay : React.FC<{campaigns: ICampaign[]}> = ({campaigns}) => {
    const router = useRouter();
    
    return(
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-10">
                {campaigns.map((campaign, index) => (
                <div>
                <div key={index} className="rounded-t-xl rounded-b-3xl bg-[#2B2B2B] rounded-t-xl pb-5 shadow-md hover:scale-105 transition-transform">
                    {/* Product Image */}
                    <div className="overflow-hidden rounded-tl-xl rounded-tr-xl mb-4">
                    <Image
                        src={campaign.image}
                        alt={campaign.name}
                        width={240}
                        height={240}
                        className="object-cover rounded-tl-xl rounded-tr-xl w-full h-[240px]"
                    />
                    </div>

                    {/* campaign Info */}
                    <div className="flex flex-col justify-between gap-3">
                            <div className="text-white px-5">
                                <h3 className={`text-lg font-bold text-left ${work.className}`}>{campaign.name}</h3>
                                <p className={`text-sm text-gray-400 text-left ${space.className}`}>{campaign.location}</p>
                            </div>

                            {/* Price Info */}
                            <div className={`mt-4 text-gray-300 px-5 flex flex-row justify-between  gap-3 ${space.className}`}>
                                <p className="flex flex-col">
                                    <strong className="text-gray-400 text-xs text-left">Price</strong> <span className="text-[16px]">{campaign.price}</span>
                                </p>
                                <p className="flex flex-col">
                                    <strong className="text-gray-400 text-xs text-right">Highest Bid</strong> <span className="text-[16px]">{campaign.highestBid}</span>
                                </p>
                            </div>
                    </div>
                </div>
                <Button className={`px-[3rem] py-[1.3rem] rounded-[0.9rem] bg-[#042B2B] text-white border-[1px] border-[#03ED0E] w-full my-5 ${lato.className}`} onClick={()=>router.push(`/campaigns/${campaign.id}`)}>
                                Join
                            </Button>
                </div>
                ))}
            </div>
    )
};

export default CampaignsDisplay;