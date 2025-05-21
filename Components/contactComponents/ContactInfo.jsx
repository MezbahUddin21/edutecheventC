export default function ContactInfo() {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-10 space-y-8">
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Customer Support</h3>
          <p className="text-gray-600">support@eventfinder.com</p>
        </div>
  
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Help Center</h3>
          <a href="/help" className="text-blue-600 hover:underline">
            Browse FAQs & Tutorials
          </a>
        </div>
  
        <div>
          <h3 className="text-2xl font-bold text-gray-800 mb-2">Business Inquiries</h3>
          <p className="text-gray-600">business@eventfinder.com</p>
        </div>
  
        <div className="border-t pt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">Office</h3>
          <p className="text-gray-600">123 Event St, Tech City, USA</p>
        </div>
      </div>
    );
  }
  