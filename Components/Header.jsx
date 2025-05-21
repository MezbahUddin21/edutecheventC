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
      <div className="flex justify-between items-center shadow-[1px_1px_10px_#AEB6B7] p-4 rounded-md">
        
        {/* Logo on the left */}
        <Link href={"/"}>
          <Image src={assets.logo} width={180} alt='' className="w-[130px] sm:w-auto" />
        </Link>

        {/* Spacer to push navbar and button to right */}
        <div className="flex items-center gap-6 ml-auto">
          {/* Navbar Items */}
          <div className="hidden md:flex gap-6 text-sm font-medium">
            {/* <Link href="/events" className="hover:text-gray-600">Events</Link> */}
            <Link href="/about" className="hover:text-gray-600">About</Link>
            <Link href="/contact" className="hover:text-gray-600">Contact</Link>
          </div>

          {/* Get Start Button */}
          <Link href={"/register"}>
            <button className="flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 rounded-md bg-white hover:bg-slate-200">
              Get Start 
              <Image width={15} src={assets.arrow} alt=''/>
            </button>
          </Link>
        </div>

      </div>
  )
};

export default Header;
