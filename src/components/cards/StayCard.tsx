import React from 'react';
import { Star, Heart } from 'lucide-react';
import { Stay } from '../../types';
import { useApp } from '../../context/AppContext';

export const StayCard: React.FC<{ stay: Stay }> = ({ stay }) => {
  const { navigateTo, formatPrice, isFavorite, toggleFavorite } = useApp();
  const isFav = isFavorite(stay.id);

  return (
    <div 
      onClick={() => navigateTo('stays')}
      className="group cursor-pointer flex flex-col"
    >
      {/* Image Container with clean 1:1 aspect ratio */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 mb-3 border border-neutral-200/60">
        <img 
          src={stay.featuredImage} 
          alt={stay.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
        />

        {/* Guest favorite Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          {stay.isGuestFavorite && (
            <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/95 text-neutral-900 shadow-sm border border-neutral-200/60 backdrop-blur-sm">
              Guest favorite
            </span>
          )}
        </div>

        {/* Heart Favorite Button */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(stay.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center transition shadow-sm"
        >
          <Heart className={`w-4 h-4 transition ${isFav ? 'text-rose-500 fill-rose-500' : 'text-neutral-700'}`} />
        </button>
      </div>

      {/* Content & Typography */}
      <div className="space-y-0.5">
        <div className="flex items-center justify-between text-sm">
          <h3 className="font-medium text-neutral-900 truncate flex-1 group-hover:text-teal-700 transition">
            {stay.title}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-neutral-800 ml-2 font-normal shrink-0">
            <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
            <span className="font-medium">{stay.rating}</span>
          </div>
        </div>

        <p className="text-xs text-neutral-500 font-normal truncate">
          {stay.area}, {stay.city} • {stay.guests} guests · {stay.bedrooms} bedrooms
        </p>

        <div className="pt-0.5 flex items-baseline space-x-1">
          <span className="text-sm font-semibold text-neutral-900">
            {formatPrice(stay.pricePerNight, stay.currency)}
          </span>
          <span className="text-xs text-neutral-500 font-normal">night</span>
        </div>
      </div>
    </div>
  );
};
