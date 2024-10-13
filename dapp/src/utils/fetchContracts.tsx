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
  useSimulateContract,
  useWaitForTransactionReceipt,
  useWriteContract,
} from "wagmi";
import { useState } from "react";
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
  contractName: string;
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
  } as any

  if(args?.length){
    content.args = args;
  }

  const { data, isLoading, error } = useReadContract();

  console.log("abi: ", contractConfigs[contractName]?.abi)

  console.log("error: ", error)
  console.log("data: ", data)

  return {data: data || [], isLoading, error};
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
  const { data } = useSimulateContract({
    abi: contractConfigs[contractName]?.abi,
    address: contractConfigs[contractName]?.address,
    functionName,
    args,
  });

  //[x] - you can change the name to your choice
  const {
    data: writeData,
    isPending: writeLoading,
    writeContract,
  } = useWriteContract();

  console.log("write data", writeData, data);
  writeContract(data!.request);

  //[x] - example how to use is on Button in React
  // <button disabled={isPending} type="submit">
  //   Mint
  //   {isPending ? "Confirming..." : "Mint"}
  // </button>;

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
    writeContract,
    writeWaitError,
    writeWaitSuccess,
    writeWaitLoading,
  };
};

// SAMPLE WRITE USING THE HOOK

// const { writeData,writeLoading,writeContract,writeWaitError,writeWaitSuccess,writeWaitLoading } = useWrite({contractName: "core",
//    functionName: "getAllBusinessProfiles", args: [arg1,arg2], account(optional), value(optional)});
