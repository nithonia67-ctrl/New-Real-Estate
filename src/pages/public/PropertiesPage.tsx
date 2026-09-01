import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  Search, 
  SlidersHorizontal, 
  Grid, 
  List, 
  ChevronDown, 
  X,
  BedDouble,
  Bath,
  ShieldCheck,
  RotateCcw
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../../components/cards/PropertyCard';
import { PropertyType } from '../../types';

export const PropertiesPage: React.FC = () => {
  const { properties, customFields } = useApp();

  const [layout, setLayout] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [purposeFilter, setPurposeFilter] = useState<'all' | 'buy' | 'rent'>('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>('all');
  const [countryFilter, setCountryFilter] = useState<string>('all');
  const [bedroomsFilter, setBedroomsFilter] = useState<number | 'all'>('all');
  const [priceSort, setPriceSort] = useState<'default' | 'price_low' | 'price_high'>('default');
  const [onlyVerified, setOnlyVerified] = useState(false);
  const [hasVirtualTour, setHasVirtualTour] = useState(false);

  // Filter properties
  const filtered = properties.filter(prop => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = prop.title.toLowerCase().includes(q);
      const matchCity = prop.city.toLowerCase().includes(q);
      const matchArea = prop.area.toLowerCase().includes(q);
      const matchCountry = prop.country.toLowerCase().includes(q);
      if (!matchTitle && !matchCity && !matchArea && !matchCountry) return false;
    }

    if (purposeFilter !== 'all' && prop.purpose !== purposeFilter) return false;
    if (propertyTypeFilter !== 'all' && prop.propertyType !== propertyTypeFilter) return false;
    if (countryFilter !== 'all' && prop.country !== countryFilter) return false;
    if (bedroomsFilter !== 'all' && prop.bedrooms < Number(bedroomsFilter)) return false;
    if (onlyVerified && !prop.isVerified) return false;
    if (hasVirtualTour && !prop.virtualTourUrl) return false;

    return true;
  });

  // Sort properties
  const sorted = [...filtered].sort((a, b) => {
    if (priceSort === 'price_low') return a.price - b.price;
    if (priceSort === 'price_high') return b.price - a.price;
    return 0;
  });

  const resetFilters = () => {
    setSearchQuery('');
    setPurposeFilter('all');
    setPropertyTypeFilter('all');
    setCountryFilter('all');
    setBedroomsFilter('all');
    setPriceSort('default');
    setOnlyVerified(false);
    setHasVirtualTour(false);
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-20">
      
      {/* Header Banner */}
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-wider">
            East Africa Residential & Commercial Real Estate
          </span>
          <h1 className="text-3xl sm:text-4xl font-black mt-2">
            Properties & Luxury Residences
          </h1>
          <p className="text-slate-400 text-sm mt-1 max-w-2xl">
            Explore verified villas, apartments, townhomes, and penthouses across Kenya, Tanzania, Zanzibar, Uganda and Rwanda.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        
        {/* Filter Controls Bar */}
        <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-200 mb-8 space-y-4">
          
          {/* Top Row: Search & Main Filters */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            
            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input 
                type="text"
                placeholder="Search area, city or title..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none focus:border-emerald-500"
              />
            </div>

            {/* Purpose */}
            <div>
              <select 
                value={purposeFilter}
                onChange={e => setPurposeFilter(e.target.value as any)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="all">Purpose: All (Buy & Rent)</option>
                <option value="buy">For Sale</option>
                <option value="rent">For Rent</option>
              </select>
            </div>

            {/* Property Type */}
            <div>
              <select 
                value={propertyTypeFilter}
                onChange={e => setPropertyTypeFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="all">Type: All Properties</option>
                <option value="villa">Luxury Villa</option>
                <option value="house">Detached House</option>
                <option value="apartment">Modern Apartment</option>
                <option value="penthouse">Skyline Penthouse</option>
                <option value="commercial">Commercial Space</option>
              </select>
            </div>

            {/* Country */}
            <div>
              <select 
                value={countryFilter}
                onChange={e => setCountryFilter(e.target.value)}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="all">Country: All East Africa</option>
                <option value="Kenya">Kenya</option>
                <option value="Tanzania">Tanzania & Zanzibar</option>
                <option value="Rwanda">Rwanda</option>
                <option value="Uganda">Uganda</option>
              </select>
            </div>

            {/* Bedrooms */}
            <div>
              <select 
                value={bedroomsFilter}
                onChange={e => setBedroomsFilter(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-semibold text-slate-800 focus:outline-none"
              >
                <option value="all">Bedrooms: Any</option>
                <option value={2}>2+ Bedrooms</option>
                <option value={3}>3+ Bedrooms</option>
                <option value={4}>4+ Bedrooms</option>
                <option value={5}>5+ Bedrooms</option>
              </select>
            </div>

          </div>

          {/* Bottom Row: Checkbox switches, sorting, and view switcher */}
          <div className="pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-600">
            
            <div className="flex flex-wrap items-center gap-4">
              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={onlyVerified} 
                  onChange={e => setOnlyVerified(e.target.checked)}
                  className="rounded text-emerald-600 focus:ring-emerald-500"
                />
                <span>Verified Titles Only</span>
              </label>

              <label className="flex items-center space-x-1.5 cursor-pointer">
                <input 
                  type="checkbox" 
                  checked={hasVirtualTour} 
                  onChange={e => setHasVirtualTour(e.target.checked)}
                  className="rounded text-indigo-600 focus:ring-indigo-500"
                />
                <span>With 360° Virtual Tour</span>
              </label>

              <button 
                onClick={resetFilters}
                className="text-slate-400 hover:text-slate-700 flex items-center space-x-1 ml-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Filters</span>
              </button>
            </div>

            <div className="flex items-center space-x-3">
              {/* Sort selector */}
              <div className="flex items-center space-x-1">
                <span className="text-slate-400">Sort by:</span>
                <select 
                  value={priceSort}
                  onChange={e => setPriceSort(e.target.value as any)}
                  className="bg-transparent font-bold text-slate-800 focus:outline-none"
                >
                  <option value="default">Featured First</option>
                  <option value="price_low">Price: Low to High</option>
                  <option value="price_high">Price: High to Low</option>
                </select>
              </div>

              {/* Grid / List View Toggle */}
              <div className="flex items-center bg-slate-100 p-1 rounded-xl border border-slate-200">
                <button 
                  onClick={() => setLayout('grid')}
                  className={`p-1.5 rounded-lg transition ${layout === 'grid' ? 'bg-white shadow text-emerald-600 font-bold' : 'text-slate-500'}`}
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => setLayout('list')}
                  className={`p-1.5 rounded-lg transition ${layout === 'list' ? 'bg-white shadow text-emerald-600 font-bold' : 'text-slate-500'}`}
                >
                  <List className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Results Header Count */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs font-bold text-slate-500">
            Showing <span className="text-slate-900">{sorted.length}</span> properties matching your criteria
          </p>
        </div>

        {/* Property Grid or List */}
        {sorted.length > 0 ? (
          <div className={layout === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6' : 'space-y-6'}>
            {sorted.map(prop => (
              <PropertyCard key={prop.id} property={prop} layout={layout} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200 p-8">
            <Building2 className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">No properties match your current filters</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto mt-1">
              Try adjusting your price range, removing the bedroom filter, or clearing location parameters.
            </p>
            <button 
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-emerald-600 text-white text-xs font-bold rounded-xl shadow"
            >
              Clear All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
