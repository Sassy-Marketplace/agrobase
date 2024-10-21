"use client";
import coreAbi from "./abis/coreAbi.json";
import marketFactoryAbi from "./abis/marketFactoryAbi.json";
import campaignFactoryAbi from "./abis/campaignFactoryAbi.json";
import {
  campaignfactory,
  coreAddress,
  marketfactory,
} from "./contractAddresses";
import {
  useReadContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useCallback } from "react";
import { Address } from "viem";

export const contractConfigs = {
  core: {
    abi: coreAbi,
    address: coreAddress,
  },
  marketFactory: {
    abi: marketFactoryAbi,
    address: marketfactory,
  },
  campaignFactory: {
    abi: campaignFactoryAbi,
    address: campaignfactory,
  },
};

export interface dataProps {
  contractName: keyof typeof contractConfigs;
  functionName: string;
  args?: Array<any>;
  account?: Address;
  value?: bigint;
}

// Hook to read data from a contract
export const useRead = ({
  contractName,
  functionName,
  args,
  account,
  value,
}: dataProps) => {
  let content = {
    abi: contractConfigs[contractName]?.abi,
    address: contractConfigs[contractName]?.address,
    functionName,
  } as any;

  if (args?.length) {
    content.args = args;
  }

  const { data, isLoading, error } = useReadContract(content);

  return { data: data || null, isLoading, error };
};

// SAMPLE CALL USING THE HOOK

//  const data = useRead({
//    contractName: "core",
//    functionName: "getAllBusinessProfiles",
//  });
//  console.log(data);

// Hook to write data to a contract
export const useWrite = ({
  contractName,
  functionName,
  args,
  account,
  value,
}: dataProps) => {
  const {
    data: writeData,
    isPending: writeLoading,
    writeContract,
  } = useWriteContract();

  console.log("write data", writeData);

  const fetchWriteContract = useCallback(() => {
    writeContract({
      abi: contractConfigs[contractName]?.abi,
      address: contractConfigs[contractName]?.address,
      functionName,
      args,
    });
    console.log("in the fetch write contract function");
  }, [writeData, writeLoading]);

  const {
    isError: writeWaitError,
    isSuccess: writeWaitSuccess,
    isLoading: writeWaitLoading,
  } = useWaitForTransactionReceipt({
    hash: writeData,
  });

  return {
    writeData,
    writeLoading,
    fetchWriteContract,
    writeWaitError,
    writeWaitSuccess,
    writeWaitLoading,
  };
};

// SAMPLE WRITE USING THE HOOK

// const { writeContract, isPending, isSuccess, isError, error } = useWriteContract();

// const onCreateEvent = () => {
//   writeContract({
//     abi: FEEDBACKS_ABI,
//     address: FEEDBACK_ADDRESS,
//     functionName: "createEvent",
//     args: [
//       brandId,
//       name,
//       description,
//       eventLocation,
//       eventDuration.start,
//       eventDuration.end,
//       eventWebsite,
//       eventRegistrationLink,
//       brandArrayValues.map(Number),
//     ],
//   });
// };
