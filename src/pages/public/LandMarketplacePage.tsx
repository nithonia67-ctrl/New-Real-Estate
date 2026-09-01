import React, { useState } from 'react';
import { 
  TreePine, 
  MapPin, 
  Search, 
  ShieldCheck, 
  FileText, 
  Droplets, 
  Zap, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { LandCard } from '../../components/cards/LandCard';

export const LandMarketplacePage: React.FC = () => {
  const { landListings } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [landTypeFilter, setLandTypeFilter] = useState('all');
  const [titleDeedFilter, setTitleDeedFilter] = useState('all');
  const [waterFilter, setWaterFilter] = useState(false);
  const [electricityFilter, setElectricityFilter] = useState(false);

  const filtered = landListings.filter(l => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = l.title.toLowerCase().includes(q) || l.city.toLowerCase().includes(q) || l.area.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (landTypeFilter !== 'all' && l.landType !== landTypeFilter) return false;
    if (titleDeedFilter !== 'all' && l.titleDeedStatus !== titleDeedFilter) return false;
    if (waterFilter && !l.waterAccess) return false;
    if (electricityFilter && !l.electricityAccess) return false;
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-amber-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase mb-2">
            <TreePine className="w-4 h-4" />
            <span>Title-Deed Verified Plots & Farmland</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            East Africa Land & Development Plots
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Agricultural ranches in Nanyuki, commercial parcels in Tatu City SEZ, and pristine freehold beachfront land in Zanzibar.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Filter Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search area (e.g. Nanyuki, Ruiru, Zanzibar)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
              />
            </div>

            <div>
              <select 
                value={landTypeFilter}
                onChange={e => setLandTypeFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="all">Type: All Land Categories</option>
                <option value="Residential">Residential Gated Plots</option>
                <option value="Commercial">Commercial / Industrial SEZ</option>
                <option value="Agricultural">Agricultural Farmland</option>
                <option value="Beachfront">Beachfront Plots</option>
              </select>
            </div>

            <div>
              <select 
                value={titleDeedFilter}
                onChange={e => setTitleDeedFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="all">Title Deed: All Statuses</option>
                <option value="Freehold Title">Freehold Title</option>
                <option value="Leasehold (99 Yrs)">Leasehold (99 Yrs)</option>
                <option value="Sectional Title">Sectional Title</option>
                <option value="ZIPA Certified Lease">ZIPA Certified Lease</option>
              </select>
            </div>

            <div className="flex items-center space-x-3 px-2">
              <label className="flex items-center space-x-1.5 text-xs font-semibold cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={waterFilter}
                  onChange={e => setWaterFilter(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Water on Site</span>
              </label>

              <label className="flex items-center space-x-1.5 text-xs font-semibold cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={electricityFilter}
                  onChange={e => setElectricityFilter(e.target.checked)}
                  className="rounded text-amber-600 focus:ring-amber-500"
                />
                <span>Grid Power</span>
              </label>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filtered.map(land => (
            <LandCard key={land.id} land={land} />
          ))}
        </div>

      </div>
    </div>
  );
};
