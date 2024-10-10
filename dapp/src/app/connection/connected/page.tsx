import { Footer, Header } from "@/components";
import {CheckCircle2Icon} from "lucide-react"

const ConnectedPage : React.FC = () => {
    return(
        <div className="h-screen bg-gradient-to-r from-[#0f4c13] to-[#022B28] flex flex-col justify-between items-center text-white">
            {/* Header */}
        <Header/>
        
        {/* Main Body */}
        <main className="flex flex-col items-center justify-center flex-1 gap-6">
            {/* <div className="w-full justify-center items-center"> */}
                <CheckCircle2Icon width={300} color="white"/>
            {/* </div> */}

            <button className="px-[30px] py-[10px] bg-[#444444] border-[1px] border-[] text-[#ccc] rounded-[40px]">Wallet connected successfully</button>

            <button className="bg-[#03ED0E] text-[#000] text-lg font-medium py-3 px-10 rounded-[50px] mb-6 hover:bg-[#02D00B]">
              Create Profile
          </button>
        </main>

            <Footer/>
            {/* Footer */}
        </div>
    )
}

export default ConnectedPage;