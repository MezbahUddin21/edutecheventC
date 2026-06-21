'use client';
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/adminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthProvider } from "../Providers";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }


  return (
    <AuthProvider>
      <div className="sm:block md:flex lg:flex">
        <ToastContainer theme="dark"/>
        <Sidebar />
        <div className="flex flex-col w-full px-4">
          <div className="flex items-center justify-between w-full py-11 max-h-[60px] px-12 mt-4 shadow-[1px_1px_10px_#AEB6B7] p-4 rounded-md">
            <h3 className="text-xl">Admin Panel</h3>
            <Image className="rounded-full" src={assets.profile_icon} width={45} alt="" style={{ width: 'auto', height: 'auto' }}/>
            <span className="underline">
                <button onClick={ ()=> signOut({ callbackUrl: '/login' }) }>Log Out</button>
            </span>
          </div>
          {children}
        </div>
      </div>
    </AuthProvider>
  );
}
