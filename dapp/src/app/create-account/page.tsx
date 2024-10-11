import { Footer } from "@/components";
import logo from "../../assets/logos/white.png"
import {UserIcon, BriefcaseIcon, MapPinIcon, LockIcon} from "lucide-react"

const ConnectAccount : React.FC = () => {

    return(
        <>
           <div className="flex flex-col md:flex-row lg:flex-row h-screen bg-[#042B2B] lg:p-4 p-0">
                {/* Left section with the logo */}
                <div className="md:w-1/2 w-full bg-[#115436] flex items-center justify-center">
                    <div className="flex items-center justify-center gap-1">
                    <img src={logo.src} alt='Agrobase logo' className='w-50 h-24' />
                    {/* <h2 className="text-white text-xl font-semibold">Agrobase</h2> */}
                    </div>
                </div>

                {/* Right section with connect wallet */}
                <div className="md:w-1/2 w-full bg-[#042B2B] flex flex-col items-center justify-center">
                    <h1 className="text-center text-white text-4xl mb-3 font-bold">Create Account</h1>
                    <p className="text-center text-gray-400 text-[16px] mb-5">
                    Welcome! Enter your details and start creating, <br /> purchasing, selling, and investing.
                    </p>

                    {/* Form */}
                    <div className="flex flex-col items-center justify-center w-full">
                    <div className="w-full max-w-xs flex flex-col">
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
                        <button className="w-full py-3 bg-[#03ED0E] text-black font-semibold rounded-[20px] hover:bg-green-500 transition">
                        Create account
                        </button>
                    </div>
                    </div>
                    {/*  */}
                </div>
            </div>
            <div className="lg:hidden sm:flex md:flex flex-col">
                <Footer/>
            </div>
        </>
    )
}

export default ConnectAccount;