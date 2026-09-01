import React from 'react';
import { Building2, ShieldCheck, MapPin, Star, Users, Award, ExternalLink } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AgenciesPage: React.FC = () => {
  const { agencies, navigateTo } = useApp();

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            Chartered Brokerage Firms & Valuation Practices
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-1">
            Chartered Agencies & Brokerage Houses
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Fully certified real estate companies, property management firms, and institutional asset advisory groups.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {agencies.map(agency => (
            <div key={agency.id} className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center p-2">
                    <img src={agency.logo} alt={agency.name} className="w-full h-full object-contain" />
                  </div>
                  {agency.isVerified && (
                    <span className="px-3 py-1 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full flex items-center space-x-1">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Certified Agency</span>
                    </span>
                  )}
                </div>

                <h3 className="font-extrabold text-slate-900 text-lg">{agency.name}</h3>
                <div className="flex items-center space-x-1 text-xs text-slate-500 mt-1 mb-3">
                  <MapPin className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>{agency.address}</span>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {agency.description}
                </p>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <span className="font-black text-slate-900 block text-base">{agency.agentsCount}</span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Agents</span>
                  </div>
                  <div className="p-2 bg-slate-50 rounded-xl">
                    <span className="font-black text-slate-900 block text-base">{agency.activeListingsCount}</span>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase">Listings</span>
                  </div>
                </div>

                <button 
                  onClick={() => navigateTo('properties')}
                  className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition cursor-pointer"
                >
                  Explore Agency Portfolio
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
