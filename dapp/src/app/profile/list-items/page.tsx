"use client";
import { Footer, Navbar } from "@/components";
import AfroBaseLogo from "@/assets/logo.svg";
import { UserIcon, MapPinIcon, LockIcon, EditIcon } from "lucide-react";
import Image from "next/image";
import { lato, work } from "@/components/Font";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import coreAbi from "@/utils/abis/coreAbi.json";
import { coreAddress } from "@/utils/contractAddresses";
import { useAgrobaseContext } from "@/context";

const page = () => {
  const router = useRouter();
  const { userData, statusBiz } = useAgrobaseContext();

  // State to store form input values
  const [username, setUsername] = useState("");
  const [location, setLocation] = useState("");
  const [about, setAbout] = useState("");
  const [symbol, setSymbol] = useState("");

  const { data, writeContract, isPending, isSuccess, isError } =
    useWriteContract();

  useEffect(() => {
    if (isSuccess) {
      toast("Account edited successfully", {
        className: "bg-green-500 text-white",
        type: "success",
        autoClose: 3000,
      });

      // Redirect to marketplace after 2 seconds
      setTimeout(() => router.push("/profile"), 2000);
    }
  }, [isSuccess]);

  const handleEditAccount = async () => {
    if (!username || !location || !about) {
      // Show toast notification for missing fields
      toast("Fill all required fields", {
        className: "bg-red-500 text-white",
        type: "error",
        style: { background: "#EF4444", color: "white" },
        progressStyle: { background: "white" },
        autoClose: 3000,
      });
    } else {
      try {
        // Perform contract write operation here

        const res = writeContract({
          abi: coreAbi,
          address: coreAddress,
          functionName: statusBiz
            ? "editBusinessProfile"
            : "editInvestorProfile",
          args: [username, about, location, symbol, userData?.profileID],
        });
      } catch (err) {
        isError &&
          toast("Account editing failed", {
            className: "bg-red-500 text-white",
            type: "error",
            autoClose: 3000,
          });
      }
    }
  };

  return (
    <>
      <div className="lg:hidden flex flex-col bg-[#042B2B] ">
        <Navbar />
      </div>
      <div
        className={`flex flex-col md:flex-row lg:flex-row md:h-screen h-auto bg-[#042B2B] lg:p-4 p-0 `}
      >
        {/* Left section with the logo */}
        <div className="md:w-1/2 w-full bg-[#115436] flex items-center justify-center py-10 md:py-0">
          <div className="flex items-center justify-center gap-1">
            <Image
              src={AfroBaseLogo}
              alt="Agrobase logo"
              width={200}
              height={200}
              className="w-200 h-200"
            />
          </div>
        </div>

        {/* Right section with form */}
        <div
          className={`md:w-1/2 w-full bg-[#042B2B] flex flex-col items-left md:items-center justify-center py-8 md:py-0 ${work.className}`}
        >
          <h1
            className={`text-left md:text-center text-white text-4xl md:text-5xl mb-3 font-bold pl-7 md:pl-0`}
          >
            Edit Account
          </h1>
          <p
            className={`text-left md:text-center text-gray-400 text-[17px] md:text-[19px] mb-5 pl-7 md:pl-0`}
          >
            Enter your details to edit your profile.
          </p>

          {/* Form */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full md:max-w-xs flex flex-col px-7 md:px-0">
              {/* Username */}
              <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3 w-full">
                <UserIcon className="text-gray-400 mr-3" />
                <input
                  type="text"
                  id="username"
                  placeholder="Username"
                  className="bg-transparent outline-none w-full text-gray-900"
                  defaultValue={userData?.name || userData?.businessName}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Account type */}
              <div className="flex items-center bg-white rounded-[20px] text-gray-400 mb-4 px-4 py-3">
                <EditIcon className="text-gray-400 mr-3" />
                <input
                  type="text"
                  id="symbol"
                  placeholder="Symbol, Slang, A.K.A"
                  className="bg-transparent outline-none w-full text-gray-900"
                  value={symbol}
                  onChange={(e) => setSymbol(e.target.value)}
                />
              </div>

              {/* Location */}
              <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3">
                <MapPinIcon className="text-gray-400 mr-3" />
                <input
                  id="location"
                  type="text"
                  placeholder="Location"
                  className="bg-transparent outline-none w-full text-gray-900"
                  defaultValue={
                    userData?.businessLocation || userData?.location
                  }
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>

              {/* About you */}
              <div className="flex items-center bg-white rounded-[20px] h-[80px] mb-4 px-4 py-3">
                <LockIcon className="text-gray-400 mr-3" />
                <input
                  id="about"
                  type="text"
                  placeholder="About you"
                  className="bg-transparent outline-none w-full text-gray-900 h-full"
                  defaultValue={
                    userData?.description || userData?.businessDescription
                  }
                  onChange={(e) => setAbout(e.target.value)}
                />
              </div>

              {/* Submit Button */}
              <button
                disabled={isPending}
                onClick={handleEditAccount}
                className={`w-full py-3 bg-[#03ED0E] text-black font-semibold rounded-[20px] hover:bg-green-500 transition text-[18px] md:text-[19px] ${lato.className}`}
              >
                Edit Account
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="lg:hidden sm:flex md:flex flex-col">
        <Footer />
      </div>
      <ToastContainer />
    </>
  );
};

export default page;
