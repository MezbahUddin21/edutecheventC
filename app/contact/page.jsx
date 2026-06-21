'use client'
import ContactForm from "@/Components/contactComponents/ContactForm";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";


export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen bg-white px-20 py-10">
      <main className="flex-grow">
        <section className="py-10">
          <div className="">
            <Header className="mb-20"/>

            <div className="text-center my-20">
              <h1 className="text-5xl font-extrabold text-gray-900 mb-4">Contact Us</h1>
              <p className="text-gray-600 text-lg">Any question or remarks? Just write us a message!</p>
            </div>

            {/* Contact Section */}
            <ContactForm />
            <div className="my-20"></div>
            <Footer/>

          </div>
        </section>
      </main>

    </div>
  );
}
