import React, { useState } from 'react';
import { Layers, Plus, Trash2, CheckCircle2, Sliders, Sparkles } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CustomField } from '../../types';

export const SuperAdminCustomFieldsPage: React.FC = () => {
  const { customFields, showToast } = useApp();
  const [fields, setFields] = useState<CustomField[]>(customFields);
  const [fieldName, setFieldName] = useState('');
  const [fieldCategory, setFieldCategory] = useState<'property' | 'vehicle' | 'land' | 'stay'>('property');
  const [fieldType, setFieldType] = useState<'text' | 'number' | 'boolean' | 'select'>('text');

  const handleAddField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fieldName) return;

    const newField: CustomField = {
      id: `cf_${Date.now()}`,
      name: fieldName.toLowerCase().replace(/\s+/g, '_'),
      label: fieldName,
      type: fieldType,
      category: fieldCategory,
      required: false
    };

    const updated = [...fields, newField];
    setFields(updated);
    localStorage.setItem('sn_custom_fields', JSON.stringify(updated));
    setFieldName('');
    showToast(`Dynamic field "${fieldName}" added to ${fieldCategory.toUpperCase()} schema!`);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-slate-900">
      <div>
        <div className="flex items-center space-x-2 text-emerald-600 text-xs font-extrabold uppercase tracking-wider mb-1">
          <Layers className="w-4 h-4" />
          <span>Extensible Metadata Schema Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Dynamic Custom Fields Manager
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Define specialized East African real estate & automotive parameters (e.g. Solar Capacity, Title Tenure, Borehole Depth, Duty Clearance).
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left: Add Field Form */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-extrabold text-base text-slate-900 mb-4">Create New Dynamic Attribute</h3>
          
          <form onSubmit={handleAddField} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Field Label</label>
              <input 
                type="text" 
                placeholder="e.g. Generator Backup Capacity (kVA)"
                value={fieldName}
                onChange={e => setFieldName(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
              />
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Marketplace Module</label>
              <select 
                value={fieldCategory}
                onChange={e => setFieldCategory(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="property">Real Estate (Properties)</option>
                <option value="land">Land & Plots</option>
                <option value="vehicle">Vehicles & 4x4s</option>
                <option value="stay">Luxury Stays</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-bold text-slate-700 block mb-1">Data Type</label>
              <select 
                value={fieldType}
                onChange={e => setFieldType(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 rounded-xl text-xs font-semibold focus:outline-none"
              >
                <option value="text">Text (String)</option>
                <option value="number">Numeric</option>
                <option value="boolean">Toggle / Boolean</option>
                <option value="select">Dropdown Selection</option>
              </select>
            </div>

            <button 
              type="submit"
              className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-xl shadow-lg transition cursor-pointer mt-2"
            >
              Add Attribute to Schema
            </button>
          </form>
        </div>

        {/* Right: Existing Custom Attributes */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 shadow-sm border border-slate-200">
          <h3 className="font-extrabold text-base text-slate-900 mb-4">Active Custom Metadata Attributes</h3>
          
          <div className="space-y-3">
            {fields.map(f => (
              <div key={f.id} className="p-4 rounded-2xl bg-slate-50 border border-slate-200 flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-sm text-slate-900">{f.label}</span>
                  <div className="flex items-center space-x-2 text-[11px] text-slate-500 mt-0.5">
                    <span className="capitalize font-bold text-emerald-700">{f.category}</span>
                    <span>•</span>
                    <span className="text-slate-400 font-mono">{f.name} ({f.type})</span>
                  </div>
                </div>

                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold">
                  Active
                </span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};
