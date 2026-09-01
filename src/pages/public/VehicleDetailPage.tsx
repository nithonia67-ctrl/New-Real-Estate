import React, { useState } from 'react';
import { 
  Car, 
  MapPin, 
  ShieldCheck, 
  Gauge, 
  Fuel, 
  Settings, 
  Calendar, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Building, 
  Calculator, 
  CheckCircle2, 
  FileCheck2,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const VehicleDetailPage: React.FC = () => {
  const { selectedItemId, vehicles, dealerships, navigateTo, formatPrice, isFavorite, toggleFavorite, openModal, showToast } = useApp();
  const vehicle = vehicles.find(v => v.id === selectedItemId) || vehicles[0];
  const dealer = dealerships.find(d => d.id === vehicle.dealershipId);
  const isFav = isFavorite(vehicle.id);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = vehicle.images && vehicle.images.length > 0 ? vehicle.images : [vehicle.featuredImage];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Vehicle link copied to clipboard!');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello, I am inquiring about the vehicle: ${vehicle.title} (${vehicle.year} for ${formatPrice(vehicle.price)}) on SafariNest.`);
    const phone = dealer?.phone ? dealer.phone.replace(/[^0-9]/g, '') : '254711223344';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      {/* Breadcrumbs */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigateTo('home')} className="hover:text-blue-600">Home</button>
            <span>/</span>
            <button onClick={() => navigateTo('vehicles')} className="hover:text-blue-600">Vehicles</button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">{vehicle.title}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={handleShare} className="flex items-center space-x-1 hover:text-blue-600">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button onClick={() => toggleFavorite(vehicle.id)} className={`flex items-center space-x-1 ${isFav ? 'text-rose-500' : ''}`}>
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
              <span>{isFav ? 'Saved' : 'Favorite'}</span>
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Title Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-blue-600 text-white">
                {vehicle.year} • {vehicle.condition.replace('_', ' ')}
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{vehicle.importStatus}</span>
              </span>
              <span className="text-xs text-slate-500">VIN Stock ID: {vehicle.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {vehicle.title}
            </h1>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 mt-2">
              <MapPin className="w-4 h-4 text-blue-600 shrink-0" />
              <span>{vehicle.location} (Showroom Ready)</span>
            </div>
          </div>

          <div className="lg:text-right bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-slate-200">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Price (Duty Paid & Registered)</span>
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              {formatPrice(vehicle.price, vehicle.currency)}
            </span>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              Asset financing available from {formatPrice(Math.round(vehicle.price * 0.024))} / mo
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-200 mb-8">
          <div className="relative h-[360px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-900">
            <img src={images[activeImgIndex]} alt={vehicle.title} className="w-full h-full object-cover" />
          </div>
        </div>

        {/* Details */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Tech Specs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <Gauge className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-sm font-extrabold text-slate-900 block">{vehicle.mileageKm.toLocaleString()} km</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Odometer</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Fuel className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-sm font-extrabold text-slate-900 block capitalize">{vehicle.fuelType}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Engine Fuel</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Settings className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-sm font-extrabold text-slate-900 block capitalize">{vehicle.transmission}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Gearbox</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Car className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-sm font-extrabold text-slate-900 block">{vehicle.engineSizeCc} cc</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Displacement</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">Vehicle Specification & Pedigree</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {vehicle.description}
              </p>
            </div>

            {/* Equipment Features */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">Installed Luxury & Off-Road Options</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {vehicle.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-2.5 p-3 rounded-xl bg-blue-50/60 text-xs font-bold text-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-6">
            <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
              <button 
                onClick={() => openModal('test_drive', vehicle)}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-blue-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Showroom Test Drive</span>
              </button>

              <button 
                onClick={handleWhatsApp}
                className="w-full py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-sm rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>WhatsApp Dealership Desk</span>
              </button>

              <button 
                onClick={() => openModal('trade_in_calc', vehicle)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-slate-600" />
                <span>Estimate Trade-in Allowance</span>
              </button>

              {dealer && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-700 flex items-center justify-center font-bold">
                      <Building className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{dealer.name}</p>
                      <p className="text-[10px] text-blue-600 font-semibold">{dealer.showroomLocation}</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">Contact: {dealer.phone}</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
