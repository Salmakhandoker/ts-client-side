import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSession } from "../lib/auth-client.js";
import { PlusSquare, Sparkles, Building, MapPin, DollarSign, Bed, Bath, Maximize, Image as ImageIcon, ArrowLeft } from "lucide-react";

const IMAGE_PRESETS = [
  { name: "Ocean Villa", url: "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80" },
  { name: "Modern Penthouse", url: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=80" },
  { name: "Glass Cabin", url: "https://images.unsplash.com/photo-1510798831971-661eb04b3739?auto=format&fit=crop&w=1200&q=80" },
  { name: "Sunset Mansion", url: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" },
];

export default function AddPropertyPage() {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  // Form states
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [price, setPrice] = useState("");
  const [type, setType] = useState("Villa");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [bedrooms, setBedrooms] = useState("");
  const [bathrooms, setBathrooms] = useState("");
  const [sqft, setSqft] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Authentication Guard
  useEffect(() => {
    if (!isPending && !session) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  if (isPending) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Basic Validations
    if (Number(price) <= 0 || Number(bedrooms) <= 0 || Number(bathrooms) <= 0 || Number(sqft) <= 0) {
      setError("Numeric values (price, rooms, sqft) must be greater than zero.");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/properties`, {
  method: "POST",
  credentials: "include",
  headers: {
    "Content-Type": "application/json",
  },
      // const res = await fetch("/api/properties", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
        body: JSON.stringify({
          title,
          shortDescription,
          fullDescription,
          price: Number(price),
          type,
          location,
          imageUrl: imageUrl || IMAGE_PRESETS[0].url, // Fallback default image
          bedrooms: Number(bedrooms),
          bathrooms: Number(bathrooms),
          sqft: Number(sqft),
        }),
      });

      if (!res.ok) {
        const errData = await res.json();
        throw new Error(errData.error || "Failed to create property listing");
      }

      const newProperty = await res.json();
      navigate(`/properties/${newProperty._id}`);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit property details.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12 text-left">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate(-1)}
            className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors text-slate-500 shadow-sm"
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <span className="text-xs font-bold text-gold-500 uppercase tracking-widest block">Concierge Desk</span>
            <h1 className="text-3xl font-black text-slate-800 tracking-tight">List Your Premium Estate</h1>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl text-sm font-semibold mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8 bg-white p-8 sm:p-10 rounded-3xl border border-slate-150 shadow-sm">
          
          {/* Section 1 start: Core Details */}
          <div className="space-y-5">
            <h3 className="font-extrabold text-slate-800 text-base border-b border-slate-50 pb-3 flex items-center gap-2">
              <Building size={18} className="text-gold-500" /> Core Information
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2 space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Estate Title</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Oceanfront Mansion in Malibu"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Property Category</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Cabin">Cabin</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Location / Address</label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="text"
                    required
                    placeholder="e.g. Malibu, California"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Acquisition Value (USD $)</label>
                <div className="relative">
                  <DollarSign className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="number"
                    required
                    placeholder="e.g. 3500000"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Layout Specifications */}
          <div className="space-y-5">
            <h3 className="font-extrabold text-slate-800 text-base border-b border-slate-50 pb-3 flex items-center gap-2">
              <Sparkles size={18} className="text-gold-500" /> Space Specifications
            </h3>

            <div className="grid grid-cols-3 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Bedrooms</label>
                <div className="relative">
                  <Bed className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="number"
                    required
                    placeholder="5"
                    value={bedrooms}
                    onChange={(e) => setBedrooms(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Bathrooms</label>
                <div className="relative">
                  <Bath className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="number"
                    required
                    placeholder="4"
                    value={bathrooms}
                    onChange={(e) => setBathrooms(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Area (Sqft)</label>
                <div className="relative">
                  <Maximize className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="number"
                    required
                    placeholder="4200"
                    value={sqft}
                    onChange={(e) => setSqft(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Media & Descriptions */}
          <div className="space-y-5">
            <h3 className="font-extrabold text-slate-800 text-base border-b border-slate-50 pb-3 flex items-center gap-2">
              <ImageIcon size={18} className="text-gold-500" /> Descriptions & Media
            </h3>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Short Brief (Card Summary)</label>
              <input
                type="text"
                required
                maxLength={120}
                placeholder="A gorgeous beachfront estate offering panorama views of Malibu sunset..."
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Full Overview Details</label>
              <textarea
                required
                rows={6}
                placeholder="Provide a comprehensive descriptive overview of design aesthetics, floor levels, garden spacing, smart devices, and private key security integrations..."
                value={fullDescription}
                onChange={(e) => setFullDescription(e.target.value)}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400 resize-none"
              />
            </div>

            <div className="space-y-3">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Main Photo URL</label>
                <div className="relative">
                  <ImageIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input
                    type="url"
                    placeholder="https://images.unsplash.com/photo-..."
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>

              {/* Preset selector */}
              <div>
                <span className="block text-xs text-slate-400 font-bold mb-2">Or select a preset luxury photo for testing:</span>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {IMAGE_PRESETS.map((preset) => (
                    <button
                      type="button"
                      key={preset.name}
                      onClick={() => setImageUrl(preset.url)}
                      className={`px-3 py-2 rounded-xl border text-xs font-bold transition-all truncate ${
                        imageUrl === preset.url
                          ? "bg-gold-500 border-gold-500 text-white"
                          : "border-slate-200 text-slate-600 bg-slate-50 hover:bg-slate-100"
                      }`}
                    >
                      {preset.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-6 border-t border-slate-150 flex items-center justify-end gap-4">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="px-6 py-3.5 border border-slate-200 text-slate-600 font-bold text-sm rounded-xl hover:bg-slate-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-primary-500 hover:bg-gold-500 text-white font-extrabold text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary-500/10 flex items-center gap-2 disabled:opacity-50"
            >
              {loading ? "Registering Listing..." : <><PlusSquare size={16} /> Publish Listing</>}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}
