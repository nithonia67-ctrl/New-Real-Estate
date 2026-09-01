import React, { useState } from 'react';
import { Settings, Save, Globe, Phone, Mail, DollarSign, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SuperAdminBrandingPage: React.FC = () => {
  const { brandSettings, updateBrandSettings, showToast } = useApp();

  const [brandName, setBrandName] = useState(brandSettings?.brandName || 'SWAHIVO');
  const [tagline, setTagline] = useState(brandSettings?.tagline || '');
  const [heroHeadline, setHeroHeadline] = useState(brandSettings?.heroHeadline || '');
  const [heroSubheadline, setHeroSubheadline] = useState(brandSettings?.heroSubheadline || '');
  const [supportPhone, setSupportPhone] = useState(brandSettings?.supportPhone || '');
  const [supportEmail, setSupportEmail] = useState(brandSettings?.supportEmail || '');
  const [officeAddress, setOfficeAddress] = useState(brandSettings?.officeAddress || '');

  // Exchange Rates
  const [rateKES, setRateKES] = useState(brandSettings?.exchangeRates?.KES ?? 130);
  const [rateTZS, setRateTZS] = useState(brandSettings?.exchangeRates?.TZS ?? 2600);
  const [rateRWF, setRateRWF] = useState(brandSettings?.exchangeRates?.RWF ?? 1350);
  const [rateUGX, setRateUGX] = useState(brandSettings?.exchangeRates?.UGX ?? 3750);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateBrandSettings({
      brandName,
      tagline,
      heroHeadline,
      heroSubheadline,
      supportPhone,
      supportEmail,
      officeAddress,
      exchangeRates: {
        USD: 1,
        KES: Number(rateKES),
        TZS: Number(rateTZS),
        RWF: Number(rateRWF),
        UGX: Number(rateUGX),
        EUR: 0.92,
        GBP: 0.78
      }
    });
    showToast('Platform branding & multi-currency exchange rates saved!');
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-slate-900">
      <div>
        <div className="flex items-center space-x-2 text-indigo-600 text-xs font-extrabold uppercase tracking-wider mb-1">
          <Settings className="w-4 h-4" />
          <span>Regional White-Label & Global Governance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Platform Identity & Currency Engine
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Configure branding copy, regional headquarters information, and real-time East African currency multipliers.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        
        {/* Brand Copy & Identity */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
            Marketplace Visual Identity & SEO
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Brand Name</label>
              <input 
                type="text" 
                value={brandName}
                onChange={e => setBrandName(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Brand Tagline</label>
              <input 
                type="text" 
                value={tagline}
                onChange={e => setTagline(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Hero Main Display Headline</label>
            <input 
              type="text" 
              value={heroHeadline}
              onChange={e => setHeroHeadline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
            />
          </div>

          <div>
            <label className="text-xs font-bold text-slate-700 block mb-1">Hero Subheadline</label>
            <textarea 
              rows={2}
              value={heroSubheadline}
              onChange={e => setHeroSubheadline(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
            />
          </div>
        </div>

        {/* Contact & Concierge */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
            Regional HQ & VIP Concierge Support
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Support Phone / Hotline</label>
              <input 
                type="text" 
                value={supportPhone}
                onChange={e => setSupportPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Support Email</label>
              <input 
                type="text" 
                value={supportEmail}
                onChange={e => setSupportEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Office HQ Address</label>
              <input 
                type="text" 
                value={officeAddress}
                onChange={e => setOfficeAddress(e.target.value)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        {/* Multi-Currency FX Engine */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-sm border border-slate-200 space-y-4">
          <h3 className="font-extrabold text-base text-slate-900 border-b border-slate-100 pb-3">
            Base Currency Exchange Rates (1 USD = )
          </h3>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Kenyan Shilling (KES)</label>
              <input 
                type="number" 
                value={rateKES}
                onChange={e => setRateKES(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Tanzanian Shilling (TZS)</label>
              <input 
                type="number" 
                value={rateTZS}
                onChange={e => setRateTZS(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Rwandan Franc (RWF)</label>
              <input 
                type="number" 
                value={rateRWF}
                onChange={e => setRateRWF(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Ugandan Shilling (UGX)</label>
              <input 
                type="number" 
                value={rateUGX}
                onChange={e => setRateUGX(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
              />
            </div>
          </div>
        </div>

        <button 
          type="submit"
          className="px-8 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white font-black text-sm rounded-xl shadow-lg transition flex items-center space-x-2 cursor-pointer"
        >
          <Save className="w-4 h-4" />
          <span>Save Global Platform Settings</span>
        </button>

      </form>
    </div>
  );
};
