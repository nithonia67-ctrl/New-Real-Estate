import React from 'react';
import { ExternalLink, Sparkles } from 'lucide-react';
import { AdCampaign } from '../../types';
import { useApp } from '../../context/AppContext';

export const SponsoredAdCard: React.FC<{ campaign: AdCampaign; placement?: string }> = ({ campaign }) => {
  const { navigateTo } = useApp();

  return (
    <div className="bg-neutral-50/80 border border-neutral-200/70 rounded-2xl p-5 relative overflow-hidden flex flex-col md:flex-row items-center gap-5">
      <div className="relative w-full md:w-64 h-36 rounded-xl overflow-hidden bg-neutral-100 shrink-0">
        <img 
          src={campaign.creativeImageUrl} 
          alt={campaign.headline} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-white/90 backdrop-blur-sm text-neutral-800 text-[10px] font-medium border border-neutral-200/50 flex items-center space-x-1">
          <Sparkles className="w-2.5 h-2.5 text-amber-500" />
          <span>Sponsored</span>
        </div>
      </div>

      <div className="flex-1 flex flex-col justify-between w-full">
        <div>
          <span className="text-[11px] text-neutral-400 font-normal">
            Promoted by {campaign.advertiserName}
          </span>
          <h4 className="font-semibold text-neutral-900 text-base leading-snug mt-0.5">
            {campaign.headline}
          </h4>
          <p className="text-xs text-neutral-500 mt-1 line-clamp-2 leading-relaxed font-normal">
            {campaign.description}
          </p>
        </div>

        <div className="mt-3 pt-2 flex items-center justify-between">
          <span className="text-xs text-emerald-700 font-medium">
            Verified Partner
          </span>
          <button 
            onClick={() => {
              if (campaign.destinationUrl.includes('properties')) navigateTo('properties');
              else if (campaign.destinationUrl.includes('vehicles')) navigateTo('vehicles');
              else if (campaign.destinationUrl.includes('land')) navigateTo('land');
              else navigateTo('properties');
            }}
            className="px-3.5 py-1.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs rounded-full transition flex items-center space-x-1.5"
          >
            <span>{campaign.callToAction}</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
};
