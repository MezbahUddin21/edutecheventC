'use client';
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router= useRouter();

  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials",{
        email, password, redirect:false,
      });

      if(res?.error){
        toast.error("Invalid Credentials");
        return;
      };

      if(res?.ok){
        toast.success("Login successful!");
        router.replace("/admin");
      }

    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);

    } finally {
      setLoading(false);
    }
  }


  return (
    <div className="grid place-items-center my-24">
        <div className="shadow-lg p-5 rounded-lg border-t-4 border-slate-900 sm:w-[40%] w-[80%]">
            <h1 className="text-xl font-bold my-4">Login</h1>

            <form className="flex flex-col gap-3" onSubmit={onSubmitHandler}>

                <input 
                  className="pl-4 outline-none w-[100%] rounded-md mt-5 p-5" 
                  onChange={e=> setEmail(e.target.value)} 
                  value={email}
                  type="email"  
                  placeholder="Email"
                  required
                />

                <input 
                  className="pl-4 outline-none w-[100%] rounded-md mt-5 p-5" 
                  onChange={e=> setPassword(e.target.value)}
                  value={password}
                  type="password"  
                  placeholder="Password"
                  required
                />

                <button 
                  type="submit"
                  disabled={loading}
                  className="mt-8 flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 text-white rounded-md bg-slate-900 hover:bg-slate-700 justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? "Logging in..." : "Login"}
                </button>

                <Link className="text-sm mt-3 text-right" href={"/register"}>
                Don't have an account? <span className="underline">Register</span>
                </Link>

            </form>
        </div>
    </div>
  )
};

export default LoginForm;
