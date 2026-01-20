// app/checkout/page.jsx
import { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="text-center py-20">Loading checkout...</div>}>
      <CheckoutClient />
    </Suspense>
  );
}
