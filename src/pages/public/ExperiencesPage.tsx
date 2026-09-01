import React, { useState } from 'react';
import { Compass, Clock, Users, Star, MapPin, Sparkles, Search, CheckCircle2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { ExperienceCard } from '../../components/cards/ExperienceCard';

export const ExperiencesPage: React.FC = () => {
  const { experiences, formatPrice } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filtered = experiences.filter(e => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!e.title.toLowerCase().includes(q) && !e.location.toLowerCase().includes(q)) return false;
    }
    if (categoryFilter !== 'all' && e.category !== categoryFilter) return false;
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      {/* Banner */}
      <div className="bg-gradient-to-r from-rose-950 via-slate-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-rose-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 text-xs font-bold uppercase mb-2">
            <Compass className="w-4 h-4" />
            <span>Unrivaled Guided Safaris & Aerial Expeditions</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            East African Safaris & Island Excursions
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Serengeti sunrise hot air balloon flights, Volcanoes National Park gorilla tracking, and private traditional dhow island charters.
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
              placeholder="Search adventures (e.g. Balloon, Gorilla, Dhow)..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto">
            <select 
              value={categoryFilter}
              onChange={e => setCategoryFilter(e.target.value)}
              className="px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            >
              <option value="all">Category: All Expeditions</option>
              <option value="Wildlife Safari">Wildlife Safari</option>
              <option value="Primate Tracking">Primate Tracking</option>
              <option value="Ocean & Marine">Ocean & Marine</option>
            </select>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(exp => (
            <ExperienceCard key={exp.id} exp={exp} />
          ))}
        </div>

      </div>
    </div>
  );
};
