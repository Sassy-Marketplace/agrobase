"use client";
import { Footer, Navbar } from "@/components";
import AfroBaseLogo from "@/assets/logo.svg";
import {
  UserIcon,
  MapPinIcon,
  LockIcon,
  EditIcon,
  StoreIcon,
  FileIcon,
} from "lucide-react";
import Image from "next/image";
import { lato, work } from "@/components/Font";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useWriteContract } from "wagmi";
import { useEffect, useState } from "react";
import marketAbi from "@/utils/abis/marketAbi.json";
import { coreAddress } from "@/utils/contractAddresses";
import { useAgrobaseContext } from "@/context";
import { pinFileToIPFS } from "@/utils/uploadToIpfs";
import { parseEther } from "viem";

const page = () => {
  const router = useRouter();
  const { userData, statusBiz } = useAgrobaseContext();

  // State to store form input values
  const [username, setUsername] = useState("");
  const [uri, setUri] = useState("");
  const [price, setPrice] = useState<number>(0);
  const [image, setImage] = useState<FileList | null>();

  const { data, writeContract, isPending, isSuccess, isError, error } =
    useWriteContract();

  useEffect(() => {
    if (uri) {
      writeContract({
        abi: marketAbi,
        address: userData?.store!,
        functionName: "listItemForSale",
        args: [username, price, uri],
        value: parseEther("0.0000001"),
      });
    }
  }, [uri]);

  useEffect(() => {
    if (isSuccess) {
      toast("Market Item Listed successfully", {
        className: "bg-green-500 text-white",
        type: "success",
        autoClose: 3000,
      });

      // Redirect to marketplace after 2 seconds
      setTimeout(() => router.push("/marketplace"), 2000);
    }
  }, [isSuccess]);

  useEffect(() => {
    console.error(error);

    if (isError) {
      toast("Market Item Listing failed", {
        className: "bg-red-500 text-white",
        type: "error",
        autoClose: 3000,
      });
    }
  }, [isError]);

  const handleListItem = async () => {
    if (!username || !price) {
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
        // writeContract({
        //   abi: coreAbi,
        //   address: coreAddress,
        //   functionName: "listItemForSale",
        //   args: [username, price, uri],
        //   value: parseEther("0.0000000001"),
        // });
        // Perform contract write operation here
        const imgUrl = await pinFileToIPFS(image);
        if (imgUrl) {
          toast.success("Upload Successful");
          toast.info("Please wait while we list your image");
          setUri(imgUrl);
        } else {
          toast.error("Error Uploading Image");
        }
      } catch (err) {
        isError &&
          toast("Market Item Listing failed", {
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
            List Market Item
          </h1>
          <p
            className={`text-left md:text-center text-gray-400 text-[17px] md:text-[19px] mb-5 pl-7 md:pl-0`}
          >
            Enter details of product.
          </p>

          {/* Form */}
          <div className="flex flex-col items-center justify-center w-full">
            <div className="w-full md:max-w-xs flex flex-col px-7 md:px-0">
              {/* Username */}
              <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3 w-full">
                <StoreIcon className="text-gray-400 mr-3" />
                <input
                  type="text"
                  id="username"
                  placeholder="Item Name"
                  className="bg-transparent outline-none w-full text-gray-900"
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Account type */}
              <div className="flex items-center bg-white rounded-[20px] text-gray-400 mb-4 px-4 py-3">
                <EditIcon className="text-gray-400 mr-3" />
                <input
                  type="number"
                  id="price"
                  placeholder="Price"
                  className="bg-transparent outline-none w-full text-gray-900"
                  onChange={(e) => setPrice(+e.target.value)}
                />
              </div>

              <div className="flex items-center bg-white rounded-[20px] text-gray-400 mb-4 px-4 py-3">
                <FileIcon className="text-gray-400 mr-3" />
                <label className="" htmlFor="item">
                  <input
                    type="file"
                    name="item"
                    id="item"
                    placeholder="Item Image"
                    className="bg-transparent outline-none w-full text-gray-900"
                    onChange={(e) => setImage(e.currentTarget.files)}
                  />
                </label>
              </div>

              {/* Submit Button */}
              <button
                disabled={isPending}
                onClick={handleListItem}
                className={`w-full py-3 bg-[#03ED0E] text-black font-semibold rounded-[20px] hover:bg-green-500 transition text-[18px] md:text-[19px] ${lato.className}`}
              >
                Add Item
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
