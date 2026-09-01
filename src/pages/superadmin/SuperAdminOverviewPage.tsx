import React from 'react';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  DollarSign, 
  Sparkles, 
  TrendingUp, 
  Settings, 
  Layers, 
  CheckCircle2, 
  AlertCircle,
  FileCheck2
} from 'lucide-react';
import { useApp } from '../../context/AppContext';

export const SuperAdminOverviewPage: React.FC = () => {
  const { properties, agents, agencies, landListings, vehicles, formatPrice, navigateTo } = useApp();

  const totalGMV = properties.reduce((a, b) => a + b.price, 0) + 
                   landListings.reduce((a, b) => a + b.price, 0) + 
                   vehicles.reduce((a, b) => a + b.price, 0);

  const pendingVerificationsCount = properties.filter(p => !p.isVerified).length + 2;

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-slate-900">
      
      {/* Super Admin Top Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-indigo-900/40 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-2 text-indigo-400 text-xs font-extrabold uppercase tracking-wider mb-2">
            <ShieldCheck className="w-4 h-4" />
            <span>East Africa Regional Platform Console</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            SafariNest Super Admin Center
          </h1>
          <p className="text-slate-400 text-xs sm:text-sm mt-1">
            Global governance, Title Deed audit queues, dynamic custom attributes, and multi-currency management.
          </p>
        </div>

        <div className="flex flex-wrap gap-2 shrink-0">
          <button 
            onClick={() => navigateTo('superadmin_verifications')}
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-black rounded-xl shadow-lg transition flex items-center space-x-1.5 cursor-pointer"
          >
            <FileCheck2 className="w-4 h-4" />
            <span>Audit Queue ({pendingVerificationsCount})</span>
          </button>
          <button 
            onClick={() => navigateTo('superadmin_branding')}
            className="px-4 py-2.5 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded-xl transition border border-white/20 flex items-center space-x-1.5 cursor-pointer"
          >
            <Settings className="w-4 h-4" />
            <span>Platform Branding</span>
          </button>
        </div>
      </div>

      {/* Global Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Total Marketplace GMV</span>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {formatPrice(totalGMV)}
          </p>
          <p className="text-xs text-emerald-600 font-semibold mt-2">Across 5 East African territories</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Verified Title Parcels</span>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {properties.filter(p => p.isVerified).length + landListings.length}
          </p>
          <p className="text-xs text-blue-600 font-semibold mt-2">100% Registry certified</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Chartered Agencies</span>
          <p className="text-2xl font-black text-slate-900 mt-2">
            {agencies.length} Firms
          </p>
          <p className="text-xs text-purple-600 font-semibold mt-2">{agents.length} Licensed brokers</p>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
          <span className="text-xs font-bold text-slate-500 uppercase">Verification Queue</span>
          <p className="text-2xl font-black text-amber-700 mt-2">
            {pendingVerificationsCount} Pending
          </p>
          <p className="text-xs text-amber-700 font-semibold mt-2">Action required by compliance</p>
        </div>
      </div>

      {/* Quick Access Modules */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div 
          onClick={() => navigateTo('superadmin_verifications')}
          className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-amber-500 hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <FileCheck2 className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Title Deed & Vendor Verification</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Review and approve uploaded land registry search certificates, ZIPA leases, and national ID docs.
            </p>
          </div>
          <span className="text-xs font-bold text-amber-700 mt-6 block">Open Verification Queue →</span>
        </div>

        <div 
          onClick={() => navigateTo('superadmin_custom_fields')}
          className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-emerald-500 hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-4">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Dynamic Custom Field Manager</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Configure attributes: Borehole Water, Solar Grid Capacity, Title Deed Category, Duty Status & Zoning Codes.
            </p>
          </div>
          <span className="text-xs font-bold text-emerald-700 mt-6 block">Configure Custom Fields →</span>
        </div>

        <div 
          onClick={() => navigateTo('superadmin_branding')}
          className="bg-white rounded-3xl p-6 border border-slate-200 hover:border-indigo-500 hover:shadow-xl transition cursor-pointer flex flex-col justify-between"
        >
          <div>
            <div className="w-12 h-12 rounded-2xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4">
              <Settings className="w-6 h-6" />
            </div>
            <h3 className="font-black text-lg text-slate-900">Platform Branding & Currencies</h3>
            <p className="text-xs text-slate-500 mt-2 leading-relaxed">
              Adjust marketplace brand name, hero banners, real-time KES/TZS/RWF exchange rates, and concierge hotline.
            </p>
          </div>
          <span className="text-xs font-bold text-indigo-600 mt-6 block">Manage Branding & Rates →</span>
        </div>
      </div>

    </div>
  );
};
