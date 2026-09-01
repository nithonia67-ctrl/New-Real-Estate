import React from 'react';
import { Heart, Building2, Trash2 } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../../components/cards/PropertyCard';
import { LandCard } from '../../components/cards/LandCard';
import { VehicleCard } from '../../components/cards/VehicleCard';

export const FavoritesPage: React.FC = () => {
  const { favorites, properties, landListings, vehicles, navigateTo } = useApp();

  const favProperties = properties.filter(p => favorites.includes(p.id));
  const favLand = landListings.filter(l => favorites.includes(l.id));
  const favVehicles = vehicles.filter(v => favorites.includes(v.id));

  const totalFavs = favProperties.length + favLand.length + favVehicles.length;

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      <div className="bg-slate-900 text-white py-12 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center space-x-2 text-rose-400 text-xs font-extrabold uppercase tracking-wider mb-1">
            <Heart className="w-4 h-4 fill-rose-400" />
            <span>Personal Watchlist</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black">
            Saved Properties & Watchlist
          </h1>
          <p className="text-slate-400 text-sm mt-1">
            {totalFavs} saved items available across your sessions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {totalFavs === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-200 max-w-lg mx-auto">
            <Heart className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-slate-900">Your watchlist is empty</h3>
            <p className="text-xs text-slate-500 mt-1 mb-6">
              Click the heart icon on any property, land parcel, or executive vehicle to save it here.
            </p>
            <button 
              onClick={() => navigateTo('properties')}
              className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow"
            >
              Explore Prime Listings
            </button>
          </div>
        ) : (
          <div className="space-y-12">
            {favProperties.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-4">Properties ({favProperties.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favProperties.map(p => (
                    <PropertyCard key={p.id} property={p} />
                  ))}
                </div>
              </div>
            )}

            {favLand.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-4">Land & Plots ({favLand.length})</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {favLand.map(l => (
                    <LandCard key={l.id} land={l} />
                  ))}
                </div>
              </div>
            )}

            {favVehicles.length > 0 && (
              <div>
                <h3 className="text-xl font-black text-slate-900 mb-4">Vehicles ({favVehicles.length})</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {favVehicles.map(v => (
                    <VehicleCard key={v.id} vehicle={v} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
