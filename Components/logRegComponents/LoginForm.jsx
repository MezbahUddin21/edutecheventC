'use client';
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        toast.error("Invalid email or password");
        return;
      }

      if (res?.ok) {
        toast.success("Login successful!");

        // Fetch session to read role for redirect decision
        const session = await getSession();
        const role = session?.user?.role;

        if (role === "admin" || role === "organizer") {
          router.replace("/admin");
        } else {
          router.replace("/");
        }
      }
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center my-24">
      <div className="shadow-lg p-6 rounded-lg border-t-4 border-slate-900 sm:w-[40%] w-[85%]">
        <h1 className="text-xl font-bold mb-2">Welcome back</h1>
        <p className="text-sm text-gray-500 mb-6">Sign in to your EduTechEvent account.</p>

        <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
          <input
            className="pl-4 outline-none w-full rounded-md p-3 border border-gray-200 focus:border-slate-400 transition"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            className="pl-4 outline-none w-full rounded-md p-3 border border-gray-200 focus:border-slate-400 transition"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            type="password"
            placeholder="Password"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="mt-2 py-3 px-6 text-white font-medium rounded-md bg-slate-900 hover:bg-slate-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>

          <p className="text-xs text-center text-gray-400">
            Admins and organizers are redirected to the dashboard. Attendees go to the home page.
          </p>

          <Link className="text-sm text-center text-gray-500" href="/register">
            Don&apos;t have an account?{" "}
            <span className="underline text-slate-800 font-medium">Register</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
