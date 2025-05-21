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
              <Image src={assets.logo_light} alt="" width={150} />
            </Link>
            <p className="text-sm text-white">All right reserved. Copyright @Mezbah Uddin Maruf</p>
            <div className="flex">
              <Link href={"https://www.facebook.com/sharer/sharer.php?u=http://localhost:3000/"}>
                <Image src={assets.facebook_icon} alt="" width={40}/>
              </Link>
                <Image src={assets.twitter_icon} alt="" width={40}/>
                <Image src={assets.googleplus_icon} alt="" width={40}/>
            </div>
        </div>
      </div>
    </div>
      
  )
};

export default Footer;
