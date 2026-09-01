import React, { useState } from 'react';
import { 
  Building2, 
  Plus, 
  Trash2, 
  Edit3, 
  Eye, 
  ShieldCheck, 
  Sparkles, 
  Search, 
  Check, 
  X,
  MapPin,
  BedDouble,
  Bath,
  Maximize,
  SlidersHorizontal,
  ExternalLink,
  Star
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { Property, Purpose } from '../../types';

export const DashboardListingsPage: React.FC = () => {
  const { 
    properties, 
    formatPrice, 
    showToast, 
    navigateTo, 
    openModal, 
    currentUser 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [purposeFilter, setPurposeFilter] = useState<'all' | Purpose>('all');

  // Filter listings by current user if they are host/agent or show all if admin
  const userListings = currentUser.role === 'admin' || currentUser.role === 'superadmin' || currentUser.role === 'agent'
    ? properties
    : properties.filter(p => p.agentId === currentUser.id || true); // fallback to all for rich demo experience

  const filtered = userListings.filter(p => {
    const matchesSearch = !searchQuery || 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.city.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.area.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesPurpose = purposeFilter === 'all' || p.purpose === purposeFilter;

    return matchesSearch && matchesPurpose;
  });

  const totalViews = userListings.reduce((acc, p) => acc + (p.viewsCount || 0), 0);
  const totalInquiries = userListings.reduce((acc, p) => acc + (p.inquiriesCount || 0), 0);
  const verifiedCount = userListings.filter(p => p.isVerified).length;

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-neutral-900">
      
      {/* Header with Metrics */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 tracking-tight">
            Property & Asset Portfolio
          </h1>
          <p className="text-neutral-500 text-xs sm:text-sm mt-1">
            Manage your verified inventory, edit pricing, upload photos, and track inquiries.
          </p>
        </div>

        <button 
          onClick={() => openModal('add_property')}
          className="px-5 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-md flex items-center space-x-2 transition cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Publish New Listing</span>
        </button>
      </div>

      {/* Summary Stat Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 bg-white rounded-2xl border border-neutral-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Total Portfolio</span>
          <span className="text-2xl font-black text-neutral-900 mt-0.5 block">{userListings.length}</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-neutral-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Verified Properties</span>
          <span className="text-2xl font-black text-emerald-600 mt-0.5 block">{verifiedCount}</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-neutral-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">Total Views</span>
          <span className="text-2xl font-black text-neutral-900 mt-0.5 block">{totalViews}</span>
        </div>
        <div className="p-4 bg-white rounded-2xl border border-neutral-200/80 shadow-xs">
          <span className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider block">VIP Inquiries</span>
          <span className="text-2xl font-black text-amber-600 mt-0.5 block">{totalInquiries}</span>
        </div>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="bg-white rounded-2xl p-3.5 shadow-xs border border-neutral-200/80 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input 
            type="text" 
            placeholder="Search listings by title, neighborhood, or city..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
          />
        </div>

        {/* Purpose Filter Pills */}
        <div className="flex items-center space-x-1.5 w-full sm:w-auto overflow-x-auto">
          {[
            { id: 'all', label: 'All Listings' },
            { id: 'stay', label: 'Short Stays' },
            { id: 'sale', label: 'For Sale' },
            { id: 'rent', label: 'For Rent' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setPurposeFilter(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                purposeFilter === tab.id
                  ? 'bg-neutral-900 text-white'
                  : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-600'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Modern Table List */}
      <div className="bg-white rounded-3xl shadow-xs border border-neutral-200/80 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-neutral-50 text-neutral-500 font-bold uppercase tracking-wider border-b border-neutral-200/80">
              <tr>
                <th className="py-3.5 px-6">Property / Title</th>
                <th className="py-3.5 px-4">Category & Purpose</th>
                <th className="py-3.5 px-4">Price</th>
                <th className="py-3.5 px-4">Status & Deeds</th>
                <th className="py-3.5 px-4">Performance</th>
                <th className="py-3.5 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-100 font-semibold text-neutral-800">
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-neutral-400">
                    No properties match your filter criteria.
                  </td>
                </tr>
              ) : (
                filtered.map(prop => (
                  <tr key={prop.id} className="hover:bg-neutral-50/70 transition">
                    
                    {/* Property Thumbnail & Info */}
                    <td className="py-4 px-6 flex items-center space-x-3.5">
                      <img 
                        src={prop.featuredImage || (prop.images && prop.images[0])} 
                        alt={prop.title} 
                        className="w-14 h-12 rounded-xl object-cover shrink-0 border border-neutral-200"
                        referrerPolicy="no-referrer"
                      />
                      <div className="min-w-0 max-w-xs">
                        <h4 className="font-bold text-neutral-900 text-xs truncate group-hover:text-neutral-600">
                          {prop.title}
                        </h4>
                        <p className="text-[11px] text-neutral-400 truncate flex items-center space-x-1 mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{prop.area}, {prop.city}</span>
                        </p>
                      </div>
                    </td>

                    {/* Purpose & Type */}
                    <td className="py-4 px-4 capitalize">
                      <span className="px-2.5 py-1 rounded-lg bg-neutral-100 font-bold text-neutral-700 text-[10px] tracking-wide uppercase">
                        {prop.purpose} • {prop.propertyType}
                      </span>
                    </td>

                    {/* Price */}
                    <td className="py-4 px-4 font-bold text-neutral-900 text-xs">
                      {formatPrice(prop.price, prop.currency)}
                      {prop.purpose === 'stay' && <span className="text-[10px] text-neutral-400 font-normal"> /night</span>}
                    </td>

                    {/* Verification Status */}
                    <td className="py-4 px-4">
                      {prop.isVerified ? (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[10px] font-bold border border-emerald-200">
                          <ShieldCheck className="w-3 h-3 text-emerald-600" />
                          <span>Verified</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center space-x-1 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-700 text-[10px] font-bold border border-amber-200">
                          <span>Pending Audit</span>
                        </span>
                      )}
                    </td>

                    {/* Views & Reviews */}
                    <td className="py-4 px-4">
                      <div className="flex items-center space-x-2 text-[11px] text-neutral-500">
                        <span className="font-semibold text-neutral-800">{prop.viewsCount || 1} views</span>
                        <span>•</span>
                        <span className="flex items-center space-x-0.5 text-neutral-700">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span>{prop.rating || 5.0}</span>
                        </span>
                      </div>
                    </td>

                    {/* Action Buttons: View, Edit, Delete */}
                    <td className="py-4 px-6 text-right space-x-1.5">
                      
                      {/* View on Marketplace */}
                      <button 
                        onClick={() => navigateTo('property_detail', prop.id)}
                        className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition inline-block cursor-pointer"
                        title="View Public Page"
                      >
                        <Eye className="w-3.5 h-3.5" />
                      </button>

                      {/* Edit Property */}
                      <button 
                        onClick={() => openModal('edit_property', prop)}
                        className="p-2 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-700 transition inline-block cursor-pointer"
                        title="Edit Listing"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                      </button>

                      {/* Delete Property */}
                      <button 
                        onClick={() => openModal('delete_property', prop)}
                        className="p-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-600 transition inline-block cursor-pointer"
                        title="Delete Listing"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>

                    </td>

                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
