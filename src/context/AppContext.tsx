import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { 
  Property, 
  LandListing, 
  Vehicle, 
  Dealership, 
  Experience, 
  Stay, 
  Agent, 
  Agency, 
  Area, 
  CRMLead, 
  BookingReservation, 
  AdCampaign, 
  Invoice, 
  BlogPost, 
  BrandSettings, 
  CustomFieldDefinition, 
  User, 
  AppNotification, 
  ActivityEvent,
  CurrencyCode 
} from '../types';
import { AppStore, formatCurrency } from '../services/store';

export type ActiveView = 
  | 'home'
  | 'properties'
  | 'property_detail'
  | 'land'
  | 'land_detail'
  | 'vehicles'
  | 'vehicle_detail'
  | 'dealerships'
  | 'dealership_detail'
  | 'stays'
  | 'experiences'
  | 'map_search'
  | 'agents'
  | 'agent_detail'
  | 'agencies'
  | 'areas'
  | 'area_detail'
  | 'blog'
  | 'blog_detail'
  | 'pricing'
  | 'advertise_landing'
  | 'about'
  | 'contact'
  | 'favorites'
  // User/Agent Dashboard views
  | 'dashboard_overview'
  | 'dashboard_my_listings'
  | 'dashboard_add_listing'
  | 'dashboard_crm'
  | 'dashboard_advertising'
  | 'dashboard_bookings'
  | 'dashboard_inbox'
  | 'dashboard_analytics'
  | 'dashboard_invoices'
  | 'dashboard_settings'
  // Super Admin views
  | 'superadmin_overview'
  | 'superadmin_users'
  | 'superadmin_moderation'
  | 'superadmin_ad_approvals'
  | 'superadmin_custom_fields'
  | 'superadmin_brand_settings'
  | 'superadmin_locations'
  | 'superadmin_content'
  | 'superadmin_revenue';

interface AppContextType {
  // Navigation & Routing
  currentView: ActiveView;
  selectedItemId: string | null;
  navigateTo: (view: ActiveView, itemId?: string | null) => void;
  
  // Brand Settings
  brandSettings: BrandSettings;
  updateBrandSettings: (settings: BrandSettings) => void;

  // Active User & Switcher
  currentUser: User;
  switchUser: (userId: string) => void;
  allUsers: User[];
  refreshUsers: () => void;

  // Currency
  currency: CurrencyCode;
  setCurrency: (c: CurrencyCode) => void;
  formatPrice: (amount: number, fromCurrency?: CurrencyCode) => string;

  // Listings data
  properties: Property[];
  landListings: LandListing[];
  vehicles: Vehicle[];
  dealerships: Dealership[];
  experiences: Experience[];
  stays: Stay[];
  agents: Agent[];
  agencies: Agency[];
  areas: Area[];
  blogPosts: BlogPost[];
  customFields: CustomFieldDefinition[];
  refreshListings: () => void;
  refreshProperties: () => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (id: string) => void;
  isFavorite: (id: string) => boolean;

  // CRM & Bookings & Ads & Invoices
  leads: CRMLead[];
  refreshLeads: () => void;
  bookings: BookingReservation[];
  refreshBookings: () => void;
  adCampaigns: AdCampaign[];
  refreshAdCampaigns: () => void;
  invoices: Invoice[];
  refreshInvoices: () => void;

  // Activities & History
  activities: ActivityEvent[];
  refreshActivities: () => void;
  addActivity: (action: string, type?: ActivityEvent['type']) => void;

  // Notifications
  notifications: AppNotification[];
  unreadNotificationCount: number;
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;

  // Modals & Popups
  activeModal: 'auth' | 'sign_in' | 'sign_up' | 'switch_account' | 'become_host' | 'add_property' | 'edit_property' | 'delete_property' | 'schedule_viewing' | 'test_drive' | 'mortgage_calc' | 'trade_in_calc' | '360_tour' | 'create_ad' | 'new_lead' | 'toast' | null;
  modalData: any;
  openModal: (modalName: 'auth' | 'sign_in' | 'sign_up' | 'switch_account' | 'become_host' | 'add_property' | 'edit_property' | 'delete_property' | 'schedule_viewing' | 'test_drive' | 'mortgage_calc' | 'trade_in_calc' | '360_tour' | 'create_ad' | 'new_lead' | 'toast', data?: any) => void;
  closeModal: () => void;
  
