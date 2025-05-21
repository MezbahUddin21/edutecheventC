// app/checkout/layout.js
export const metadata = {
    title: "Checkout | MyStore",
  };
  
  export default function CheckoutLayout({ children }) {
    return (
      <section className="min-h-screen bg-gray-100 py-10 px-20">
          {children}
      </section>
    );
  }
  