import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Subscribe = () => {

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
      <div className="text-center sm:my-6 md:my-10">
        <h1 className="text-3xl sm:text-5xl font-medium">Here you go</h1>
        <p className="mt-10 max-w-[740px] m-auto text-xs sm:text-base">
          Subscribe to get updates about upcoming events
        </p>

        <form 
          onSubmit={onSubmitHandler} 
          className="flex justify-between max-w-[500px] scale-75 sm:scale-100 mx-auto mt-10 shadow-[1px_1px_10px_#AEB6B7] rounded-md"
        >
          <input 
            onChange={(e) => setEmail(e.target.value)} 
            value={email} 
            type="email" 
            placeholder="Enter your email.." 
            className="pl-4 outline-none w-full rounded-md"
          />
          <button className="py-4 px-4 sm:px-8 hover:bg-slate-200 active:text-slate-400" type="submit">
            Subscribe
          </button>
        </form>
      </div>
  )
};

export default Subscribe;
