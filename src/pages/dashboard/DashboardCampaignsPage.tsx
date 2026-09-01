import React from 'react';
import { Sparkles, Eye, MousePointerClick, DollarSign, Plus, CheckCircle2, TrendingUp } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const DashboardCampaignsPage: React.FC = () => {
  const { adCampaigns, formatPrice, navigateTo } = useApp();

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-slate-900">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-amber-600 text-xs font-extrabold uppercase tracking-wider mb-1">
            <Sparkles className="w-4 h-4" />
            <span>Ad Server & Impression Telemetry</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Sponsored Ad Campaigns
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Monitor live CTR, audience impressions, and budget pacing across your sponsored spotlight placements.
          </p>
        </div>

        <button 
          onClick={() => navigateTo('advertise_landing')}
          className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg transition flex items-center space-x-2 self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>Launch New Ad Campaign</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {adCampaigns.map(camp => (
          <div key={camp.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase">
                  {camp.placement.replace('_', ' ')}
                </span>
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  {camp.status}
                </span>
              </div>

              <h3 className="font-black text-slate-900 text-base">{camp.headline}</h3>
              <p className="text-xs text-slate-500 mt-1 line-clamp-2">{camp.description}</p>

              <div className="mt-6 pt-4 border-t border-slate-100 grid grid-cols-3 gap-2 text-center text-xs">
                <div className="p-2 bg-slate-50 rounded-xl">
                  <Eye className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span className="font-black text-slate-900 block">{camp.impressions.toLocaleString()}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Impressions</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <MousePointerClick className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span className="font-black text-slate-900 block">{camp.clicks.toLocaleString()}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Clicks</span>
                </div>
                <div className="p-2 bg-slate-50 rounded-xl">
                  <DollarSign className="w-3.5 h-3.5 text-slate-400 mx-auto mb-1" />
                  <span className="font-black text-slate-900 block">{formatPrice(camp.spent)}</span>
                  <span className="text-[9px] text-slate-400 font-bold uppercase">Spent</span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
              <span>Budget: {formatPrice(camp.totalBudget)}</span>
              <span>Target: Diaspora</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
