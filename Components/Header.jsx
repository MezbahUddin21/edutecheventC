import { assets } from "@/Assets/assets";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Header = () => {

  const [email, setEmail] = useState("");

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("email", email);
    const response = await axios.post('/api/email', formData);
    if(response.data.success){
      toast.success(response.data.msg);
      setEmail("");
    } else {
      toast.error("Error");
    }
  }

  return (
    <div className="flex items-center justify-between shadow-[1px_1px_10px_#AEB6B7] 
                    p-3 sm:p-4 lg:p-5 rounded-md">

      {/* Logo */}
      <Link href="/">
        <Image
          src={assets.logo}
          alt="Logo"
          width={180}
          className="w-[110px] sm:w-[130px] md:w-[160px] lg:w-[180px]"
        />
      </Link>

      {/* Right Section */}
      <div className="flex items-center gap-3 sm:gap-4 md:gap-6">

        {/* Navbar Links (hidden on small devices) */}
        <div className="hidden md:flex gap-5 lg:gap-8 text-sm lg:text-base font-medium">
          <Link href="/about" className="hover:text-gray-600 transition">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-600 transition">
            Contact
          </Link>
        </div>

        {/* Get Start Button */}
        <Link href="/register">
          <button
            className="flex items-center gap-2 font-medium
                      py-1.5 px-3
                      sm:py-2 sm:px-4
                      md:py-2.5 md:px-5
                      lg:py-3 lg:px-6
                      text-xs sm:text-sm md:text-base
                      rounded-md bg-white hover:bg-slate-200 transition"
          >
            Get Start
            <Image width={14} src={assets.arrow} alt="Arrow" className="sm:w-4" />
          </button>
        </Link>

      </div>
    </div>

  )
};

export default Header;