  // Auth & Host Actions
  signIn: (email: string) => boolean;
  signUp: (userData: { name: string; email: string; phone?: string; role?: UserRole; location?: string }) => User;
  signOut: () => void;
  updateUserProfile: (updates: Partial<User>) => void;
  becomeHost: (hostData?: { title?: string; category?: string; city?: string; area?: string; price?: number; bio?: string }) => void;

  // Property CRUD
  addProperty: (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'favoritesCount' | 'inquiriesCount' | 'rating' | 'reviewsCount'>) => Property;
  updateProperty: (id: string, updates: Partial<Property>) => void;
  deleteProperty: (id: string) => void;

  // Toast notifications
  toastMessage: string | null;
  showToast: (msg: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ActiveView>('home');
  const [selectedItemId, setSelectedItemId] = useState<string | null>(null);

  const [brandSettings, setBrandSettingsState] = useState<BrandSettings>(AppStore.getBrandSettings());
  const [currentUser, setCurrentUserState] = useState<User>(AppStore.getCurrentUser());
  const [allUsers, setAllUsers] = useState<User[]>(AppStore.getUsers());
  const [currency, setCurrencyState] = useState<CurrencyCode>(AppStore.getActiveCurrency());

  const [properties, setProperties] = useState<Property[]>(AppStore.getProperties());
  const [landListings, setLandListings] = useState<LandListing[]>(AppStore.getLandListings());
  const [vehicles, setVehicles] = useState<Vehicle[]>(AppStore.getVehicles());
  const [dealerships] = useState<Dealership[]>(AppStore.getDealerships());
  const [experiences] = useState<Experience[]>(AppStore.getExperiences());
  const [stays] = useState<Stay[]>(AppStore.getStays());
  const [agents] = useState<Agent[]>(AppStore.getAgents());
  const [agencies] = useState<Agency[]>(AppStore.getAgencies());
  const [areas] = useState<Area[]>(AppStore.getAreas());
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(AppStore.getBlogPosts());
  const [customFields, setCustomFields] = useState<CustomFieldDefinition[]>(AppStore.getCustomFields());

  const [favorites, setFavorites] = useState<string[]>(AppStore.getFavorites());
  const [leads, setLeads] = useState<CRMLead[]>(AppStore.getLeads());
  const [bookings, setBookings] = useState<BookingReservation[]>(AppStore.getBookings());
  const [adCampaigns, setAdCampaigns] = useState<AdCampaign[]>(AppStore.getAdCampaigns());
  const [invoices, setInvoices] = useState<Invoice[]>(AppStore.getInvoices());
  const [notifications, setNotifications] = useState<AppNotification[]>(AppStore.getNotifications());
  const [activities, setActivities] = useState<ActivityEvent[]>(AppStore.getActivities());

  const [activeModal, setActiveModal] = useState<AppContextType['activeModal']>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const refreshListings = () => {
    setProperties(AppStore.getProperties());
    setLandListings(AppStore.getLandListings());
    setVehicles(AppStore.getVehicles());
    setBlogPosts(AppStore.getBlogPosts());
    setCustomFields(AppStore.getCustomFields());
  };

  const refreshProperties = () => {
    setProperties(AppStore.getProperties());
  };

  const refreshUsers = () => {
    setAllUsers(AppStore.getUsers());
    setCurrentUserState(AppStore.getCurrentUser());
  };

  const refreshLeads = () => setLeads(AppStore.getLeads());
  const refreshBookings = () => {
    setBookings(AppStore.getBookings());
    setActivities(AppStore.getActivities());
  };
  const refreshAdCampaigns = () => setAdCampaigns(AppStore.getAdCampaigns());
  const refreshInvoices = () => {
    setInvoices(AppStore.getInvoices());
    setActivities(AppStore.getActivities());
  };
  const refreshActivities = () => setActivities(AppStore.getActivities());

  const addActivity = (action: string, type: ActivityEvent['type'] = 'booking') => {
    AppStore.addActivity(action, type, currentUser.id);
    setActivities(AppStore.getActivities());
  };

  const updateBrandSettings = (newSettings: BrandSettings) => {
    AppStore.saveBrandSettings(newSettings);
    setBrandSettingsState(newSettings);
    showToast('Brand settings updated successfully!');
  };

  const switchUser = (userId: string) => {
    AppStore.setCurrentUserId(userId);
    const user = AppStore.getCurrentUser();
    setCurrentUserState(user);
    setAllUsers(AppStore.getUsers());
    showToast(`Switched account to ${user.name} (${user.role.toUpperCase()})`);
  };

  const setCurrency = (c: CurrencyCode) => {
    AppStore.setActiveCurrency(c);
    setCurrencyState(c);
    showToast(`Currency changed to ${c}`);
  };

  const formatPrice = (amount: number, fromCurrency: CurrencyCode = 'USD') => {
    return formatCurrency(amount, fromCurrency, currency);
  };

  const toggleFavorite = (id: string) => {
    const isAdded = AppStore.toggleFavorite(id);
    setFavorites(AppStore.getFavorites());
    showToast(isAdded ? 'Added to your favorites' : 'Removed from favorites');
  };

  const isFavorite = (id: string) => favorites.includes(id);

  const markNotificationRead = (id: string) => {
    AppStore.markNotificationRead(id);
    setNotifications(AppStore.getNotifications());
  };

  const markAllNotificationsRead = () => {
    AppStore.markAllNotificationsRead();
    setNotifications(AppStore.getNotifications());
    showToast('All notifications marked as read');
  };

  const openModal = (modalName: AppContextType['activeModal'], data?: any) => {
    setActiveModal(modalName);
    setModalData(data || null);
  };

  const closeModal = () => {
    setActiveModal(null);
    setModalData(null);
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => prev === msg ? null : prev);
    }, 3200);
  };

  const navigateTo = (view: ActiveView, itemId?: string | null) => {
    setCurrentView(view);
    if (itemId !== undefined) {
      setSelectedItemId(itemId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const signIn = (email: string): boolean => {
    const users = AppStore.getUsers();
    const found = users.find(u => u.email.toLowerCase().trim() === email.toLowerCase().trim());
    if (found) {
      AppStore.setCurrentUserId(found.id);
      setCurrentUserState(found);
      setAllUsers(users);
      addActivity(`Signed in as ${found.name}`, 'profile', found.id);
      showToast(`Welcome back, ${found.name}!`);
      return true;
    }
    return false;
  };

  const signUp = (userData: { name: string; email: string; phone?: string; role?: UserRole; location?: string }): User => {
    const newUser = AppStore.addUser({
      name: userData.name,
      email: userData.email,
      phone: userData.phone || '+254 700 000000',
      role: userData.role || 'buyer',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80`,
      isVerified: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      status: 'active',
      membershipTier: userData.role === 'property_owner' || userData.role === 'agent' ? 'starter' : 'free',
      location: userData.location || 'Nairobi, Kenya',
      bio: `Member since ${new Date().getFullYear()}.`
    });

    setCurrentUserState(newUser);
    setAllUsers(AppStore.getUsers());
    showToast(`Account created! Welcome to SWAHIVO, ${newUser.name}.`);
    return newUser;
  };

  const updateUserProfile = (updates: Partial<User>) => {
    const updated = AppStore.updateUser(currentUser.id, updates);
    if (updated) {
      setCurrentUserState(updated);
      setAllUsers(AppStore.getUsers());
      showToast('Profile settings saved successfully.');
    }
  };

  const addProperty = (propertyData: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'favoritesCount' | 'inquiriesCount' | 'rating' | 'reviewsCount'>): Property => {
    const newProp = AppStore.addProperty(propertyData);
    refreshProperties();
    refreshListings();
    showToast(`Listing "${newProp.title}" published successfully!`);
    return newProp;
  };

  const updateProperty = (id: string, updates: Partial<Property>) => {
    const updated = AppStore.updateProperty(id, updates);
    if (updated) {
      refreshProperties();
      refreshListings();
      showToast(`Listing "${updated.title}" updated successfully.`);
    }
  };

  const deleteProperty = (id: string) => {
    AppStore.deleteProperty(id);
    refreshProperties();
    refreshListings();
    showToast('Listing removed successfully.');
  };

  const signOut = () => {
    const visitorUser = allUsers.find(u => u.role === 'visitor') || {
      id: 'usr_sarah',
      name: 'Sarah Jenkins',
      email: 'sarah.j@gmail.com',
      phone: '+1 415 889 2200',
      role: 'visitor' as const,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
      isVerified: true,
      isEmailVerified: true,
      isPhoneVerified: true,
      status: 'active' as const,
      membershipTier: 'free' as const,
      location: 'San Francisco & Nairobi',
      createdAt: '2025-05-18',
      bio: 'Diaspora explorer and vacation planner.'
    };
    AppStore.setCurrentUserId(visitorUser.id);
    setCurrentUserState(visitorUser);
    setAllUsers(AppStore.getUsers());
    navigateTo('home');
    showToast('You have been signed out successfully.');
  };

  const becomeHost = (hostData?: { title?: string; category?: string; city?: string; area?: string; price?: number; bio?: string }) => {
    // Upgrade current user to property_owner / host
    const updatedUser: User = {
      ...currentUser,
      role: 'property_owner',
      bio: hostData?.bio || currentUser.bio || 'Verified Luxury Host & Property Partner on SWAHIVO.',
      location: hostData?.city ? `${hostData.area || ''}, ${hostData.city}` : currentUser.location
    };
    const users = AppStore.getUsers().map(u => u.id === currentUser.id ? updatedUser : u);
    if (!users.some(u => u.id === currentUser.id)) {
      users.push(updatedUser);
    }
    AppStore.saveUsers(users);
    AppStore.setCurrentUserId(updatedUser.id);
    setCurrentUserState(updatedUser);
    setAllUsers(users);

    if (hostData?.title) {
      const newListing = AppStore.addProperty({
        title: hostData.title,
        slug: hostData.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        description: `Exclusive verified host listing in ${hostData.area || 'Prime Location'}, ${hostData.city || 'Nairobi'}. Hosted with discrete 5-star concierge standards.`,
        purpose: 'stay',
        propertyType: 'villa',
        price: hostData.price || 350,
        currency: 'USD',
        country: 'Kenya',
        region: 'East Africa',
        city: hostData.city || 'Nairobi',
        area: hostData.area || 'Westlands',
        address: `${hostData.area || 'Westlands'}, ${hostData.city || 'Nairobi'}`,
        bedrooms: 3,
        bathrooms: 3,
        propertySizeSqft: 2800,
        images: ['https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80'],
        featuredImage: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=1000&auto=format&fit=crop&q=80',
        features: ['Concierge Service', 'Private Pool', 'Solar Backup', 'High Speed Wi-Fi', 'Daily Housekeeping'],
        amenities: ['Chef on Demand', 'Airport Transfer', 'Gated Security'],
        status: 'published',
        isFeatured: true,
        isVerified: true,
        agentId: currentUser.id
      });
      refreshProperties();
      refreshListings();
    }

    addActivity(`Upgraded account to Verified Host & Partner`, 'profile');
    showToast(`Congratulations! You are now a Verified Host on SWAHIVO.`);
  };

  const unreadNotificationCount = notifications.filter(n => !n.isRead).length;

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedItemId,
        navigateTo,
        brandSettings,
        updateBrandSettings,
        currentUser,
        switchUser,
        allUsers,
        refreshUsers,
        currency,
        setCurrency,
        formatPrice,
        properties,
        landListings,
        vehicles,
        dealerships,
        experiences,
        stays,
        agents,
        agencies,
        areas,
        blogPosts,
        customFields,
        refreshListings,
        refreshProperties,
        favorites,
        toggleFavorite,
        isFavorite,
        leads,
        refreshLeads,
        bookings,
        refreshBookings,
        adCampaigns,
        refreshAdCampaigns,
        invoices,
        refreshInvoices,
        activities,
        refreshActivities,
        addActivity,
        notifications,
        unreadNotificationCount,
        markNotificationRead,
        markAllNotificationsRead,
        activeModal,
        modalData,
        openModal,
        closeModal,
        signIn,
        signUp,
        signOut,
        updateUserProfile,
        becomeHost,
        addProperty,
        updateProperty,
        deleteProperty,
        toastMessage,
        showToast
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
