import React, { useState } from 'react';
import { 
  Heart, 
  BedDouble, 
  Bath, 
  Maximize, 
  MapPin, 
  ShieldCheck, 
  Star, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { Property } from '../../types';
import { useApp } from '../../context/AppContext';

interface PropertyCardProps {
  property: Property;
  layout?: 'grid' | 'list';
}

export const PropertyCard: React.FC<PropertyCardProps> = ({ property, layout = 'grid' }) => {
  const { navigateTo, isFavorite, toggleFavorite, formatPrice, agents } = useApp();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const isFav = isFavorite(property.id);

  const agent = agents.find(a => a.id === property.agentId);

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (property.images && property.images.length > 0) {
      setCurrentImgIndex((prev) => (prev + 1) % property.images.length);
    }
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (property.images && property.images.length > 0) {
      setCurrentImgIndex((prev) => (prev - 1 + property.images.length) % property.images.length);
    }
  };

  const activeImage = (property.images && property.images[currentImgIndex]) || property.featuredImage;

  if (layout === 'list') {
    return (
      <div 
        onClick={() => navigateTo('property_detail', property.id)}
        className="group bg-white rounded-2xl border border-neutral-200/70 hover:border-neutral-300 hover:shadow-md transition-all duration-200 overflow-hidden flex flex-col md:flex-row cursor-pointer"
      >
        {/* Image Container */}
        <div className="relative md:w-72 h-56 md:h-auto shrink-0 overflow-hidden bg-neutral-100">
          <img 
            src={activeImage} 
            alt={property.title}
            className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
            {property.rating >= 4.9 && (
              <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/95 text-neutral-900 shadow-sm border border-neutral-200/60 backdrop-blur-sm flex items-center space-x-1">
                <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                <span>Guest favorite</span>
              </span>
            )}
            {property.isVerified && (
              <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-emerald-950/80 text-emerald-200 backdrop-blur-sm flex items-center space-x-1">
                <ShieldCheck className="w-3 h-3 text-emerald-400" />
                <span>Verified</span>
              </span>
            )}
          </div>

          {/* Favorite Button */}
          <button 
            onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id); }}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center transition shadow-sm"
          >
            <Heart className={`w-4 h-4 transition ${isFav ? 'text-rose-500 fill-rose-500' : 'text-neutral-700'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between text-xs text-neutral-500 mb-1">
              <span className="truncate">{property.area}, {property.city}</span>
              <div className="flex items-center space-x-1 text-neutral-800 font-medium">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{property.rating}</span>
                <span className="text-neutral-400 font-normal">({property.reviewsCount})</span>
              </div>
            </div>

            <h3 className="font-medium text-base text-neutral-900 group-hover:text-emerald-700 transition line-clamp-1">
              {property.title}
            </h3>

            <p className="text-neutral-500 text-xs mt-1.5 line-clamp-2 leading-relaxed font-normal">
              {property.description}
            </p>

            {/* Quick Specs */}
            <div className="flex items-center gap-4 text-xs font-normal text-neutral-600 mt-3 pt-2.5 border-t border-neutral-100">
              <div className="flex items-center space-x-1.5">
                <BedDouble className="w-3.5 h-3.5 text-neutral-400" />
                <span>{property.bedrooms} beds</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Bath className="w-3.5 h-3.5 text-neutral-400" />
                <span>{property.bathrooms} baths</span>
              </div>
              <div className="flex items-center space-x-1.5">
                <Maximize className="w-3.5 h-3.5 text-neutral-400" />
                <span>{property.propertySizeSqft.toLocaleString()} sqft</span>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-4 pt-3 border-t border-neutral-100">
            <div className="flex items-baseline space-x-1">
              <span className="text-base font-semibold text-neutral-900">
                {formatPrice(property.price, property.currency)}
              </span>
              {property.pricePeriod && property.pricePeriod !== 'total' && (
                <span className="text-xs text-neutral-500 font-normal">/{property.pricePeriod}</span>
              )}
            </div>

            {agent && (
              <span className="text-xs text-neutral-500 font-normal">
                Listed by <span className="font-medium text-neutral-700">{agent.name.split(' ')[0]}</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout (Default - Airbnb Style)
  return (
    <div 
      onClick={() => navigateTo('property_detail', property.id)}
      className="group cursor-pointer flex flex-col"
    >
      {/* Image Area with clean rounded corners */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 mb-3 border border-neutral-200/60">
        <img 
          src={activeImage} 
          alt={property.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
        />

        {/* Carousel arrows on hover */}
        {property.images && property.images.length > 1 && (
          <>
            <button 
              onClick={prevImage}
              className="absolute left-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button 
              onClick={nextImage}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full bg-white/90 hover:bg-white text-neutral-800 flex items-center justify-center opacity-0 group-hover:opacity-100 transition shadow-md"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </>
        )}

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {property.rating >= 4.9 && (
            <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/95 text-neutral-900 shadow-sm border border-neutral-200/60 backdrop-blur-sm flex items-center space-x-1">
              <span>Guest favorite</span>
            </span>
          )}
          {property.isVerified && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-emerald-950/80 text-emerald-200 backdrop-blur-sm flex items-center space-x-0.5">
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Favorite Icon */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(property.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center transition shadow-sm"
        >
          <Heart className={`w-4 h-4 transition ${isFav ? 'text-rose-500 fill-rose-500' : 'text-neutral-700'}`} />
        </button>

        {/* Dots pagination */}
        {property.images && property.images.length > 1 && (
          <div className="absolute bottom-2.5 left-1/2 -translate-x-1/2 flex items-center space-x-1">
            {property.images.slice(0, 5).map((_, idx) => (
              <span 
                key={idx} 
                className={`w-1.5 h-1.5 rounded-full transition-all ${idx === currentImgIndex ? 'bg-white w-2' : 'bg-white/60'}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Clean Metadata & Typography */}
      <div className="space-y-0.5">
        {/* Title + Rating Row */}
        <div className="flex items-center justify-between text-sm">
          <h3 className="font-medium text-neutral-900 truncate flex-1 group-hover:text-emerald-700 transition">
            {property.title}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-neutral-800 ml-2 font-normal shrink-0">
            <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
            <span className="font-medium">{property.rating}</span>
          </div>
        </div>

        {/* Location & specs */}
        <p className="text-xs text-neutral-500 font-normal truncate">
          {property.area}, {property.city} • {property.bedrooms} beds · {property.bathrooms} baths
        </p>

        {/* Price Row */}
        <div className="pt-0.5 flex items-baseline space-x-1">
          <span className="text-sm font-semibold text-neutral-900">
            {formatPrice(property.price, property.currency)}
          </span>
          {property.pricePeriod && property.pricePeriod !== 'total' && (
            <span className="text-xs text-neutral-500 font-normal">/{property.pricePeriod}</span>
          )}
        </div>
      </div>
    </div>
  );
};
