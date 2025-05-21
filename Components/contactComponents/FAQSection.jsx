export default function FAQSection() {
    return (
      <section className="space-y-10">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">Frequently Asked Questions</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-2">How do I create an event?</h3>
            <p className="text-gray-600">You can easily create and manage events by signing up and accessing your dashboard.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Is there a cost for listing an event?</h3>
            <p className="text-gray-600">Listing public events is free. Premium placements are available for an additional fee.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">How do I get support?</h3>
            <p className="text-gray-600">Reach out to our support team via email, chat, or our Help Center available 24/7.</p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Can I manage attendees?</h3>
            <p className="text-gray-600">Yes! Our organizer dashboard lets you track attendees, send updates, and more.</p>
          </div>
        </div>
      </section>
    );
  }
  