import React, { useState } from 'react';
import { 
  Building2, 
  Car, 
  TreePine, 
  Palmtree, 
  Compass, 
  MapPin,
  Heart, 
  Bell, 
  User, 
  ShieldCheck, 
  LayoutDashboard, 
  ChevronDown, 
  Globe, 
  Menu, 
  X,
  Sliders,
  DollarSign,
  TrendingUp,
  Sparkles,
  LogOut,
  PlusCircle
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { CurrencyCode } from '../../types';

export const Header: React.FC = () => {
  const { 
    currentView, 
    navigateTo, 
    brandSettings, 
    currentUser, 
    switchUser, 
    allUsers, 
    currency, 
    setCurrency, 
    favorites, 
    notifications, 
    unreadNotificationCount, 
    markNotificationRead,
    markAllNotificationsRead,
    openModal,
    signOut
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [currencyDropdownOpen, setCurrencyDropdownOpen] = useState(false);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [countrySelectorOpen, setCountrySelectorOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('East Africa');

  const countries = [
    { name: 'All East Africa', flag: '🌍' },
    { name: 'Kenya (Nairobi, Coast)', flag: '🇰🇪' },
    { name: 'Tanzania & Zanzibar', flag: '🇹🇿' },
    { name: 'Uganda (Kampala)', flag: '🇺🇬' },
    { name: 'Rwanda (Kigali)', flag: '🇷🇼' },
    { name: 'Ethiopia (Addis Ababa)', flag: '🇪🇹' }
  ];

  const currencies: CurrencyCode[] = ['USD', 'KES', 'TZS', 'UGX', 'RWF', 'EUR'];

  const navCategories = [
    { id: 'home', label: 'All', icon: Sparkles, view: 'home' },
    { id: 'properties', label: 'Homes', icon: Building2, view: 'properties' },
    { id: 'land', label: 'Land & Plots', icon: TreePine, view: 'land' },
    { id: 'vehicles', label: 'Vehicles', icon: Car, view: 'vehicles' },
    { id: 'stays', label: 'Stays', icon: Palmtree, view: 'stays' },
    { id: 'experiences', label: 'Experiences', icon: Compass, view: 'experiences' },
    { id: 'map_search', label: 'Map Search', icon: MapPin, view: 'map_search' },
  ];

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-neutral-200/80">
      
      {/* Top clean navigation bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo */}
          <div 
            className="flex items-center space-x-2.5 cursor-pointer" 
            onClick={() => navigateTo('home')}
          >
            <div className="w-8 h-8 rounded-full bg-neutral-900 flex items-center justify-center text-white">
              <svg className="w-4 h-4 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                <polyline points="9 22 9 12 15 12 15 22" />
              </svg>
            </div>
            <div className="flex items-baseline space-x-1.5">
              <span className="font-semibold text-lg sm:text-xl tracking-tight text-neutral-900">
                {brandSettings.brandName}
              </span>
            </div>
          </div>

          {/* Center Category Switcher Tabs */}
          <nav className="hidden md:flex items-center space-x-1 sm:space-x-4">
            {navCategories.map((item) => {
              const Icon = item.icon;
              const isActive = currentView === item.view;
              return (
                <button
                  key={item.id}
                  onClick={() => navigateTo(item.view as any)}
                  className={`relative flex items-center space-x-2 py-2 px-2.5 sm:px-3 rounded-full text-xs sm:text-sm font-medium transition cursor-pointer ${
                    isActive 
                      ? 'text-neutral-900 bg-neutral-100/80 font-semibold' 
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <Icon className={`w-4 h-4 ${isActive ? 'text-neutral-900' : 'text-neutral-400'}`} />
                  <span>{item.label}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-neutral-900 rounded-full" />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Controls */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Become a Host / List button */}
            <button 
              onClick={() => openModal('become_host')}
              className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-neutral-800 hover:text-neutral-950 bg-amber-50 hover:bg-amber-100/80 border border-amber-200/80 rounded-full transition shadow-xs cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Become a Host</span>
            </button>

            {/* Currency Selector */}
            <div className="relative">
              <button 
                onClick={() => setCurrencyDropdownOpen(!currencyDropdownOpen)}
                className="p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition flex items-center space-x-1 text-xs font-medium"
                title="Select Currency"
              >
                <Globe className="w-4 h-4 text-neutral-600" />
                <span className="hidden sm:inline">{currency}</span>
              </button>

              {currencyDropdownOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-xl shadow-lg border border-neutral-200/80 py-1 z-50">
                  {currencies.map(c => (
                    <button
                      key={c}
                      onClick={() => {
                        setCurrency(c);
                        setCurrencyDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs hover:bg-neutral-50 flex items-center justify-between ${currency === c ? 'text-neutral-900 font-semibold bg-neutral-50' : 'text-neutral-600'}`}
                    >
                      <span>{c}</span>
                      {currency === c && <span className="text-[10px] text-emerald-600">✓</span>}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Saved Wishlist / Favorites */}
            <button 
              onClick={() => navigateTo('favorites')}
              className="relative p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition"
              title="Saved Favorites"
            >
              <Heart className="w-4 h-4" />
              {favorites.length > 0 && (
                <span className="absolute top-1 right-1 w-3.5 h-3.5 bg-rose-500 text-white text-[9px] font-medium rounded-full flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </button>

            {/* Notification Bell */}
            <div className="relative">
              <button 
                onClick={() => setNotifDropdownOpen(!notifDropdownOpen)}
                className="relative p-2 text-neutral-700 hover:bg-neutral-100 rounded-full transition cursor-pointer"
                title="Notifications"
              >
                <Bell className="w-4 h-4" />
                {unreadNotificationCount > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full" />
                )}
              </button>

              {notifDropdownOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200/80 py-3 z-50">
                  <div className="px-4 pb-2 border-b border-neutral-100 flex items-center justify-between">
                    <span className="font-medium text-xs text-neutral-900">Notifications ({unreadNotificationCount})</span>
                    <button 
                      onClick={markAllNotificationsRead} 
                      className="text-[11px] text-neutral-500 hover:text-neutral-900"
                    >
                      Mark read
                    </button>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-neutral-100">
                    {notifications.map(notif => (
                      <div 
                        key={notif.id}
                        onClick={() => {
                          markNotificationRead(notif.id);
                          if (notif.link?.includes('crm')) navigateTo('dashboard_crm');
                          else if (notif.link?.includes('bookings')) navigateTo('dashboard_bookings');
                          setNotifDropdownOpen(false);
                        }}
                        className="p-3 hover:bg-neutral-50 cursor-pointer text-xs"
                      >
                        <p className="font-medium text-neutral-900">{notif.title}</p>
                        <p className="text-neutral-500 text-[11px] mt-0.5">{notif.message}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* User Account Capsule Menu */}
            <div className="relative">
              <button 
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 pl-3 pr-1.5 py-1 rounded-full border border-neutral-200 hover:shadow-sm bg-white transition cursor-pointer"
              >
                <Menu className="w-3.5 h-3.5 text-neutral-600" />
                <img 
                  src={currentUser.avatar} 
                  alt={currentUser.name} 
                  className="w-6 h-6 rounded-full object-cover" 
                />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-neutral-200/80 py-2 z-50">
                  <div className="px-4 py-2.5 border-b border-neutral-100">
                    <p className="text-xs font-semibold text-neutral-900">{currentUser.name}</p>
                    <p className="text-[11px] text-neutral-500">{currentUser.email}</p>
                  </div>

                  <div className="py-1 text-xs text-neutral-700">
                    <button 
                      onClick={() => { navigateTo('dashboard_overview'); setUserDropdownOpen(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center space-x-2 font-medium"
                    >
                      <LayoutDashboard className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Vendor Dashboard</span>
                    </button>
                    <button 
                      onClick={() => { navigateTo('dashboard_my_listings'); setUserDropdownOpen(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center space-x-2"
                    >
                      <Building2 className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Manage Listings</span>
                    </button>
                    <button 
                      onClick={() => { navigateTo('dashboard_crm'); setUserDropdownOpen(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center space-x-2"
                    >
                      <Sliders className="w-3.5 h-3.5 text-neutral-400" />
                      <span>CRM & Inquiries</span>
                    </button>
                    <button 
                      onClick={() => { navigateTo('superadmin_overview'); setUserDropdownOpen(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-neutral-50 flex items-center space-x-2 text-neutral-900 font-medium"
                    >
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>Super Admin Governance</span>
                    </button>
                    <button 
                      onClick={() => { openModal('become_host'); setUserDropdownOpen(false); }}
                      className="w-full px-4 py-2 text-left hover:bg-amber-50/70 text-amber-900 flex items-center space-x-2 font-semibold"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                      <span>Become a Host</span>
                    </button>
                  </div>

                  <div className="p-2.5 bg-neutral-50/70 border-t border-neutral-100 text-xs">
                    <div className="flex items-center justify-between mb-1.5">
                      <p className="text-[10px] text-neutral-400 font-medium uppercase tracking-wider">
                        Switch Persona
                      </p>
                      <button
                        onClick={() => {
                          openModal('switch_account');
                          setUserDropdownOpen(false);
                        }}
                        className="text-[10px] text-[#f15959] hover:underline font-semibold"
                      >
                        All Roles
                      </button>
                    </div>
                    <div className="space-y-1">
                      {allUsers.map(user => (
                        <button
                          key={user.id}
                          onClick={() => {
                            switchUser(user.id);
                            setUserDropdownOpen(false);
                          }}
                          className={`w-full px-2 py-1.5 rounded-lg text-left flex items-center space-x-2 text-xs transition ${
                            user.id === currentUser.id 
                              ? 'bg-neutral-900 text-white font-medium' 
                              : 'hover:bg-white text-neutral-700'
                          }`}
                        >
                          <img src={user.avatar} alt={user.name} className="w-5 h-5 rounded-full object-cover" />
                          <span className="truncate flex-1 font-medium">{user.name}</span>
                          <span className="text-[9px] opacity-75 capitalize">({user.role.replace('_', ' ')})</span>
                        </button>
                      ))}
                    </div>

                    <div className="mt-2 pt-2 border-t border-neutral-200/60">
                      <button
                        onClick={() => {
                          signOut();
                          setUserDropdownOpen(false);
                        }}
                        className="w-full px-2 py-1.5 rounded-lg text-left flex items-center space-x-2 text-xs text-rose-600 hover:bg-rose-50 font-semibold transition cursor-pointer"
                      >
                        <LogOut className="w-3.5 h-3.5" />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Trigger */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-neutral-700 hover:bg-neutral-100 rounded-lg"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-neutral-200 px-4 py-4 space-y-4">
          <div className="p-3 bg-neutral-50 rounded-2xl flex items-center justify-between border border-neutral-100">
            <div className="flex items-center space-x-2.5">
              <img src={currentUser.avatar} alt={currentUser.name} className="w-8 h-8 rounded-full object-cover" />
              <div>
                <p className="text-xs font-bold text-neutral-900">{currentUser.name}</p>
                <p className="text-[10px] text-neutral-500 capitalize">{currentUser.role.replace('_', ' ')}</p>
              </div>
            </div>
            <div className="flex items-center space-x-1.5">
              <button
                onClick={() => {
                  openModal('switch_account');
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 bg-white border border-neutral-200 text-[11px] font-semibold text-neutral-700 rounded-full shadow-sm"
              >
                Switch
              </button>
              <button
                onClick={() => {
                  signOut();
                  setMobileMenuOpen(false);
                }}
                className="px-2.5 py-1 bg-rose-50 border border-rose-200 text-[11px] font-semibold text-rose-600 rounded-full shadow-sm"
              >
                Sign Out
              </button>
            </div>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => {
                openModal('become_host');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Become a Host</span>
            </button>
            <button
              onClick={() => {
                navigateTo('dashboard_overview');
                setMobileMenuOpen(false);
              }}
              className="flex-1 py-2 bg-neutral-900 hover:bg-neutral-800 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-1.5 shadow-sm"
            >
              <LayoutDashboard className="w-3.5 h-3.5" />
              <span>Dashboard</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {navCategories.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  navigateTo(item.view as any);
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-xl text-left flex items-center space-x-2 ${
                  currentView === item.view ? 'bg-neutral-900 text-white font-medium' : 'bg-neutral-50 text-neutral-700'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
