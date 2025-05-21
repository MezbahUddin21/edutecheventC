export default function ContactFooter() {
    return (
      <footer className="bg-black text-white py-16">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-5 gap-10 px-6">
  
          {/* Logo and Reach us */}
          <div className="col-span-2 space-y-6">
            <h3 className="text-2xl font-bold">Logo Here</h3>
            <div className="space-y-4 text-gray-400 text-sm">
              <p>+1 012 3456 789</p>
              <p>demo@gmail.com</p>
              <p>132 Dartmouth Street Boston, Massachusetts 02156 United States</p>
            </div>
          </div>
  
          {/* Other Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Company</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><a href="#">About</a></li>
              <li><a href="#">Contact</a></li>
              <li><a href="#">Blogs</a></li>
            </ul>
          </div>
  
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Legal</h4>
            <ul className="text-gray-400 space-y-2 text-sm">
              <li><a href="#">Privacy Policy</a></li>
              <li><a href="#">Terms & Services</a></li>
              <li><a href="#">Terms of Use</a></li>
              <li><a href="#">Refund Policy</a></li>
            </ul>
          </div>
  
          <div className="space-y-6">
            <h4 className="text-lg font-semibold">Join Our Newsletter</h4>
            <div className="flex flex-col gap-4">
              <input type="email" placeholder="Your email address" className="p-3 rounded-lg text-black" />
              <button className="bg-white text-black font-semibold p-3 rounded-lg hover:bg-gray-100 transition">Subscribe</button>
            </div>
            <p className="text-xs text-gray-500">* We will send you weekly updates for better tool management.</p>
          </div>
  
        </div>
      </footer>
    );
  }
  