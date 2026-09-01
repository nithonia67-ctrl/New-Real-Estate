import React from 'react';
import { 
  MapPin, 
  Phone, 
  Mail, 
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const Footer: React.FC = () => {
  const { brandSettings, navigateTo } = useApp();

  return (
    <footer className="bg-neutral-50 text-neutral-600 pt-12 pb-10 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Newsletter & Direct Value Banner */}
        <div className="bg-white border border-neutral-200 rounded-2xl p-6 sm:p-8 mb-12 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="max-w-xl">
            <span className="px-2.5 py-0.5 bg-neutral-100 text-neutral-800 text-xs font-medium rounded-full">
              East Africa Investment Alert
            </span>
            <h3 className="text-xl sm:text-2xl font-semibold text-neutral-900 mt-2">
              Get off-market developments & beachfront deals
            </h3>
            <p className="text-neutral-500 text-xs sm:text-sm mt-1 font-normal">
              Join 18,000+ diaspora investors, developers, and holidaymakers receiving weekly curated property drops across Nairobi, Zanzibar, Kigali, and coastal Kenya.
            </p>
          </div>

          <div className="w-full lg:w-auto flex-1 max-w-md">
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to SafariNest Deal Alerts!'); }} className="flex flex-col sm:flex-row gap-2">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                required
                className="flex-1 px-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-neutral-900 placeholder-neutral-400 text-xs sm:text-sm focus:outline-none focus:border-neutral-900"
              />
              <button 
                type="submit"
                className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-medium text-xs sm:text-sm rounded-xl transition flex items-center justify-center space-x-1.5 shrink-0 cursor-pointer"
              >
                <span>Subscribe</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
            <p className="text-[11px] text-neutral-400 mt-1.5 font-normal">
              Zero spam. Unsubscribe anytime.
            </p>
          </div>
        </div>

        {/* Multi-column navigation links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-10">
          
          {/* Brand Info & Address */}
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <div className="flex items-center space-x-2.5 mb-3">
              <div className="w-7 h-7 rounded-full bg-neutral-900 flex items-center justify-center text-white text-xs font-semibold">
                SN
              </div>
              <span className="font-semibold text-lg text-neutral-900 tracking-tight">
                {brandSettings.brandName}
              </span>
            </div>
            <p className="text-neutral-500 text-xs sm:text-sm leading-relaxed mb-4 pr-4 font-normal">
              {brandSettings.tagline}. Connecting diaspora investors and holidaymakers with verified titles, authentic safaris, and inspected vehicles.
            </p>

            <div className="space-y-1.5 text-xs text-neutral-500 font-normal">
              <div className="flex items-start space-x-2">
                <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0 mt-0.5" />
                <span>{brandSettings.officeAddress}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Phone className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{brandSettings.supportPhone}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Mail className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
                <span>{brandSettings.supportEmail}</span>
              </div>
            </div>
          </div>

          {/* Column 1: Property Markets */}
          <div>
            <h4 className="text-neutral-900 text-xs font-semibold uppercase tracking-wider mb-3">
              Prime Markets
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500 font-normal">
              <li><button onClick={() => navigateTo('properties')} className="hover:text-neutral-900 transition">Nairobi (Karen, Westlands)</button></li>
              <li><button onClick={() => navigateTo('properties')} className="hover:text-neutral-900 transition">Zanzibar Beachfront Villas</button></li>
              <li><button onClick={() => navigateTo('properties')} className="hover:text-neutral-900 transition">Dar es Salaam (Masaki)</button></li>
              <li><button onClick={() => navigateTo('properties')} className="hover:text-neutral-900 transition">Kigali Diplomatic Enclaves</button></li>
              <li><button onClick={() => navigateTo('land')} className="hover:text-neutral-900 transition">Tatu City Special Economic Zone</button></li>
            </ul>
          </div>

          {/* Column 2: Marketplace Services */}
          <div>
            <h4 className="text-neutral-900 text-xs font-semibold uppercase tracking-wider mb-3">
              Marketplace
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500 font-normal">
              <li><button onClick={() => navigateTo('vehicles')} className="hover:text-neutral-900 transition">Verified Executive 4x4s</button></li>
              <li><button onClick={() => navigateTo('stays')} className="hover:text-neutral-900 transition">Luxury Coastal & Safari Stays</button></li>
              <li><button onClick={() => navigateTo('experiences')} className="hover:text-neutral-900 transition">Hot Air Balloon & Safaris</button></li>
              <li><button onClick={() => navigateTo('map_search')} className="hover:text-neutral-900 transition">Interactive GPS Map Search</button></li>
              <li><button onClick={() => navigateTo('agents')} className="hover:text-neutral-900 transition">Verified Real Estate Agents</button></li>
            </ul>
          </div>

          {/* Column 3: Trust & Platform */}
          <div>
            <h4 className="text-neutral-900 text-xs font-semibold uppercase tracking-wider mb-3">
              Trust & Advisory
            </h4>
            <ul className="space-y-2 text-xs text-neutral-500 font-normal">
              <li><button onClick={() => navigateTo('blog')} className="hover:text-neutral-900 transition">Market Research & Guides</button></li>
              <li><button onClick={() => navigateTo('advertise_landing')} className="hover:text-neutral-900 transition">Advertise with Us</button></li>
              <li><button onClick={() => navigateTo('dashboard_overview')} className="hover:text-neutral-900 transition">Vendor Dashboard</button></li>
              <li><button onClick={() => navigateTo('superadmin_overview')} className="hover:text-neutral-900 transition font-medium text-neutral-900">Super Admin</button></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar with payment partners & copyright */}
        <div className="pt-6 border-t border-neutral-200/80 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-neutral-500 font-normal">
          <p>© {new Date().getFullYear()} {brandSettings.brandName} Ltd. All rights reserved.</p>

          <div className="flex items-center space-x-3 text-neutral-400">
            <span>M-PESA Express</span>
            <span>•</span>
            <span>Cards</span>
            <span>•</span>
            <span>Airtel Money</span>
            <span>•</span>
            <span>Bank Wire</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
