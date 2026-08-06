'use client'
import { assets } from "@/Assets/assets";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useSession, signOut } from "next-auth/react";

const ROLE_LABELS = {
  admin: "Admin",
  organizer: "Organizer",
  attendee: "Attendee",
};

const Header = () => {
  const { data: session } = useSession();

  return (
    <header className="flex items-center justify-between shadow-[1px_1px_10px_#AEB6B7] p-3 sm:p-4 lg:p-5 rounded-md">

      {/* Logo */}
      <Link href="/">
        <Image
          src={assets.logo}
          alt="EduTechEvent Logo"
          width={180}
          height={50}
          loading="eager"
          style={{ width: "auto", height: "auto" }}
          className="w-[110px] sm:w-[130px] md:w-[160px] lg:w-[180px]"
        />
      </Link>

      {/* Desktop nav links */}
      <nav className="hidden md:flex gap-5 lg:gap-8 text-sm lg:text-base font-medium">
        <Link href="/" className="hover:text-blue-600 transition">Home</Link>
        <Link href="/about" className="hover:text-blue-600 transition">About</Link>
        <Link href="/contact" className="hover:text-blue-600 transition">Contact</Link>
        {(session?.user?.role === "admin" || session?.user?.role === "organizer") && (
          <Link href="/admin" className="hover:text-blue-600 transition">Dashboard</Link>
        )}
      </nav>

      {/* Right — auth controls */}
      <div className="flex items-center gap-3">
        {session ? (
          <>
            <div className="hidden sm:flex items-center gap-2">
              <Image
                src={assets.profile_icon}
                alt="Profile"
                width={32}
                height={32}
                className="rounded-full"
                style={{ width: 32, height: 32 }}
              />
              <div className="text-xs leading-tight">
                <p className="font-medium text-gray-800 truncate max-w-[120px]">{session.user.name}</p>
                {session.user.role && (
                  <span className="text-blue-600 font-semibold">
                    {ROLE_LABELS[session.user.role] || session.user.role}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="text-sm font-medium py-1.5 px-4 rounded-md border border-gray-300 hover:bg-gray-100 transition"
            >
              Sign Out
            </button>
          </>
        ) : (
          <Link href="/login">
            <button className="flex items-center gap-2 font-medium py-1.5 px-3 sm:py-2 sm:px-4 md:py-2.5 md:px-5 text-xs sm:text-sm md:text-base rounded-md bg-white hover:bg-slate-200 border border-gray-200 transition">
              Sign In
              <Image
                width={14}
                height={14}
                src={assets.arrow}
                alt=""
                style={{ width: "auto", height: "auto" }}
                className="sm:w-4"
              />
            </button>
          </Link>
        )}
      </div>
    </header>
  );
};

export default Header;
