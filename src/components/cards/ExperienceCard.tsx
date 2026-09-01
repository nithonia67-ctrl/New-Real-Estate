import React from 'react';
import { Star, Clock } from 'lucide-react';
import { Experience } from '../../types';
import { useApp } from '../../context/AppContext';

export const ExperienceCard: React.FC<{ exp: Experience }> = ({ exp }) => {
  const { navigateTo, formatPrice } = useApp();

  return (
    <div 
      onClick={() => navigateTo('experiences')}
      className="group cursor-pointer flex flex-col"
    >
      {/* Clean Aspect Ratio Image with rounded-2xl corners */}
      <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-neutral-100 mb-3 border border-neutral-200/60">
        <img 
          src={exp.featuredImage} 
          alt={exp.title}
          className="w-full h-full object-cover group-hover:scale-[1.02] transition duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 text-[11px] font-medium rounded-full bg-white/95 text-neutral-900 shadow-sm border border-neutral-200/60 backdrop-blur-sm">
            {exp.category}
          </span>
        </div>
      </div>

      {/* Content & Typography */}
      <div className="space-y-0.5">
        <div className="flex items-center justify-between text-sm">
          <h3 className="font-medium text-neutral-900 truncate flex-1 group-hover:text-rose-700 transition">
            {exp.title}
          </h3>
          <div className="flex items-center space-x-1 text-xs text-neutral-800 ml-2 font-normal shrink-0">
            <Star className="w-3.5 h-3.5 fill-neutral-900 text-neutral-900" />
            <span className="font-medium">{exp.rating}</span>
            <span className="text-neutral-400 font-normal">({exp.reviewsCount})</span>
          </div>
        </div>

        <p className="text-xs text-neutral-500 font-normal truncate">
          {exp.location} • {exp.duration} · Hosted by {exp.hostName.split(' ')[0]}
        </p>

        <div className="pt-0.5 flex items-baseline space-x-1">
          <span className="text-sm font-semibold text-neutral-900">
            {formatPrice(exp.pricePerPerson, exp.currency)}
          </span>
          <span className="text-xs text-neutral-500 font-normal">/ person</span>
        </div>
      </div>
    </div>
  );
};
