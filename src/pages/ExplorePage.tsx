import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { Search, SlidersHorizontal, ArrowUpDown, ChevronLeft, ChevronRight, RotateCcw, MapPin, DollarSign, Home } from "lucide-react";
import PropertyCard, { PropertyData } from "../components/PropertyCard.js";
import SkeletonCard from "../components/SkeletonCard.js";

export default function ExplorePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  
  // State variables for inputs
  const [searchInput, setSearchInput] = useState(searchParams.get("search") || "");
  const [typeFilter, setTypeFilter] = useState(searchParams.get("type") || "");
  const [locationFilter, setLocationFilter] = useState(searchParams.get("location") || "");
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");
  const [sortOption, setSortOption] = useState(searchParams.get("sort") || "newest");
  const [currentPage, setCurrentPage] = useState(Number(searchParams.get("page")) || 1);

  const [properties, setProperties] = useState<PropertyData[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [loading, setLoading] = useState(true);

  // Sync params to API fetch
  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      try {
        const queryParams = new URLSearchParams();
        
        const search = searchParams.get("search");
        const type = searchParams.get("type");
        const loc = searchParams.get("location");
        const minP = searchParams.get("minPrice");
        const maxP = searchParams.get("maxPrice");
        const sort = searchParams.get("sort") || "newest";
        const page = searchParams.get("page") || "1";

        if (search) queryParams.append("search", search);
        if (type) queryParams.append("type", type);
        if (loc) queryParams.append("location", loc);
        if (minP) queryParams.append("minPrice", minP);
        if (maxP) queryParams.append("maxPrice", maxP);
        if (sort) queryParams.append("sort", sort);
        queryParams.append("page", page);
        queryParams.append("limit", "8");

        const res = await fetch(`/api/properties?${queryParams.toString()}`);
        if (res.ok) {
          const data = await res.json();
          setProperties(data.properties);
          setTotalPages(data.pagination.totalPages);
          setTotalItems(data.pagination.total);
        }
      } catch (error) {
        console.error("Error fetching properties:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProperties();
  }, [searchParams]);

  // Sync state variables if URL changes (e.g. clicking category link in Landing Page)
  useEffect(() => {
    setSearchInput(searchParams.get("search") || "");
    setTypeFilter(searchParams.get("type") || "");
    setLocationFilter(searchParams.get("location") || "");
    setMinPrice(searchParams.get("minPrice") || "");
    setMaxPrice(searchParams.get("maxPrice") || "");
    setSortOption(searchParams.get("sort") || "newest");
    setCurrentPage(Number(searchParams.get("page")) || 1);
  }, [searchParams]);

  // Apply parameters to URL
  const applyFilters = (pageOverride?: number) => {
    const params: any = {};
    const pageVal = pageOverride !== undefined ? pageOverride : 1;

    if (searchInput.trim()) params.search = searchInput.trim();
    if (typeFilter) params.type = typeFilter;
    if (locationFilter.trim()) params.location = locationFilter.trim();
    if (minPrice) params.minPrice = minPrice;
    if (maxPrice) params.maxPrice = maxPrice;
    if (sortOption && sortOption !== "newest") params.sort = sortOption;
    if (pageVal > 1) params.page = pageVal.toString();

    setSearchParams(params);
    if (pageOverride === undefined) {
      setCurrentPage(1);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };

  const handleResetFilters = () => {
    setSearchInput("");
    setTypeFilter("");
    setLocationFilter("");
    setMinPrice("");
    setMaxPrice("");
    setSortOption("newest");
    setCurrentPage(1);
    setSearchParams({});
  };

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
      applyFilters(newPage);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header Title */}
        <div className="text-left mb-8">
          <span className="text-xs font-bold text-gold-500 uppercase tracking-widest block mb-2">LuxeHaven Portfolios</span>
          <h1 className="text-3xl font-black text-slate-800 tracking-tight">Explore Prestigious Estates</h1>
          <p className="text-sm text-slate-500 mt-1">Found {totalItems} properties matching your criteria</p>
        </div>

        {/* Search and Filters Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Sidebar Filters */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl border border-slate-150 shadow-sm h-fit space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <span className="font-extrabold text-slate-800 text-base flex items-center gap-2">
                <SlidersHorizontal size={18} className="text-gold-500" /> Filters
              </span>
              <button
                onClick={handleResetFilters}
                className="text-xs font-bold text-slate-400 hover:text-gold-500 flex items-center gap-1 transition-colors"
              >
                <RotateCcw size={12} /> Reset
              </button>
            </div>

            {/* Type Category Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Property Type</label>
              <div className="relative">
                <Home className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option value="">All Categories</option>
                  <option value="Villa">Villa</option>
                  <option value="Penthouse">Penthouse</option>
                  <option value="Apartment">Apartment</option>
                  <option value="Cabin">Cabin</option>
                </select>
              </div>
            </div>

            {/* Location Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Specific Location</label>
              <div className="relative">
                <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <input
                  type="text"
                  placeholder="e.g. Malibu, Paris..."
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                />
              </div>
            </div>

            {/* Price range filters */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider font-semibold">Price Range ($)</label>
              <div className="grid grid-cols-2 gap-2">
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="number"
                    placeholder="Min"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-8 pr-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
                <div className="relative">
                  <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
                  <input
                    type="number"
                    placeholder="Max"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-2.5 pl-8 pr-3 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                  />
                </div>
              </div>
            </div>

            {/* Sort Filter */}
            <div className="space-y-2">
              <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Sort Listings</label>
              <div className="relative">
                <ArrowUpDown className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                <select
                  value={sortOption}
                  onChange={(e) => setSortOption(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-10 pr-4 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-gold-400"
                >
                  <option value="newest">Newest Listed</option>
                  <option value="price_asc">Price: Low to High</option>
                  <option value="price_desc">Price: High to Low</option>
                  <option value="rating">Highest Rated</option>
                </select>
              </div>
            </div>

            {/* Filter Apply button */}
            <button
              onClick={() => applyFilters()}
              className="w-full py-3.5 bg-primary-500 hover:bg-gold-500 text-white font-extrabold text-sm rounded-xl transition-all duration-200 shadow-md shadow-primary-500/10"
            >
              Apply Filter Parameters
            </button>
          </div>

          {/* Listings and Search Bar */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Search Input bar */}
            <form onSubmit={handleSearchSubmit} className="bg-white p-2 rounded-2xl border border-slate-150 shadow-sm flex items-center gap-2">
              <div className="flex items-center gap-3 flex-1 px-3">
                <Search className="text-slate-400 shrink-0" size={20} />
                <input
                  type="text"
                  placeholder="Search properties by title, keyword, or features..."
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="w-full bg-transparent text-slate-700 placeholder-slate-400 border-none outline-none focus:ring-0 text-sm py-2.5"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2.5 bg-gold-500 hover:bg-gold-600 text-white font-bold text-sm rounded-xl transition-colors shrink-0"
              >
                Search
              </button>
            </form>

            {/* Grid listings */}
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {Array.from({ length: 8 }).map((_, idx) => (
                  <SkeletonCard key={idx} />
                ))}
              </div>
            ) : properties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {properties.map((prop) => (
                    <PropertyCard key={prop._id} property={prop} />
                  ))}
                </div>

                {/* Pagination bar */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-2 pt-10">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronLeft size={18} />
                    </button>
                    
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`w-11 h-11 rounded-xl font-bold text-sm transition-all ${
                            currentPage === pageNum
                              ? "bg-primary-500 text-white shadow-md shadow-primary-500/10"
                              : "border border-slate-200 bg-white hover:bg-slate-50 text-slate-600"
                          }`}
                        >
                          {pageNum}
                        </button>
                      );
                    })}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === totalPages}
                      className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      <ChevronRight size={18} />
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white border border-slate-150 rounded-2xl py-20 px-4 text-center">
                <Home className="mx-auto text-slate-300 mb-4" size={48} />
                <h3 className="text-lg font-bold text-slate-700">No Estates Found</h3>
                <p className="text-sm text-slate-400 max-w-sm mx-auto mt-2 leading-relaxed">
                  We couldn't find any listings matching your filter parameters. Try resetting filters or expanding search inputs.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="mt-6 px-6 py-2.5 bg-primary-500 hover:bg-gold-500 text-white font-bold text-sm rounded-xl transition-colors shadow"
                >
                  Reset Filter Inputs
                </button>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
