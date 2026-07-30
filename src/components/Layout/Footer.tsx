import { Send, MapPin, Phone, Mail } from 'lucide-react';

interface IconProps {
  size?: number;
  className?: string;
}

const Facebook = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>
);
const Twitter = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" /></svg>
);
const Instagram = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
);
const Linkedin = ({ size = 24, className = "" }: IconProps) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect width="4" height="12" x="2" y="9" /><circle cx="4" cy="4" r="2" /></svg>
);

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-950 text-zinc-300 py-16 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand & About */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white tracking-tight">
              BuyFlow<span className="text-blue-500">.</span>
            </h2>
            <p className="text-sm text-zinc-400 leading-relaxed">
              Elevating your shopping experience with premium products, seamless transactions, and unparalleled customer service. Your journey to exceptional quality starts here.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-blue-600 hover:text-white transition-all duration-300 group">
                <Facebook size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-blue-400 hover:text-white transition-all duration-300 group">
                <Twitter size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-pink-600 hover:text-white transition-all duration-300 group">
                <Instagram size={18} className="group-hover:scale-110 transition-transform" />
              </a>
              <a href="#" className="p-2 bg-zinc-900 rounded-full hover:bg-blue-700 hover:text-white transition-all duration-300 group">
                <Linkedin size={18} className="group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {['Home', 'Shop Collections', 'About Us', 'Contact', 'Blog', 'FAQs'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Customer Support
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h3>
            <ul className="space-y-3 text-sm">
              {['Track Order', 'Returns & Refunds', 'Shipping Policy', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a href="#" className="hover:text-white hover:translate-x-1 inline-block transition-all duration-300">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-6 relative inline-block">
              Newsletter
              <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-blue-500 rounded-full"></span>
            </h3>
            <p className="text-sm text-zinc-400 mb-4">
              Subscribe to get special offers, free giveaways, and once-in-a-lifetime deals.
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <Mail className="absolute left-3 text-zinc-500" size={18} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-3 pl-10 pr-12 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1 p-2 bg-blue-600 hover:bg-blue-500 rounded-full text-white transition-colors group"
                aria-label="Subscribe"
              >
                <Send size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </form>

            <div className="mt-6 space-y-3">
              <div className="flex items-center space-x-3 text-sm text-zinc-400">
                <Phone size={16} className="text-blue-500" />
                <span>+212 619230516</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-zinc-400">
                <MapPin size={16} className="text-blue-500" />
                <span>Meknes , marjane 2 N257</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-16 pt-8 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-zinc-500">
            &copy; {currentYear} BuyFlow. All rights reserved.
          </p>

        </div>
      </div>
    </footer>
  );
}
