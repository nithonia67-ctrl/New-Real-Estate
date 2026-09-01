import React, { useState, useEffect } from 'react';
import { 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Car, 
  Building2, 
  Calculator, 
  DollarSign, 
  Percent, 
  Phone, 
  Mail, 
  User as UserIcon, 
  ShieldCheck,
  Compass,
  ArrowRight,
  Sparkles,
  Upload,
  Image as ImageIcon,
  Trash2,
  Lock,
  Eye,
  EyeOff,
  AlertCircle,
  Plus,
  Check,
  BedDouble,
  Bath,
  Maximize,
  MapPin
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AppStore } from '../../services/store';
import { Property, PropertyType, Purpose, UserRole } from '../../types';

const SAMPLE_PRESET_IMAGES = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1200&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1542314831-c6a4d27f3944?w=1200&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&auto=format&fit=crop&q=85',
  'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&auto=format&fit=crop&q=85'
];

export const GlobalModalContainer: React.FC = () => {
  const { 
    activeModal, 
    modalData, 
    closeModal, 
    showToast, 
    formatPrice, 
    currency, 
    refreshBookings, 
    refreshLeads,
    currentUser,
    switchUser,
    allUsers,
    navigateTo,
    becomeHost,
    signIn,
    signUp,
    addProperty,
    updateProperty,
    deleteProperty
  } = useApp();

  // Auth Tab State
  const [authTab, setAuthTab] = useState<'signin' | 'signup' | 'switch'>('signin');
  const [authEmail, setAuthEmail] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authName, setAuthName] = useState('');
  const [authPhone, setAuthPhone] = useState('');
  const [authRole, setAuthRole] = useState<UserRole>('buyer');
  const [authError, setAuthError] = useState<string | null>(null);
  const [authLoading, setAuthLoading] = useState(false);

  // Property Form State (Add / Edit)
  const [propTitle, setPropTitle] = useState('');
  const [propPurpose, setPropPurpose] = useState<Purpose>('stay');
  const [propType, setPropType] = useState<PropertyType>('villa');
  const [propPrice, setPropPrice] = useState<number>(350);
  const [propCurrency, setPropCurrency] = useState<'USD' | 'KES' | 'TZS'>('USD');
  const [propCity, setPropCity] = useState('Nairobi');
  const [propArea, setPropArea] = useState('Karen');
  const [propAddress, setPropAddress] = useState('Miotoni Road, Karen');
  const [propBeds, setPropBeds] = useState<number>(4);
  const [propBaths, setPropBaths] = useState<number>(4);
  const [propSize, setPropSize] = useState<number>(3200);
  const [propDescription, setPropDescription] = useState('');
  const [propImages, setPropImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85'
  ]);
  const [propFeaturedImage, setPropFeaturedImage] = useState<string>(
    'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&auto=format&fit=crop&q=85'
  );
  const [propFeatures, setPropFeatures] = useState<string[]>([
    'Swimming Pool',
    'High Speed Wi-Fi',
    'Solar Power Backup',
    'Gated Security'
  ]);

  // Host Modal State
  const [hostTitle, setHostTitle] = useState('');
  const [hostCategory, setHostCategory] = useState('villa');
  const [hostCity, setHostCity] = useState('Nairobi');
  const [hostArea, setHostArea] = useState('Karen');
  const [hostPrice, setHostPrice] = useState<number>(350);
  const [hostBio, setHostBio] = useState('Verified Luxury Host offering discrete 5-star East African stays.');

  // Viewing / Test Drive State
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date, setDate] = useState('2026-09-15');
  const [time, setTime] = useState('11:00 AM');
  const [notes, setNotes] = useState('');

  // Mortgage Calculator State
  const [propertyPrice, setPropertyPrice] = useState<number>(500000);
  const [downPaymentPercent, setDownPaymentPercent] = useState<number>(20);
  const [loanTermYears, setLoanTermYears] = useState<number>(20);
  const [interestRate, setInterestRate] = useState<number>(11.5);

  // Vehicle Trade-In Calculator State
  const [vehicleMake, setVehicleMake] = useState('Toyota');
  const [vehicleModel, setVehicleModel] = useState('Prado TX-L');
  const [vehicleYear, setVehicleYear] = useState(2019);
  const [vehicleMileage, setVehicleMileage] = useState(65000);

  // Initialize data when modal opens
  useEffect(() => {
    if (activeModal === 'sign_in') setAuthTab('signin');
    if (activeModal === 'sign_up') setAuthTab('signup');
    if (activeModal === 'switch_account') setAuthTab('switch');
    if (activeModal === 'auth') setAuthTab('signin');

    if (activeModal === 'edit_property' && modalData) {
      const p = modalData as Property;
      setPropTitle(p.title || '');
      setPropPurpose(p.purpose || 'stay');
      setPropType(p.propertyType || 'villa');
      setPropPrice(p.price || 500);
      setPropCurrency(p.currency as any || 'USD');
      setPropCity(p.city || 'Nairobi');
      setPropArea(p.area || 'Karen');
      setPropAddress(p.address || '');
      setPropBeds(p.bedrooms || 3);
      setPropBaths(p.bathrooms || 3);
      setPropSize(p.propertySizeSqft || 2500);
      setPropDescription(p.description || '');
      setPropImages(p.images && p.images.length > 0 ? p.images : [p.featuredImage]);
      setPropFeaturedImage(p.featuredImage || (p.images && p.images[0]) || '');
      setPropFeatures(p.features || []);
    } else if (activeModal === 'add_property') {
      setPropTitle('');
      setPropPurpose('stay');
      setPropType('villa');
      setPropPrice(350);
      setPropCurrency('USD');
      setPropCity('Nairobi');
      setPropArea('Karen');
      setPropAddress('Miotoni Road, Karen');
      setPropBeds(3);
      setPropBaths(3);
      setPropSize(2800);
      setPropDescription('Exquisite contemporary residence offering panoramic garden views, solar backup, high security, and refined luxury finishings.');
      setPropImages([SAMPLE_PRESET_IMAGES[0], SAMPLE_PRESET_IMAGES[1]]);
      setPropFeaturedImage(SAMPLE_PRESET_IMAGES[0]);
      setPropFeatures(['Swimming Pool', 'High Speed Wi-Fi', 'Solar Backup', '24/7 Security']);
    }

    if (modalData?.price) {
      setPropertyPrice(modalData.price);
    }
  }, [activeModal, modalData]);

  if (!activeModal) return null;

  // Handle Authentication Submission
  const handleAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setAuthLoading(true);

    setTimeout(() => {
      setAuthLoading(false);
      if (authTab === 'signin') {
        if (!authEmail) {
          setAuthError('Please enter your email address');
          return;
        }
        const success = signIn(authEmail);
        if (success) {
          closeModal();
          navigateTo('dashboard_overview');
        } else {
          setAuthError(`No account found for "${authEmail}". Try sarah.j@gmail.com, nayyar@safarinest.africa, or sign up below.`);
        }
      } else if (authTab === 'signup') {
        if (!authName || !authEmail) {
          setAuthError('Please provide your name and email address');
          return;
        }
        const existing = allUsers.find(u => u.email.toLowerCase() === authEmail.toLowerCase());
        if (existing) {
          setAuthError('An account with this email already exists. Please sign in instead.');
          return;
        }
        signUp({
          name: authName,
          email: authEmail,
          phone: authPhone || '+254 700 000 000',
          role: authRole,
          location: 'Nairobi, East Africa'
        });
        closeModal();
        navigateTo('dashboard_overview');
      }
    }, 300);
  };

  // Handle Booking Schedule Submit
  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Please fill in your contact information');
      return;
    }

    const type = activeModal === 'test_drive' ? 'vehicle_test_drive' : 'property_viewing';
    
    AppStore.addBooking({
      userId: currentUser?.id || 'usr_nayyar',
      userName: name,
      userEmail: email,
      userPhone: phone,
      type: type,
      itemId: modalData?.id || 'item_default',
      itemTitle: modalData?.title || 'East Africa Premium Listing',
      itemType: modalData?.propertyType ? 'Property' : 'Vehicle',
      date: date,
      time: time,
      status: 'upcoming',
      notes: notes
    });

    AppStore.addLead({
      name: name,
      email: email,
      phone: phone,
      source: 'Website Inquiry',
      interestedItemType: modalData?.propertyType ? 'property' : 'vehicle',
      interestedItemId: modalData?.id,
      interestedItemTitle: modalData?.title || 'East Africa Premium Listing',
      budget: modalData?.price || 250000,
      currency: currency,
      location: modalData?.city || 'Nairobi',
      status: 'viewing',
      agentId: modalData?.agentId || 'agent_nayyar',
      assignedAgentName: 'Nayyar Shaikh',
      score: 90,
      notes: `Booked ${type.replace('_', ' ')} on ${date} at ${time}. Note: ${notes}`,
      lastActivity: `Viewing booked for ${date}`,
      nextFollowUp: date,
      dealValue: modalData?.price || 250000
    });

    refreshBookings();
    refreshLeads();
    showToast(`Appointment confirmed! Confirmation sent to ${phone}.`);
    closeModal();
  };

  // Handle Image File Upload Simulation / Reader
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          const imgUrl = event.target.result as string;
          setPropImages(prev => [...prev, imgUrl]);
          if (!propFeaturedImage) setPropFeaturedImage(imgUrl);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Handle Property Save (Add / Edit)
  const handlePropertySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!propTitle.trim()) {
      showToast('Please enter a property title');
      return;
    }

    const featuredImg = propFeaturedImage || propImages[0] || SAMPLE_PRESET_IMAGES[0];
    const imagesList = propImages.length > 0 ? propImages : [featuredImg];

    if (activeModal === 'edit_property' && modalData?.id) {
      updateProperty(modalData.id, {
        title: propTitle,
        purpose: propPurpose,
        propertyType: propType,
        price: propPrice,
        currency: propCurrency,
        city: propCity,
        area: propArea,
        address: propAddress,
        bedrooms: propBeds,
        bathrooms: propBaths,
        propertySizeSqft: propSize,
        description: propDescription,
        images: imagesList,
        featuredImage: featuredImg,
        features: propFeatures
      });
      closeModal();
    } else {
      // Add new property
      const created = addProperty({
        title: propTitle,
        slug: propTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: propDescription,
        purpose: propPurpose,
        propertyType: propType,
        price: propPrice,
        currency: propCurrency,
        country: 'Kenya',
        region: 'East Africa',
        city: propCity,
        area: propArea,
        address: propAddress,
        bedrooms: propBeds,
        bathrooms: propBaths,
        propertySizeSqft: propSize,
        images: imagesList,
        featuredImage: featuredImg,
        features: propFeatures,
        amenities: ['24/7 Security', 'Concierge Host', 'Solar Inverter'],
        status: 'published',
        isFeatured: true,
        isVerified: true,
        agentId: currentUser.id
      });
      closeModal();
      navigateTo('property_detail', created.id);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/75 backdrop-blur-sm flex items-center justify-center p-3 sm:p-4 animate-in fade-in duration-200">
      
      <div className={`relative bg-white rounded-3xl w-full max-h-[92vh] overflow-y-auto p-5 sm:p-8 shadow-2xl border border-neutral-200/80 animate-in zoom-in-95 duration-200 ${
        activeModal === 'add_property' || activeModal === 'edit_property' ? 'max-w-3xl' : 'max-w-xl'
      }`}>
        
        {/* Close Button */}
        <button 
          onClick={closeModal}
          className="absolute top-5 right-5 p-2 rounded-full text-neutral-400 hover:text-neutral-900 hover:bg-neutral-100 transition cursor-pointer z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* 1. AUTH MODAL (SIGN IN / SIGN UP / PERSONAS) */}
        {(activeModal === 'auth' || activeModal === 'sign_in' || activeModal === 'sign_up' || activeModal === 'switch_account') && (
          <div>
            <div className="text-center max-w-sm mx-auto mb-6">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center mx-auto mb-3 shadow-md">
                <Building2 className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold text-neutral-900 tracking-tight">
                {authTab === 'signin' && 'Welcome to SWAHIVO'}
                {authTab === 'signup' && 'Create Your SWAHIVO Account'}
                {authTab === 'switch' && 'Demo Account Personas'}
              </h2>
              <p className="text-xs text-neutral-500 mt-1">
                {authTab === 'signin' && 'Access your luxury bookings, saved properties, and listings'}
                {authTab === 'signup' && 'Join East Africa’s premier verified property & stays marketplace'}
                {authTab === 'switch' && 'Quickly switch roles to test full multi-vendor permissions'}
              </p>
            </div>

            {/* Navigation Tabs */}
            <div className="flex bg-neutral-100 p-1 rounded-2xl mb-6">
              <button
                type="button"
                onClick={() => { setAuthTab('signin'); setAuthError(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  authTab === 'signin' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('signup'); setAuthError(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  authTab === 'signup' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Sign Up
              </button>
              <button
                type="button"
                onClick={() => { setAuthTab('switch'); setAuthError(null); }}
                className={`flex-1 py-2 text-xs font-bold rounded-xl transition ${
                  authTab === 'switch' ? 'bg-white text-neutral-900 shadow-xs' : 'text-neutral-600 hover:text-neutral-900'
                }`}
              >
                Switch Role
              </button>
            </div>

            {authError && (
              <div className="mb-4 p-3 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center space-x-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{authError}</span>
              </div>
            )}

            {/* SIGN IN FORM */}
            {authTab === 'signin' && (
              <form onSubmit={handleAuthSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="e.g. nayyar@safarinest.africa or sarah.j@gmail.com"
                      value={authEmail}
                      onChange={e => setAuthEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-xs font-bold text-neutral-700">Password</label>
                    <span className="text-[11px] text-neutral-400 cursor-pointer hover:underline">Forgot password?</span>
                  </div>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="••••••••••••"
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      required
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  {authLoading ? (
                    <span>Authenticating...</span>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>

                <div className="text-center pt-2">
                  <p className="text-xs text-neutral-500">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => setAuthTab('signup')}
                      className="text-neutral-900 font-bold hover:underline cursor-pointer"
                    >
                      Create one now
                    </button>
                  </p>
                </div>
              </form>
            )}

            {/* SIGN UP FORM */}
            {authTab === 'signup' && (
              <form onSubmit={handleAuthSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Full Name</label>
                  <div className="relative">
                    <UserIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      placeholder="e.g. Tariq Al-Maktoum or Amina Mwangi"
                      value={authName}
                      onChange={e => setAuthName(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Email Address</label>
                  <div className="relative">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      placeholder="e.g. amina@swahivo.com"
                      value={authEmail}
                      onChange={e => setAuthEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Phone / WhatsApp</label>
                    <div className="relative">
                      <Phone className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="tel"
                        placeholder="+254 712 345678"
                        value={authPhone}
                        onChange={e => setAuthPhone(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-700 mb-1">Account Role</label>
                    <select
                      value={authRole}
                      onChange={e => setAuthRole(e.target.value as UserRole)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    >
                      <option value="buyer">Guest & Buyer</option>
                      <option value="property_owner">Property Owner / Host</option>
                      <option value="agent">Licensed Estate Agent</option>
                      <option value="land_seller">Land & Plot Seller</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Password</label>
                  <div className="relative">
                    <Lock className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="password"
                      placeholder="Minimum 8 characters"
                      value={authPassword}
                      onChange={e => setAuthPassword(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-medium text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                      required
                    />
                  </div>
                </div>

                <div className="p-3 bg-neutral-50 border border-neutral-200/80 rounded-xl text-[11px] text-neutral-600 leading-relaxed">
                  By registering, you agree to SWAHIVO’s Verified Conveyance Charter and Privacy Terms.
                </div>

                <button
                  type="submit"
                  disabled={authLoading}
                  className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl transition shadow-md flex items-center justify-center space-x-1.5 cursor-pointer"
                >
                  {authLoading ? (
                    <span>Creating Account...</span>
                  ) : (
                    <>
                      <span>Complete Registration</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* SWITCH PERSONA TAB */}
            {authTab === 'switch' && (
              <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                {allUsers.map((user) => {
                  const isCurrent = user.id === currentUser.id;
                  return (
                    <div
                      key={user.id}
                      onClick={() => {
                        switchUser(user.id);
                        closeModal();
                      }}
                      className={`p-3 rounded-2xl border transition cursor-pointer flex items-center justify-between ${
                        isCurrent
                          ? 'border-neutral-900 bg-neutral-900 text-white shadow-xs'
                          : 'border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50 text-neutral-800'
                      }`}
                    >
                      <div className="flex items-center space-x-3 min-w-0">
                        <img 
                          src={user.avatar} 
                          alt={user.name} 
                          className="w-9 h-9 rounded-full object-cover shrink-0 border border-white/20"
                          referrerPolicy="no-referrer"
                        />
                        <div className="min-w-0">
                          <div className="flex items-center space-x-2">
                            <p className={`font-semibold text-xs truncate ${isCurrent ? 'text-white' : 'text-neutral-900'}`}>
                              {user.name}
                            </p>
                            <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                              isCurrent ? 'bg-white/20 text-white' : 'bg-neutral-100 text-neutral-600'
                            }`}>
                              {user.role.replace('_', ' ')}
                            </span>
                          </div>
                          <p className={`text-[11px] truncate ${isCurrent ? 'text-neutral-300' : 'text-neutral-500'}`}>
                            {user.email} • {user.location}
                          </p>
                        </div>
                      </div>

                      <div className="shrink-0 ml-2">
                        {isCurrent ? (
                          <span className="px-2.5 py-1 rounded-full bg-emerald-500 text-white text-[10px] font-bold flex items-center space-x-1">
                            <CheckCircle2 className="w-3 h-3" />
                            <span>Active</span>
                          </span>
                        ) : (
                          <span className="px-2.5 py-1 rounded-full border border-neutral-300 text-neutral-600 text-[10px] font-semibold hover:bg-neutral-100">
                            Switch
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

          </div>
        )}

        {/* 2. ADD & EDIT PROPERTY FORM */}
        {(activeModal === 'add_property' || activeModal === 'edit_property') && (
          <div>
            <div className="flex items-center space-x-3 mb-6 pb-4 border-b border-neutral-100">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <Building2 className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-neutral-900">
                  {activeModal === 'edit_property' ? 'Edit Property Listing' : 'List a Luxury Property or Stay'}
                </h2>
                <p className="text-xs text-neutral-500">
                  {activeModal === 'edit_property' ? 'Update pricing, images, and features' : 'Publish your property to verified East African diaspora & global guests'}
                </p>
              </div>
            </div>

            <form onSubmit={handlePropertySubmit} className="space-y-5">
              
              {/* Basic Details */}
              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Property Title</label>
                  <input
                    type="text"
                    value={propTitle}
                    onChange={e => setPropTitle(e.target.value)}
                    placeholder="e.g. Oceanfront Private Coral Villa, Nungwi"
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Listing Purpose</label>
                    <select
                      value={propPurpose}
                      onChange={e => setPropPurpose(e.target.value as Purpose)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    >
                      <option value="stay">Vacation / Short Stay (Nightly)</option>
                      <option value="sale">For Sale (Outright Acquisition)</option>
                      <option value="rent">Long-term Rent (Monthly)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Property Type</label>
                    <select
                      value={propType}
                      onChange={e => setPropType(e.target.value as PropertyType)}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    >
                      <option value="villa">Luxury Villa</option>
                      <option value="apartment">Executive Apartment</option>
                      <option value="house">Detached House</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="condo">Modern Condo</option>
                      <option value="land">Prime Titled Plot</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Price & Currency</label>
                    <div className="flex space-x-1.5">
                      <select
                        value={propCurrency}
                        onChange={e => setPropCurrency(e.target.value as any)}
                        className="w-20 px-2 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="KES">KES (KSh)</option>
                        <option value="TZS">TZS (TSh)</option>
                      </select>
                      <input
                        type="number"
                        value={propPrice}
                        onChange={e => setPropPrice(Number(e.target.value))}
                        className="flex-1 px-3 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">City / Region</label>
                    <input
                      type="text"
                      value={propCity}
                      onChange={e => setPropCity(e.target.value)}
                      placeholder="e.g. Zanzibar or Nairobi"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Neighborhood / Area</label>
                    <input
                      type="text"
                      value={propArea}
                      onChange={e => setPropArea(e.target.value)}
                      placeholder="e.g. Karen, Westlands, Nungwi"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Full Address / Landmark</label>
                    <input
                      type="text"
                      value={propAddress}
                      onChange={e => setPropAddress(e.target.value)}
                      placeholder="e.g. Coral Ridge Avenue"
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                {/* Specs */}
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Bedrooms</label>
                    <input
                      type="number"
                      value={propBeds}
                      onChange={e => setPropBeds(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Bathrooms</label>
                    <input
                      type="number"
                      value={propBaths}
                      onChange={e => setPropBaths(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-neutral-800 mb-1">Size (Sq Ft)</label>
                    <input
                      type="number"
                      value={propSize}
                      onChange={e => setPropSize(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-900 focus:outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-800 mb-1">Property Description</label>
                  <textarea
                    rows={3}
                    value={propDescription}
                    onChange={e => setPropDescription(e.target.value)}
                    placeholder="Describe views, interior finishes, architecture, and surrounding amenities..."
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-normal text-neutral-900 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  />
                </div>
              </div>

              {/* Photo Gallery & Upload System */}
              <div className="pt-2 border-t border-neutral-100">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-neutral-800">
                    Property Photography ({propImages.length} photos)
                  </label>
                  <span className="text-[11px] text-neutral-500">Click photo to set as featured cover</span>
                </div>

                {/* Upload Input & Presets */}
                <div className="flex flex-wrap gap-2 mb-3">
                  <label className="px-3.5 py-2 bg-neutral-900 hover:bg-neutral-800 text-white rounded-xl text-xs font-bold flex items-center space-x-1.5 cursor-pointer shadow-xs">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Images from Device</span>
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      const next = SAMPLE_PRESET_IMAGES[propImages.length % SAMPLE_PRESET_IMAGES.length];
                      setPropImages(prev => [...prev, next]);
                    }}
                    className="px-3 py-2 bg-neutral-100 hover:bg-neutral-200 text-neutral-800 rounded-xl text-xs font-semibold flex items-center space-x-1 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add Preset Luxury Photo</span>
                  </button>
                </div>

                {/* Image Thumbnails Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5 max-h-48 overflow-y-auto p-1 bg-neutral-50 rounded-2xl border border-neutral-200/80">
                  {propImages.map((img, idx) => {
                    const isFeatured = propFeaturedImage === img;
                    return (
                      <div
                        key={idx}
                        onClick={() => setPropFeaturedImage(img)}
                        className={`relative aspect-video rounded-xl overflow-hidden cursor-pointer border-2 transition group ${
                          isFeatured ? 'border-neutral-900 ring-2 ring-neutral-900/20' : 'border-transparent hover:border-neutral-400'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt="Thumbnail" 
                          className="w-full h-full object-cover" 
                          referrerPolicy="no-referrer"
                        />
                        {isFeatured && (
                          <span className="absolute top-1 left-1 px-1.5 py-0.5 rounded-md bg-neutral-900 text-white text-[9px] font-bold">
                            Cover
                          </span>
                        )}
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPropImages(prev => prev.filter((_, i) => i !== idx));
                            if (isFeatured && propImages.length > 1) {
                              setPropFeaturedImage(propImages.find((_, i) => i !== idx) || '');
                            }
                          }}
                          className="absolute top-1 right-1 p-1 rounded-md bg-black/60 text-white hover:bg-rose-600 transition opacity-0 group-hover:opacity-100"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2.5 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-md transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>{activeModal === 'edit_property' ? 'Save Changes' : 'Publish Property'}</span>
                  <Check className="w-4 h-4" />
                </button>
              </div>

            </form>
          </div>
        )}

        {/* 3. DELETE PROPERTY MODAL */}
        {activeModal === 'delete_property' && modalData && (
          <div className="text-center py-2">
            <div className="w-12 h-12 rounded-2xl bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-4">
              <Trash2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-neutral-900">Delete this property?</h3>
            <p className="text-xs text-neutral-500 max-w-sm mx-auto mt-1 mb-6">
              Are you sure you want to delete <strong className="text-neutral-800">"{modalData.title}"</strong>? This will remove the listing from public marketplace search and your user dashboard.
            </p>

            <div className="flex items-center justify-center space-x-3">
              <button
                type="button"
                onClick={closeModal}
                className="px-5 py-2.5 text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded-xl transition cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  deleteProperty(modalData.id);
                  closeModal();
                }}
                className="px-5 py-2.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl shadow-sm transition cursor-pointer"
              >
                Delete Property
              </button>
            </div>
          </div>
        )}

        {/* 4. BECOME A HOST MODAL */}
        {activeModal === 'become_host' && (
          <div>
            <div className="flex items-center space-x-3 mb-5">
              <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900">Become a SWAHIVO Host</h3>
                <p className="text-xs text-neutral-500">List luxury villas, boutique short-stays, prime land, or concierge transport.</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                becomeHost({
                  title: hostTitle || `${currentUser.name}'s Luxury Retreat`,
                  category: hostCategory,
                  city: hostCity,
                  area: hostArea,
                  price: hostPrice,
                  bio: hostBio
                });
                closeModal();
                navigateTo('dashboard_overview');
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Listing / Property Name</label>
                <input
                  type="text"
                  placeholder="e.g. The Palms Private Oceanfront Villa"
                  value={hostTitle}
                  onChange={(e) => setHostTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-semibold"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Hosting Category</label>
                  <select
                    value={hostCategory}
                    onChange={(e) => setHostCategory(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                  >
                    <option value="villa">Luxury Villa & Residence</option>
                    <option value="stay">Boutique Short Stay</option>
                    <option value="safari">Safari Camp / Lodge</option>
                    <option value="land">Prime Investment Land</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Nightly / Base Rate (USD)</label>
                  <input
                    type="number"
                    value={hostPrice}
                    onChange={(e) => setHostPrice(Number(e.target.value))}
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-semibold"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Destination City</label>
                  <input
                    type="text"
                    value={hostCity}
                    onChange={(e) => setHostCity(e.target.value)}
                    placeholder="e.g. Zanzibar, Diani, Nairobi"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 mb-1">Area / Suburb</label>
                  <input
                    type="text"
                    value={hostArea}
                    onChange={(e) => setHostArea(e.target.value)}
                    placeholder="e.g. Nungwi, Karen, Muthaiga"
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 mb-1">Host Bio & Standards</label>
                <textarea
                  rows={2}
                  value={hostBio}
                  onChange={(e) => setHostBio(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs bg-neutral-50 rounded-xl border border-neutral-200 focus:outline-none focus:ring-2 focus:ring-neutral-900 font-normal"
                />
              </div>

              <div className="p-3 bg-amber-50 border border-amber-200/60 rounded-xl flex items-start space-x-2.5 text-xs text-amber-900">
                <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p className="text-[11px] leading-relaxed">
                  By becoming a host, your account will be verified and you will gain direct access to our international high-net-worth buyers & renters network with 0% upfront listing fees.
                </p>
              </div>

              <div className="flex items-center justify-end space-x-2.5 pt-3 border-t border-neutral-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 text-xs font-bold text-white bg-neutral-900 hover:bg-neutral-800 rounded-xl shadow-md transition flex items-center space-x-1.5 cursor-pointer"
                >
                  <span>Activate Host Account</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 5. SCHEDULE VIEWING / TEST DRIVE */}
        {(activeModal === 'schedule_viewing' || activeModal === 'test_drive') && (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                {activeModal === 'test_drive' ? <Car className="w-6 h-6" /> : <Building2 className="w-6 h-6" />}
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900">
                  {activeModal === 'test_drive' ? 'Book Private Test Drive' : 'Schedule VIP Viewing'}
                </h3>
                <p className="text-xs text-neutral-500 line-clamp-1">{modalData?.title}</p>
              </div>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Preferred Date</label>
                  <input 
                    type="date" 
                    value={date} 
                    onChange={e => setDate(e.target.value)} 
                    required 
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Preferred Time</label>
                  <select 
                    value={time} 
                    onChange={e => setTime(e.target.value)}
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none"
                  >
                    <option>09:00 AM - 10:30 AM</option>
                    <option>11:00 AM - 12:30 PM</option>
                    <option>02:00 PM - 03:30 PM</option>
                    <option>04:30 PM - 06:00 PM</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Your Full Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. Sarah Jenkins"
                  value={name} 
                  onChange={e => setName(e.target.value)} 
                  required 
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none" 
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Email Address</label>
                  <input 
                    type="email" 
                    placeholder="sarah@example.com"
                    value={email} 
                    onChange={e => setEmail(e.target.value)} 
                    required 
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Phone (WhatsApp)</label>
                  <input 
                    type="tel" 
                    placeholder="+254 700 000000"
                    value={phone} 
                    onChange={e => setPhone(e.target.value)} 
                    required 
                    className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold text-neutral-800 focus:outline-none" 
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Special Requirements / Notes</label>
                <textarea 
                  rows={2} 
                  placeholder="Interested in title deed verification, mortgage options, or airport pickup..."
                  value={notes} 
                  onChange={e => setNotes(e.target.value)} 
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-normal text-neutral-800 focus:outline-none" 
                />
              </div>

              <div className="p-3 bg-neutral-50 border border-neutral-200/70 rounded-xl text-[11px] text-neutral-500 flex items-center space-x-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Complimentary VIP chauffeur transfer available from airport or hotel upon request.</span>
              </div>

              <div className="flex items-center justify-end space-x-3 pt-3 border-t border-neutral-100">
                <button 
                  type="button" 
                  onClick={closeModal} 
                  className="px-4 py-2 text-xs font-semibold text-neutral-600 hover:bg-neutral-100 rounded-xl transition cursor-pointer"
                >
                  Cancel
                </button>
                <button 
                  type="submit" 
                  className="px-6 py-2.5 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
                >
                  Confirm Appointment
                </button>
              </div>
            </form>
          </div>
        )}

        {/* 6. MORTGAGE CALCULATOR */}
        {activeModal === 'mortgage_calc' && (
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 rounded-2xl bg-neutral-900 text-white flex items-center justify-center shadow-xs">
                <Calculator className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-neutral-900">East Africa Mortgage Calculator</h3>
                <p className="text-xs text-neutral-500">Estimate monthly repayments across Kenya, Tanzania, and Rwanda banks</p>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-neutral-700 block mb-1">Property Price ({currency})</label>
                <input 
                  type="number" 
                  value={propertyPrice} 
                  onChange={e => setPropertyPrice(Number(e.target.value))} 
                  className="w-full px-3.5 py-2.5 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold" 
                />
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Down Payment ({downPaymentPercent}%)</label>
                  <input 
                    type="number" 
                    value={downPaymentPercent} 
                    onChange={e => setDownPaymentPercent(Number(e.target.value))} 
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Loan Term (Years)</label>
                  <input 
                    type="number" 
                    value={loanTermYears} 
                    onChange={e => setLoanTermYears(Number(e.target.value))} 
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-neutral-700 block mb-1">Interest Rate (%)</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={interestRate} 
                    onChange={e => setInterestRate(Number(e.target.value))} 
                    className="w-full px-3.5 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-xs font-semibold" 
                  />
                </div>
              </div>

              {/* Monthly Repayment Summary */}
              {(() => {
                const principal = propertyPrice * (1 - downPaymentPercent / 100);
                const monthlyRate = interestRate / 100 / 12;
                const numberOfPayments = loanTermYears * 12;
                const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, numberOfPayments)) / (Math.pow(1 + monthlyRate, numberOfPayments) - 1);
                return (
                  <div className="p-4 bg-neutral-900 text-white rounded-2xl flex items-center justify-between">
                    <div>
                      <span className="text-xs text-neutral-400 block font-normal">Estimated Monthly Repayment</span>
                      <span className="text-2xl font-black text-emerald-400">
                        {formatPrice(monthlyPayment)}/mo
                      </span>
                    </div>
                    <span className="px-3 py-1 bg-emerald-500/20 text-emerald-300 text-xs font-bold rounded-lg">
                      Pre-Approved Rates
                    </span>
                  </div>
                );
              })()}

              <button 
                onClick={() => {
                  showToast('Pre-approval application dispatched to partner banks (KCB, NCBA, Stanbic).');
                  closeModal();
                }}
                className="w-full py-3 bg-neutral-900 hover:bg-neutral-800 text-white font-bold text-xs rounded-xl shadow-md transition cursor-pointer"
              >
                Apply for Diaspora Banking Pre-Approval
              </button>
            </div>
          </div>
        )}

        {/* 7. 360 VIRTUAL TOUR */}
        {activeModal === '360_tour' && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Compass className="w-5 h-5 text-neutral-900" />
                <h3 className="text-lg font-bold text-neutral-900">360° Virtual Walkthrough</h3>
              </div>
            </div>

            <div className="relative h-80 rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 flex items-center justify-center">
              <img 
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&auto=format&fit=crop&q=85" 
                alt="360 tour" 
                className="w-full h-full object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 flex flex-col items-center justify-center p-6 text-center text-white">
                <div className="w-14 h-14 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 mb-3 animate-pulse">
                  <Compass className="w-7 h-7 text-white" />
                </div>
                <h4 className="text-lg font-bold">Interactive 3D Matterport Space</h4>
                <p className="text-xs text-neutral-300 max-w-sm mt-1">
                  Drag and rotate inside panoramic room scans, measure wall clearances, and inspect the exterior patio deck in ultra-HD.
                </p>
                <div className="mt-4 flex gap-2">
                  <button 
                    onClick={() => showToast('Entered Fullscreen VR Mode')}
                    className="px-4 py-2 bg-white text-neutral-900 rounded-xl text-xs font-bold transition hover:bg-neutral-100"
                  >
                    Enter Fullscreen VR
                  </button>
                  <button 
                    onClick={() => showToast('Loaded Floor Plan')}
                    className="px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-xs font-bold transition text-white"
                  >
                    View Floor Plan
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
