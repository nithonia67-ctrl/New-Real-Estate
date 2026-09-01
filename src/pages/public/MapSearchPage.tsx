import React, { useState } from 'react';
import { 
  MapPin, 
  Building2, 
  Search, 
  Layers, 
  Navigation, 
  ShieldCheck, 
  SlidersHorizontal,
  ChevronRight,
  Heart
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Property } from '../../types';

export const MapSearchPage: React.FC = () => {
  const { properties, formatPrice, navigateTo, isFavorite, toggleFavorite } = useApp();
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(properties[0] || null);
  const [activeTab, setActiveTab] = useState<'all' | 'buy' | 'rent'>('all');
  const [searchLocation, setSearchLocation] = useState('');

  const filtered = properties.filter(p => {
    if (activeTab !== 'all' && p.purpose !== activeTab) return false;
    if (searchLocation) {
      const q = searchLocation.toLowerCase();
      if (!p.city.toLowerCase().includes(q) && !p.area.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <div className="h-[calc(100vh-80px)] flex flex-col lg:flex-row overflow-hidden bg-slate-900">
      
      {/* Left Column: Property List & Filter Bar */}
      <div className="w-full lg:w-[480px] xl:w-[540px] h-full flex flex-col bg-white border-r border-slate-200 z-10 shrink-0">
        
        {/* Top Search Controls */}
        <div className="p-4 border-b border-slate-200 space-y-3 bg-white">
          <div className="flex items-center justify-between">
            <h1 className="font-extrabold text-base text-slate-900 flex items-center space-x-1.5">
              <Navigation className="w-4 h-4 text-emerald-600" />
              <span>Interactive GPS Map Explorer</span>
            </h1>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
              {filtered.length} pins
            </span>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search area (Karen, Westlands, Zanzibar)..."
                value={searchLocation}
                onChange={e => setSearchLocation(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              />
            </div>

            <div className="flex bg-slate-100 p-1 rounded-xl">
              <button 
                onClick={() => setActiveTab('all')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${activeTab === 'all' ? 'bg-white shadow text-slate-900' : 'text-slate-500'}`}
              >
                All
              </button>
              <button 
                onClick={() => setActiveTab('buy')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${activeTab === 'buy' ? 'bg-white shadow text-emerald-700' : 'text-slate-500'}`}
              >
                Buy
              </button>
              <button 
                onClick={() => setActiveTab('rent')}
                className={`px-2.5 py-1 rounded-lg text-xs font-bold transition ${activeTab === 'rent' ? 'bg-white shadow text-blue-700' : 'text-slate-500'}`}
              >
                Rent
              </button>
            </div>
          </div>
        </div>

        {/* Scrollable Listings Strip */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3 divide-y divide-slate-100">
          {filtered.map(prop => (
            <div 
              key={prop.id}
              onClick={() => setSelectedProperty(prop)}
              className={`p-3 rounded-2xl transition flex gap-3 cursor-pointer ${selectedProperty?.id === prop.id ? 'bg-emerald-50/80 border-2 border-emerald-500' : 'hover:bg-slate-50 border border-transparent'}`}
            >
              <div className="w-24 h-24 rounded-xl overflow-hidden shrink-0 bg-slate-100 relative">
                <img src={prop.featuredImage} alt={prop.title} className="w-full h-full object-cover" />
                <span className="absolute bottom-1 left-1 px-1.5 py-0.5 rounded bg-black/70 text-white text-[9px] font-bold uppercase">
                  {prop.purpose}
                </span>
              </div>

              <div className="flex-1 flex flex-col justify-between py-0.5">
                <div>
                  <div className="flex items-center space-x-1 text-[11px] text-slate-500">
                    <MapPin className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span className="truncate">{prop.area}, {prop.city}</span>
                  </div>
                  <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1 mt-0.5">{prop.title}</h4>
                  <p className="text-[11px] text-slate-500">{prop.bedrooms} Bed • {prop.bathrooms} Bath • {prop.propertySizeSqft} sqft</p>
                </div>

                <div className="flex items-center justify-between mt-2">
                  <span className="text-sm font-extrabold text-slate-900">
                    {formatPrice(prop.price, prop.currency)}
                  </span>
                  <button 
                    onClick={(e) => { e.stopPropagation(); navigateTo('property_detail', prop.id); }}
                    className="text-[11px] font-bold text-emerald-600 hover:underline flex items-center"
                  >
                    <span>View</span>
                    <ChevronRight className="w-3 h-3" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>

      {/* Right Area: Interactive Simulated Map Stage with Real Pins */}
      <div className="flex-1 relative h-full bg-slate-900 overflow-hidden">
        
        {/* Background Map Visual */}
        <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] bg-slate-950 opacity-90" />
        
        {/* Realistic Satellite / Terrain Canvas Simulator */}
        <img 
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1600&auto=format&fit=crop&q=80" 
          alt="East Africa Map Layer"
          className="absolute inset-0 w-full h-full object-cover opacity-25 filter contrast-125"
        />

        {/* Top Controls Overlay */}
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <div className="bg-slate-900/90 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 text-white text-xs font-bold flex items-center space-x-2">
            <Layers className="w-4 h-4 text-emerald-400" />
            <span>Map Layers: Satellite + Zoning</span>
          </div>
        </div>

        {/* Pin Markers Distributed Across Canvas */}
        <div className="absolute inset-0 p-8 flex items-center justify-center pointer-events-none">
          <div className="relative w-full max-w-2xl h-full max-h-[540px]">
            
            {filtered.map((prop, idx) => {
              // Deterministic visual coordinate mapping
              const posX = 15 + ((idx * 37) % 70);
              const posY = 15 + ((idx * 43) % 70);
              const isSelected = selectedProperty?.id === prop.id;

              return (
                <div 
                  key={prop.id}
                  style={{ left: `${posX}%`, top: `${posY}%` }}
                  className="absolute pointer-events-auto -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10 transition-all duration-300 group"
                  onClick={() => setSelectedProperty(prop)}
                >
                  <div className={`px-2.5 py-1.5 rounded-full font-black text-xs shadow-2xl flex items-center space-x-1 transition ${isSelected ? 'bg-emerald-500 text-white scale-125 ring-4 ring-emerald-400/40 z-30' : 'bg-slate-950 text-emerald-400 border border-emerald-500/60 hover:scale-110'}`}>
                    <MapPin className="w-3.5 h-3.5" />
                    <span>{formatPrice(prop.price)}</span>
                  </div>
                </div>
              );
            })}

          </div>
        </div>

        {/* Bottom Floating Active Pin Quick Card */}
        {selectedProperty && (
          <div className="absolute bottom-6 left-6 right-6 lg:left-auto lg:right-6 lg:w-96 z-30 bg-white rounded-2xl p-4 shadow-2xl border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-200">
            <div className="flex gap-3">
              <img src={selectedProperty.featuredImage} alt={selectedProperty.title} className="w-24 h-24 rounded-xl object-cover shrink-0" />
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-bold text-emerald-600 uppercase block">{selectedProperty.area}, {selectedProperty.city}</span>
                  <h4 className="font-extrabold text-xs text-slate-900 line-clamp-1">{selectedProperty.title}</h4>
                  <p className="text-sm font-black text-slate-900 mt-1">
                    {formatPrice(selectedProperty.price, selectedProperty.currency)}
                  </p>
                </div>

                <div className="flex gap-2 mt-2">
                  <button 
                    onClick={() => navigateTo('property_detail', selectedProperty.id)}
                    className="flex-1 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-lg transition"
                  >
                    View Full Details
                  </button>
                  <button 
                    onClick={() => toggleFavorite(selectedProperty.id)}
                    className="p-1.5 rounded-lg border border-slate-200 text-slate-700 hover:text-rose-500"
                  >
                    <Heart className={`w-4 h-4 ${isFavorite(selectedProperty.id) ? 'text-rose-500 fill-rose-500' : ''}`} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>

    </div>
  );
};
