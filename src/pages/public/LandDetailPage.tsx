import React, { useState } from 'react';
import { 
  TreePine, 
  MapPin, 
  ShieldCheck, 
  FileText, 
  Droplets, 
  Zap, 
  Route, 
  Heart, 
  Share2, 
  Phone, 
  Mail, 
  Calendar,
  Layers,
  Sparkles,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const LandDetailPage: React.FC = () => {
  const { selectedItemId, landListings, agents, navigateTo, formatPrice, isFavorite, toggleFavorite, openModal, showToast } = useApp();
  const land = landListings.find(l => l.id === selectedItemId) || landListings[0];
  const agent = agents.find(a => a.id === land.agentId);
  const isFav = isFavorite(land.id);
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  const images = land.images && land.images.length > 0 ? land.images : [land.featuredImage];

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Land parcel link copied to clipboard!');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello, I am inquiring about the land listing: ${land.title} (${land.totalAcreage} acres at ${formatPrice(land.price)}) on SafariNest.`);
    const phone = agent?.whatsapp ? agent.whatsapp.replace(/[^0-9]/g, '') : '254700889900';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigateTo('home')} className="hover:text-amber-600">Home</button>
            <span>/</span>
            <button onClick={() => navigateTo('land')} className="hover:text-amber-600">Land & Plots</button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">{land.title}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button onClick={handleShare} className="flex items-center space-x-1 hover:text-amber-600">
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button onClick={() => toggleFavorite(land.id)} className={`flex items-center space-x-1 ${isFav ? 'text-rose-500' : ''}`}>
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
              <span className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-amber-600 text-white">
                {land.landType} Land
              </span>
              <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>{land.titleDeedStatus}</span>
              </span>
              <span className="text-xs text-slate-500">Parcel ID: {land.id}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
              {land.title}
            </h1>
            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 mt-2">
              <MapPin className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{land.location}, {land.area}, {land.city}</span>
            </div>
          </div>

          <div className="lg:text-right bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-slate-200">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Total Asking Price</span>
            <span className="text-3xl sm:text-4xl font-black text-slate-900">
              {formatPrice(land.price, land.currency)}
            </span>
            <p className="text-xs text-amber-700 font-semibold mt-1">
              ~ {formatPrice(land.pricePerAcre, land.currency)} per Acre
            </p>
          </div>
        </div>

        {/* Gallery */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-200 mb-8">
          <div className="relative h-[360px] sm:h-[480px] w-full rounded-2xl overflow-hidden bg-slate-900">
            <img src={images[activeImgIndex]} alt={land.title} className="w-full h-full object-cover" />
            <div className="absolute bottom-4 left-4 bg-slate-950/80 backdrop-blur-md px-3.5 py-1.5 rounded-full text-white text-xs font-bold flex items-center space-x-2 border border-white/10">
              <TreePine className="w-4 h-4 text-emerald-400" />
              <span>Total Parcel Size: {land.totalAcreage} Acres</span>
            </div>
          </div>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          <div className="lg:col-span-8 space-y-6">
            
            {/* Quick Specs */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <FileText className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="text-sm font-extrabold text-slate-900 block truncate">{land.titleDeedStatus}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Deed Tenure</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Route className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="text-sm font-extrabold text-slate-900 block truncate">{land.roadAccess}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Road Access</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Droplets className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                <span className="text-sm font-extrabold text-slate-900 block">{land.waterAccess ? 'Connected' : 'Borehole Req'}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Water Supply</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Zap className="w-5 h-5 text-amber-600 mx-auto mb-1" />
                <span className="text-sm font-extrabold text-slate-900 block">{land.electricityAccess ? 'Connected' : 'Solar / Nearby'}</span>
                <span className="text-[10px] text-slate-500 font-semibold uppercase">Electricity Grid</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">Parcel Overview & Zoning</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {land.description}
              </p>
            </div>

            {/* Features */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">Topography & Infrastructure Highlights</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {land.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-2.5 p-3 rounded-xl bg-amber-50/60 text-xs font-bold text-slate-800">
                    <TreePine className="w-4 h-4 text-amber-600 shrink-0" />
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
                onClick={() => openModal('schedule_viewing', land)}
                className="w-full py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-amber-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Book Land Inspection & Site Visit</span>
              </button>

              <button 
                onClick={handleWhatsApp}
                className="w-full py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-sm rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Chat via WhatsApp</span>
              </button>

              {agent && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-3 mb-2">
                    <img src={agent.avatar} alt={agent.name} className="w-10 h-10 rounded-full object-cover border border-amber-500" />
                    <div>
                      <p className="font-bold text-slate-900 text-xs">{agent.name}</p>
                      <p className="text-[10px] text-amber-700 font-semibold">Senior Land & Ranch Consultant</p>
                    </div>
                  </div>
                  <p className="text-[11px] text-slate-500">Direct: {agent.phone}</p>
                </div>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
