"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";

export default function ContactForm() {
  const [selectedSubject, setSelectedSubject] = useState("General Inquiry");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
      {/* Left Contact Info Card */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-3xl p-10 text-white flex flex-col justify-between">
        <div className="space-y-8">
          <h3 className="text-3xl font-bold">Contact Information</h3>
          <p className="text-gray-400">Say something to start a live chat!</p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <Phone className="w-6 h-6" />
              <span>+1 012 3456 789</span>
            </div>
            <div className="flex items-center gap-4">
              <Mail className="w-6 h-6" />
              <span>mezbah.sc@gmail.com</span>
            </div>
            <div className="flex items-center gap-4">
              <MapPin className="w-6 h-6" />
              <span>Mirpur,Dhaka,Bangladesh</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Form Card */}
      <form className="bg-white rounded-3xl shadow-[1px_1px_10px_#AEB6B7] p-10 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">First Name</label>
            <input type="text" placeholder="First Name" className="input-style" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Last Name</label>
            <input type="text" placeholder="Last Name" className="input-style" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Email</label>
            <input type="email" placeholder="Email" className="input-style" />
          </div>

          <div>
            <label className="text-sm font-semibold text-gray-700 block mb-2">Phone Number</label>
            <input type="text" placeholder="+1 012 3456 789" className="input-style" />
          </div>
        </div>

        {/* Subject Selection */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Select Subject?</label>
          <div className="flex flex-wrap gap-4">
            {["General Inquiry", "Partnership", "Support", "Other"].map((subject) => (
              <button
                type="button"
                key={subject}
                onClick={() => setSelectedSubject(subject)}
                className={`px-4 py-2 rounded-full border ${
                  selectedSubject === subject
                    ? "bg-gradient-to-r from-gray-800 to-gray-700 text-white"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {subject}
              </button>
            ))}
          </div>
        </div>

        {/* Message */}
        <div>
          <label className="text-sm font-semibold text-gray-700 block mb-2">Message</label>
          <textarea placeholder="Write your message..." rows="5" className="input-style resize-none"></textarea>
        </div>

        <button
          type="submit"
          className="bg-gradient-to-r from-gray-800 to-gray-700 text-white w-full py-4 rounded-xl hover:bg-gray-900 transition-all font-bold"
        >
          Send Message
        </button>
      </form>
    </div>
  );
}

// Tailwind Styles
const inputStyle = "w-full p-4 rounded-xl bg-gray-100 border border-gray-300 focus:ring-2 focus:ring-black focus:outline-none";
