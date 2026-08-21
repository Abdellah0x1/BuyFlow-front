import { Send, MapPin, Phone, Mail } from 'lucide-react';
import { Link } from 'react-router';

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
    <footer className="bg-canvas-parchment border-t border-hairline py-16">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand & About */}
          <div className="space-y-5">
            <h2 className="text-tagline text-ink">
              BuyFlow<span className="text-brand">.</span>
            </h2>
            <p className="text-caption-apple text-ink-muted-48 leading-relaxed">
              Elevating your shopping experience with premium products, seamless transactions, and unparalleled customer service.
            </p>
            <div className="flex space-x-3">
              {[
                { Icon: Facebook, label: "Facebook" },
                { Icon: Twitter, label: "Twitter" },
                { Icon: Instagram, label: "Instagram" },
                { Icon: Linkedin, label: "LinkedIn" },
              ].map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="p-2 rounded-full text-ink-muted-48 hover:text-brand transition-colors duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-caption-strong text-ink-muted-80 mb-5">
              Quick Links
            </h3>
            <ul className="space-y-0">
              {[
                { label: 'Home', to: '/' },
                { label: 'Products', to: '/products' },
                { label: 'About Us', to: '/about' },
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    className="text-dense-link text-ink-muted-48 hover:text-brand transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-caption-strong text-ink-muted-80 mb-5">
              Customer Support
            </h3>
            <ul className="space-y-0">
              {['Track Order', 'Returns & Refunds', 'Shipping Policy', 'Privacy Policy', 'Terms of Service'].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-dense-link text-ink-muted-48 hover:text-brand transition-colors duration-200"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-caption-strong text-ink-muted-80 mb-5">
              Newsletter
            </h3>
            <p className="text-caption-apple text-ink-muted-48 mb-4">
              Subscribe for special offers and updates.
            </p>
            <form className="relative flex items-center" onSubmit={(e) => e.preventDefault()}>
              <Mail className="absolute left-4 text-ink-muted-48" size={16} />
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full bg-white border border-hairline rounded-full py-3 pl-10 pr-12 text-caption-apple text-ink placeholder:text-ink-muted-48 focus:outline-none focus:border-brand transition-colors"
                required
              />
              <button
                type="submit"
                className="absolute right-1.5 p-2 bg-brand hover:bg-brand-light rounded-full text-white transition-colors active-scale"
                aria-label="Subscribe"
              >
                <Send size={14} />
              </button>
            </form>

            <div className="mt-5 space-y-3">
              <div className="flex items-center space-x-3 text-caption-apple text-ink-muted-48">
                <Phone size={14} className="text-brand" />
                <span>+212 619230516</span>
              </div>
              <div className="flex items-center space-x-3 text-caption-apple text-ink-muted-48">
                <MapPin size={14} className="text-brand" />
                <span>Meknes, Marjane 2 N257</span>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-5 border-t border-hairline">
          <p className="text-fine-print text-ink-muted-48 text-center">
            &copy; {currentYear} BuyFlow. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
