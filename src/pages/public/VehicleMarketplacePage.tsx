import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  Search, 
  ShieldCheck, 
  Gauge, 
  Fuel, 
  Settings, 
  Filter, 
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { VehicleCard } from '../../components/cards/VehicleCard';

export const VehicleMarketplacePage: React.FC = () => {
  const { vehicles } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [makeFilter, setMakeFilter] = useState('all');
  const [conditionFilter, setConditionFilter] = useState('all');
  const [bodyTypeFilter, setBodyTypeFilter] = useState('all');
  const [fuelFilter, setFuelFilter] = useState('all');

  const filtered = vehicles.filter(v => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const match = v.title.toLowerCase().includes(q) || v.make.toLowerCase().includes(q) || v.model.toLowerCase().includes(q) || v.location.toLowerCase().includes(q);
      if (!match) return false;
    }
    if (makeFilter !== 'all' && v.make !== makeFilter) return false;
    if (conditionFilter !== 'all' && v.condition !== conditionFilter) return false;
    if (bodyTypeFilter !== 'all' && v.bodyType !== bodyTypeFilter) return false;
    if (fuelFilter !== 'all' && v.fuelType !== fuelFilter) return false;
    return true;
  });

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-blue-950 via-slate-900 to-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-blue-900/30">
        <div className="max-w-7xl mx-auto">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase mb-2">
            <Car className="w-4 h-4" />
            <span>Showroom Inspected & Duty-Paid Luxury Imports</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            Executive SUVs, 4x4 Cruisers & Luxury Fleet
          </h1>
          <p className="text-slate-300 text-sm mt-1 max-w-2xl">
            Certified Toyota Land Cruisers, Lexus LX600s, Range Rovers, and Mercedes-Benz G-Wagons with verifiable mileage and custom duty clearance.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Filters */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder="Search make or model (e.g. Land Cruiser, Prado)..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <select 
                value={makeFilter}
                onChange={e => setMakeFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="all">Make: All Brands</option>
                <option value="Toyota">Toyota</option>
                <option value="Land Rover">Land Rover</option>
                <option value="Lexus">Lexus</option>
                <option value="Mercedes-Benz">Mercedes-Benz</option>
                <option value="Porsche">Porsche</option>
              </select>
            </div>

            <div>
              <select 
                value={conditionFilter}
                onChange={e => setConditionFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="all">Condition: All</option>
                <option value="brand_new">Brand New (0 km)</option>
                <option value="foreign_used">Foreign Used (Japan / UK Direct)</option>
                <option value="local_used">Locally Maintained</option>
              </select>
            </div>

            <div>
              <select 
                value={bodyTypeFilter}
                onChange={e => setBodyTypeFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="all">Body: All Types</option>
                <option value="SUV">Heavy-Duty SUV / 4x4</option>
                <option value="Sedan">Executive Sedan</option>
                <option value="Coupe">Sports Coupe</option>
              </select>
            </div>

            <div>
              <select 
                value={fuelFilter}
                onChange={e => setFuelFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="all">Fuel: All (Diesel, Petrol, Hybrid)</option>
                <option value="diesel">Diesel Turbo</option>
                <option value="petrol">Petrol</option>
                <option value="hybrid">Hybrid</option>
              </select>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filtered.map(veh => (
            <VehicleCard key={veh.id} vehicle={veh} />
          ))}
        </div>

      </div>
    </div>
  );
};
