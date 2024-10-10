import React from "react"
import {ArrowRightCircle} from "lucide-react"
import {SocialIcon} from "react-social-icons"

const Footer: React.FC =() => {
    return(
        <footer className="w-10/12 py-10 flex justify-between items-center">
        <div className="text-white text-[18px] flex items-center justify-left gap-2"><span>Download Whitepaper</span> <a href="" className='hover:opacity-80'>
            <ArrowRightCircle size={20} fontSize={800}/></a> </div>
        <div className="flex gap-1 items-center">
          {/* Social media icons */}
           <a href="https://twitter.com" aria-label="Twitter">
            <SocialIcon url='www.x.com' bgColor='transparent'  style={{width: "35px"}}/>
          </a>
          <a href="https://instagram.com" aria-label="Instagram">
            <SocialIcon url='www.instagram.com' bgColor='transparent' style={{width: "35px"}}/>
          </a>
          <a href="https://youtube.com" aria-label="YouTube">
            <SocialIcon url='www.youtube.com' bgColor='transparent' style={{width: "40px"}}/>
          </a>
          <a href="https://linkedin.com" aria-label="LinkedIn">
            <SocialIcon url='www.linkedin.com' bgColor='transparent' style={{width: "40px"}}/>
          </a>
          <a href="" aria-label='Agrobase'>
            <p className='text-[18px]'>Agrobase MP</p>
          </a>
        </div>
      </footer>
    )
}

export default Footer