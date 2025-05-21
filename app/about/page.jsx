'use client'

import Footer from "@/Components/Footer";
import Header from "@/Components/Header";

export default function AboutPage() {
  return (
    <main className="bg-white text-gray-800 px-20 py-10">
        <Header/>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-gray-800 to-gray-600 text-white py-20 px-6 mt-10">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Empowering Connections Through Events</h1>
          <p className="text-lg md:text-xl max-w-3xl mx-auto">
            Discover, host, and attend events that fuel your learning and career in education, IT, and technology — and beyond.
          </p>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">What is EduTechEvent?</h2>
          <p className="text-lg text-gray-600">
            EduTechEvent is a next-generation event discovery and ticketing platform built for lifelong learners,
            tech enthusiasts, and organizations that host meaningful events. Our mission is to create
            a smarter way to find and manage events that matter.
          </p>
        </div>
      </section>

      {/* Core Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-12">Core Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            {[
              {
                title: "Ticket Management",
                desc: "Buy, sell, or manage tickets easily for each event with a clean and secure experience.",
              },
              {
                title: "Smart Event Search",
                desc: "Find events by name, location, date, or category like tech, education, IT, and more.",
              },
              {
                title: "User & Org Profiles",
                desc: "Track tickets purchased, events hosted, and manage your public-facing organization page.",
              },
              {
                title: "Scalable for Growth",
                desc: "Built with flexibility in mind so we can include more event types in future phases.",
              },
              {
                title: "Help & Support",
                desc: "Dedicated help center and contact page to support users and organizers.",
              },
              {
                title: "Authentication",
                desc: "Simple login/register pages to secure your account and event data.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audience Section */}
      <section className="py-16 px-6 bg-gray-100">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-semibold text-center mb-6">Who Is It For?</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 list-disc list-inside text-lg text-gray-700">
            <li>Students looking for learning opportunities</li>
            <li>Organizations hosting training or conferences</li>
            <li>Educators promoting workshops or webinars</li>
            <li>Developers & techies attending industry events</li>
          </ul>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-4">Our Vision</h2>
          <p className="text-lg text-gray-600">
            While we focus on educational and tech events today, we envision expanding to all types of events —
            from arts and sports to community-driven gatherings. With a modular system, we’re ready to scale.
          </p>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-gray-600 to-gray-800 text-white py-16 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Join EduTechEvent Today</h2>
          <p className="text-lg mb-6">
            Start your journey — attend or host events that shape the future.
          </p>
          <div className="space-x-4">
            <a
              href="/register"
              className="bg-white text-black font-semibold px-6 py-3 rounded-lg shadow hover:bg-gray-100"
            >
              Register
            </a>
            <a
              href="/"
              className="border border-white text-white font-semibold px-6 py-3 rounded-lg hover:bg-white hover:text-black"
            >
              Browse Events
            </a>
          </div>
        </div>
      </section>


      <Footer/>
    </main>
  );
}
