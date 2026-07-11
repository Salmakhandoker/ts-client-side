import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSession } from "../lib/auth-client.js";
import { FolderHeart, Eye, Trash2, ArrowLeft, PlusCircle, ExternalLink, Calendar, MapPin } from "lucide-react";
import { PropertyData } from "../components/PropertyCard.js";

export default function ManagePropertiesPage() {
  const navigate = useNavigate();
  const { data: session, isPending } = useSession();

  const [myProperties, setMyProperties] = useState<PropertyData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Authentication Guard
  useEffect(() => {
    if (!isPending && !session) {
      navigate("/login");
    }
  }, [session, isPending, navigate]);

  const fetchMyProperties = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/properties/my-properties`,
  {
    credentials: "include",
  }
);
      if (res.ok) {
        const data = await res.json();
        setMyProperties(data);
      } else {
        throw new Error("Failed to fetch your properties.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to load properties.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session) {
      fetchMyProperties();
    }
  }, [session]);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to permanently delete this luxury listing? This action is irreversible.")) {
      return;
    }

    try {
      const res = await fetch(
  `${import.meta.env.VITE_API_URL}/api/properties/${id}`,
  {
    method: "DELETE",
    credentials: "include",
  }
);
      // const res = await fetch(`/api/properties/${id}`, {
      //   method: "DELETE",
      // });

      if (res.ok) {
        // Remove from local state
        setMyProperties((prev) => prev.filter((p) => p._id !== id));
      } else {
        const errData = await res.json();
        alert(errData.error || "Failed to delete property.");
      }
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete property.");
    }
  };

  if (isPending || (session && loading && myProperties.length === 0)) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 text-left">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2.5 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl transition-colors text-slate-500 shadow-sm"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <span className="text-xs font-bold text-gold-500 uppercase tracking-widest block">Dashboard Portal</span>
              <h1 className="text-3xl font-black text-slate-800 tracking-tight">Manage Your Portfolios</h1>
            </div>
          </div>

          <Link
            to="/items/add"
            className="inline-flex items-center gap-2 px-5 py-3 bg-primary-500 hover:bg-gold-500 text-white font-extrabold text-sm rounded-xl transition-all duration-200 shadow shadow-primary-500/10 shrink-0 text-center justify-center"
          >
            <PlusCircle size={16} /> Add New Listing
          </Link>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-100 text-red-600 px-5 py-4 rounded-2xl text-sm font-semibold mb-6">
            {error}
          </div>
        )}

        {/* Content Table / List */}
        {myProperties.length > 0 ? (
          <div className="bg-white rounded-3xl border border-slate-150 shadow-sm overflow-hidden">
            
            {/* Desktop Table View */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-100 text-xs font-bold text-slate-400 uppercase tracking-wider">
                    <th className="px-6 py-5">Estate Details</th>
                    <th className="px-6 py-5">Category</th>
                    <th className="px-6 py-5">Acquisition Value</th>
                    <th className="px-6 py-5">Date Published</th>
                    <th className="px-6 py-5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-sm">
                  {myProperties.map((prop) => (
                    <tr key={prop._id} className="hover:bg-slate-50/50 transition-colors">
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-4">
                          <img
                            src={prop.imageUrl}
                            alt={prop.title}
                            className="w-16 h-12 rounded-lg object-cover border border-slate-100"
                          />
                          <div>
                            <h4 className="font-bold text-slate-800 line-clamp-1">{prop.title}</h4>
                            <span className="text-xs text-slate-400 flex items-center gap-1 mt-1 font-semibold">
                              <MapPin size={12} className="text-gold-500" /> {prop.location}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-5 font-semibold text-slate-500 uppercase tracking-wider text-xs">
                        {prop.type}
                      </td>
                      <td className="px-6 py-5 font-extrabold text-primary-500">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(prop.price)}
                      </td>
                      <td className="px-6 py-5 text-slate-400 font-semibold text-xs flex items-center gap-1.5 mt-4">
                        <Calendar size={14} className="text-slate-300" />
                        {new Date(prop.createdAt).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            to={`/properties/${prop._id}`}
                            className="p-2 border border-slate-200 text-slate-500 hover:text-primary-500 hover:bg-slate-50 rounded-xl transition-all"
                            title="View Public Details"
                          >
                            <Eye size={16} />
                          </Link>
                          <button
                            onClick={() => handleDelete(prop._id)}
                            className="p-2 border border-red-100 text-red-500 hover:bg-red-50 rounded-xl transition-all"
                            title="Delete Listing"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile List View */}
            <div className="block md:hidden divide-y divide-slate-100">
              {myProperties.map((prop) => (
                <div key={prop._id} className="p-6 space-y-4">
                  <div className="flex items-center gap-4">
                    <img
                      src={prop.imageUrl}
                      alt={prop.title}
                      className="w-20 h-16 rounded-xl object-cover"
                    />
                    <div className="space-y-1">
                      <span className="inline-block px-2 py-0.5 bg-primary-500/5 text-[10px] font-bold text-primary-500 rounded uppercase tracking-wider">
                        {prop.type}
                      </span>
                      <h4 className="font-bold text-slate-800 line-clamp-1">{prop.title}</h4>
                      <p className="text-sm font-extrabold text-gold-500">
                        {new Intl.NumberFormat("en-US", {
                          style: "currency",
                          currency: "USD",
                          maximumFractionDigits: 0,
                        }).format(prop.price)}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-slate-400 font-semibold border-t border-slate-50 pt-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={14} /> {new Date(prop.createdAt).toLocaleDateString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Link
                        to={`/properties/${prop._id}`}
                        className="flex items-center gap-1 px-3 py-1.5 border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50"
                      >
                        <ExternalLink size={12} /> View
                      </Link>
                      <button
                        onClick={() => handleDelete(prop._id)}
                        className="flex items-center gap-1 px-3 py-1.5 border border-red-200 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                      >
                        <Trash2 size={12} /> Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>
        ) : (
          <div className="bg-white border border-slate-150 rounded-3xl py-20 px-4 text-center">
            <FolderHeart className="mx-auto text-slate-300 mb-4" size={48} />
            <h3 className="text-lg font-bold text-slate-700">No Listings Found</h3>
            <p className="text-sm text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
              You haven't listed any luxury estates on our portal yet. List an item using our listing publisher page.
            </p>
            <Link
              to="/items/add"
              className="mt-6 px-6 py-2.5 bg-primary-500 hover:bg-gold-500 text-white font-bold text-sm rounded-xl transition-colors shadow inline-flex items-center gap-2"
            >
              <PlusCircle size={16} /> Publish Your First Estate
            </Link>
          </div>
        )}
        
      </div>
    </div>
  );
}
