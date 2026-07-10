import { Link } from "react-router-dom";
import { MapPin, Star, BedDouble, Bath, Maximize } from "lucide-react";

export interface PropertyData {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  price: number;
  type: string;
  location: string;
  rating: number;
  imageUrl: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  createdAt: string;
  createdBy: string;
}

interface PropertyCardProps {
  property: PropertyData;
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(property.price);

  return (
    <div className="flex flex-col h-full bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm card-hover-effect">
      {/* Image container */}
      <div className="relative h-56 w-full overflow-hidden shrink-0">
        <img
          src={property.imageUrl}
          alt={property.title}
          className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
        />
        <div className="absolute top-4 left-4 bg-primary-500/90 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
          {property.type}
        </div>
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-md px-2.5 py-1 rounded-full text-xs font-semibold text-slate-800 flex items-center gap-1 shadow-sm">
          <Star size={12} className="text-amber-500 fill-amber-500" />
          <span>{property.rating.toFixed(1)}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-gold-500 uppercase tracking-wider mb-2">
          <MapPin size={12} />
          <span className="truncate">{property.location}</span>
        </div>

        <h3 className="text-lg font-bold text-slate-800 line-clamp-1 mb-1.5 text-left" title={property.title}>
          {property.title}
        </h3>

        <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed mb-4 flex-1 text-left">
          {property.shortDescription}
        </p>

        {/* Specs bar */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-slate-50 text-slate-500 text-xs font-medium mb-4 shrink-0">
          <div className="flex items-center gap-1">
            <BedDouble size={14} className="text-gold-500" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <Bath size={14} className="text-gold-500" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <Maximize size={14} className="text-gold-500" />
            <span>{property.sqft} sqft</span>
          </div>
        </div>

        {/* Footer info & CTA */}
        <div className="flex items-center justify-between mt-auto pt-1 shrink-0">
          <div className="text-left">
            <span className="block text-xs text-slate-400 font-semibold uppercase tracking-wider">Price</span>
            <span className="text-lg font-extrabold text-primary-500">{formattedPrice}</span>
          </div>
          <Link
            to={`/properties/${property._id}`}
            className="px-4 py-2 text-xs font-bold text-white bg-primary-500 hover:bg-gold-500 rounded-lg transition-all duration-200 shadow-sm"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
