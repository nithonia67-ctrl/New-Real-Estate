import React from 'react';
import { Check, ShieldCheck, Zap, Sparkles, Building2, Crown, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const PricingMembershipPage: React.FC = () => {
  const { membershipPlans, formatPrice, showToast, navigateTo } = useApp();

  const handleSelectPlan = (planName: string) => {
    showToast(`Subscribed to ${planName} plan! Invoice generated.`);
    navigateTo('dashboard_overview');
  };

  return (
    <div className="bg-slate-50 min-h-screen pb-24 text-slate-900">
      
      {/* Header */}
      <div className="bg-slate-900 text-white py-16 px-4 sm:px-6 lg:px-8 text-center border-b border-slate-800">
        <div className="max-w-3xl mx-auto">
          <span className="px-3.5 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-extrabold uppercase rounded-full tracking-wider">
            Agent & Dealership Subscriptions
          </span>
          <h1 className="text-3xl sm:text-5xl font-black mt-4">
            Scale Your East Africa Real Estate & Auto Business
          </h1>
          <p className="text-slate-400 text-sm sm:text-base mt-3 leading-relaxed">
            Gain verified status, premium spotlight placement, automated CRM lead capture, and direct WhatsApp buyer routing.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {membershipPlans.map((plan) => {
            const isPopular = plan.isPopular;
            return (
              <div 
                key={plan.id}
                className={`bg-white rounded-3xl p-8 shadow-xl border relative flex flex-col justify-between transition duration-300 ${isPopular ? 'border-2 border-emerald-500 ring-4 ring-emerald-500/10 scale-105 z-10' : 'border-slate-200'}`}
              >
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 bg-emerald-600 text-white text-xs font-black uppercase rounded-full shadow">
                    Most Popular for Top Agents
                  </div>
                )}

                <div>
                  <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
                  <p className="text-xs text-slate-500 mt-1">{plan.description}</p>

                  <div className="mt-6 flex items-baseline space-x-1">
                    <span className="text-4xl font-black text-slate-900">
                      {formatPrice(plan.priceMonthly, plan.currency)}
                    </span>
                    <span className="text-xs font-semibold text-slate-500">/ month</span>
                  </div>

                  <div className="mt-6 pt-6 border-t border-slate-100 space-y-3">
                    <div className="text-xs font-bold text-slate-700">Includes:</div>
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{plan.listingsLimit === 999 ? 'Unlimited' : plan.listingsLimit} Active Listings</span>
                    </div>
                    <div className="flex items-center space-x-2 text-xs font-semibold text-slate-700">
                      <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span>{plan.featuredSlots} Featured Homepage Slots</span>
                    </div>

                    {plan.features.map((feat, i) => (
                      <div key={i} className="flex items-center space-x-2 text-xs text-slate-600">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-slate-100">
                  <button 
                    onClick={() => handleSelectPlan(plan.name)}
                    className={`w-full py-3.5 rounded-xl font-extrabold text-sm transition shadow-lg cursor-pointer ${isPopular ? 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-600/30' : 'bg-slate-900 hover:bg-slate-800 text-white'}`}
                  >
                    Select {plan.name}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Enterprise Agency Callout */}
        <div className="mt-16 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 text-white rounded-3xl p-8 sm:p-12 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-6 shadow-2xl">
          <div>
            <div className="flex items-center space-x-2 text-amber-400 text-xs font-bold uppercase mb-2">
              <Crown className="w-4 h-4" />
              <span>Multi-Branch Agency & Franchise Package</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black">Looking for Custom Multi-Seat Brokerage Tier?</h3>
            <p className="text-slate-400 text-xs sm:text-sm mt-1 max-w-xl">
              Includes bespoke CRM webhooks, multi-agent commission splits, dedicated account manager, and customized branded microsites.
            </p>
          </div>
          <button 
            onClick={() => { showToast('Enterprise inquiry dispatched to SafariNest VP of Partnerships!'); }}
            className="px-8 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-sm rounded-xl transition cursor-pointer shrink-0"
          >
            Contact Enterprise Sales
          </button>
        </div>

      </div>
    </div>
  );
};
