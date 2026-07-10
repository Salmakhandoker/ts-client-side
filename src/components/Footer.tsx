import { Link } from "react-router-dom";
import { Mail, Phone, MapPin, Twitter, Instagram, Linkedin, Youtube, ShieldCheck } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-primary-500 text-slate-300 border-t border-primary-600">
      {/* Top Section */}
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brand Info */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <span className="text-2xl font-black tracking-wider text-white">
                LUXE<span className="text-gold-400">HAVEN</span>
              </span>
            </Link>
            <p className="text-sm leading-relaxed text-slate-400">
              Redefining luxury living. Discover, lease, and invest in the world's most prestigious properties, curated exclusively for discerning clients.
            </p>
            <div className="flex gap-4 pt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-400 transition-colors">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links: Discover */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-gold-400">Discover</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/explore?type=Villa" className="hover:text-white transition-colors">Luxury Villas</Link>
              </li>
              <li>
                <Link to="/explore?type=Penthouse" className="hover:text-white transition-colors">Penthouses</Link>
              </li>
              <li>
                <Link to="/explore?type=Apartment" className="hover:text-white transition-colors">Elite Apartments</Link>
              </li>
              <li>
                <Link to="/explore?type=Cabin" className="hover:text-white transition-colors">Private Cabins</Link>
              </li>
            </ul>
          </div>

          {/* Quick Links: Company */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-gold-400">Company</h3>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link to="/about" className="hover:text-white transition-colors">Our Heritage</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-white transition-colors">Contact Concierge</Link>
              </li>
              <li>
                <a href="#careers" className="hover:text-white transition-colors">Careers</a>
              </li>
              <li>
                <a href="#press" className="hover:text-white transition-colors">Press & Media</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-white font-bold text-base mb-4 tracking-wider uppercase text-gold-400">Contact Us</h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="text-gold-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">742 Evergreen Terrace, Beverly Hills, CA 90210</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-gold-400 shrink-0" />
                <span className="text-slate-400">+1 (310) 555-0199</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-gold-400 shrink-0" />
                <a href="mailto:concierge@luxehaven.com" className="text-slate-400 hover:text-white transition-colors">
                  concierge@luxehaven.com
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Legal Section */}
      <div className="border-t border-primary-600 bg-primary-950/40 py-8">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} LuxeHaven. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
            <a href="#cookies" className="hover:text-slate-300 transition-colors">Cookie Preferences</a>
          </div>
          <p className="flex items-center gap-1 text-slate-400">
            <ShieldCheck size={14} className="text-gold-400" /> SECURE SSL ENCRYPTED
          </p>
        </div>
      </div>
    </footer>
  );
}
