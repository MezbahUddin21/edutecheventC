import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className=" py-10">
      <div>
        <div className="flex justify-around flex-col gap-2 sm:gap-0 sm:flex-row bg-black py-4 rounded-md shadow-[1px_1px_10px_#FFFFFF] items-center px-10 ">
            <Link href={"https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/"}>
              <Image src={assets.logo_light} alt="EduTech Logo" width={150} height={50} style={{ width: 'auto', height: 'auto' }} />
            </Link>
            <p className="text-sm text-white">All right reserved. Copyright @Mezbah Uddin Maruf</p>
            <div className="flex">
              <Link href={"https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/"}>
                <Image src={assets.facebook_icon} alt="Facebook" width={40} height={40}/>
              </Link>
                <Image src={assets.twitter_icon} alt="Twitter" width={40} height={40}/>
                <Image src={assets.googleplus_icon} alt="Google Plus" width={40} height={40}/>
            </div>
        </div>
      </div>
    </div>
      
  )
};

export default Footer;
