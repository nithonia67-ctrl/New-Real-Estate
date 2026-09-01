import React from 'react';
import { Calendar, Clock, CheckCircle2, Phone, Mail, User, ShieldCheck } from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppStore } from '../../services/store';

export const DashboardBookingsPage: React.FC = () => {
  const { bookings, refreshBookings, showToast } = useApp();

  const handleUpdateStatus = (id: string, status: 'upcoming' | 'completed' | 'cancelled') => {
    AppStore.updateBookingStatus(id, status);
    refreshBookings();
    showToast(`Appointment marked as ${status}!`);
  };

  return (
    <div className="p-6 sm:p-10 max-w-7xl mx-auto space-y-8 text-slate-900">
      <div>
        <div className="flex items-center space-x-2 text-emerald-600 text-xs font-extrabold uppercase tracking-wider mb-1">
          <Calendar className="w-4 h-4" />
          <span>VIP Client Appointments</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-slate-900">
          Viewing & Test Drive Calendar
        </h1>
        <p className="text-slate-500 text-xs sm:text-sm mt-1">
          Review all scheduled property walk-throughs, land inspections, and vehicle test drives.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {bookings.map(book => (
          <div key={book.id} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                  {book.type.replace('_', ' ')}
                </span>
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${book.status === 'upcoming' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'}`}>
                  {book.status}
                </span>
              </div>

              <h3 className="font-extrabold text-base text-slate-900 line-clamp-1">{book.itemTitle}</h3>

              <div className="mt-4 space-y-2 text-xs text-slate-600">
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4 text-emerald-600" />
                  <span className="font-bold text-slate-900">{book.date} at {book.time}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <User className="w-4 h-4 text-slate-400" />
                  <span>{book.userName}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="w-4 h-4 text-slate-400" />
                  <span>{book.userPhone}</span>
                </div>
              </div>

              {book.notes && (
                <p className="text-xs text-slate-500 bg-slate-50 p-3 rounded-xl mt-4 border border-slate-100">
                  "{book.notes}"
                </p>
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-2">
              <button 
                onClick={() => handleUpdateStatus(book.id, 'completed')}
                className="flex-1 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-xl text-xs font-bold transition"
              >
                Mark Completed
              </button>
              <button 
                onClick={() => handleUpdateStatus(book.id, 'cancelled')}
                className="px-3 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-bold transition"
              >
                Cancel
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
