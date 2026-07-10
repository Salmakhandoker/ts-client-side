import { Link } from "react-router-dom";
import { ShieldCheck, Landmark, Users2, ArrowRight } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-slate-50 py-16 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Breadcrumb */}
        <div className="mb-8">
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest block mb-2">Our Heritage</span>
          <h1 className="text-4xl font-black text-slate-800 tracking-tight">The Story of LuxeHaven</h1>
        </div>

        {/* Vision Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-primary-500 tracking-tight leading-tight">
              Redefining Premium Real Estate Acquisition
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Founded in 2021, LuxeHaven was built upon a single, refined promise: to bridge the gap between discerning international buyers and the world's most spectacular structural properties. We believe that an estate is not merely a residence, but an eternal sanctuary representing architectural achievement.
            </p>
            <p className="text-sm text-slate-600 leading-relaxed">
              Unlike traditional listing directories that prioritize volume over value, LuxeHaven operates as an exclusive boutique catalog. Every villa, penthouse, apartment, and chalet listed here is manually verified, cataloged, and vetted for materials, locations, and security infrastructures.
            </p>
            <div className="flex gap-4">
              <Link
                to="/explore"
                className="px-5 py-3 bg-primary-500 hover:bg-gold-500 text-white font-extrabold text-sm rounded-xl transition-all shadow"
              >
                Browse Portfolios
              </Link>
              <Link
                to="/contact"
                className="px-5 py-3 border border-slate-200 text-slate-700 hover:bg-slate-50 font-bold text-sm rounded-xl transition-all"
              >
                Connect With Concierge
              </Link>
            </div>
          </div>
          
          <div className="relative rounded-3xl overflow-hidden shadow-lg h-96">
            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1000&q=80"
              alt="Luxe Mansion"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-primary-500/10"></div>
          </div>
        </div>

        {/* Pillars of Excellence */}
        <div className="bg-white p-8 sm:p-12 rounded-3xl border border-slate-150 shadow-sm space-y-10 mb-16">
          <div className="text-center max-w-xl mx-auto">
            <h3 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-2">Our Foundation</h3>
            <p className="text-2xl font-bold text-slate-800 tracking-tight">Three Pillars of LuxeHaven</p>
            <div className="h-1 w-8 bg-gold-500 mx-auto mt-3 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                <Landmark size={24} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-base">Architectural Legacy</h4>
              <p className="text-xs leading-relaxed text-slate-500">
                We curatively prioritize properties featuring premium raw materials, sound structural balance, smart home ecosystems, and high-end aesthetic designs.
              </p>
            </div>
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                <ShieldCheck size={24} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-base">Uncompromising Audits</h4>
              <p className="text-xs leading-relaxed text-slate-500">
                Each listing goes through Mongoose database verification and physical regional inspection, securing buyer interests and avoiding fraudulent postings.
              </p>
            </div>
            <div className="space-y-3.5">
              <div className="w-12 h-12 rounded-2xl bg-gold-500/10 flex items-center justify-center text-gold-500">
                <Users2 size={24} />
              </div>
              <h4 className="font-extrabold text-slate-800 text-base">Private Relations</h4>
              <p className="text-xs leading-relaxed text-slate-500">
                We safeguard user credentials through Better Auth secure sessions, handling client data and inquiries with maximum confidentiality.
              </p>
            </div>
          </div>
        </div>

        {/* Global Concierge Highlight */}
        <div className="bg-primary-500 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden shadow-xl text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="relative z-10 space-y-2 max-w-xl">
            <h3 className="text-xl sm:text-2xl font-extrabold tracking-tight">Become a Vetted Listing Partner</h3>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Are you a premium builder or property owner? Join our exclusive listing community and showcase your properties to verified international buyers.
            </p>
          </div>
          <Link
            to="/items/add"
            className="relative z-10 px-6 py-3.5 bg-gold-500 hover:bg-gold-600 text-white font-extrabold text-sm rounded-xl transition-all flex items-center gap-1.5 shrink-0"
          >
            Create Vetted Listing <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
}
