import React, { useState, useRef } from 'react';
import { 
  Search, 
  ChevronLeft, 
  ChevronRight, 
  Building2, 
  TreePine, 
  Car, 
  Palmtree, 
  Compass, 
  ShieldCheck, 
  Star,
  MapPin,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Lock,
  Layers,
  Heart,
  Quote,
  Eye,
  SlidersHorizontal,
  Home,
  Check
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppStore } from '../../services/store';
import { PropertyCard } from '../../components/cards/PropertyCard';
import { LandCard } from '../../components/cards/LandCard';
import { VehicleCard } from '../../components/cards/VehicleCard';
import { ExperienceCard } from '../../components/cards/ExperienceCard';
import { StayCard } from '../../components/cards/StayCard';
import { SponsoredAdCard } from '../../components/cards/SponsoredAdCard';

export const HomePage: React.FC = () => {
  const { 
    properties, 
    landListings, 
    vehicles, 
    experiences, 
    stays, 
    areas, 
    agents, 
    blogPosts, 
    adCampaigns, 
    navigateTo,
    openModal,
    currentUser
  } = useApp();

  const [searchLocation, setSearchLocation] = useState('');
  const [searchCategory, setSearchCategory] = useState('All');
  const [searchBudget, setSearchBudget] = useState('Any');
  const [featuredFilter, setFeaturedFilter] = useState<'all' | 'villa' | 'apartment' | 'stay'>('all');

  // Horizontal Scroll Row Refs
  const nairobiRowRef = useRef<HTMLDivElement>(null);
  const landRowRef = useRef<HTMLDivElement>(null);
  const vehicleRowRef = useRef<HTMLDivElement>(null);
  const zanzibarRowRef = useRef<HTMLDivElement>(null);

  const scrollRow = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      ref.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchCategory === 'Land') navigateTo('land');
    else if (searchCategory === 'Vehicles') navigateTo('vehicles');
    else if (searchCategory === 'Stays') navigateTo('stays');
    else if (searchCategory === 'Experiences') navigateTo('experiences');
    else navigateTo('properties');
  };

  // Filtered Featured Properties
  const filteredFeatured = properties.filter(p => {
    if (featuredFilter === 'all') return true;
    if (featuredFilter === 'villa') return p.propertyType === 'villa';
    if (featuredFilter === 'apartment') return p.propertyType === 'apartment' || p.propertyType === 'penthouse';
    if (featuredFilter === 'stay') return p.purpose === 'stay';
    return true;
  }).slice(0, 8);

  const nairobiHomes = properties.filter(p => p.city === 'Nairobi' || p.city === 'Nanyuki').concat(properties).slice(0, 8);
  const zanzibarStays = stays.concat(stays).slice(0, 8);
  const primeLand = landListings.concat(landListings).slice(0, 8);
  const verifiedVehicles = vehicles.concat(vehicles).slice(0, 8);
  const activeAdCampaign = adCampaigns.find(a => a.status === 'active');
  const reviews = AppStore.getReviews().slice(0, 3);

  const propertyTypesList = [
    { type: 'Villas & Mansions', count: properties.filter(p => p.propertyType === 'villa').length || 14, icon: Building2, img: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=600&auto=format&fit=crop&q=80', view: 'properties' },
    { type: 'Executive Apartments', count: properties.filter(p => p.propertyType === 'apartment').length || 28, icon: Home, img: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&auto=format&fit=crop&q=80', view: 'properties' },
    { type: 'Coastal & Island Stays', count: stays.length || 18, icon: Palmtree, img: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&auto=format&fit=crop&q=80', view: 'stays' },
    { type: 'Titled Land & Plots', count: landListings.length || 12, icon: TreePine, img: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=600&auto=format&fit=crop&q=80', view: 'land' },
    { type: 'Safari Lodges & Camps', count: 9, icon: Compass, img: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600&auto=format&fit=crop&q=80', view: 'stays' },
    { type: 'Executive 4x4 Fleet', count: vehicles.length || 16, icon: Car, img: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=600&auto=format&fit=crop&q=80', view: 'vehicles' }
  ];

  return (
    <div className="bg-white min-h-screen text-neutral-900 pb-24">
      
      {/* 1. HERO SECTION WITH BACKGROUND & UNIFIED SEARCH CAPSULE */}
      <section className="relative bg-neutral-950 text-white overflow-hidden py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
        {/* Background Image with Dark Vignette */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&auto=format&fit=crop&q=85" 
            alt="East Africa Luxury Villa" 
            className="w-full h-full object-cover opacity-35 scale-105 transform motion-safe:animate-pulse duration-1000"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/70 to-neutral-950/50" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-semibold tracking-wide text-neutral-200 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span className="uppercase tracking-wider text-[10px]">Premier East Africa Luxury Living & Stays</span>
          </div>

          {/* Large Clean Headline */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight max-w-4xl mx-auto mb-4">
            Find Your Perfect Stay & Property
          </h1>

          {/* Subtitle */}
          <p className="text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto mb-10 font-normal leading-relaxed">
            Discover verified villas, scenic safari lodges, prime titled land, and executive residences across Nairobi, Zanzibar, and East Africa.
          </p>

          {/* Floating Search Capsule */}
          <form 
            onSubmit={handleSearch}
            className="max-w-4xl mx-auto bg-white rounded-2xl sm:rounded-full border border-white/20 shadow-2xl p-2 sm:p-2.5 flex flex-col sm:flex-row items-center sm:divide-x divide-neutral-200 text-neutral-900 transition-all duration-200 hover:shadow-neutral-900/30"
          >
            {/* Where Field */}
            <div className="w-full sm:flex-1 px-4 py-2 sm:py-1.5 text-left cursor-pointer">
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Where
              </label>
              <div className="flex items-center space-x-1.5">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <input 
                  type="text" 
                  placeholder="Search destinations (e.g. Karen, Zanzibar)" 
                  value={searchLocation}
                  onChange={e => setSearchLocation(e.target.value)}
                  className="w-full text-xs sm:text-sm font-semibold text-neutral-900 placeholder-neutral-400 bg-transparent focus:outline-none truncate"
                />
              </div>
            </div>

            {/* Category / Type Field */}
            <div className="w-full sm:flex-1 px-4 py-2 sm:py-1.5 text-left cursor-pointer border-t sm:border-t-0 border-neutral-100">
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Category
              </label>
              <select 
                value={searchCategory}
                onChange={e => setSearchCategory(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="All">All Categories</option>
                <option value="Homes">Luxury Homes & Villas</option>
                <option value="Land">Titled Land & Plots</option>
                <option value="Vehicles">Executive 4x4s</option>
                <option value="Stays">Safari Stays & Retreats</option>
                <option value="Experiences">Adventures & Tours</option>
              </select>
            </div>

            {/* Price Budget Field */}
            <div className="w-full sm:flex-1 px-4 py-2 sm:py-1.5 text-left cursor-pointer border-t sm:border-t-0 border-neutral-100">
              <label className="block text-[11px] font-bold text-neutral-500 uppercase tracking-wider">
                Budget
              </label>
              <select 
                value={searchBudget}
                onChange={e => setSearchBudget(e.target.value)}
                className="w-full text-xs sm:text-sm font-semibold text-neutral-800 bg-transparent focus:outline-none cursor-pointer"
              >
                <option value="Any">Any Price Range</option>
                <option value="Under $100k">Under $100,000</option>
                <option value="$100k - $500k">$100k - $500,000</option>
                <option value="$500k - $1.5M">$500k - $1.5M</option>
                <option value="$1.5M+">$1.5M+ (Ultra Prime)</option>
              </select>
            </div>

            {/* Search Action Button */}
            <div className="w-full sm:w-auto p-1">
              <button 
                type="submit"
                className="w-full sm:w-12 h-11 rounded-xl sm:rounded-full bg-neutral-900 hover:bg-neutral-800 text-white flex items-center justify-center space-x-2 sm:space-x-0 transition shadow-md cursor-pointer font-bold text-xs"
              >
                <Search className="w-4 h-4" />
                <span className="sm:hidden">Search Properties</span>
              </button>
            </div>
          </form>

          {/* Quick Category Chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2 text-xs">
            {['Luxury Villas', 'Oceanfront Stays', 'Safari Lodges', 'Karen Acreage', 'Penthouse Suites', 'Executive 4x4s'].map((chip, idx) => (
              <button
                key={idx}
                onClick={() => navigateTo('properties')}
                className="px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/90 text-xs font-medium transition cursor-pointer border border-white/10"
              >
                {chip}
              </button>
            ))}
          </div>

        </div>
      </section>

      {/* 2. MAIN CONTENT BODY */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16 sm:space-y-20 mt-12 sm:mt-16">

        {/* SECTION A: FEATURED PROPERTIES GRID WITH CATEGORY PILLS */}
        <section>
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-2 border-b border-neutral-100 gap-4">
            <div>
              <div className="inline-flex items-center space-x-1.5 text-xs font-bold uppercase tracking-wider text-neutral-500 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Handpicked Selection</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
                Featured Properties
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-1 no-scrollbar">
              {[
                { id: 'all', label: 'All Listings' },
                { id: 'villa', label: 'Luxury Villas' },
                { id: 'apartment', label: 'Apartments' },
                { id: 'stay', label: 'Short Stays' }
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setFeaturedFilter(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer shrink-0 ${
                    featuredFilter === tab.id
                      ? 'bg-neutral-900 text-white shadow-xs'
                      : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
              <button
                onClick={() => navigateTo('properties')}
                className="text-xs font-bold text-neutral-900 hover:underline px-3 py-2 shrink-0 cursor-pointer"
              >
                View all ({properties.length}) →
              </button>
            </div>
          </div>

          {/* 4-Column Responsive Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredFeatured.map((prop) => (
              <PropertyCard key={prop.id} property={prop} />
            ))}
          </div>
        </section>

        {/* SECTION B: EXPLORE PROPERTIES BY DESTINATION / REGION */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Explore by Destination
              </h2>
              <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                Discover diplomatic enclaves, coastal belts, and high-growth investment destinations
              </p>
            </div>
            <button
              onClick={() => navigateTo('properties')}
              className="text-xs font-bold text-neutral-900 hover:underline"
            >
              All locations →
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {areas.map(area => (
              <div 
                key={area.id}
                onClick={() => navigateTo('properties')}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-neutral-100 mb-2 border border-neutral-200/80 shadow-xs">
                  <img 
                    src={area.image} 
                    alt={area.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="text-xs font-bold leading-tight truncate">{area.name}</p>
                    <p className="text-[10px] text-neutral-300 font-medium mt-0.5">{area.propertiesCount} listings</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION C: "WHAT TYPE OF PROPERTY ARE YOU LOOKING FOR?" */}
        <section className="bg-neutral-50 border border-neutral-200/80 rounded-3xl p-6 sm:p-8">
          <div className="max-w-xl mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-neutral-900 tracking-tight">
              What type of property are you looking for?
            </h2>
            <p className="text-xs text-neutral-500 mt-1 font-normal">
              Explore specialized collections tailored for high-net-worth buyers, diaspora investors, and holiday seekers.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            {propertyTypesList.map((item, idx) => {
              const IconComp = item.icon;
              return (
                <div
                  key={idx}
                  onClick={() => navigateTo(item.view as any)}
                  className="group bg-white rounded-2xl border border-neutral-200/90 p-3 hover:border-neutral-400 hover:shadow-md transition cursor-pointer flex flex-col justify-between"
                >
                  <div className="aspect-video w-full rounded-xl overflow-hidden mb-3 bg-neutral-100">
                    <img 
                      src={item.img} 
                      alt={item.type}
                      className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                    />
                  </div>
                  <div>
                    <div className="flex items-center space-x-1.5 text-neutral-900 mb-0.5">
                      <IconComp className="w-3.5 h-3.5 text-neutral-700" />
                      <h4 className="text-xs font-bold truncate">{item.type}</h4>
                    </div>
                    <p className="text-[11px] text-neutral-500 font-medium">{item.count} properties</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* SECTION D: POPULAR HOMES IN NAIROBI & ENVIRONS */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <button 
                onClick={() => navigateTo('properties')}
                className="flex items-center space-x-1.5 text-xl font-bold text-neutral-900 hover:text-neutral-600 transition cursor-pointer"
              >
                <span>Popular homes in Nairobi & Environs</span>
                <span className="text-neutral-400 font-normal">→</span>
              </button>
              <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                Diplomatic residences in Karen, Runda, Muthaiga, and Westlands
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => scrollRow(nairobiRowRef, 'left')}
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-400 flex items-center justify-center text-neutral-600 transition cursor-pointer bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollRow(nairobiRowRef, 'right')}
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-400 flex items-center justify-center text-neutral-600 transition cursor-pointer bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={nairobiRowRef}
            className="flex items-start space-x-5 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x"
          >
            {nairobiHomes.map((prop, index) => (
              <div key={`${prop.id}-${index}`} className="w-64 sm:w-72 shrink-0 snap-start">
                <PropertyCard property={prop} />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION E: VERIFIED TITLE DEED LAND & PLOTS */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <button 
                onClick={() => navigateTo('land')}
                className="flex items-center space-x-1.5 text-xl font-bold text-neutral-900 hover:text-neutral-600 transition cursor-pointer"
              >
                <span>Verified title deed land in Karen & Tatu City</span>
                <span className="text-neutral-400 font-normal">→</span>
              </button>
              <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                Beaconed, surveyed, and legal due-diligence cleared plots with red soil
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => scrollRow(landRowRef, 'left')}
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-400 flex items-center justify-center text-neutral-600 transition cursor-pointer bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollRow(landRowRef, 'right')}
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-400 flex items-center justify-center text-neutral-600 transition cursor-pointer bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={landRowRef}
            className="flex items-start space-x-5 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x"
          >
            {primeLand.map((land, index) => (
              <div key={`${land.id}-${index}`} className="w-64 sm:w-72 shrink-0 snap-start">
                <LandCard land={land} />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION F: STAY IN ZANZIBAR & COASTAL RETREATS */}
        <section>
          <div className="flex items-center justify-between mb-5">
            <div>
              <button 
                onClick={() => navigateTo('stays')}
                className="flex items-center space-x-1.5 text-xl font-bold text-neutral-900 hover:text-neutral-600 transition cursor-pointer"
              >
                <span>Stay in Zanzibar & Indian Ocean Stays</span>
                <span className="text-neutral-400 font-normal">→</span>
              </button>
              <p className="text-xs text-neutral-500 mt-0.5 font-normal">
                Private infinity pool villas, boutique beachfront residences, and spice island retreats
              </p>
            </div>

            <div className="flex items-center space-x-2">
              <button 
                onClick={() => scrollRow(zanzibarRowRef, 'left')}
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-400 flex items-center justify-center text-neutral-600 transition cursor-pointer bg-white"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button 
                onClick={() => scrollRow(zanzibarRowRef, 'right')}
                className="w-8 h-8 rounded-full border border-neutral-200 hover:border-neutral-400 flex items-center justify-center text-neutral-600 transition cursor-pointer bg-white"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <div 
            ref={zanzibarRowRef}
            className="flex items-start space-x-5 overflow-x-auto pb-4 pt-1 no-scrollbar snap-x"
          >
            {zanzibarStays.map((stay, index) => (
              <div key={`${stay.id}-${index}`} className="w-64 sm:w-72 shrink-0 snap-start">
                <StayCard stay={stay} />
              </div>
            ))}
          </div>
        </section>

        {/* SECTION G: WHY SWAHIVO / CONCIERGE ADVANTAGE */}
        <section className="bg-neutral-900 text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden">
          <div className="relative z-10 max-w-4xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-4">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>The SWAHIVO Guarantee</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3">
              Why High-Net-Worth Buyers & Hosts Trust SWAHIVO
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 max-w-2xl font-normal leading-relaxed mb-8">
              We bridge the East African diaspora and international buyers with rigorous conveyance standards, verified titles, and seamless concierge stays.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                { title: 'Verified Title Deeds', desc: 'Every land parcel and residence is cross-checked against ministry registry records.' },
                { title: '360° Virtual Walkthroughs', desc: 'Inspect rooms and floor layouts remotely before flying in or booking.' },
                { title: 'Direct Host & Agent Chat', desc: 'Message verified hosts and EARB-licensed brokers directly with zero friction.' },
                { title: 'Multi-Currency Escrow', desc: 'Transact in USD, KES, TZS, UGX, or EUR with automated live exchange rates.' }
              ].map((pillar, idx) => (
                <div key={idx} className="p-4 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-4 h-4" />
                  </div>
                  <h4 className="text-sm font-bold mb-1">{pillar.title}</h4>
                  <p className="text-xs text-neutral-400 font-normal leading-relaxed">{pillar.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION H: REAL REVIEWS & TESTIMONIALS */}
        <section>
          <div className="text-center max-w-xl mx-auto mb-8">
            <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
              Trusted by Diaspora & International Guests
            </h2>
            <p className="text-xs text-neutral-500 mt-1 font-normal">
              Real reviews from buyers, hosts, and holiday travelers across Kenya, Tanzania, and Rwanda
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((rev) => (
              <div 
                key={rev.id}
                className="p-6 rounded-2xl bg-neutral-50 border border-neutral-200/80 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center space-x-1 mb-3">
                    {[...Array(rev.rating || 5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <p className="text-xs text-neutral-700 leading-relaxed italic mb-4">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="flex items-center space-x-3 pt-3 border-t border-neutral-200/60">
                  <img 
                    src={rev.authorAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'} 
                    alt={rev.authorName} 
                    className="w-9 h-9 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-xs font-bold text-neutral-900">{rev.authorName}</h4>
                    <p className="text-[10px] text-neutral-500 font-normal">{rev.date}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION I: HIGH IMPACT CTA BANNER */}
        <section className="relative rounded-3xl bg-gradient-to-r from-neutral-900 to-neutral-800 text-white p-8 sm:p-12 overflow-hidden shadow-xl">
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
              Find Your Next Property or Become a Host
            </h2>
            <p className="text-xs sm:text-sm text-neutral-300 font-normal leading-relaxed mb-6">
              Discover your dream retreat or list your luxury property to international buyers and diaspora guests with 0% upfront fees and verified concierge protection.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <button
                onClick={() => navigateTo('properties')}
                className="px-6 py-3 bg-white text-neutral-900 hover:bg-neutral-100 rounded-xl font-bold text-xs shadow-md transition cursor-pointer flex items-center space-x-2"
              >
                <span>Explore Properties</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => openModal('become_host')}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl font-bold text-xs transition cursor-pointer flex items-center space-x-2"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>List Your Property</span>
              </button>
            </div>
          </div>
        </section>

        {/* SECTION J: MARKET RESEARCH & LEGAL GUIDES */}
        <section>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                Market Research & Legal Guides
              </h2>
              <p className="text-xs text-neutral-500 font-normal mt-0.5">
                Due diligence frameworks, Sectional Properties Act & foreign buyer rights
              </p>
            </div>
            <button 
              onClick={() => navigateTo('blog')}
              className="text-xs font-bold text-neutral-900 hover:underline cursor-pointer"
            >
              All articles →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {blogPosts.slice(0, 3).map(post => (
              <div 
                key={post.id}
                onClick={() => navigateTo('blog')}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-neutral-100 mb-3 border border-neutral-200/80 shadow-xs">
                  <img 
                    src={post.coverImage} 
                    alt={post.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/95 backdrop-blur-sm text-neutral-900 text-[10px] font-bold shadow-xs">
                    {post.category}
                  </span>
                </div>
                <h3 className="text-sm font-bold text-neutral-900 group-hover:text-neutral-600 transition line-clamp-2 leading-snug">
                  {post.title}
                </h3>
                <p className="text-xs text-neutral-500 mt-1 font-normal line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="flex items-center space-x-2 text-[11px] text-neutral-400 mt-2 font-normal">
                  <span>{post.authorName}</span>
                  <span>•</span>
                  <span>{post.readTime}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

      </div>

    </div>
  );
};
