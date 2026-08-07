'use client';
import { assets } from "@/Assets/assets";
import Sidebar from "@/Components/adminComponents/Sidebar";
import Image from "next/image";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Layout({ children }) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
      return;
    }
    // Only admin and organizer may access the dashboard
    if (
      status === 'authenticated' &&
      session?.user?.role !== 'admin' &&
      session?.user?.role !== 'organizer'
    ) {
      router.push('/');
    }
  }, [status, session, router]);

  if (status === 'loading') {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading…</p>
        </div>
      </div>
    );
  }

  if (
    status === 'unauthenticated' ||
    (session?.user?.role !== 'admin' && session?.user?.role !== 'organizer')
  ) {
    return null;
  }

  return (
    <div className="sm:block md:flex lg:flex">
      <ToastContainer theme="dark" />
      <Sidebar />
      <div className="flex flex-col w-full px-4">
        <div className="flex items-center justify-between w-full py-11 max-h-[60px] px-12 mt-4 shadow-[1px_1px_10px_#AEB6B7] p-4 rounded-md">
          <div>
            <h3 className="text-xl font-semibold">
              {session?.user?.role === 'admin' ? 'Admin Panel' : 'Organizer Dashboard'}
            </h3>
            <p className="text-xs text-gray-500 capitalize">{session?.user?.role}</p>
          </div>
          <div className="flex items-center gap-4">
            <span className="hidden sm:block text-sm text-gray-600">{session?.user?.name}</span>
            <Image
              className="rounded-full"
              src={assets.profile_icon}
              width={40}
              alt="Profile"
              style={{ width: 'auto', height: 'auto' }}
            />
            <button
              onClick={() => signOut({ callbackUrl: '/login' })}
              className="text-sm underline text-gray-600 hover:text-gray-900"
            >
              Log Out
            </button>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
}
