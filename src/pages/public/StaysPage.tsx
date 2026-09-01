import React, { useState } from 'react';
import { Palmtree, MapPin, Search, Star, Users, ShieldCheck, Heart } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { StayCard } from '../../components/cards/StayCard';

export const StaysPage: React.FC = () => {
  const { stays, navigateTo } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('all');

  const filtered = stays.filter(s => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!s.title.toLowerCase().includes(q) && !s.city.toLowerCase().includes(q) && !s.area.toLowerCase().includes(q)) return false;
    }
    if (cityFilter !== 'all' && s.city !== cityFilter) return false;
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-teal-950 via-slate-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-teal-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-teal-500/20 text-teal-300 text-xs font-bold uppercase mb-2">
            <Palmtree className="w-4 h-4" />
            <span>Curated Coastal Villas & Safari Lodges</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            Luxury Stays & Vacation Retreats
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Book private infinity-pool villas in Zanzibar, beachfront compounds in Diani, and eco-luxury tented safari camps in Maasai Mara.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8 flex flex-col sm:flex-row gap-3 items-center justify-between">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search destination (e.g. Zanzibar, Diani, Mara)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={cityFilter}
              onChange={e => setCityFilter(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="all">Destination: All East Africa</option>
              <option value="Zanzibar">Zanzibar Island</option>
              <option value="Diani Beach">Diani Coast</option>
              <option value="Maasai Mara">Maasai Mara</option>
              <option value="Kigali">Kigali</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(stay => (
            <StayCard key={stay.id} stay={stay} />
          ))}
        </div>

      </div>
    </div>
  );
};
