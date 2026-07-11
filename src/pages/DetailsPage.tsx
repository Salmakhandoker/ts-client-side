import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { MapPin, Star, BedDouble, Bath, Maximize, Calendar, User, Phone, Check, ShieldCheck, ArrowLeft } from "lucide-react";
import PropertyCard, { PropertyData } from "../components/PropertyCard.js";

interface DetailsResponse {
  property: PropertyData;
  related: PropertyData[];
}

export default function DetailsPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [data, setData] = useState<DetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"overview" | "specs" | "reviews">("overview");
  const [selectedImage, setSelectedImage] = useState<string>("");

  // Booking form state
  const [bookingName, setBookingName] = useState("");
  const [bookingEmail, setBookingEmail] = useState("");
  const [bookingSuccess, setBookingSuccess] = useState(false);

  useEffect(() => {
    const fetchDetails = async () => {
      setLoading(true);
      setError(null);
      try {
      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
  {
    credentials: "include",
  }
);
        if (!res.ok) {
          throw new Error(res.status === 404 ? "Property not found" : "Failed to load details");
        }
        const result = await res.json();
        setData(result);
        setSelectedImage(result.property.imageUrl);
      } catch (err: any) {
        console.error("Error loading property:", err);
        setError(err.message || "Failed to load property details");
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-slate-500">Loading estate portfolios...</p>
        </div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow max-w-md w-full text-center">
          <h2 className="text-xl font-bold text-red-600 mb-2">Error Encountered</h2>
          <p className="text-sm text-slate-500 leading-relaxed mb-6">{error || "Property could not be fetched."}</p>
          <button
            onClick={() => navigate("/explore")}
            className="px-6 py-2.5 bg-primary-500 text-white font-bold text-sm rounded-xl hover:bg-gold-500 transition-colors inline-flex items-center gap-1.5"
          >
            <ArrowLeft size={16} /> Return to Explore
          </button>
        </div>
      </div>
    );
  }

  const { property, related } = data;

  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (bookingName.trim() && bookingEmail.trim()) {
      setBookingSuccess(true);
      setTimeout(() => {
        setBookingSuccess(false);
        setBookingName("");
        setBookingEmail("");
      }, 5000);
    }
  };

  // Mock property detail images based on main image
  const subImages = [
    property.imageUrl,
    "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80",
    "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=600&q=80",
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-12 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <Link to="/explore" className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-gold-500 uppercase tracking-widest mb-6 transition-colors">
          <ArrowLeft size={14} /> Back to Listings
        </Link>

        {/* Title and Rating Bar */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-8">
          <div>
            <span className="inline-block px-3 py-1 bg-gold-500/10 border border-gold-500/20 text-xs font-bold text-gold-500 rounded-full uppercase tracking-wider mb-3">
              {property.type}
            </span>
            <h1 className="text-3xl md:text-4xl font-black text-slate-800 tracking-tight">{property.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-slate-500 text-sm">
              <span className="flex items-center gap-1">
                <MapPin size={16} className="text-gold-500" /> {property.location}
              </span>
              <span className="flex items-center gap-1">
                <Star size={16} className="text-amber-500 fill-amber-500" /> {property.rating.toFixed(1)} / 5.0
              </span>
            </div>
          </div>
          <div>
            <span className="block text-xs text-slate-400 font-bold uppercase tracking-wider text-right">Acquisition Value</span>
            <span className="text-3xl font-black text-primary-500">{formattedPrice}</span>
          </div>
        </div>

        {/* Media and Reservation grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          
          {/* Main Gallery */}
          <div className="lg:col-span-2 space-y-4">
            <div className="h-[450px] w-full rounded-3xl overflow-hidden border border-slate-100 shadow-sm relative bg-slate-200">
              <img src={selectedImage} alt={property.title} className="h-full w-full object-cover" />
            </div>
            
            {/* Sub images thumbnails */}
            <div className="grid grid-cols-4 gap-4">
              {subImages.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(img)}
                  className={`h-24 rounded-2xl overflow-hidden border-2 transition-all ${
                    selectedImage === img ? "border-gold-500 scale-95 shadow" : "border-transparent hover:border-slate-300"
                  }`}
                >
                  <img src={img} alt="detail" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Concierge / Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white p-6 sm:p-8 rounded-3xl border border-slate-150 shadow-sm space-y-6">
              <div className="border-b border-slate-100 pb-4">
                <h3 className="font-extrabold text-slate-800 text-lg">VIP Viewing Concierge</h3>
                <p className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">Request a private site visit</p>
              </div>

              <div className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=100&h=100&q=80"
                  alt="Agent"
                  className="w-12 h-12 rounded-full object-cover border border-gold-300"
                />
                <div>
                  <h4 className="text-sm font-bold text-slate-800">Samantha Vance</h4>
                  <span className="text-xs text-slate-400 font-semibold flex items-center gap-1"><Phone size={10} /> +1 (310) 555-0199</span>
                </div>
              </div>

              {bookingSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200/50 text-emerald-700 p-6 rounded-2xl text-center space-y-2">
                  <Check size={28} className="mx-auto text-emerald-500" />
                  <h4 className="font-bold text-sm">Request Submitted</h4>
                  <p className="text-xs leading-relaxed text-emerald-600">Our VIP scheduling desk will contact you via email within 2 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleBooking} className="space-y-4">
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Your Full Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. John Doe"
                      value={bookingName}
                      onChange={(e) => setBookingName(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Your Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. john@domain.com"
                      value={bookingEmail}
                      onChange={(e) => setBookingEmail(e.target.value)}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-4 bg-primary-500 hover:bg-gold-500 text-white font-extrabold text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary-500/10"
                  >
                    Schedule Private View
                  </button>
                </form>
              )}

              <div className="flex items-center justify-center gap-1.5 text-xs text-slate-400 font-semibold uppercase tracking-wider border-t border-slate-50 pt-4">
                <ShieldCheck size={14} className="text-gold-500" /> Certified Secure Listing
              </div>
            </div>
          </div>

        </div>

        {/* Tabbed Info Area */}
        <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden mb-16">
          <div className="flex border-b border-slate-100 bg-slate-50/50">
            {[
              { id: "overview", label: "Overview" },
              { id: "specs", label: "Specifications" },
              { id: "reviews", label: "Guest Reviews" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-8 py-5 text-sm font-bold border-b-2 transition-all ${
                  activeTab === tab.id
                    ? "border-gold-500 text-gold-500 bg-white"
                    : "border-transparent text-slate-500 hover:text-primary-500"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="p-8">
            
            {/* Overview Tab */}
            {activeTab === "overview" && (
              <div className="space-y-6">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-lg mb-3">About the Estate</h3>
                  <p className="text-sm text-slate-600 leading-relaxed font-normal whitespace-pre-line">
                    {property.fullDescription}
                  </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-6 border-t border-slate-50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                  <div className="flex items-center gap-2">
                    <BedDouble size={18} className="text-gold-500" />
                    <span>{property.bedrooms} Bedrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bath size={18} className="text-gold-500" />
                    <span>{property.bathrooms} Bathrooms</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Maximize size={18} className="text-gold-500" />
                    <span>{property.sqft} Square Feet</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={18} className="text-gold-500" />
                    <span>Listed {new Date(property.createdAt).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            )}

            {/* Specifications Tab */}
            {activeTab === "specs" && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm">
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base mb-4">Structural Characteristics</h3>
                  <div className="divide-y divide-slate-100">
                    <div className="flex justify-between py-3">
                      <span className="text-slate-400">Property Category</span>
                      <span className="font-bold text-slate-700">{property.type}</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-slate-400">Total Bedrooms</span>
                      <span className="font-bold text-slate-700">{property.bedrooms} Units</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-slate-400">Total Bathrooms</span>
                      <span className="font-bold text-slate-700">{property.bathrooms} Units</span>
                    </div>
                    <div className="flex justify-between py-3">
                      <span className="text-slate-400">Net Floor Area</span>
                      <span className="font-bold text-slate-700">{property.sqft} sqft</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="font-extrabold text-slate-800 text-base mb-4">Vetted Amenities</h3>
                  <div className="grid grid-cols-2 gap-3 text-slate-600">
                    {["Private Infinity Pool", "Smart Home Automation", "Oceanfront Terrace", "Wine Cellar", "24/7 Security Concierge", "Private Dock Access"].map((amenity) => (
                      <div key={amenity} className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gold-500/10 flex items-center justify-center text-gold-500 shrink-0">
                          <Check size={12} />
                        </div>
                        <span>{amenity}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Reviews Tab */}
            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                  <h3 className="font-extrabold text-slate-800 text-base">Client Testimonials ({property.rating > 4.5 ? "3" : "1"})</h3>
                  <div className="flex items-center gap-1.5 text-slate-600 font-bold text-sm">
                    <Star size={16} className="text-amber-500 fill-amber-500" />
                    <span>{property.rating.toFixed(1)} / 5.0 Average</span>
                  </div>
                </div>

                <div className="divide-y divide-slate-100 space-y-6">
                  {[
                    {
                      user: "Mr. Sterling Sterling",
                      rating: 5,
                      comment: "The structural finishings are absolute perfection. Beautiful view, exactly as presented on the LuxeHaven portal.",
                      date: "1 month ago",
                    },
                    {
                      user: "Dr. Alistair Finch",
                      rating: 5,
                      comment: "Wonderful location and extremely fast leasing verification process. Recommended.",
                      date: "2 months ago",
                    },
                  ].map((rev, index) => (
                    <div key={index} className="pt-6 text-left space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-slate-700 flex items-center gap-2">
                          <User size={16} className="text-slate-400" /> {rev.user}
                        </span>
                        <span className="text-xs text-slate-400">{rev.date}</span>
                      </div>
                      <div className="flex gap-1 text-amber-500">
                        {Array.from({ length: rev.rating }).map((_, i) => (
                          <Star key={i} size={12} className="fill-amber-500" />
                        ))}
                      </div>
                      <p className="text-sm text-slate-500 leading-relaxed font-normal">{rev.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

        {/* Related Items Section */}
        {related.length > 0 && (
          <div className="space-y-8">
            <div className="flex items-end justify-between border-b border-slate-200 pb-4">
              <h2 className="text-2xl font-black text-slate-800 tracking-tight">Similar Exclusive Portfolios</h2>
              <span className="text-xs font-bold text-gold-500 uppercase tracking-widest">Matched by Category</span>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((prop) => (
                <PropertyCard key={prop._id} property={prop} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
