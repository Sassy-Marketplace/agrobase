"use client"
import { Footer, Navbar } from "@/components";
import AfroBaseLogo from "@/assets/logo.svg";
import {UserIcon, BriefcaseIcon, MapPinIcon, LockIcon} from "lucide-react"
import Image from "next/image";
import { lato, libre, work } from "@/components/Font";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ConnectAccount : React.FC = () => {
    const router = useRouter();

    const handleCreateAccount = () => {
        const username = document.getElementById("username");
        const accountType = document.getElementById("account-type")
        const location = document.getElementById("location")
        const about = document.getElementById("about");

        //@ts-expect-error
        if(!username?.value || !accountType?.value || !location?.value || !about?.value){
            toast("All fields are required", {
                className: "bg-red-500 text-white",
                type: "error",
                style: {background: "#EF4444", color: "white"},
                progressStyle: {background: "white"},
                autoClose: 3000,
            })
        }else{

        // Perform account creation here

        router.push("/marketplace")

        }
    };

    return(
        <>
        <div className="lg:hidden flex flex-col bg-[#042B2B] ">
            <Navbar/>
        </div>
           <div className={`flex flex-col md:flex-row lg:flex-row md:h-screen h-auto bg-[#042B2B] lg:p-4 p-0 `}>
                {/* Left section with the logo */}
                <div className="md:w-1/2 w-full bg-[#115436] flex items-center justify-center py-10 md:py-0">
                    <div className="flex items-center justify-center gap-1">
                             <Image src={AfroBaseLogo} alt='Agrobase logo' width={200} height={200} className='w-200 h-200'/>
                    </div>
                </div>

                {/* Right section with connect wallet */}
                <div className={`md:w-1/2 w-full bg-[#042B2B] flex flex-col items-left md:items-center justify-center py-8 md:py-0 ${work.className}`}>
                    <h1 className={`text-left md:text-center text-white text-4xl md:text-5xl mb-3 font-bold pl-7 md:pl-0`}>Create Account</h1>
                    <p className={`text-left md:text-center text-gray-400 text-[17px] md:text-[19px] mb-5 pl-7 md:pl-0`}>
                    Welcome! Enter your details and start creating, <br /> purchasing, selling, and investing.
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
                        />
                        </div>

                        {/* Account type */}
                        <div className="flex items-center bg-white rounded-[20px] text-gray-400 mb-4 px-4 py-3">
                        <BriefcaseIcon className="text-gray-400 mr-3" />
                        <select id="account-type" name="Account Type" className="bg-transparent outline-none w-full " >
                            <option disabled selected value="" className="text-gray-400">Account Type</option>
                            <option value="business" className="">Farmer</option>
                            <option value="business" className="">Investor</option>
                            <option value="user" className="">Buyer</option>
                        </select>
                        </div>

                        {/* Location */}
                        <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3">
                        <MapPinIcon className="text-gray-400 mr-3" />
                        <input
                            id="location"
                            type="text"
                            placeholder="Location"
                            className="bg-transparent outline-none w-full text-gray-900"
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
                        />
                        </div>

                        {/* Submit Button */}
                        <button onClick={handleCreateAccount} className={`w-full py-3 bg-[#03ED0E] text-black font-semibold rounded-[20px] hover:bg-green-500 transition text-[18px] md:text-[19px] ${lato.className}`}>
                        Create account
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="lg:hidden sm:flex md:flex flex-col">
                <Footer/>
            </div>
            <ToastContainer/>
        </>
    )
}

export default ConnectAccount;