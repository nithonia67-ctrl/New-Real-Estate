import React, { useState } from 'react';
import { ShieldCheck, Star, Phone, Mail, Award, Search, Building2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const AgentsPage: React.FC = () => {
  const { agents, agencies, navigateTo } = useApp();
  const [search, setSearch] = useState('');

  const filtered = agents.filter(a => {
    if (search) {
      const q = search.toLowerCase();
      return a.name.toLowerCase().includes(q) || a.agencyName.toLowerCase().includes(q) || a.specialties.some(s => s.toLowerCase().includes(q));
    }
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            Licensed Estate Agents Board (EARB) & ZIPA Verified
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-1">
            Verified Real Estate Agents & Advisors
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Connect with certified property professionals with proven track records in high-net-worth conveyancing and land acquisitions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Search */}
        <div className="max-w-md mb-8">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search agent by name, agency or specialty..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(agent => (
            <div key={agent.id} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <div className="flex items-center space-x-4 mb-4">
                  <img src={agent.avatar} alt={agent.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-emerald-500 shadow-md" />
                  <div>
                    <div className="flex items-center space-x-1.5">
                      <h3 className="font-extrabold text-slate-900 text-base">{agent.name}</h3>
                      {agent.verified && <ShieldCheck className="w-4 h-4 text-emerald-600" />}
                    </div>
                    <p className="text-xs text-emerald-700 font-bold">{agent.title}</p>
                    <p className="text-[11px] text-slate-500">{agent.agencyName}</p>
                    <p className="text-[10px] text-slate-400 mt-0.5">{agent.licenseNumber}</p>
                  </div>
                </div>

                <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                  {agent.bio}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-4">
                  {agent.specialties.map((sp, idx) => (
                    <span key={idx} className="px-2 py-0.5 rounded bg-slate-100 text-slate-700 text-[10px] font-bold">
                      {sp}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center space-x-1 text-amber-500 font-bold">
                    <Star className="w-3.5 h-3.5 fill-amber-500" />
                    <span>{agent.rating} ({agent.reviewsCount} reviews)</span>
                  </div>
                  <span className="font-extrabold text-slate-900">{agent.dealsClosed} Deals Closed</span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <a 
                    href={`tel:${agent.phone}`} 
                    className="py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-xl font-bold flex items-center justify-center space-x-1"
                  >
                    <Phone className="w-3.5 h-3.5 text-slate-600" />
                    <span>Call</span>
                  </a>
                  <button 
                    onClick={() => navigateTo('properties')}
                    className="py-2 px-3 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl font-bold transition flex items-center justify-center space-x-1"
                  >
                    <span>View Listings</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
