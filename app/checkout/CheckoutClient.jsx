// app/checkout/page.jsx
"use client";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";

import { useState } from "react";
import InputField from "@/Components/InputField";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function CheckoutClient() {
  const searchParams = useSearchParams();
  const quantity = useMemo(() => parseInt(searchParams.get("quantity") || "1"), [searchParams]);
  const total = useMemo(() => parseFloat(searchParams.get("total") || "0"), [searchParams]);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      alert("Order placed!");
      setLoading(false);
    }, 1500);
  };

  return (
    <>
    <Header/>
    <div className="max-w-6xl mx-auto bg-white rounded-lg shadow-md p-8 my-20">

      <h1 className="text-3xl font-bold mb-8 text-gray-800">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid md:grid-cols-3 gap-10">
        {/* Form */}
        <div className="md:col-span-2 space-y-6">
          {/* Shipping Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
            Billing information

            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <InputField label="Full Name" required />
              <InputField label="Email" type="email" required />
              <InputField label="Address" required />
              <InputField label="City" required />
              <InputField label="State" required />
              <InputField label="ZIP Code" required />
              <InputField label="Phone" type="tel" required />
            </div>
          </div>

          {/* Payment Info */}
          <div>
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              Payment Details
            </h2>
            <div className="space-y-4">
              <InputField label="Cardholder Name" required />
              <InputField label="Card Number" required />
              <div className="grid grid-cols-2 gap-4">
                <InputField label="Expiry Date (MM/YY)" required />
                <InputField label="CVV" required />
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <aside className="bg-gray-50 p-6 rounded-lg shadow-inner">
          <h2 className="text-xl font-semibold mb-4 text-gray-700">
            Order Summary
          </h2>
          <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow-md">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">Checkout</h1>

            <div className="space-y-4 text-lg text-gray-700">
              <p><strong>Quantity:</strong> {quantity}</p>
              <p><strong>Total:</strong> TK {total.toFixed(2)}</p>
            </div>
      </div>
          <button
            type="submit"
            disabled={loading}
            className={`mt-6 w-full py-3 text-white font-medium rounded transition ${
              loading ? "bg-gray-400" : "bg-gray-600 hover:bg-gray-700"
            }`}
          >
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </aside>
      </form>
    </div>

    <Footer/>
    </>
  );
}
