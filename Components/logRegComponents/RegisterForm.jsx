'use client'
import React, { useState } from "react";
import Link from "next/link";
import axios from "axios";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const RegisterForm = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "attendee",
  });

  const router = useRouter();

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    if (!data.name || !data.email || !data.password) {
      toast.error("All fields are required!");
      return;
    }
    if (data.password.length < 8) {
      toast.error("Password must be at least 8 characters!");
      return;
    }

    // Check if user already exists
    const resUserExists = await fetch("api/userExists", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: data.email }),
    });
    const { user } = await resUserExists.json();
    if (user) {
      toast.error("An account with this email already exists.");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("email", data.email);
    formData.append("password", data.password);
    formData.append("role", data.role);

    const response = await axios.post("/api/user", formData);

    if (response.data.success) {
      setData({ name: "", email: "", password: "", role: "attendee" });
      toast.success("Registered successfully! Redirecting to login…");
      setTimeout(() => router.push("/login"), 2000);
    } else {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="grid place-items-center my-24">
      <div className="shadow-lg p-6 rounded-lg border-t-4 border-slate-900 sm:w-[40%] w-[85%]">
        <h1 className="text-xl font-bold mb-2">Create your account</h1>
        <p className="text-sm text-gray-500 mb-6">Join EduTechEvent and start discovering events.</p>

        <form className="flex flex-col gap-4" onSubmit={onSubmitHandler}>
          <input
            name="name"
            onChange={onChangeHandler}
            value={data.name}
            className="pl-4 outline-none w-full rounded-md p-3 border border-gray-200 focus:border-slate-400 transition"
            type="text"
            placeholder="Full Name"
            required
          />
          <input
            name="email"
            onChange={onChangeHandler}
            value={data.email}
            className="pl-4 outline-none w-full rounded-md p-3 border border-gray-200 focus:border-slate-400 transition"
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            name="password"
            onChange={onChangeHandler}
            value={data.password}
            className="pl-4 outline-none w-full rounded-md p-3 border border-gray-200 focus:border-slate-400 transition"
            type="password"
            placeholder="Password (min 8 characters)"
            required
          />

          {/* Role selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">I am joining as a…</label>
            <div className="flex gap-3">
              {["attendee", "organizer"].map((r) => (
                <label
                  key={r}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg border cursor-pointer transition text-sm font-medium capitalize ${
                    data.role === r
                      ? "bg-slate-900 text-white border-slate-900"
                      : "bg-white text-gray-600 border-gray-200 hover:border-slate-400"
                  }`}
                >
                  <input
                    type="radio"
                    name="role"
                    value={r}
                    checked={data.role === r}
                    onChange={onChangeHandler}
                    className="hidden"
                  />
                  {r === "attendee" ? "🎟 Attendee" : "🏢 Organizer"}
                </label>
              ))}
            </div>
            <p className="text-xs text-gray-400 mt-1">
              {data.role === "organizer"
                ? "Organizers can create and manage events from the dashboard."
                : "Attendees can browse and purchase tickets for events."}
            </p>
          </div>

          <button
            type="submit"
            className="mt-2 py-3 px-6 text-white font-medium rounded-md bg-slate-900 hover:bg-slate-700 transition"
          >
            Register
          </button>

          <Link className="text-sm text-center text-gray-500" href="/login">
            Already have an account?{" "}
            <span className="underline text-slate-800 font-medium">Sign in</span>
          </Link>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
