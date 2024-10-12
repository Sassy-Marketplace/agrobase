import { Footer, Navbar } from "@/components";
import AfroBaseLogo from "@/assets/logo.svg";
import {UserIcon, BriefcaseIcon, MapPinIcon, LockIcon} from "lucide-react"
import Image from "next/image";
import { libre } from "@/components/Font";

const ConnectAccount : React.FC = () => {

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
                <div className={`md:w-1/2 w-full bg-[#042B2B] flex flex-col items-left md:items-center justify-center py-8 md:py-0 ${libre.className}`}>
                    <h1 className="text-left md:text-center text-white text-4xl md:text-5xl mb-3 font-bold pl-7 md:pl-0">Create Account</h1>
                    <p className="text-left md:text-center text-gray-400 text-[17px] md:text-[19px] mb-5 pl-7 md:pl-0">
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
                            placeholder="Username"
                            className="bg-transparent outline-none w-full text-gray-800"
                        />
                        </div>

                        {/* Account type */}
                        <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3">
                        <BriefcaseIcon className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Account type"
                            className="bg-transparent outline-none w-full text-gray-800"
                        />
                        </div>

                        {/* Location */}
                        <div className="flex items-center bg-white rounded-[20px] mb-4 px-4 py-3">
                        <MapPinIcon className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="Location"
                            className="bg-transparent outline-none w-full text-gray-800"
                        />
                        </div>

                        {/* About you */}
                        <div className="flex items-center bg-white rounded-[20px] h-[80px] mb-4 px-4 py-3">
                        <LockIcon className="text-gray-400 mr-3" />
                        <input
                            type="text"
                            placeholder="About you"
                            className="bg-transparent outline-none w-full text-gray-800 h-full"
                        />
                        </div>

                        {/* Submit Button */}
                        <button className="w-full py-3 bg-[#03ED0E] text-black font-semibold rounded-[20px] hover:bg-green-500 transition text-[18px] md:text-[19px]">
                        Create account
                        </button>
                    </div>
                    </div>
                </div>
            </div>
            <div className="lg:hidden sm:flex md:flex flex-col">
                <Footer/>
            </div>
        </>
    )
}

export default ConnectAccount;