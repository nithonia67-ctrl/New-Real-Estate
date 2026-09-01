import React, { useState } from 'react';
import { 
  Sparkles, 
  TrendingUp, 
  Target, 
  BarChart3, 
  DollarSign, 
  Eye, 
  CheckCircle2, 
  Rocket, 
  ArrowRight,
  ShieldCheck
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppStore } from '../../services/store';

export const AdvertisePublicPage: React.FC = () => {
  const { formatPrice, showToast, navigateTo, refreshAdCampaigns } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [headline, setHeadline] = useState('Exclusive Off-Market Development in Karen');
  const [description, setDescription] = useState('Prime 5-acre residential villas with solar grid & private club.');
  const [cta, setCta] = useState('Book Private Site Visit');
  const [placement, setPlacement] = useState<'homepage_hero' | 'category_banner' | 'sidebar_feed'>('homepage_hero');
  const [dailyBudget, setDailyBudget] = useState(50);
  const [campaignDays, setCampaignDays] = useState(14);
  const [targetAudience, setTargetAudience] = useState('Diaspora High Net Worth (US, UK, UAE)');

  const totalCost = dailyBudget * campaignDays;
  const estimatedImpressions = Math.round(dailyBudget * 450 * campaignDays);
  const estimatedClicks = Math.round(estimatedImpressions * 0.038);

  const handleLaunchCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!companyName) {
      showToast('Please enter your business or agency name');
      return;
    }

    AppStore.addAdCampaign({
      advertiserId: 'adv_new',
      advertiserName: companyName,
      headline: headline,
      description: description,
      callToAction: cta,
      placement: placement,
      targetAudience: targetAudience,
      dailyBudget: dailyBudget,
      totalBudget: totalCost,
      spent: 0,
      impressions: 0,
      clicks: 0,
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      endDate: new Date(Date.now() + campaignDays * 86400000).toISOString().split('T')[0],
      creativeImageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80',
      destinationUrl: '/properties'
    });

    refreshAdCampaigns();
    showToast('Sponsored Spotlight Campaign launched live on SafariNest!');
    navigateTo('home');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      
      {/* Hero */}
      <div className="bg-slate-950 text-white py-16 px-4 sm:px-6 lg:px-8 border-b border-slate-800">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold uppercase mb-4">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>Target 18,000+ Diaspora & High-Net-Worth Buyers</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black">
            Advertise on SafariNest Real Estate & Auto Network
          </h1>
          <p className="text-slate-300 text-sm sm:text-base mt-4 max-w-2xl mx-auto leading-relaxed">
            Directly showcase your off-plan property developments, luxury vehicle showrooms, and safari charters across prime East African audiences.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        
        {/* KPI Value Props */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <Target className="w-8 h-8 text-emerald-600 mb-3" />
            <h3 className="font-extrabold text-base text-slate-900">Diaspora & Institutional Target</h3>
            <p className="text-xs text-slate-500 mt-1">
              Over 62% of our monthly active traffic originates from the UK, USA, UAE, Kenya, and Tanzania with verified purchasing intent.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <TrendingUp className="w-8 h-8 text-amber-600 mb-3" />
            <h3 className="font-extrabold text-base text-slate-900">3.8% Average Click-Through Rate</h3>
            <p className="text-xs text-slate-500 mt-1">
              Native contextual ad placements embedded directly in search results deliver 4x higher CTR than standard display banners.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
            <BarChart3 className="w-8 h-8 text-blue-600 mb-3" />
            <h3 className="font-extrabold text-base text-slate-900">Live ROI & Lead Telemetry</h3>
            <p className="text-xs text-slate-500 mt-1">
              Track impressions, unique link clicks, WhatsApp conversations initiated, and viewing bookings in real-time.
            </p>
          </div>
        </div>

        {/* Live Campaign Creator & Real-Time Previewer */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200">
            <h2 className="text-xl font-black text-slate-900 mb-6 flex items-center space-x-2">
              <Rocket className="w-5 h-5 text-amber-600" />
              <span>Configure Your Sponsored Campaign</span>
            </h2>

            <form onSubmit={handleLaunchCampaign} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Company / Developer Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Centum Real Estate / HassConsult"
                  value={companyName}
                  onChange={e => setCompanyName(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Campaign Headline</label>
                <input 
                  type="text" 
                  value={headline}
                  onChange={e => setHeadline(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Description Copy</label>
                <textarea 
                  rows={2}
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  required
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Button Call To Action</label>
                  <input 
                    type="text" 
                    value={cta}
                    onChange={e => setCta(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Ad Placement</label>
                  <select 
                    value={placement}
                    onChange={e => setPlacement(e.target.value as any)}
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold"
                  >
                    <option value="homepage_hero">Homepage Spotlight Banner</option>
                    <option value="category_banner">Category Search Feed</option>
                    <option value="sidebar_feed">Property Detail Sidebar</option>
                  </select>
                </div>
              </div>

              {/* Budget Sliders */}
              <div className="pt-4 border-t border-slate-100 space-y-4">
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Daily Budget</span>
                    <span className="text-amber-700 font-black">{formatPrice(dailyBudget)} / day</span>
                  </div>
                  <input 
                    type="range" 
                    min={20} 
                    max={300} 
                    step={10}
                    value={dailyBudget}
                    onChange={e => setDailyBudget(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-700 mb-1">
                    <span>Duration</span>
                    <span>{campaignDays} Days</span>
                  </div>
                  <input 
                    type="range" 
                    min={7} 
                    max={60} 
                    step={1}
                    value={campaignDays}
                    onChange={e => setCampaignDays(Number(e.target.value))}
                    className="w-full accent-amber-600 cursor-pointer"
                  />
                </div>
              </div>

              <button 
                type="submit"
                className="w-full py-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl shadow-lg shadow-amber-500/20 transition cursor-pointer mt-4"
              >
                Launch Sponsored Campaign ({formatPrice(totalCost)})
              </button>
            </form>
          </div>

          {/* Right Column: Live Ad Preview & Audience Forecast */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Forecast Card */}
            <div className="bg-slate-900 text-white rounded-3xl p-6 shadow-xl border border-slate-800 space-y-4">
              <h3 className="font-extrabold text-sm uppercase tracking-wider text-amber-400">
                Audience Reach Forecast
              </h3>

              <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-slate-800/80 rounded-2xl">
                  <span className="text-xs text-slate-400 block">Est. Impressions</span>
                  <span className="text-2xl font-black text-emerald-400">{estimatedImpressions.toLocaleString()}</span>
                </div>
                <div className="p-3 bg-slate-800/80 rounded-2xl">
                  <span className="text-xs text-slate-400 block">Est. High-Intent Clicks</span>
                  <span className="text-2xl font-black text-amber-400">{estimatedClicks.toLocaleString()}</span>
                </div>
              </div>

              <div className="p-3 bg-slate-800/50 rounded-xl text-xs text-slate-300">
                Targeting: <span className="text-white font-bold">{targetAudience}</span>
              </div>
            </div>

            {/* Live Rendered Creative Preview */}
            <div className="space-y-2">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Live Banner Preview:
              </span>
              <div className="bg-gradient-to-br from-amber-500/10 via-white to-slate-50 border-2 border-amber-400 rounded-3xl p-5 shadow-lg relative overflow-hidden">
                <div className="flex items-center justify-between mb-3">
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 text-[10px] font-extrabold uppercase">
                    Sponsored Spotlight
                  </span>
                  <span className="text-[10px] text-slate-400 font-semibold">
                    by {companyName || 'Your Business'}
                  </span>
                </div>

                <div className="h-36 rounded-xl overflow-hidden bg-slate-900 mb-3">
                  <img 
                    src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=80" 
                    alt="preview" 
                    className="w-full h-full object-cover" 
                  />
                </div>

                <h4 className="font-extrabold text-slate-900 text-base">{headline}</h4>
                <p className="text-xs text-slate-600 mt-1 line-clamp-2">{description}</p>

                <div className="mt-4 pt-3 border-t border-amber-200/60 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400">Verified Sponsor</span>
                  <button className="px-4 py-1.5 bg-slate-900 text-amber-300 font-bold text-xs rounded-xl shadow">
                    {cta}
                  </button>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
