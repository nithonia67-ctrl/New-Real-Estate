import React, { useState } from 'react';
import { 
  Building2, 
  MapPin, 
  BedDouble, 
  Bath, 
  Maximize, 
  ShieldCheck, 
  Heart, 
  Share2, 
  Calendar, 
  Phone, 
  Mail, 
  Compass, 
  Video, 
  Calculator, 
  Check, 
  FileText, 
  Sparkles, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Layers,
  Award,
  Clock,
  Printer
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { PropertyCard } from '../../components/cards/PropertyCard';

export const PropertyDetailPage: React.FC = () => {
  const { 
    selectedItemId, 
    properties, 
    agents, 
    agencies, 
    navigateTo, 
    formatPrice, 
    isFavorite, 
    toggleFavorite, 
    openModal,
    showToast 
  } = useApp();

  const property = properties.find(p => p.id === selectedItemId) || properties[0];
  const agent = agents.find(a => a.id === property.agentId);
  const agency = agencies.find(a => a.id === property.agencyId);

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<number>(0);
  const isFav = isFavorite(property.id);

  const images = property.images && property.images.length > 0 ? property.images : [property.featuredImage];
  const similarProperties = properties.filter(p => p.id !== property.id && (p.purpose === property.purpose || p.city === property.city)).slice(0, 3);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    showToast('Listing link copied to clipboard!');
  };

  const handleWhatsApp = () => {
    const text = encodeURIComponent(`Hello ${agent?.name || 'Agent'}, I am interested in ${property.title} (${formatPrice(property.price)}) on SafariNest.`);
    const phone = agent?.whatsapp ? agent.whatsapp.replace(/[^0-9]/g, '') : '254700889900';
    window.open(`https://wa.me/${phone}?text=${text}`, '_blank');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      
      {/* Top Breadcrumb Bar */}
      <div className="bg-white border-b border-slate-200 px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center space-x-2">
            <button onClick={() => navigateTo('home')} className="hover:text-emerald-600">Home</button>
            <span>/</span>
            <button onClick={() => navigateTo('properties')} className="hover:text-emerald-600">Properties</button>
            <span>/</span>
            <span className="text-slate-900 font-semibold truncate max-w-xs">{property.title}</span>
          </div>
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleShare}
              className="flex items-center space-x-1 hover:text-emerald-600 font-medium"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span>Share</span>
            </button>
            <button 
              onClick={() => toggleFavorite(property.id)}
              className={`flex items-center space-x-1 font-medium ${isFav ? 'text-rose-500' : 'hover:text-rose-500'}`}
            >
              <Heart className={`w-3.5 h-3.5 ${isFav ? 'fill-rose-500' : ''}`} />
              <span>{isFav ? 'Saved' : 'Favorite'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        
        {/* Title & Price Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-2">
              <span className={`px-3 py-1 text-xs font-bold uppercase rounded-lg text-white ${property.purpose === 'buy' ? 'bg-emerald-600' : 'bg-blue-600'}`}>
                For {property.purpose === 'buy' ? 'Sale' : 'Rent'}
              </span>
              {property.isFeatured && (
                <span className="px-3 py-1 text-xs font-bold uppercase rounded-lg bg-amber-500 text-white flex items-center space-x-1">
                  <Sparkles className="w-3 h-3" />
                  <span>Featured</span>
                </span>
              )}
              {property.isVerified && (
                <span className="px-3 py-1 text-xs font-bold rounded-lg bg-emerald-100 text-emerald-800 flex items-center space-x-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Verified Title Deed</span>
                </span>
              )}
              <span className="text-xs text-slate-500 font-medium">
                ID: {property.id}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 leading-tight">
              {property.title}
            </h1>

            <div className="flex items-center space-x-2 text-xs sm:text-sm text-slate-600 mt-2">
              <MapPin className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>{property.address}, {property.area}, {property.city}, {property.country}</span>
            </div>
          </div>

          {/* Price Box */}
          <div className="lg:text-right bg-white lg:bg-transparent p-4 lg:p-0 rounded-2xl border lg:border-none border-slate-200">
            <span className="text-xs text-slate-400 uppercase font-bold tracking-wider block">Listing Price</span>
            <div className="flex items-baseline lg:justify-end space-x-1">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {formatPrice(property.price, property.currency)}
              </span>
              {property.pricePeriod && property.pricePeriod !== 'total' && (
                <span className="text-sm text-slate-500 font-semibold">/{property.pricePeriod}</span>
              )}
            </div>
            <p className="text-xs text-emerald-600 font-semibold mt-1">
              ~ {formatPrice(Math.round(property.price / (property.propertySizeSqft || 1)))} / sqft
            </p>
          </div>
        </div>

        {/* Media & Gallery Showcase */}
        <div className="bg-white rounded-3xl p-3 sm:p-4 shadow-sm border border-slate-200 mb-10">
          {/* Large Main Showcase Image */}
          <div className="relative h-[340px] sm:h-[480px] lg:h-[540px] w-full rounded-2xl overflow-hidden bg-slate-900">
            <img 
              src={images[activeImageIndex]} 
              alt={property.title} 
              className="w-full h-full object-cover transition-all duration-500"
            />

            {/* Slider Navigation Controls */}
            {images.length > 1 && (
              <>
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition shadow-lg"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button 
                  onClick={() => setActiveImageIndex((prev) => (prev + 1) % images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/90 transition shadow-lg"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}

            {/* Floating Action Triggers (360 Tour, Video Walkthrough) */}
            <div className="absolute bottom-4 right-4 flex items-center space-x-2">
              {property.virtualTourUrl && (
                <button 
                  onClick={() => openModal('360_tour', property)}
                  className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-bold rounded-xl shadow-lg flex items-center space-x-2 transition cursor-pointer"
                >
                  <Compass className="w-4 h-4" />
                  <span>360° Virtual Tour</span>
                </button>
              )}
              {property.videoUrl && (
                <button 
                  onClick={() => openModal('360_tour', property)}
                  className="px-4 py-2.5 bg-slate-900/90 hover:bg-black text-white text-xs font-bold rounded-xl shadow-lg flex items-center space-x-2 transition cursor-pointer"
                >
                  <Video className="w-4 h-4 text-emerald-400" />
                  <span>Video Tour</span>
                </button>
              )}
            </div>
          </div>

          {/* Thumbnail Gallery Strip */}
          {images.length > 1 && (
            <div className="flex items-center gap-3 overflow-x-auto pt-3 pb-1 no-scrollbar">
              {images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`relative w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition cursor-pointer ${idx === activeImageIndex ? 'border-emerald-600 ring-2 ring-emerald-500/30' : 'border-transparent opacity-70 hover:opacity-100'}`}
                >
                  <img src={img} alt="thumb" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 2-Column Main Content & Sticky Inquiry Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Details & Tabs */}
          <div className="lg:col-span-8 space-y-8">
            
            {/* Quick KPI Spec Badges */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
              <div className="p-3 bg-slate-50 rounded-xl">
                <BedDouble className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-lg font-extrabold text-slate-900 block">{property.bedrooms}</span>
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Bedrooms</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Bath className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-lg font-extrabold text-slate-900 block">{property.bathrooms}</span>
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Bathrooms</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Maximize className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-lg font-extrabold text-slate-900 block">{property.propertySizeSqft.toLocaleString()}</span>
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Living Sqft</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl">
                <Building2 className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
                <span className="text-lg font-extrabold text-slate-900 block">{property.yearBuilt || 2024}</span>
                <span className="text-[11px] text-slate-500 font-semibold uppercase">Year Built</span>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-4">About This Residence</h2>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                {property.description}
              </p>
            </div>

            {/* Features & Amenities Checklist */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-6">Features & Infrastructure</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {property.features.map((feat, i) => (
                  <div key={i} className="flex items-center space-x-2.5 p-3 rounded-xl bg-slate-50 text-xs font-bold text-slate-800">
                    <div className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {property.amenities && (
                <div className="mt-6 pt-6 border-t border-slate-100">
                  <h3 className="text-sm font-bold text-slate-700 mb-3">Community & Comfort Amenities</h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((am, idx) => (
                      <span key={idx} className="px-3 py-1.5 bg-emerald-50 text-emerald-800 text-xs font-semibold rounded-lg">
                        {am}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Floor Plans Accordion */}
            {property.floorPlans && property.floorPlans.length > 0 && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
                <h2 className="text-xl font-extrabold text-slate-900 mb-4">Architectural Floor Plans</h2>
                <div className="space-y-4">
                  {property.floorPlans.map((fp, i) => (
                    <div key={fp.id} className="border border-slate-200 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-extrabold text-slate-900 text-sm">{fp.title}</h4>
                        <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md">
                          {fp.sizeSqft} sqft • {fp.bedrooms} Bed / {fp.bathrooms} Bath
                        </span>
                      </div>
                      <img src={fp.imageUrl} alt={fp.title} className="w-full h-64 object-cover rounded-lg bg-slate-100" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* GPS Location & Surrounding Neighborhood */}
            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-slate-200">
              <h2 className="text-xl font-extrabold text-slate-900 mb-2">Location & Neighborhood</h2>
              <p className="text-xs text-slate-500 mb-4">
                Coordinates: {property.coordinates?.lat.toFixed(4) || '-1.3210'}, {property.coordinates?.lng.toFixed(4) || '36.7110'}
              </p>

              {/* Map Placeholder Graphic */}
              <div className="relative h-64 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 flex items-center justify-center">
                <img 
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=1000&auto=format&fit=crop&q=80" 
                  alt="map preview" 
                  className="w-full h-full object-cover opacity-60" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col items-center justify-end p-6 text-center text-white">
                  <div className="w-12 h-12 rounded-full bg-emerald-600 text-white flex items-center justify-center shadow-2xl mb-2 animate-bounce">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <p className="font-extrabold text-sm">{property.address}</p>
                  <p className="text-xs text-slate-300">{property.area}, {property.city}</p>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Sticky Action & Agent Card */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Primary Action Card */}
            <div className="sticky top-24 bg-white rounded-3xl p-6 shadow-xl border border-slate-200 space-y-4">
              
              <button 
                onClick={() => openModal('schedule_viewing', property)}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-sm rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Calendar className="w-4 h-4" />
                <span>Schedule VIP Viewing</span>
              </button>

              <button 
                onClick={handleWhatsApp}
                className="w-full py-3.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-300 font-extrabold text-sm rounded-xl transition flex items-center justify-center space-x-2 cursor-pointer"
              >
                <Phone className="w-4 h-4 text-emerald-600" />
                <span>Direct WhatsApp Inquiry</span>
              </button>

              <button 
                onClick={() => openModal('mortgage_calc', property)}
                className="w-full py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-xs rounded-xl transition flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                <Calculator className="w-3.5 h-3.5 text-slate-600" />
                <span>Calculate Mortgage & Finance</span>
              </button>

              {/* Agent Profile Box */}
              {agent && (
                <div className="pt-4 border-t border-slate-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <img src={agent.avatar} alt={agent.name} className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500" />
                    <div>
                      <div className="flex items-center space-x-1">
                        <h4 className="font-extrabold text-slate-900 text-sm">{agent.name}</h4>
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      </div>
                      <p className="text-xs text-emerald-700 font-semibold">{agent.title}</p>
                      <p className="text-[11px] text-slate-500">{agent.licenseNumber}</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed mb-3">
                    {agent.bio}
                  </p>

                  <div className="space-y-1.5 text-xs text-slate-700 font-medium">
                    <div className="flex items-center space-x-2">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{agent.phone}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <span>{agent.email}</span>
                    </div>
                  </div>

                  <button 
                    onClick={() => navigateTo('agents')}
                    className="mt-3 text-xs font-bold text-emerald-600 hover:underline block"
                  >
                    View agent profile & all 14 active listings →
                  </button>
                </div>
              )}

              {/* Agency Logo */}
              {agency && (
                <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between text-xs">
                  <div>
                    <p className="font-bold text-slate-900">{agency.name}</p>
                    <p className="text-[10px] text-slate-500">Chartered Real Estate Firm</p>
                  </div>
                  <ShieldCheck className="w-5 h-5 text-emerald-600" />
                </div>
              )}

            </div>

          </div>

        </div>

        {/* Similar Properties Showcase */}
        {similarProperties.length > 0 && (
          <div className="mt-20 pt-10 border-t border-slate-200">
            <h3 className="text-2xl font-black text-slate-900 mb-6">
              Similar Properties You May Like
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map(p => (
                <PropertyCard key={p.id} property={p} />
              ))}
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
