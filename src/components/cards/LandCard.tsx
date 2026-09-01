import React from 'react';
import { 
  Heart,
  FileCheck,
  Star
} from 'lucide-react';
import { LandListing } from '../../types';
import { useApp } from '../../context/AppContext';

export const LandCard: React.FC<{ land: LandListing }> = ({ land }) => {
  const { navigateTo, isFavorite, toggleFavorite, formatPrice } = useApp();
  const isFav = isFavorite(land.id);

  return (
    <div 
      onClick={() => navigateTo('land_detail', land.id)}
      className="group cursor-pointer flex flex-col"
    >
      {/* Image with 1:1 aspect ratio and clean rounded corners */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 mb-3 border border-neutral-200/60">
        <img 
          src={land.featuredImage} 
          alt={land.title} 
          className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/95 text-neutral-900 shadow-sm border border-neutral-200/60 backdrop-blur-sm">
            {land.totalAcreage} {land.totalAcreage === 1 ? 'Acre' : 'Acres'}
          </span>
          {land.titleDeedStatus && (
            <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-amber-950/80 text-amber-200 backdrop-blur-sm flex items-center space-x-0.5">
              <FileCheck className="w-3 h-3 text-amber-400" />
              <span>Verified Title</span>
            </span>
          )}
        </div>

        {/* Favorite Icon */}
        <button 
          onClick={(e) => { e.stopPropagation(); toggleFavorite(land.id); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/80 hover:bg-white backdrop-blur-sm flex items-center justify-center transition shadow-sm"
        >
          <Heart className={`w-4 h-4 transition ${isFav ? 'text-rose-500 fill-rose-500' : 'text-neutral-700'}`} />
        </button>
      </div>

      {/* Metadata */}
      <div className="space-y-0.5">
        <div className="flex items-center justify-between text-sm">
          <h3 className="font-medium text-neutral-900 truncate flex-1 group-hover:text-amber-700 transition">
            {land.title}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-neutral-800 ml-2 font-normal shrink-0">
            <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
            <span className="font-medium">4.9</span>
          </div>
        </div>

        <p className="text-xs text-neutral-500 font-normal truncate">
          {land.area}, {land.city} • {land.landType} · {land.roadAccess} Access
        </p>

        <div className="pt-0.5 flex items-baseline space-x-1.5">
          <span className="text-sm font-semibold text-neutral-900">
            {formatPrice(land.price, land.currency)}
          </span>
          <span className="text-xs text-neutral-400 font-normal">
            ({formatPrice(land.pricePerAcre, land.currency)}/acre)
          </span>
        </div>
      </div>
    </div>
  );
};
