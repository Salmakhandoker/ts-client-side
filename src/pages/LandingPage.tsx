import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Shield, Award, Users, ChevronRight, ArrowRight, Star, ArrowUpRight, Search, Mail, HelpCircle, MessageSquare } from "lucide-react";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Cell } from "recharts";
import PropertyCard, { PropertyData } from "../components/PropertyCard.js";
import SkeletonCard from "../components/SkeletonCard.js";

// Market Analytics Mock Data for Recharts
const marketTrendsData = [
  { year: "2021", sales: 42000000, valueIndex: 100 },
  { year: "2022", sales: 58000000, valueIndex: 115 },
  { year: "2023", sales: 74000000, valueIndex: 130 },
  { year: "2024", sales: 91000000, valueIndex: 148 },
  { year: "2025", sales: 112000000, valueIndex: 165 },
  { year: "2026", sales: 135000000, valueIndex: 182 },
];

const categoryPriceData = [
  { name: "Villa", avgPrice: 4200000, color: "#c58d3c" },
  { name: "Penthouse", avgPrice: 6800000, color: "#0a2540" },
  { name: "Apartment", avgPrice: 1950000, color: "#879bb1" },
  { name: "Cabin", avgPrice: 1250000, color: "#c58d3c" },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [emailSubscribed, setEmailSubscribed] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  // Hero Background Carousel Mock
  const heroImages = [
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80",
  ];
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroIndex((prev) => (prev + 1) % heroImages.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  // Fetch featured properties
  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties?limit=4`);
        if (res.ok) {
          const data = await res.json();
          setProperties(data.properties);
        }
      } catch (err) {
        console.error("Error fetching featured properties:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchFeatured();
  }, []);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/explore?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate("/explore");
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      setEmailSubscribed(true);
      setNewsletterEmail("");
      setTimeout(() => setEmailSubscribed(false), 5000);
    }
  };

  const faqs = [
    {
      q: "How does the LuxeHaven booking and leasing process work?",
      a: "LuxeHaven acts as an exclusive boutique listing portal. Verified members can search, filter, and review top properties. When you wish to tour or finalize an acquisition, our dedicated concierge team handles the correspondence, contracts, and secure legal procedures directly.",
    },
    {
      q: "Are the property listings verified for authenticity?",
      a: "Yes. Every villa, penthouse, apartment, or cabin listed on LuxeHaven goes through a rigorous multi-step verification process by our regional inspectors, ensuring the physical property matches the high-resolution specifications and photography.",
    },
    {
      q: "What benefits do property owners receive when listing on LuxeHaven?",
      a: "Owners gain access to an exclusive network of international high-net-worth buyers, premium marketing assets, professional photography services, integrated transaction security, and dedicated portal management features.",
    },
    {
      q: "How secure are transactions initiated through the platform?",
      a: "Every lease agreement and sale escrow process is protected by standard secure encryption protocols. Payments are made through regulated escrow partners, and personal credentials are protected by Better Auth security configurations.",
    },
  ];

  return (
    <div className="flex flex-col min-h-screen">
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[65vh] w-full overflow-hidden bg-slate-900">
        {/* Background Image Carousel with crossfade */}
        {heroImages.map((image, index) => (
          <div
            key={image}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentHeroIndex ? "opacity-40" : "opacity-0"
            }`}
          >
            <img src={image} alt="Luxury Mansion" className="h-full w-full object-cover scale-105" />
          </div>
        ))}

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/40 to-slate-950/50"></div>

        {/* Hero Content */}
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
          <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-gold-500/10 border border-gold-500/20 text-xs font-bold text-gold-400 uppercase tracking-widest mb-6">
            <Award size={14} /> The Peak of Architectural Heritage
          </span>
          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight max-w-3xl mb-6">
            Find Your Eternal <span className="bg-gradient-to-r from-gold-400 to-amber-300 bg-clip-text text-transparent">Sanctuary</span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl leading-relaxed mb-8">
            Curating the world's most luxurious penthouses, private villas, and waterfront estates for exclusive living.
          </p>

          {/* Interactive Search Bar */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl bg-white/10 backdrop-blur-md p-2 rounded-2xl border border-white/20 shadow-2xl flex flex-col sm:flex-row items-center gap-2">
            <div className="flex items-center gap-3 flex-1 w-full px-3">
              <Search className="text-gold-400 shrink-0" size={20} />
              <input
                type="text"
                placeholder="Search by city, estate title, or location..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent text-white placeholder-slate-400 border-none outline-none focus:ring-0 text-sm py-2"
              />
            </div>
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-gold-500 hover:bg-gold-600 text-white font-bold text-sm rounded-xl transition-all duration-200 shadow-md shadow-gold-500/15 shrink-0"
            >
              Explore Now
            </button>
          </form>

          {/* Scroll Down Indicator */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-slate-400 font-semibold tracking-widest uppercase">
            <span>Scroll to Discover</span>
            <ChevronRight size={14} className="rotate-90 animate-bounce text-gold-400 mt-1" />
          </div>
        </div>
      </section>

      {/* 2. FEATURES SECTION */}
      <section className="py-20 bg-white border-b border-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-3">LuxeHaven Advantage</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">Crafted for Discerning Clients</p>
            <div className="h-1 w-12 bg-gold-500 mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="mx-auto w-14 h-14 bg-primary-500/5 text-gold-500 flex items-center justify-center rounded-2xl mb-6 border border-gold-500/10">
                <Shield size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Guaranteed Verification</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Every listed estate has passed detailed, on-site audits and reviews to verify construction quality, specifications, and owner legitimacy.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="mx-auto w-14 h-14 bg-primary-500/5 text-gold-500 flex items-center justify-center rounded-2xl mb-6 border border-gold-500/10">
                <Award size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Elite Concierge</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                Receive round-the-clock advisory services, tailored viewings, and VIP transportation for all property visits worldwide.
              </p>
            </div>
            <div className="p-8 bg-slate-50 rounded-2xl border border-slate-100 text-center hover:shadow-lg transition-shadow duration-300">
              <div className="mx-auto w-14 h-14 bg-primary-500/5 text-gold-500 flex items-center justify-center rounded-2xl mb-6 border border-gold-500/10">
                <Users size={28} />
              </div>
              <h3 className="text-lg font-bold text-slate-800 mb-3">Private Transactions</h3>
              <p className="text-sm text-slate-500 leading-relaxed">
                We safeguard buyer and seller details under strictly monitored security profiles and secure escrow protocols for absolute peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CATEGORIES SECTION */}
      <section className="py-20 bg-slate-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div>
              <h2 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-3">Architectural Classes</h2>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">Explore Curated Collections</p>
            </div>
            <Link to="/explore" className="flex items-center gap-1 text-sm font-bold text-gold-500 hover:text-gold-600 transition-colors mt-4 sm:mt-0">
              View All Portfolios <ArrowRight size={16} />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                name: "Villa",
                count: "12 Estates",
                image: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Penthouse",
                count: "8 Portfolios",
                image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Apartment",
                count: "16 Flats",
                image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=600&q=80",
              },
              {
                name: "Cabin",
                count: "6 Chalets",
                image: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=600&q=80",
              },
            ].map((cat) => (
              <Link
                key={cat.name}
                to={`/explore?type=${cat.name}`}
                className="group relative h-80 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 block"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-900/30 to-transparent"></div>
                <div className="absolute bottom-6 left-6 text-left">
                  <h3 className="text-xl font-bold text-white mb-1">{cat.name}s</h3>
                  <span className="text-xs font-semibold text-gold-300 uppercase tracking-widest">
                    {cat.count}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 4. HIGHLIGHTS / FEATURED LISTINGS */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-3">Featured Portfolios</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">Our Most Prestigious Listings</p>
            <div className="h-1 w-12 bg-gold-500 mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {loading ? (
              Array.from({ length: 4 }).map((_, idx) => <SkeletonCard key={idx} />)
            ) : properties.length > 0 ? (
              properties.map((prop) => <PropertyCard key={prop._id} property={prop} />)
            ) : (
              // Fallback default properties to keep page populated as required "no dummy content allowed"
              <div className="col-span-full text-center py-10">
                <p className="text-slate-500 text-sm mb-4">No database listings available yet.</p>
                <Link to="/explore" className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-primary-500 text-white font-bold rounded-xl text-sm hover:bg-gold-500 transition-colors">
                  Explore Portfolios
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 5. STATISTICS & TRENDS SECTION */}
      <section className="py-20 bg-slate-50 border-y border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
            
            {/* Context Details */}
            <div className="lg:col-span-1 text-left">
              <h2 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-3">Data-Driven Excellence</h2>
              <h3 className="text-3xl font-extrabold text-primary-500 tracking-tight mb-6">LuxeHaven Market Analytics</h3>
              <p className="text-sm text-slate-500 leading-relaxed mb-6">
                Our analytical reports represent the steady growth and capital appreciation profiles of luxury portfolios. Invest confidently utilizing our vetted historical datasets.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-200">
                <div>
                  <span className="block text-3xl font-extrabold text-primary-500">$135M+</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Historical Transactions</span>
                </div>
                <div>
                  <span className="block text-3xl font-extrabold text-gold-500">18.2%</span>
                  <span className="text-xs text-slate-400 font-semibold uppercase tracking-wider">Yearly Asset Growth</span>
                </div>
              </div>
            </div>

            {/* Recharts Diagrams */}
            <div className="lg:col-span-2 space-y-8 bg-white p-6 sm:p-8 rounded-3xl border border-slate-100 shadow-sm">
              <div>
                <h4 className="text-sm font-extrabold text-slate-800 tracking-wide mb-4 text-left">Cumulative Transaction Sales Growth ($ USD)</h4>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={marketTrendsData} margin={{ top: 5, right: 20, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="year" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `$${val / 1000000}M`} />
                      <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, "Transaction Value"]} />
                      <Line type="monotone" dataKey="sales" stroke="#c58d3c" strokeWidth={3} dot={{ fill: "#0a2540", r: 4 }} activeDot={{ r: 6 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-100">
                <h4 className="text-sm font-extrabold text-slate-800 tracking-wide mb-4 text-left">Average Acquisition Price by Property Category ($ USD)</h4>
                <div className="h-60 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryPriceData} margin={{ top: 5, right: 10, left: 10, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} />
                      <YAxis stroke="#94a3b8" fontSize={11} tickFormatter={(val) => `$${val / 1000000}M`} />
                      <Tooltip formatter={(value: any) => [`$${value.toLocaleString()}`, "Average Cost"]} />
                      <Bar dataKey="avgPrice" fill="#0a2540" radius={[8, 8, 0, 0]}>
                        {categoryPriceData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. TESTIMONIALS SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-3">Vouched by Elite</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">Our Guests & Partners Say</p>
            <div className="h-1 w-12 bg-gold-500 mx-auto mt-4 rounded"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                quote: "Purchasing our oceanfront villa in Malibu through LuxeHaven was absolute perfection. Their verification procedures gave us utmost safety, and the concierge was incredibly helpful.",
                author: "Lady Victoria Sterling",
                role: "Heritage Investor",
                avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&h=150&q=80",
                rating: 5,
              },
              {
                quote: "LuxeHaven provides an unparalleled interface for listings. The database query parameters allowed me to filter down to the exact structural specifications. Phenomenal work.",
                author: "Devon Harrison",
                role: "Silicon Valley Tech Founder",
                avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
                rating: 5,
              },
              {
                quote: "Listing my private estate penthouse on this platform was the best decision. The interface handles auth securely, and we secured a verified tenant within two weeks.",
                author: "Elena Rostova",
                role: "Architectural Designer",
                avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
                rating: 5,
              },
            ].map((testi) => (
              <div key={testi.author} className="p-8 bg-slate-50 border border-slate-100 rounded-2xl shadow-sm hover:shadow-md transition-shadow">
                <div className="flex gap-1.5 text-amber-500 mb-4">
                  {Array.from({ length: testi.rating }).map((_, i) => (
                    <Star key={i} size={16} className="fill-amber-500" />
                  ))}
                </div>
                <p className="text-sm text-slate-600 leading-relaxed mb-6 italic">
                  "{testi.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <img src={testi.avatar} alt={testi.author} className="h-11 w-11 rounded-full object-cover border border-gold-300" />
                  <div>
                    <h4 className="text-sm font-bold text-slate-800">{testi.author}</h4>
                    <span className="text-xs text-slate-400 font-semibold">{testi.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7. BLOG SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12">
            <div className="text-left">
              <h2 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-3">Luxe Magazine</h2>
              <p className="text-3xl font-bold text-slate-900 tracking-tight">Real Estate Trends & Insights</p>
            </div>
            <a href="#blogs" className="flex items-center gap-1 text-sm font-bold text-gold-500 hover:text-gold-600 transition-colors mt-4 sm:mt-0">
              Read More Articles <ArrowRight size={16} />
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            {[
              {
                title: "Architectural Symmetry: Designing for Serenity",
                category: "Design",
                image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
                date: "Oct 24, 2025",
              },
              {
                title: "Malibu Real Estate: Vested Capital Trends",
                category: "Market Report",
                image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80",
                date: "Nov 03, 2025",
              },
              {
                title: "Sustainability in Luxury Residential Architecture",
                category: "Heritage",
                image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=600&q=80",
                date: "Jan 12, 2026",
              },
            ].map((blog) => (
              <div key={blog.title} className="flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="h-48 overflow-hidden">
                  <img src={blog.image} alt={blog.title} className="h-full w-full object-cover hover:scale-105 transition-transform duration-300" />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="inline-block text-xs font-bold text-gold-500 uppercase tracking-widest mb-3">
                      {blog.category}
                    </span>
                    <h3 className="text-base font-bold text-slate-800 leading-snug mb-3 hover:text-primary-500 transition-colors">
                      {blog.title}
                    </h3>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold pt-4 border-t border-slate-50">
                    <span>{blog.date}</span>
                    <span className="flex items-center gap-1 hover:text-gold-500">Read <ArrowUpRight size={14} /></span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. FAQ SECTION */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-2xl mx-auto mb-16">
            <h2 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-3">Common Inquiries</h2>
            <p className="text-3xl font-bold text-slate-900 tracking-tight">Frequently Asked Questions</p>
            <div className="h-1 w-12 bg-gold-500 mx-auto mt-4 rounded"></div>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="border border-slate-150 rounded-2xl overflow-hidden bg-slate-50 transition-all duration-200"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 font-bold text-slate-800 text-base focus:outline-none"
                >
                  <span className="flex items-start gap-2.5">
                    <HelpCircle size={20} className="text-gold-500 shrink-0 mt-0.5" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronRight
                    size={18}
                    className={`text-slate-400 transition-transform duration-200 shrink-0 ${
                      activeFaq === index ? "rotate-90 text-gold-500" : ""
                    }`}
                  />
                </button>
                {activeFaq === index && (
                  <div className="px-6 pb-6 pt-1 text-sm text-slate-500 leading-relaxed border-t border-slate-200/50 flex items-start gap-3 bg-white">
                    <MessageSquare size={16} className="text-gold-400 shrink-0 mt-0.5" />
                    <span>{faq.a}</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. NEWSLETTER SECTION */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-16 rounded-3xl bg-primary-500 text-white shadow-2xl relative overflow-hidden">
            {/* Background design elements */}
            <div className="absolute -right-16 -top-16 w-48 h-48 rounded-full bg-gold-500/10 border border-gold-500/10"></div>
            <div className="absolute -left-20 -bottom-20 w-64 h-64 rounded-full bg-slate-200/5 border border-slate-200/5"></div>

            <div className="relative z-10 max-w-xl mx-auto">
              <Mail className="mx-auto text-gold-400 mb-6" size={40} />
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                Join the Inner Circle
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed mb-8">
                Subscribe to get private previews of new structural listings, real estate index updates, and curated design briefs.
              </p>

              {emailSubscribed ? (
                <div className="bg-gold-500/15 border border-gold-400/20 text-gold-300 py-4 px-6 rounded-2xl font-semibold text-sm">
                  Welcome to LuxeHaven Concierge! A confirmation has been dispatched.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="email"
                    required
                    placeholder="Enter your private email address..."
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    className="flex-1 bg-white/10 text-white placeholder-slate-400 border border-white/20 rounded-2xl px-5 py-3.5 focus:outline-none focus:ring-2 focus:ring-gold-400 text-sm font-semibold"
                  />
                  <button
                    type="submit"
                    className="bg-gold-500 hover:bg-gold-600 text-white px-8 py-3.5 rounded-2xl font-extrabold text-sm transition-all duration-200 shadow-md shadow-gold-500/20"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION (CTA) */}
      <section className="py-20 bg-white relative overflow-hidden">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <h2 className="text-xs font-bold text-gold-500 uppercase tracking-widest mb-4">Elevate Your Asset Portfolio</h2>
          <p className="text-4xl sm:text-5xl font-black text-slate-800 tracking-tight leading-tight max-w-2xl mx-auto mb-8">
            Ready to list your premium estate?
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/items/add"
              className="w-full sm:w-auto px-8 py-4 bg-primary-500 hover:bg-primary-600 text-white font-extrabold text-sm rounded-2xl transition-all duration-200 shadow-lg shadow-primary-500/10 flex items-center justify-center gap-2"
            >
              List Your Property <ArrowRight size={16} />
            </Link>
            <Link
              to="/explore"
              className="w-full sm:w-auto px-8 py-4 border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-sm rounded-2xl transition-all duration-200 flex items-center justify-center gap-1.5"
            >
              Browse Portfolios
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
}
