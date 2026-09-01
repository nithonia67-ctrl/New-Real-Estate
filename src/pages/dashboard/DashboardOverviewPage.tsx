import React, { useState, useMemo } from 'react';
import { 
  TrendingUp, 
  User, 
  MapPin, 
  Plus, 
  Calendar, 
  Heart, 
  Folder, 
  CalendarCheck, 
  BarChart2, 
  Mail, 
  FileText, 
  Power, 
  Bell, 
  CheckCircle2, 
  Clock, 
  Search, 
  DollarSign, 
  Star, 
  Building2, 
  Trash2, 
  Edit3, 
  Eye, 
  ExternalLink,
  ChevronRight,
  Send,
  Sliders,
  Check,
  Sparkles,
  MessageSquare
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppStore } from '../../services/store';
import { Property, BookingReservation, Invoice, PropertyType, Purpose, Review, Conversation } from '../../types';

type DashboardTab = 
  | 'overview'
  | 'profile'
  | 'listings'
  | 'add_listing'
  | 'calendar'
  | 'favorites'
  | 'bookings'
  | 'reservations'
  | 'reviews'
  | 'inbox'
  | 'invoices';

export const DashboardOverviewPage: React.FC = () => {
  const { 
    currentUser, 
    switchUser,
    allUsers,
    properties, 
    refreshProperties,
    refreshListings,
    bookings, 
    refreshBookings,
    invoices, 
    refreshInvoices,
    favorites, 
    toggleFavorite,
    activities, 
    refreshActivities,
    addActivity,
    notifications, 
    unreadNotificationCount, 
    markAllNotificationsRead,
    formatPrice, 
    navigateTo,
    openModal,
    signOut,
    becomeHost,
    showToast 
  } = useApp();

  const [activeTab, setActiveTab] = useState<DashboardTab>('overview');
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);
  const [showUserQuickSwitch, setShowUserQuickSwitch] = useState(false);
  const [hoveredPoint, setHoveredPoint] = useState<{ day: number; date: string; value: number } | null>(null);

  // Profile Form State
  const [profileName, setProfileName] = useState(currentUser.name);
  const [profileEmail, setProfileEmail] = useState(currentUser.email);
  const [profilePhone, setProfilePhone] = useState(currentUser.phone);
  const [profileLocation, setProfileLocation] = useState(currentUser.location || 'Westlands, Nairobi');
  const [profileBio, setProfileBio] = useState(currentUser.bio || 'Senior Luxury Real Estate Specialist.');

  // Sync profile form state whenever currentUser changes
  React.useEffect(() => {
    setProfileName(currentUser.name);
    setProfileEmail(currentUser.email);
    setProfilePhone(currentUser.phone);
    setProfileLocation(currentUser.location || 'Westlands, Nairobi');
    setProfileBio(currentUser.bio || '');
  }, [currentUser]);

  // Add Listing Form State
  const [listingTitle, setListingTitle] = useState('');
  const [listingPrice, setListingPrice] = useState(450000);
  const [listingPurpose, setListingPurpose] = useState<Purpose>('buy');
  const [listingType, setListingType] = useState<PropertyType>('villa');
  const [listingCity, setListingCity] = useState('Nairobi');
  const [listingArea, setListingArea] = useState('Karen');
  const [listingAddress, setListingAddress] = useState('Mbagathi Ridge, Karen');
  const [listingBedrooms, setListingBedrooms] = useState(4);
  const [listingBathrooms, setListingBathrooms] = useState(5);
  const [listingSize, setListingSize] = useState(4500);
  const [listingImage, setListingImage] = useState('https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1000&auto=format&fit=crop&q=80');

  // Filter properties relevant to current user
  const userProperties = useMemo(() => {
    if (currentUser.role === 'superadmin') {
      return properties;
    }
    if (currentUser.id === 'usr_nayyar') {
      return properties.filter(p => p.agentId === 'usr_nayyar' || p.agentId === 'agent_nayyar' || !p.agentId);
    }
    if (currentUser.id === 'usr_amina') {
      return properties.filter(p => p.agentId === 'agent_amina' || p.agentId === 'usr_amina' || p.city?.toLowerCase().includes('zanzibar') || p.area?.toLowerCase().includes('paje') || p.area?.toLowerCase().includes('nungwi'));
    }
    return properties.filter(p => p.agentId === currentUser.id);
  }, [properties, currentUser]);

  const totalPropertiesCount = userProperties.length;
  const publishedPropertiesCount = userProperties.filter(p => p.status === 'published' || p.status === 'active' || p.status === 'featured').length;
  const upcomingBookings = useMemo(() => {
    return bookings.filter(b => b.status === 'upcoming');
  }, [bookings]);

  // Generate 30 days data for the chart matching the screenshot scale (0-100)
  const chartData = useMemo(() => {
    const days: Array<{ dayIndex: number; label: string; date: string; value: number }> = [];
    const baseDate = new Date(2024, 8, 24); // Sept 24, 2024 baseline matching screenshot
    
    // Default curve baseline resembling screenshot spline peak
    const defaultCurve = [
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      0, 0, 20, 50, 75, 95, 80, 40, 10, 0
    ];

    // Compute actual booking activity
    const totalBookingWeight = bookings.length * 15;

    for (let i = 0; i < 30; i++) {
      const d = new Date(baseDate);
      d.setDate(d.getDate() - (29 - i));
      const dayNum = d.getDate();
      const label = dayNum < 10 ? `0${dayNum}` : `${dayNum}`;
      const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
      
      let val = defaultCurve[i] || 0;
      if (totalBookingWeight > 0 && i >= 20) {
        val = Math.min(100, Math.round(val * 0.8 + (bookings.length * 8)));
      }

      days.push({
        dayIndex: i,
        label,
        date: dateStr,
        value: val
      });
    }
    return days;
  }, [bookings]);

  // Handle Profile Update
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUser = {
      ...currentUser,
      name: profileName,
      email: profileEmail,
      phone: profilePhone,
      location: profileLocation,
      bio: profileBio
    };
    const all = AppStore.getUsers().map(u => u.id === currentUser.id ? updatedUser : u);
    AppStore.saveUsers(all);
    addActivity('Updated User Profile', 'profile');
    showToast('Profile updated successfully!');
  };

  // Handle Create Listing
  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!listingTitle || !listingPrice) {
      showToast('Please enter listing title and price');
      return;
    }

    const newProp = AppStore.addProperty({
      title: listingTitle,
      slug: listingTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: `Spacious luxury ${listingType} located in ${listingArea}, ${listingCity}. Features high-end finishes, security, and prime accessibility.`,
      purpose: listingPurpose,
      propertyType: listingType,
      price: Number(listingPrice),
      currency: 'USD',
      country: 'Kenya',
      region: 'Nairobi County',
      city: listingCity,
      area: listingArea,
      address: listingAddress,
      bedrooms: Number(listingBedrooms),
      bathrooms: Number(listingBathrooms),
      propertySizeSqft: Number(listingSize),
      images: [listingImage],
      featuredImage: listingImage,
      features: ['Air Conditioning', 'Swimming Pool', 'Security', 'Borehole Water', 'Solar Backup'],
      amenities: ['Gym', 'Gated Community', 'Balcony', 'Garden'],
      status: 'published',
      isFeatured: true,
      isVerified: true,
      agentId: currentUser.id
    });

    refreshProperties();
    refreshListings();
    refreshActivities();
    showToast(`Listing "${newProp.title}" published successfully!`);
    setListingTitle('');
    setActiveTab('listings');
  };

  // Handle Update Booking Status
  const handleBookingStatusChange = (bookingId: string, newStatus: 'upcoming' | 'completed' | 'cancelled') => {
    AppStore.updateBookingStatus(bookingId, newStatus);
    refreshBookings();
    refreshActivities();
    showToast(`Booking ${bookingId.replace('bk_', '')} updated to ${newStatus}`);
  };

  // Build SVG Path for 30-day Chart
  const svgWidth = 600;
  const svgHeight = 220;
  const paddingLeft = 35;
  const paddingRight = 15;
  const paddingTop = 20;
  const paddingBottom = 30;
  const chartW = svgWidth - paddingLeft - paddingRight;
  const chartH = svgHeight - paddingTop - paddingBottom;

  const points = chartData.map((d, i) => {
    const x = paddingLeft + (i / (chartData.length - 1)) * chartW;
    const y = paddingTop + chartH - (d.value / 100) * chartH;
    return { x, y, ...d };
  });

  // Create smooth bezier curve path
  const curvePath = points.reduce((acc, curr, i, arr) => {
    if (i === 0) return `M ${curr.x},${curr.y}`;
    const prev = arr[i - 1];
    const cpx1 = prev.x + (curr.x - prev.x) / 2;
    const cpy1 = prev.y;
    const cpx2 = prev.x + (curr.x - prev.x) / 2;
    const cpy2 = curr.y;
    return `${acc} C ${cpx1},${cpy1} ${cpx2},${cpy2} ${curr.x},${curr.y}`;
  }, '');

  const areaPath = `${curvePath} L ${points[points.length - 1].x},${paddingTop + chartH} L ${points[0].x},${paddingTop + chartH} Z`;

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800">
      
      {/* Main Dashboard Layout Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          
          {/* ================= LEFT SIDEBAR CARD ================= */}
          <aside className="w-full lg:w-64 xl:w-72 shrink-0">
            <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-sm">
              
              {/* Profile Avatar & Greeting */}
              <div className="flex flex-col items-center text-center pb-5 border-b border-neutral-100">
                <div 
                  onClick={() => openModal('switch_account')} 
                  className="w-20 h-20 rounded-full p-1 bg-sky-50 border-2 border-sky-200 overflow-hidden shadow-inner flex items-center justify-center cursor-pointer hover:border-sky-400 transition group relative"
                  title="Click to switch persona"
                >
                  <img 
                    src={currentUser.avatar || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80"} 
                    alt={currentUser.name} 
                    className="w-full h-full object-cover rounded-full group-hover:scale-105 transition"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute bottom-0 inset-x-0 bg-black/60 text-white text-[8px] font-bold py-0.5 opacity-0 group-hover:opacity-100 transition">
                    Switch
                  </span>
                </div>
                <h2 className="mt-3 text-sm font-semibold text-neutral-800">
                  Hello, {currentUser.name.replace(/\s+/g, '')}
                </h2>
                <div className="flex items-center gap-1.5 mt-1">
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider">
                    {currentUser.role.replace('_', ' ')}
                  </span>
                  <button
                    onClick={() => openModal('switch_account')}
                    className="px-2 py-0.5 rounded-full bg-[#fef2f2] text-[#f15959] text-[10px] font-semibold hover:bg-rose-100 transition cursor-pointer"
                  >
                    Switch
                  </button>
                </div>
              </div>

              {/* Navigation Menu */}
              <nav className="mt-4 space-y-1">
                
                {/* 1. Dashboard (Active) */}
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'overview'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <TrendingUp className={`w-4 h-4 ${activeTab === 'overview' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>Dashboard</span>
                  </div>
                </button>

                {/* 2. My Profile */}
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'profile'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <User className={`w-4 h-4 ${activeTab === 'profile' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>My Profile</span>
                  </div>
                </button>

                {/* 3. My Listings */}
                <button
                  onClick={() => setActiveTab('listings')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'listings'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className={`w-4 h-4 ${activeTab === 'listings' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>My Listings</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-semibold">{totalPropertiesCount}</span>
                </button>

                {/* 4. Add New Listing */}
                <button
                  onClick={() => setActiveTab('add_listing')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'add_listing'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Plus className={`w-4 h-4 ${activeTab === 'add_listing' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>Add New Listing</span>
                  </div>
                </button>

                {/* 5. All In One Calendar */}
                <button
                  onClick={() => setActiveTab('calendar')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'calendar'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Calendar className={`w-4 h-4 ${activeTab === 'calendar' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>All In One Calendar</span>
                  </div>
                </button>

                {/* 6. Favorites */}
                <button
                  onClick={() => setActiveTab('favorites')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'favorites'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Heart className={`w-4 h-4 ${activeTab === 'favorites' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>Favorites</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-semibold">{favorites.length}</span>
                </button>

                {/* 7. My Bookings */}
                <button
                  onClick={() => setActiveTab('bookings')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'bookings'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Folder className={`w-4 h-4 ${activeTab === 'bookings' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>My Bookings</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-semibold">{bookings.length}</span>
                </button>

                {/* 8. My Reservations */}
                <button
                  onClick={() => setActiveTab('reservations')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'reservations'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <CalendarCheck className={`w-4 h-4 ${activeTab === 'reservations' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>My Reservations</span>
                  </div>
                </button>

                {/* 9. My Reviews */}
                <button
                  onClick={() => setActiveTab('reviews')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'reviews'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <BarChart2 className={`w-4 h-4 ${activeTab === 'reviews' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>My Reviews</span>
                  </div>
                </button>

                {/* 10. My Inbox (With red badge count) */}
                <button
                  onClick={() => setActiveTab('inbox')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'inbox'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <Mail className={`w-4 h-4 ${activeTab === 'inbox' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>My Inbox</span>
                  </div>
                  <span className="w-5 h-5 rounded-full bg-[#f15959] text-white text-[10px] font-bold flex items-center justify-center">
                    {unreadNotificationCount || 14}
                  </span>
                </button>

                {/* 11. Invoices */}
                <button
                  onClick={() => setActiveTab('invoices')}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer ${
                    activeTab === 'invoices'
                      ? 'text-[#f15959] bg-[#fef2f2] font-semibold'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <FileText className={`w-4 h-4 ${activeTab === 'invoices' ? 'text-[#f15959]' : 'text-neutral-500'}`} />
                    <span>Invoices</span>
                  </div>
                  <span className="text-[11px] text-neutral-400 font-semibold">{invoices.length}</span>
                </button>

                {/* 12. Become a Host */}
                <button
                  onClick={() => openModal('become_host')}
                  className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-amber-900 bg-amber-50/80 hover:bg-amber-100 border border-amber-200/70 transition cursor-pointer shadow-xs"
                >
                  <div className="flex items-center space-x-3">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>Become a Host</span>
                  </div>
                  <span className="text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-amber-200 text-amber-900">Earn</span>
                </button>

                {/* 13. Sign Out / Log Out */}
                <button
                  onClick={signOut}
                  className="w-full flex items-center space-x-3 px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium text-neutral-600 hover:text-red-600 hover:bg-red-50/50 transition cursor-pointer"
                >
                  <Power className="w-4 h-4 text-neutral-500" />
                  <span>Sign Out</span>
                </button>

              </nav>

            </div>
          </aside>

          {/* ================= RIGHT MAIN CONTENT AREA ================= */}
          <main className="flex-1 min-w-0 space-y-6">
            
            {/* Header: Title + Action Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h1 className="text-2xl sm:text-3xl font-light text-neutral-800 tracking-tight">
                {activeTab === 'overview' && 'Dashboard'}
                {activeTab === 'profile' && 'My Profile'}
                {activeTab === 'listings' && 'My Listings'}
                {activeTab === 'add_listing' && 'Add New Listing'}
                {activeTab === 'calendar' && 'All In One Calendar'}
                {activeTab === 'favorites' && 'Favorites'}
                {activeTab === 'bookings' && 'My Bookings'}
                {activeTab === 'reservations' && 'My Reservations'}
                {activeTab === 'reviews' && 'My Reviews'}
                {activeTab === 'inbox' && 'My Inbox'}
                {activeTab === 'invoices' && 'Invoices'}
              </h1>

              <div className="flex items-center flex-wrap gap-2">
                {/* Become a Host Button */}
                <button
                  onClick={() => openModal('become_host')}
                  className="flex items-center space-x-1.5 px-3.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-200/80 text-xs font-bold rounded-full shadow-xs transition cursor-pointer"
                  title="List Luxury Villa, Stays, or Assets"
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                  <span>Become a Host</span>
                </button>

                {/* Switch Account Button */}
                <button
                  onClick={() => openModal('switch_account')}
                  className="flex items-center space-x-2 px-3 py-1.5 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-medium rounded-full border border-neutral-200 shadow-xs transition cursor-pointer"
                  title="Switch Persona / Account"
                >
                  <img 
                    src={currentUser.avatar} 
                    alt={currentUser.name} 
                    className="w-4 h-4 rounded-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="hidden sm:inline">Switch Account</span>
                </button>

                {/* Front Page Button */}
                <button
                  onClick={() => navigateTo('home')}
                  className="px-3.5 py-1.5 bg-white hover:bg-neutral-50 text-neutral-700 text-xs font-semibold rounded-full border border-neutral-200 shadow-xs transition cursor-pointer"
                >
                  Front Page
                </button>

                {/* Sign Out Button */}
                <button
                  onClick={signOut}
                  className="flex items-center space-x-1 px-3 py-1.5 bg-white hover:bg-rose-50 text-rose-600 border border-rose-200/70 text-xs font-medium rounded-full shadow-xs transition cursor-pointer"
                  title="Sign Out Session"
                >
                  <Power className="w-3.5 h-3.5 text-rose-500" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>

                {/* Notification Bell Button */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifDropdown(!showNotifDropdown)}
                    className="w-9 h-9 rounded-full bg-white shadow-xs border border-neutral-200 flex items-center justify-center text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 transition cursor-pointer relative"
                    title="Notifications"
                  >
                    <Bell className="w-4 h-4" />
                    <span className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full bg-[#f15959] text-white text-[10px] font-bold flex items-center justify-center">
                      {unreadNotificationCount || 14}
                    </span>
                  </button>

                  {/* Notification Dropdown */}
                  {showNotifDropdown && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-xl border border-neutral-200 p-4 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex items-center justify-between pb-3 border-b border-neutral-100">
                        <span className="text-xs font-bold text-neutral-900">Notifications</span>
                        <button 
                          onClick={markAllNotificationsRead}
                          className="text-[11px] text-[#f15959] hover:underline font-semibold"
                        >
                          Mark all as read
                        </button>
                      </div>
                      <div className="mt-3 space-y-2 max-h-64 overflow-y-auto">
                        {notifications.map(n => (
                          <div key={n.id} className="p-2.5 rounded-xl bg-neutral-50 hover:bg-neutral-100/70 transition text-xs">
                            <p className="font-bold text-neutral-800">{n.title}</p>
                            <p className="text-[11px] text-neutral-500 mt-0.5">{n.message}</p>
                            <span className="text-[10px] text-neutral-400 mt-1 block">{n.createdAt}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* TAB: OVERVIEW (EXACT RECREATION OF SCREENSHOT) */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                
                {/* Top Card: Account Summary & Next Bookings */}
                <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-sm">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-100">
                    
                    {/* Left Column: Account Summary */}
                    <div>
                      <h3 className="text-sm font-bold text-neutral-900 mb-3.5">
                        Account Summary
                      </h3>
                      <div className="space-y-1.5 text-xs sm:text-sm text-neutral-600">
                        <p>
                          Total Properties: <span className="font-semibold text-neutral-800">{totalPropertiesCount}</span>
                        </p>
                        <p>
                          Published Properties: <span className="font-semibold text-neutral-800">{publishedPropertiesCount}</span>
                        </p>
                        <p>
                          Favorite Properties: <span className="font-semibold text-neutral-800">{favorites.length}</span>
                        </p>
                      </div>
                    </div>

                    {/* Right Column: Next Bookings */}
                    <div className="pt-6 md:pt-0 md:pl-8">
                      <h3 className="text-sm font-bold text-neutral-900 mb-3.5">
                        Next Bookings
                      </h3>
                      
                      {upcomingBookings.length === 0 ? (
                        <p className="text-xs sm:text-sm text-neutral-500">
                          You don't have any upcoming bookings
                        </p>
                      ) : (
                        <div className="space-y-3">
                          {upcomingBookings.slice(0, 2).map(b => (
                            <div key={b.id} className="text-xs text-neutral-600 bg-neutral-50 p-2.5 rounded-xl border border-neutral-100">
                              <p className="font-bold text-neutral-800">{b.itemTitle}</p>
                              <p className="text-[11px] text-neutral-500 mt-0.5">Date: {b.date} • {b.time} ({b.userName})</p>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </div>

                {/* Bottom Row: Bookings Chart & Account History */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  
                  {/* Left Column: Bookings – last 30 days Card */}
                  <div className="lg:col-span-7 xl:col-span-8 bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-sm">
                    
                    {/* Header: Title & Legend */}
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-sm font-bold text-neutral-900">
                        Bookings – last 30 days
                      </h3>
                      <div className="flex items-center space-x-1.5 text-xs text-neutral-500">
                        <div className="w-3 h-3 bg-neutral-300 rounded-sm" />
                        <span>Bookings value</span>
                      </div>
                    </div>

                    {/* Chart Container */}
                    <div className="relative w-full overflow-hidden">
                      <svg 
                        viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
                        className="w-full h-auto overflow-visible select-none"
                      >
                        <defs>
                          <linearGradient id="bookingAreaGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#94a3b8" stopOpacity="0.35" />
                            <stop offset="100%" stopColor="#cbd5e1" stopOpacity="0.05" />
                          </linearGradient>
                        </defs>

                        {/* Horizontal Grid lines & Y-axis labels (0, 10, 20 ... 100) */}
                        {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map(val => {
                          const y = paddingTop + chartH - (val / 100) * chartH;
                          return (
                            <g key={val}>
                              <line 
                                x1={paddingLeft} 
                                y1={y} 
                                x2={svgWidth - paddingRight} 
                                y2={y} 
                                stroke="#f1f5f9" 
                                strokeWidth="1"
                              />
                              <text 
                                x={paddingLeft - 8} 
                                y={y + 3.5} 
                                textAnchor="end" 
                                fontSize="9" 
                                fill="#94a3b8" 
                                fontFamily="sans-serif"
                              >
                                {val}
                              </text>
                            </g>
                          );
                        })}

                        {/* X-axis date labels */}
                        {chartData.map((d, i) => {
                          const x = paddingLeft + (i / (chartData.length - 1)) * chartW;
                          return (
                            <text
                              key={i}
                              x={x}
                              y={paddingTop + chartH + 16}
                              textAnchor="middle"
                              fontSize="8.5"
                              fill="#94a3b8"
                              fontFamily="sans-serif"
                            >
                              {d.label}
                            </text>
                          );
                        })}

                        {/* Shaded Area Fill */}
                        <path 
                          d={areaPath} 
                          fill="url(#bookingAreaGrad)" 
                        />

                        {/* Spline Line */}
                        <path 
                          d={curvePath} 
                          fill="none" 
                          stroke="#94a3b8" 
                          strokeWidth="1.5" 
                        />

                        {/* Data Points */}
                        {points.map((p, i) => (
                          <circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r={hoveredPoint?.day === i ? 4.5 : 2}
                            fill={hoveredPoint?.day === i ? '#f15959' : '#64748b'}
                            className="cursor-pointer transition-all duration-150"
                            onMouseEnter={() => setHoveredPoint({ day: i, date: p.date, value: p.value })}
                            onMouseLeave={() => setHoveredPoint(null)}
                          />
                        ))}
                      </svg>

                      {/* Tooltip */}
                      {hoveredPoint && (
                        <div className="absolute top-2 right-4 bg-slate-900 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg shadow-lg pointer-events-none">
                          <span>{hoveredPoint.date}: {hoveredPoint.value} Bookings value</span>
                        </div>
                      )}
                    </div>

                  </div>

                  {/* Right Column: Account History (last 7 days) Card */}
                  <div className="lg:col-span-5 xl:col-span-4 bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-sm">
                    <h3 className="text-sm font-bold text-neutral-900 mb-4">
                      Account History (last 7 days)
                    </h3>

                    <div className="space-y-3.5 max-h-[380px] overflow-y-auto pr-1">
                      {activities.slice(0, 10).map((act) => (
                        <div key={act.id} className="text-xs">
                          <p className="text-neutral-400 font-normal text-[11px]">
                            {act.timestamp}
                          </p>
                          <p className="font-bold text-neutral-900 mt-0.5">
                            {act.action}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

              </div>
            )}

            {/* TAB: MY PROFILE */}
            {activeTab === 'profile' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/70 shadow-sm">
                <h2 className="text-base font-bold text-neutral-900 mb-6">Edit Profile Details</h2>
                <form onSubmit={handleSaveProfile} className="space-y-4 max-w-xl">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Full Name</label>
                    <input 
                      type="text" 
                      value={profileName}
                      onChange={e => setProfileName(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address</label>
                    <input 
                      type="email" 
                      value={profileEmail}
                      onChange={e => setProfileEmail(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Phone Number</label>
                    <input 
                      type="text" 
                      value={profilePhone}
                      onChange={e => setProfilePhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Location / Suburb</label>
                    <input 
                      type="text" 
                      value={profileLocation}
                      onChange={e => setProfileLocation(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Bio / Agency Statement</label>
                    <textarea 
                      rows={3}
                      value={profileBio}
                      onChange={e => setProfileBio(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

            {/* TAB: MY LISTINGS */}
            {activeTab === 'listings' && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-neutral-500">{userProperties.length} Total properties assigned to your account</p>
                  <button
                    onClick={() => setActiveTab('add_listing')}
                    className="px-4 py-2 bg-[#f15959] hover:bg-[#e04848] text-white text-xs font-bold rounded-xl shadow-sm transition flex items-center space-x-1.5 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add New Listing</span>
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {userProperties.map(prop => (
                    <div key={prop.id} className="bg-white rounded-2xl p-4 border border-neutral-200/70 shadow-sm flex gap-4">
                      <img 
                        src={prop.featuredImage || prop.images[0]} 
                        alt={prop.title}
                        className="w-24 h-24 object-cover rounded-xl shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="px-2 py-0.5 bg-neutral-100 text-neutral-700 text-[10px] font-bold rounded-md uppercase">
                              {prop.purpose}
                            </span>
                            <span className="text-xs font-black text-neutral-900">{formatPrice(prop.price)}</span>
                          </div>
                          <h4 className="text-xs font-bold text-neutral-900 line-clamp-1 mt-1">{prop.title}</h4>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">{prop.address || `${prop.area}, ${prop.city}`}</p>
                        </div>
                        <div className="flex items-center space-x-2 pt-2 border-t border-neutral-100 text-[11px] text-neutral-500">
                          <span>{prop.bedrooms} Beds</span>
                          <span>•</span>
                          <span>{prop.bathrooms} Baths</span>
                          <span>•</span>
                          <span>{prop.propertySizeSqft} sqft</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: ADD NEW LISTING */}
            {activeTab === 'add_listing' && (
              <div className="bg-white rounded-2xl p-6 sm:p-8 border border-neutral-200/70 shadow-sm">
                <h2 className="text-base font-bold text-neutral-900 mb-6">Create New Listing</h2>
                <form onSubmit={handleCreateListing} className="space-y-4 max-w-2xl">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Listing Title</label>
                    <input 
                      type="text" 
                      placeholder="e.g. Modern Boutique Villa in Karen"
                      value={listingTitle}
                      onChange={e => setListingTitle(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      required
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Price (USD)</label>
                      <input 
                        type="number" 
                        value={listingPrice}
                        onChange={e => setListingPrice(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Purpose</label>
                      <select 
                        value={listingPurpose}
                        onChange={e => setListingPurpose(e.target.value as Purpose)}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      >
                        <option value="buy">For Sale</option>
                        <option value="rent">For Rent</option>
                        <option value="stay">Short Stay</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Property Type</label>
                      <select 
                        value={listingType}
                        onChange={e => setListingType(e.target.value as PropertyType)}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      >
                        <option value="villa">Villa</option>
                        <option value="house">House</option>
                        <option value="apartment">Apartment</option>
                        <option value="bungalow">Bungalow</option>
                        <option value="penthouse">Penthouse</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Bedrooms</label>
                      <input 
                        type="number" 
                        value={listingBedrooms}
                        onChange={e => setListingBedrooms(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Bathrooms</label>
                      <input 
                        type="number" 
                        value={listingBathrooms}
                        onChange={e => setListingBathrooms(Number(e.target.value))}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">City</label>
                      <input 
                        type="text" 
                        value={listingCity}
                        onChange={e => setListingCity(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-neutral-700 mb-1">Area</label>
                      <input 
                        type="text" 
                        value={listingArea}
                        onChange={e => setListingArea(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Image URL</label>
                    <input 
                      type="text" 
                      value={listingImage}
                      onChange={e => setListingImage(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    />
                  </div>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white text-xs font-bold rounded-xl shadow-md transition cursor-pointer"
                  >
                    Publish Listing Now
                  </button>
                </form>
              </div>
            )}

            {/* TAB: CALENDAR & BOOKINGS */}
            {(activeTab === 'calendar' || activeTab === 'bookings' || activeTab === 'reservations') && (
              <div className="space-y-4">
                <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-sm">
                  <h3 className="text-sm font-bold text-neutral-900 mb-4">Viewing & Reservation Appointments</h3>
                  <div className="space-y-3">
                    {bookings.map(b => (
                      <div key={b.id} className="p-4 rounded-xl bg-neutral-50 border border-neutral-200/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="text-xs font-bold text-neutral-900">{b.itemTitle}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${b.status === 'upcoming' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-700'}`}>
                              {b.status}
                            </span>
                          </div>
                          <p className="text-xs text-neutral-500 mt-1">Client: {b.userName} • Phone: {b.userPhone} • Date: {b.date} at {b.time}</p>
                        </div>

                        <div className="flex items-center space-x-2 shrink-0">
                          {b.status === 'upcoming' && (
                            <button
                              onClick={() => handleBookingStatusChange(b.id, 'completed')}
                              className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-semibold rounded-lg shadow-sm transition cursor-pointer"
                            >
                              Mark Completed
                            </button>
                          )}
                          <button
                            onClick={() => handleBookingStatusChange(b.id, 'cancelled')}
                            className="px-3 py-1.5 bg-neutral-200 hover:bg-neutral-300 text-neutral-700 text-xs font-semibold rounded-lg transition cursor-pointer"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* TAB: INVOICES */}
            {activeTab === 'invoices' && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-neutral-900">Billing & Invoices</h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-neutral-200 text-neutral-500 font-bold">
                        <th className="py-2.5">Invoice #</th>
                        <th className="py-2.5">Description</th>
                        <th className="py-2.5">Amount</th>
                        <th className="py-2.5">Date</th>
                        <th className="py-2.5">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-neutral-100">
                      {invoices.map(inv => (
                        <tr key={inv.id}>
                          <td className="py-3 font-bold text-neutral-900">{inv.invoiceNumber}</td>
                          <td className="py-3 text-neutral-600">{inv.description}</td>
                          <td className="py-3 font-bold text-neutral-900">{formatPrice(inv.amount)}</td>
                          <td className="py-3 text-neutral-500">{inv.date}</td>
                          <td className="py-3">
                            <span className="px-2 py-0.5 bg-emerald-100 text-emerald-800 rounded-md font-bold text-[10px]">
                              {inv.status.toUpperCase()}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* TAB: FAVORITES */}
            {activeTab === 'favorites' && (
              <div className="space-y-4">
                <p className="text-xs text-neutral-500">{favorites.length} Saved properties in your favorites</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {properties.filter(p => favorites.includes(p.id)).map(prop => (
                    <div key={prop.id} className="bg-white rounded-2xl p-4 border border-neutral-200/70 shadow-sm flex gap-4">
                      <img 
                        src={prop.featuredImage || prop.images[0]} 
                        alt={prop.title}
                        className="w-24 h-24 object-cover rounded-xl shrink-0"
                        referrerPolicy="no-referrer"
                      />
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between">
                            <span className="text-xs font-black text-neutral-900">{formatPrice(prop.price)}</span>
                            <button 
                              onClick={() => toggleFavorite(prop.id)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <Heart className="w-4 h-4 fill-red-500 text-red-500" />
                            </button>
                          </div>
                          <h4 className="text-xs font-bold text-neutral-900 line-clamp-1 mt-1">{prop.title}</h4>
                          <p className="text-[11px] text-neutral-500 line-clamp-1">{prop.address || `${prop.area}, ${prop.city}`}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TAB: REVIEWS */}
            {activeTab === 'reviews' && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-neutral-900">Client Reviews & Testimonials</h3>
                <div className="space-y-4">
                  <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-xs text-neutral-900">Ambassador Richard Mwangi</span>
                      <div className="flex text-amber-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-amber-400" />
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-neutral-600 mt-2 italic">
                      "Outstanding professionalism & discrete advisory. Nayyar guided us seamlessly through purchasing our family residence in Karen."
                    </p>
                    <span className="text-[10px] text-neutral-400 mt-2 block">Verified Client • Karen Residence</span>
                  </div>
                </div>
              </div>
            )}

            {/* TAB: INBOX */}
            {activeTab === 'inbox' && (
              <div className="bg-white rounded-2xl p-6 border border-neutral-200/70 shadow-sm space-y-4">
                <h3 className="text-sm font-bold text-neutral-900">Direct Inquiries & Messages</h3>
                <div className="p-4 rounded-xl bg-neutral-50 border border-neutral-100 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 font-bold flex items-center justify-center text-xs">
                        MV
                      </div>
                      <div>
                        <h4 className="font-bold text-xs text-neutral-900">Marcus Vance</h4>
                        <p className="text-[10px] text-neutral-400">Re: The Orchid Grand Estate - Karen</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-neutral-400">10:45 AM</span>
                  </div>
                  <p className="text-xs text-neutral-600 bg-white p-3 rounded-lg border border-neutral-100">
                    "Looking forward to the Saturday viewing in Karen. Can you have the title deed plan copy on hand?"
                  </p>
                </div>
              </div>
            )}

          </main>

        </div>

      </div>

    </div>
  );
};
