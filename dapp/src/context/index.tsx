"use client";
import { useRead } from "@/utils/fetchContracts";
import { createContext, useState, ReactNode, useContext } from "react";
import { Address, zeroAddress } from "viem";
import { useAccount } from "wagmi";

export interface UserData {
  profileID: number;
  username?: string;
  name?: string;
  businessName?: string;
  businessLocation?: string;
  location?: string;
  description?: string;
  businessDescription?: string;
  accountType?: string;
  businessSymbol?: string;
  symbol?: string;
  store?: Address;
  user?: Address;
  businessOwner?: Address;
  tokenboundAddr?: Address;
}

// Define the type of the context value
interface AgrobaseContextType {
  userData: UserData | null;
  address: Address;
  newUserData: UserData;
  statusBiz: {} | boolean | null;
  setNewUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
  allProfiles: any;
}

// Initialize the context with null as a default value but type it properly
export const AgrobaseContext = createContext<AgrobaseContextType>({
  userData: {
    profileID: 0,
    username: "",
    name: "",
    businessName: "",
    businessLocation: "",
    location: "",
    description: "",
    businessDescription: "",
    accountType: "",
    businessSymbol: "",
    symbol: "",
    store: zeroAddress,
    user: zeroAddress,
    businessOwner: zeroAddress,
    tokenboundAddr: zeroAddress,
  },

  statusBiz: false || null,
  newUserData: {
    profileID: 0,
    username: "",
    name: "",
    businessName: "",
    businessLocation: "",
    location: "",
    description: "",
    businessDescription: "",
    accountType: "",
    businessSymbol: "",
    symbol: "",
    store: zeroAddress,
    user: zeroAddress,
    businessOwner: zeroAddress,
    tokenboundAddr: zeroAddress,
  },

  address: zeroAddress,

  setNewUserData: () => {},
  allProfiles: [],
});

interface Props {
  children: ReactNode;
}

const AgrobaseProvider = ({ children }: Props) => {
  const [newUserData, setNewUserData] = useState<any>(null);
  const [newMarketItem, setNewMarketItem] = useState<any>(null);

  const { address, isConnected } = useAccount();

  const { data: statusBiz } = useRead({
    contractName: "core",
    functionName: "isBusiness",
    args: [address],
  });

  const { data: allProfiles } = useRead({
    contractName: "core",
    functionName: statusBiz
      ? "getAllBusinessProfiles"
      : "getAllInvestorProfiles",
  });

  const profileIdArray = (allProfiles as any[])?.filter((it) =>
    statusBiz ? address === it.businessOwner : address === it.user
  );
  const profileId =
    profileIdArray?.length > 0 ? profileIdArray[0]?.profileID : null;

  const { data: userData } = useRead({
    contractName: "core",
    functionName: statusBiz ? "getBusinessProfile" : "getInvestorProfile",
    args: [profileId],
  });

  console.log(statusBiz, profileIdArray, allProfiles, userData, address);

  const contextValue = {
    address,
    userData,
    statusBiz,
    newUserData,
    setNewUserData,
    allProfiles,
  };
  return (
    //@ts-expect-error
    <AgrobaseContext.Provider value={contextValue}>
      {children}
    </AgrobaseContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAgrobaseContext = () => useContext(AgrobaseContext);
export default AgrobaseProvider;
