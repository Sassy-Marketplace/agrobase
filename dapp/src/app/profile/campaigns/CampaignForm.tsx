"use client";
import { lato, work } from "@/components/Font";
import {
  CalendarIcon,
  CoinsIcon,
  PencilIcon,
  TargetIcon,
  WalletIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useWriteContract } from "wagmi";
import coreAbi from "@/utils/abis/coreAbi.json";
import { coreAddress } from "@/utils/contractAddresses";
import { ToastContainer, toast } from "react-toastify";
import { Button } from "@nextui-org/react";

const CampaignForm: React.FC = () => {
  const [name, setName] = useState("");
  const [duration, setDuration] = useState(0);
  const [goal, setGoal] = useState(0);
  const [totalNfts, setTotalNfts] = useState(0);
  const [tokenAddress, setTokenAddress] = useState("");
  const [nftAddress, setNftAddress] = useState("");

  const [isPending, setIsPending] = useState(true);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    if (
      name.length &&
      duration > 0 &&
      goal > 0 &&
      totalNfts > 0 &&
      tokenAddress.length &&
      nftAddress
    ) {
      setIsPending(false);
    }
  }, [name, duration, goal, totalNfts, tokenAddress, nftAddress]);

  const {
    data,
    writeContract,
    isPending: Pending,
    isSuccess,
    isError,
  } = useWriteContract();

  const handleSubmit = () => {
    try {
      setLoading(true);

      const res = writeContract({
        abi: coreAbi,
        address: coreAddress,
        functionName: "createCampaign",
        args: [name, duration, goal, totalNfts, tokenAddress, nftAddress],
      });
      if (isSuccess) {
        toast("Campaign created successfully", {
          className: "bg-green-500 text-white",
          type: "success",
          autoClose: 3000,
        });
      }
    } catch (error) {
      isError &&
        toast("Campaign creation failed", {
          className: "bg-red-500 text-white",
          type: "error",
          autoClose: 3000,
        });
    }
  };

  return (
    <div className={`${work.className}`}>
      {/* Form */}
      <div className="flex flex-col items-center justify-center w-full">
        <div className="w-full flex flex-col">
          {/* name */}
          <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3 w-full">
            <PencilIcon className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Name"
              className="bg-transparent outline-none w-full text-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          {/* Account type */}
          <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3 w-full">
            <CalendarIcon className="text-gray-400 mr-3" />
            <input
              type="number"
              className="bg-transparent outline-none w-full text-gray-900"
              placeholder="Duration"
              // value={duration}
              onChange={(e) => setDuration(+e.target.value)}
            />
          </div>

          {/* goal */}
          <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3 w-full">
            <TargetIcon className="text-gray-400 mr-3" />
            <input
              type="number"
              placeholder="Goal"
              className="bg-transparent outline-none w-full text-gray-900"
              // value={goal}
              onChange={(e) => setGoal(+e.target.value)}
            />
          </div>

          {/* totalNfts you */}
          <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3 w-full">
            <WalletIcon className="text-gray-400 mr-3" />
            <input
              type="number"
              placeholder="Total NFTs"
              className="bg-transparent outline-none w-full text-gray-900"
              // value={totalNfts}
              onChange={(e) => setTotalNfts(+e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3 w-full">
            <CoinsIcon className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="Token Address"
              className="bg-transparent outline-none w-full text-gray-900"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
            />
          </div>

          <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3 w-full">
            <CoinsIcon className="text-gray-400 mr-3" />
            <input
              type="text"
              placeholder="NFT Address"
              className="bg-transparent outline-none w-full text-gray-900"
              value={nftAddress}
              onChange={(e) => setNftAddress(e.target.value)}
            />
          </div>

          {/* Submit Button */}

          <Button
            onClick={handleSubmit}
            isLoading={isLoading}
            className={`w-full py-3 bg-[#03ED0E] text-black font-semibold rounded-[20px] hover:bg-green-500 transition text-[18px] md:text-[19px] ${lato.className}`}
          >
            {isLoading ? "Creating" : "Create Campaign"}
          </Button>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CampaignForm;
