import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  Phone, 
  Mail, 
  MessageSquare, 
  Clock, 
  DollarSign, 
  Star, 
  CheckCircle2, 
  Search,
  Filter,
  ChevronRight,
  ArrowRight,
  Sparkles,
  Send
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppStore } from '../../services/store';
import { CRMLead, LeadStatus } from '../../types';

export const DashboardCRMLeadsPage: React.FC = () => {
  const { leads, formatPrice, refreshLeads, showToast } = useApp();
  const [selectedLead, setSelectedLead] = useState<CRMLead | null>(leads[0] || null);
  const [newNote, setNewNote] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const columns: { id: LeadStatus; label: string; color: string }[] = [
    { id: 'new', label: 'New Inquiries', color: 'border-blue-400 bg-blue-50/40 text-blue-900' },
    { id: 'contacted', label: 'Contacted', color: 'border-indigo-400 bg-indigo-50/40 text-indigo-900' },
    { id: 'viewing', label: 'Viewing Booked', color: 'border-amber-400 bg-amber-50/40 text-amber-900' },
    { id: 'negotiation', label: 'Negotiation / Legal', color: 'border-purple-400 bg-purple-50/40 text-purple-900' },
    { id: 'won', label: 'Deals Won', color: 'border-emerald-400 bg-emerald-50/40 text-emerald-900' },
  ];

  const handleUpdateStatus = (leadId: string, status: LeadStatus) => {
    AppStore.updateLeadStatus(leadId, status);
    refreshLeads();
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status });
    }
    showToast(`Lead moved to ${status.toUpperCase()} stage!`);
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNote || !selectedLead) return;

    const updatedNotes = selectedLead.notes ? `${selectedLead.notes}\n• [${new Date().toLocaleDateString()}]: ${newNote}` : `• ${newNote}`;
    
    // In store
    const all = AppStore.getLeads();
    const updated = all.map(l => l.id === selectedLead.id ? { ...l, notes: updatedNotes } : l);
    localStorage.setItem('sn_leads', JSON.stringify(updated));
    
    setSelectedLead({ ...selectedLead, notes: updatedNotes });
    setNewNote('');
    refreshLeads();
    showToast('Activity note appended.');
  };

  const filteredLeads = leads.filter(l => {
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      return l.name.toLowerCase().includes(q) || l.interestedItemTitle.toLowerCase().includes(q) || l.phone.includes(q);
    }
    return true;
  });

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-slate-900">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center space-x-2 text-emerald-600 text-xs font-extrabold uppercase tracking-wider mb-1">
            <Users className="w-4 h-4" />
            <span>High-Value Deal Pipeline</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
            Real Estate & Auto CRM
          </h1>
          <p className="text-slate-500 text-xs sm:text-sm mt-1">
            Track inquiries, auto-qualify diaspora budgets, and advance buyers from site tours to contract closure.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input 
              type="text" 
              placeholder="Search leads by name, phone..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 overflow-x-auto pb-4">
        {columns.map(col => {
          const colLeads = filteredLeads.filter(l => l.status === col.id);
          const colTotalValue = colLeads.reduce((acc, l) => acc + (l.dealValue || l.budget), 0);

          return (
            <div key={col.id} className="bg-slate-100/70 rounded-3xl p-4 border border-slate-200/80 flex flex-col h-[640px]">
              
              {/* Column Header */}
              <div className="mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-black text-slate-800 uppercase tracking-wider">{col.label}</span>
                  <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center">
                    {colLeads.length}
                  </span>
                </div>
                <p className="text-[10px] text-slate-500 font-semibold mt-0.5">
                  Pipeline: {formatPrice(colTotalValue)}
                </p>
              </div>

              {/* Cards list */}
              <div className="flex-1 overflow-y-auto space-y-3 pr-1">
                {colLeads.map(lead => (
                  <div 
                    key={lead.id}
                    onClick={() => setSelectedLead(lead)}
                    className={`bg-white rounded-2xl p-4 shadow-sm border transition cursor-pointer hover:shadow-md ${selectedLead?.id === lead.id ? 'border-2 border-emerald-500 ring-2 ring-emerald-500/20' : 'border-slate-200'}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-black text-slate-900">{lead.name}</span>
                      <span className="text-[10px] font-extrabold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full">
                        {lead.score} pts
                      </span>
                    </div>

                    <p className="text-[11px] text-slate-500 line-clamp-1 font-medium">{lead.interestedItemTitle}</p>

                    <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-xs">
                      <span className="font-extrabold text-slate-900">
                        {formatPrice(lead.budget, lead.currency)}
                      </span>
                      <span className="text-[10px] text-slate-400">{lead.source}</span>
                    </div>
                  </div>
                ))}
              </div>

            </div>
          );
        })}
      </div>

      {/* Selected Lead Activity Log & Direct Contact Drawer */}
      {selectedLead && (
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-slate-200 mt-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-slate-100">
            <div>
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-800 font-black text-base flex items-center justify-center">
                  {selectedLead.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="text-xl font-black text-slate-900">{selectedLead.name}</h3>
                    <span className="px-2.5 py-0.5 bg-emerald-100 text-emerald-800 text-xs font-bold rounded-full">
                      Lead Score: {selectedLead.score}/100
                    </span>
                  </div>
                  <p className="text-xs text-slate-500">Interested in: <span className="font-bold text-slate-800">{selectedLead.interestedItemTitle}</span></p>
                </div>
              </div>
            </div>

            {/* Quick Actions & Move Stage */}
            <div className="flex flex-wrap items-center gap-3">
              <span className="text-xs font-bold text-slate-500">Move Stage:</span>
              <select 
                value={selectedLead.status}
                onChange={e => handleUpdateStatus(selectedLead.id, e.target.value as any)}
                className="px-3 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs font-bold text-slate-800 focus:outline-none"
              >
                <option value="new">New Inquiries</option>
                <option value="contacted">Contacted</option>
                <option value="viewing">Viewing Booked</option>
                <option value="negotiation">Negotiation / Conveyancing</option>
                <option value="won">Won Deal</option>
                <option value="lost">Lost</option>
              </select>

              <a 
                href={`https://wa.me/${selectedLead.phone.replace(/[^0-9]/g, '')}?text=Hello%20${encodeURIComponent(selectedLead.name)}`}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl transition flex items-center space-x-1.5"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>WhatsApp Client</span>
              </a>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-6">
            <div>
              <h4 className="font-extrabold text-sm text-slate-900 mb-3">Client Contact & Financials</h4>
              <div className="space-y-2 text-xs text-slate-700">
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Phone / WhatsApp:</span>
                  <span className="font-bold">{selectedLead.phone}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Email:</span>
                  <span className="font-bold">{selectedLead.email}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Verified Budget:</span>
                  <span className="font-black text-emerald-700">{formatPrice(selectedLead.budget, selectedLead.currency)}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-100">
                  <span className="text-slate-400">Source:</span>
                  <span>{selectedLead.source}</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-extrabold text-sm text-slate-900 mb-3">Conveyancing & Follow-Up Notes</h4>
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200 text-xs text-slate-700 whitespace-pre-line min-h-[100px] mb-3 leading-relaxed">
                {selectedLead.notes || 'No historical notes recorded yet.'}
              </div>

              <form onSubmit={handleAddNote} className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Append quick note (e.g. Sent title deed copy, lawyer review requested)..."
                  value={newNote}
                  onChange={e => setNewNote(e.target.value)}
                  className="flex-1 px-3.5 py-2 bg-slate-50 border border-slate-300 rounded-xl text-xs focus:outline-none"
                />
                <button 
                  type="submit"
                  className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition flex items-center space-x-1"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Log</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
