import React from 'react';
import { ShieldCheck, Check, X, FileText, AlertCircle, Building2, User } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppStore } from '../../services/store';

export const SuperAdminVerificationsPage: React.FC = () => {
  const { properties, agents, refreshProperties, showToast } = useApp();

  const handleApproveProperty = (id: string) => {
    const all = AppStore.getProperties();
    const updated = all.map(p => p.id === id ? { ...p, isVerified: true } : p);
    localStorage.setItem('sn_properties', JSON.stringify(updated));
    refreshProperties();
    showToast('Property Title Deed verification approved and badge issued!');
  };

  const handleRejectProperty = (id: string) => {
    showToast('Listing marked for title re-audit. Notification sent to vendor.');
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-slate-900">
      <div>
        <div className="flex items-center space-x-2 text-amber-600 text-xs font-extrabold uppercase tracking-wider mb-1">
          <ShieldCheck className="w-4 h-4" />
          <span>Legal Due Diligence & Conveyancing Compliance</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Title Deed & Broker Verification Queue
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Validate Ministry of Lands search certificates, EARB broker licenses, and ZIPA investment approvals.
        </p>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-500 font-bold uppercase tracking-wider border-b border-slate-200">
              <tr>
                <th className="py-4 px-6">Listing / Subject</th>
                <th className="py-4 px-4">Type & Jurisdiction</th>
                <th className="py-4 px-4">Submitted Document</th>
                <th className="py-4 px-4">Current Status</th>
                <th className="py-4 px-6 text-right">Compliance Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-semibold text-slate-700">
              {properties.map(prop => (
                <tr key={prop.id} className="hover:bg-slate-50/80 transition">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <img src={prop.featuredImage} alt={prop.title} className="w-12 h-10 rounded-lg object-cover" />
                      <div>
                        <p className="font-extrabold text-slate-900 text-xs line-clamp-1">{prop.title}</p>
                        <p className="text-[10px] text-slate-400">{prop.address}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    {prop.city}, {prop.country}
                  </td>
                  <td className="py-4 px-4">
                    <span className="inline-flex items-center space-x-1 text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded font-bold">
                      <FileText className="w-3.5 h-3.5" />
                      <span>Official Registry Search Cert</span>
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    {prop.isVerified ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                        Verified
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-amber-100 text-amber-800 text-[10px] font-bold">
                        Pending Compliance Review
                      </span>
                    )}
                  </td>
                  <td className="py-4 px-6 text-right space-x-2">
                    {!prop.isVerified && (
                      <button 
                        onClick={() => handleApproveProperty(prop.id)}
                        className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-bold transition inline-flex items-center space-x-1"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>Approve Deed</span>
                      </button>
                    )}
                    <button 
                      onClick={() => handleRejectProperty(prop.id)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-bold transition inline-flex items-center space-x-1"
                    >
                      <X className="w-3.5 h-3.5" />
                      <span>Flag Issue</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
