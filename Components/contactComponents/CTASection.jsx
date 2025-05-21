export default function CTASection() {
    return (
      <div className="bg-blue-600 rounded-3xl p-10 text-white text-center mt-16">
        <h2 className="text-4xl font-extrabold mb-4">Ready to Host Your Next Event?</h2>
        <p className="text-lg mb-6">Create, manage, and grow your event easily with EventFinder.</p>
        <a
          href="/create-event"
          className="inline-block bg-white text-blue-600 font-bold py-4 px-8 rounded-xl hover:bg-gray-100 transition"
        >
          Get Started
        </a>
      </div>
    );
  }
  