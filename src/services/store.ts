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
  Conversation, 
  ChatMessage, 
  AdCampaign, 
  Invoice, 
  Review, 
  BlogPost, 
  BrandSettings, 
  CustomFieldDefinition, 
  User, 
  AppNotification,
  ActivityEvent,
  CurrencyCode
} from '../types';
import { 
  INITIAL_BRAND_SETTINGS, 
  INITIAL_USERS, 
  INITIAL_AGENTS, 
  INITIAL_AGENCIES, 
  INITIAL_DEALERSHIPS, 
  INITIAL_AREAS, 
  INITIAL_PROPERTIES, 
  INITIAL_LAND_LISTINGS, 
  INITIAL_VEHICLES, 
  INITIAL_EXPERIENCES, 
  INITIAL_STAYS, 
  INITIAL_LEADS, 
  INITIAL_BOOKINGS, 
  INITIAL_AD_CAMPAIGNS, 
  INITIAL_INVOICES, 
  INITIAL_REVIEWS, 
  INITIAL_CONVERSATIONS, 
  INITIAL_MESSAGES, 
  INITIAL_BLOG_POSTS, 
  INITIAL_CUSTOM_FIELDS, 
  INITIAL_NOTIFICATIONS,
  INITIAL_ACTIVITIES
} from './mockData';

// Currency exchange rates relative to USD ($1 USD = X)
export const CURRENCY_RATES: Record<CurrencyCode, number> = {
  USD: 1,
  KES: 130, // Kenya Shilling
  TZS: 2600, // Tanzania Shilling
  UGX: 3750, // Uganda Shilling
  RWF: 1350, // Rwandan Franc
  ETB: 120, // Ethiopian Birr
  EUR: 0.92 // Euro
};

export const CURRENCY_SYMBOLS: Record<CurrencyCode, string> = {
  USD: '$',
  KES: 'KSh ',
  TZS: 'TSh ',
  UGX: 'USh ',
  RWF: 'RF ',
  ETB: 'Br ',
  EUR: '€'
};

const STORAGE_KEYS = {
  PROPERTIES: 'safarinest_properties_v2',
  LAND: 'safarinest_land_v2',
  VEHICLES: 'safarinest_vehicles_v2',
  DEALERSHIPS: 'safarinest_dealerships_v2',
  EXPERIENCES: 'safarinest_experiences_v2',
  STAYS: 'safarinest_stays_v2',
  AGENTS: 'safarinest_agents_v2',
  AGENCIES: 'safarinest_agencies_v2',
  AREAS: 'safarinest_areas_v2',
  LEADS: 'safarinest_crm_leads_v2',
  BOOKINGS: 'safarinest_bookings_v2',
  AD_CAMPAIGNS: 'safarinest_ad_campaigns_v2',
  INVOICES: 'safarinest_invoices_v2',
  REVIEWS: 'safarinest_reviews_v2',
  CONVERSATIONS: 'safarinest_conversations_v2',
  MESSAGES: 'safarinest_messages_v2',
  BLOG_POSTS: 'safarinest_blog_posts_v2',
  CUSTOM_FIELDS: 'safarinest_custom_fields_v2',
  BRAND_SETTINGS: 'safarinest_brand_settings_v2',
  USERS: 'safarinest_users_v2',
  CURRENT_USER_ID: 'safarinest_current_user_id_v2',
  FAVORITES: 'safarinest_favorites_v2',
  SAVED_SEARCHES: 'safarinest_saved_searches_v2',
  NOTIFICATIONS: 'safarinest_notifications_v2',
  ACTIVITIES: 'swahivo_activities_v2',
  ACTIVE_CURRENCY: 'safarinest_active_currency_v2'
};

function getStorage<T>(key: string, fallback: T): T {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
}

function setStorage<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (e) {
    console.error('Failed saving to localStorage', e);
  }
}

export class AppStore {
  // Brand Settings
  static getBrandSettings(): BrandSettings {
    const saved = getStorage<BrandSettings>(STORAGE_KEYS.BRAND_SETTINGS, INITIAL_BRAND_SETTINGS);
    if (!saved.exchangeRates || !saved.exchangeRates.KES) {
      const merged: BrandSettings = {
        ...INITIAL_BRAND_SETTINGS,
        ...saved,
        exchangeRates: {
          ...INITIAL_BRAND_SETTINGS.exchangeRates,
          ...(saved.exchangeRates || {})
        }
      };
      setStorage(STORAGE_KEYS.BRAND_SETTINGS, merged);
      return merged;
    }
    return saved;
  }
  static saveBrandSettings(settings: BrandSettings): void {
    setStorage(STORAGE_KEYS.BRAND_SETTINGS, settings);
  }

  // Users & Auth
  static getUsers(): User[] {
    const saved = getStorage<User[]>(STORAGE_KEYS.USERS, INITIAL_USERS);
    const existingIds = new Set(saved.map(u => u.id));
    const missing = INITIAL_USERS.filter(u => !existingIds.has(u.id));
    if (missing.length > 0) {
      const merged = [...saved, ...missing];
      setStorage(STORAGE_KEYS.USERS, merged);
      return merged;
    }
    return saved;
  }
  static saveUsers(users: User[]): void {
    setStorage(STORAGE_KEYS.USERS, users);
  }
  static getCurrentUser(): User {
    const users = this.getUsers();
    const currentId = getStorage<string>(STORAGE_KEYS.CURRENT_USER_ID, 'usr_nayyar');
    const found = users.find(u => u.id === currentId);
    return found || users[0] || INITIAL_USERS[0];
  }
  static setCurrentUserId(userId: string): void {
    setStorage(STORAGE_KEYS.CURRENT_USER_ID, userId);
  }
  static addUser(user: Omit<User, 'id' | 'createdAt'> & { id?: string }): User {
    const users = this.getUsers();
    const newUser: User = {
      ...user,
      id: user.id || `usr_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    users.unshift(newUser);
    this.saveUsers(users);
    this.setCurrentUserId(newUser.id);
    this.addActivity(`Registered new account: ${newUser.name}`, 'profile', newUser.id);
    return newUser;
  }
  static updateUser(id: string, updates: Partial<User>): User | null {
    const users = this.getUsers();
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return null;
    users[idx] = { ...users[idx], ...updates };
    this.saveUsers(users);
    this.addActivity(`Updated profile info for ${users[idx].name}`, 'profile', id);
    return users[idx];
  }

  // Properties
  static getProperties(): Property[] {
    return getStorage<Property[]>(STORAGE_KEYS.PROPERTIES, INITIAL_PROPERTIES);
  }
  static saveProperties(properties: Property[]): void {
    setStorage(STORAGE_KEYS.PROPERTIES, properties);
  }
  static addProperty(prop: Omit<Property, 'id' | 'createdAt' | 'updatedAt' | 'viewsCount' | 'favoritesCount' | 'inquiriesCount' | 'rating' | 'reviewsCount'>): Property {
    const properties = this.getProperties();
    const newProp: Property = {
      ...prop,
      id: `prop_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      favoritesCount: 0,
      inquiriesCount: 0,
      rating: 5.0,
      reviewsCount: 0
    };
    properties.unshift(newProp);
    this.saveProperties(properties);
    this.addActivity(`Added property ${newProp.title}`, 'property');
    return newProp;
  }
  static updateProperty(id: string, updates: Partial<Property>): Property | null {
    const properties = this.getProperties();
    const idx = properties.findIndex(p => p.id === id);
    if (idx === -1) return null;
    properties[idx] = { ...properties[idx], ...updates, updatedAt: new Date().toISOString().split('T')[0] };
    this.saveProperties(properties);
    this.addActivity(`Edited property ${properties[idx].title}`, 'property');
    return properties[idx];
  }
  static deleteProperty(id: string): void {
    const properties = this.getProperties().filter(p => p.id !== id);
    this.saveProperties(properties);
  }

  // Land Listings
  static getLandListings(): LandListing[] {
    return getStorage<LandListing[]>(STORAGE_KEYS.LAND, INITIAL_LAND_LISTINGS);
  }
  static saveLandListings(land: LandListing[]): void {
    setStorage(STORAGE_KEYS.LAND, land);
  }
  static addLandListing(listing: Omit<LandListing, 'id' | 'createdAt'>): LandListing {
    const land = this.getLandListings();
    const newListing: LandListing = {
      ...listing,
      id: `land_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    land.unshift(newListing);
    this.saveLandListings(land);
    return newListing;
  }

  // Vehicles
  static getVehicles(): Vehicle[] {
    return getStorage<Vehicle[]>(STORAGE_KEYS.VEHICLES, INITIAL_VEHICLES);
  }
  static saveVehicles(vehicles: Vehicle[]): void {
    setStorage(STORAGE_KEYS.VEHICLES, vehicles);
  }
  static addVehicle(veh: Omit<Vehicle, 'id' | 'createdAt' | 'viewsCount' | 'favoritesCount' | 'rating'>): Vehicle {
    const vehicles = this.getVehicles();
    const newVeh: Vehicle = {
      ...veh,
      id: `veh_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      viewsCount: 1,
      favoritesCount: 0,
      rating: 5.0
    };
    vehicles.unshift(newVeh);
    this.saveVehicles(vehicles);
    return newVeh;
  }

  // Dealerships
  static getDealerships(): Dealership[] {
    return getStorage<Dealership[]>(STORAGE_KEYS.DEALERSHIPS, INITIAL_DEALERSHIPS);
  }

  // Stays & Experiences
  static getStays(): Stay[] {
    return getStorage<Stay[]>(STORAGE_KEYS.STAYS, INITIAL_STAYS);
  }
  static getExperiences(): Experience[] {
    return getStorage<Experience[]>(STORAGE_KEYS.EXPERIENCES, INITIAL_EXPERIENCES);
  }

  // Agents & Agencies & Areas
  static getAgents(): Agent[] {
    return getStorage<Agent[]>(STORAGE_KEYS.AGENTS, INITIAL_AGENTS);
  }
  static getAgencies(): Agency[] {
    return getStorage<Agency[]>(STORAGE_KEYS.AGENCIES, INITIAL_AGENCIES);
  }
  static getAreas(): Area[] {
    return getStorage<Area[]>(STORAGE_KEYS.AREAS, INITIAL_AREAS);
  }

  // CRM Leads & Pipelines
  static getLeads(): CRMLead[] {
    return getStorage<CRMLead[]>(STORAGE_KEYS.LEADS, INITIAL_LEADS);
  }
  static saveLeads(leads: CRMLead[]): void {
    setStorage(STORAGE_KEYS.LEADS, leads);
  }
  static addLead(lead: Omit<CRMLead, 'id' | 'createdAt'>): CRMLead {
    const leads = this.getLeads();
    const newLead: CRMLead = {
      ...lead,
      id: `lead_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    leads.unshift(newLead);
    this.saveLeads(leads);
    return newLead;
  }
  static updateLead(id: string, updates: Partial<CRMLead>): CRMLead | null {
    const leads = this.getLeads();
    const idx = leads.findIndex(l => l.id === id);
    if (idx === -1) return null;
    leads[idx] = { ...leads[idx], ...updates };
    this.saveLeads(leads);
    return leads[idx];
  }
  static updateLeadStatus(id: string, status: CRMLead['status']): CRMLead | null {
    return this.updateLead(id, { status });
  }

  // Bookings & Reservations
  static getBookings(): BookingReservation[] {
    return getStorage<BookingReservation[]>(STORAGE_KEYS.BOOKINGS, INITIAL_BOOKINGS);
  }
  static saveBookings(bookings: BookingReservation[]): void {
    setStorage(STORAGE_KEYS.BOOKINGS, bookings);
  }
  static updateBookingStatus(id: string, status: 'upcoming' | 'completed' | 'cancelled'): void {
    const bookings = this.getBookings();
    const idx = bookings.findIndex(b => b.id === id);
    if (idx !== -1) {
      bookings[idx].status = status;
      this.saveBookings(bookings);
      const shortId = id.replace('bk_', '');
      this.addActivity(`Edited Booking Request ${shortId}`, 'booking');
    }
  }
  static addBooking(booking: Omit<BookingReservation, 'id' | 'createdAt'>): BookingReservation {
    const bookings = this.getBookings();
    const newBooking: BookingReservation = {
      ...booking,
      id: `bk_${Date.now().toString().slice(-5)}`,
      createdAt: new Date().toISOString().split('T')[0]
    };
    bookings.unshift(newBooking);
    this.saveBookings(bookings);
    const shortId = newBooking.id.replace('bk_', '');
    this.addActivity(`Added Booking Request ${shortId}`, 'booking');
    return newBooking;
  }

  // Advertising Campaigns
  static getAdCampaigns(): AdCampaign[] {
    return getStorage<AdCampaign[]>(STORAGE_KEYS.AD_CAMPAIGNS, INITIAL_AD_CAMPAIGNS);
  }
  static saveAdCampaigns(campaigns: AdCampaign[]): void {
    setStorage(STORAGE_KEYS.AD_CAMPAIGNS, campaigns);
  }
  static addAdCampaign(campaign: any): AdCampaign {
    const campaigns = this.getAdCampaigns();
    const newCampaign: AdCampaign = {
      id: `ad_${Date.now()}`,
      createdAt: new Date().toISOString().split('T')[0],
      impressions: 0,
      clicks: 0,
      leads: 0,
      conversions: 0,
      ctr: 0,
      costPerLead: 0,
      spentAmount: 0,
      ...campaign
    };
    campaigns.unshift(newCampaign);
    this.saveAdCampaigns(campaigns);
    return newCampaign;
  }
  static createAdCampaign(campaign: Omit<AdCampaign, 'id' | 'createdAt' | 'impressions' | 'clicks' | 'leads' | 'conversions' | 'ctr' | 'costPerLead' | 'spentAmount'>): AdCampaign {
    const campaigns = this.getAdCampaigns();
    const newCampaign: AdCampaign = {
      ...campaign,
      id: `ad_camp_${Date.now().toString().slice(-4)}`,
      createdAt: new Date().toISOString().split('T')[0],
      impressions: 0,
      clicks: 0,
      leads: 0,
      conversions: 0,
      ctr: 0,
      costPerLead: 0,
      spentAmount: 0
    };
    campaigns.unshift(newCampaign);
    this.saveAdCampaigns(campaigns);
    return newCampaign;
  }
  static updateAdCampaign(id: string, updates: Partial<AdCampaign>): AdCampaign | null {
    const campaigns = this.getAdCampaigns();
    const idx = campaigns.findIndex(c => c.id === id);
    if (idx === -1) return null;
    campaigns[idx] = { ...campaigns[idx], ...updates };
    this.saveAdCampaigns(campaigns);
    return campaigns[idx];
  }

  // Invoices
  static getInvoices(): Invoice[] {
    return getStorage<Invoice[]>(STORAGE_KEYS.INVOICES, INITIAL_INVOICES);
  }
  static saveInvoices(invoices: Invoice[]): void {
    setStorage(STORAGE_KEYS.INVOICES, invoices);
  }
  static addInvoice(inv: Omit<Invoice, 'id'>): Invoice {
    const invoices = this.getInvoices();
    const newInv: Invoice = {
      ...inv,
      id: `inv_${Date.now().toString().slice(-5)}`
    };
    invoices.unshift(newInv);
    this.saveInvoices(invoices);
    const shortId = newInv.id.replace('inv_', '');
    this.addActivity(`Generated Invoice Invoice ${shortId}`, 'invoice');
    return newInv;
  }

  // Reviews
  static getReviews(): Review[] {
    return getStorage<Review[]>(STORAGE_KEYS.REVIEWS, INITIAL_REVIEWS);
  }
  static addReview(review: Omit<Review, 'id' | 'date'>): Review {
    const reviews = this.getReviews();
    const newRev: Review = {
      ...review,
      id: `rev_${Date.now()}`,
      date: new Date().toISOString().split('T')[0]
    };
    reviews.unshift(newRev);
    setStorage(STORAGE_KEYS.REVIEWS, reviews);
    return newRev;
  }

  // Conversations & Messages
  static getConversations(): Conversation[] {
    return getStorage<Conversation[]>(STORAGE_KEYS.CONVERSATIONS, INITIAL_CONVERSATIONS);
  }
  static getMessages(convId: string): ChatMessage[] {
    const all = getStorage<Record<string, ChatMessage[]>>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    return all[convId] || [];
  }
  static sendMessage(convId: string, msg: Omit<ChatMessage, 'id' | 'timestamp' | 'isRead'>): ChatMessage {
    const all = getStorage<Record<string, ChatMessage[]>>(STORAGE_KEYS.MESSAGES, INITIAL_MESSAGES);
    const newMsg: ChatMessage = {
      ...msg,
      id: `msg_${Date.now()}`,
      timestamp: 'Just now',
      isRead: false
    };
    if (!all[convId]) all[convId] = [];
    all[convId].push(newMsg);
    setStorage(STORAGE_KEYS.MESSAGES, all);

    // Update conversation last message
    const convs = this.getConversations();
    const idx = convs.findIndex(c => c.id === convId);
    if (idx !== -1) {
      convs[idx].lastMessage = msg.text;
      convs[idx].lastMessageTime = 'Just now';
      setStorage(STORAGE_KEYS.CONVERSATIONS, convs);
    }
    return newMsg;
  }

  // Blog Posts
  static getBlogPosts(): BlogPost[] {
    return getStorage<BlogPost[]>(STORAGE_KEYS.BLOG_POSTS, INITIAL_BLOG_POSTS);
  }
  static saveBlogPosts(posts: BlogPost[]): void {
    setStorage(STORAGE_KEYS.BLOG_POSTS, posts);
  }

  // Custom Fields
  static getCustomFields(): CustomFieldDefinition[] {
    return getStorage<CustomFieldDefinition[]>(STORAGE_KEYS.CUSTOM_FIELDS, INITIAL_CUSTOM_FIELDS);
  }
  static saveCustomFields(fields: CustomFieldDefinition[]): void {
    setStorage(STORAGE_KEYS.CUSTOM_FIELDS, fields);
  }

  // Favorites
  static getFavorites(): string[] {
    return getStorage<string[]>(STORAGE_KEYS.FAVORITES, ['prop_karen_villa', 'veh_lc300_gr_sport']);
  }
  static toggleFavorite(itemId: string): boolean {
    const favs = this.getFavorites();
    const exists = favs.includes(itemId);
    const updated = exists ? favs.filter(id => id !== itemId) : [...favs, itemId];
    setStorage(STORAGE_KEYS.FAVORITES, updated);
    return !exists;
  }

  // Notifications
  static getNotifications(): AppNotification[] {
    return getStorage<AppNotification[]>(STORAGE_KEYS.NOTIFICATIONS, INITIAL_NOTIFICATIONS);
  }
  static markNotificationRead(id: string): void {
    const notifs = this.getNotifications();
    const updated = notifs.map(n => n.id === id ? { ...n, isRead: true } : n);
    setStorage(STORAGE_KEYS.NOTIFICATIONS, updated);
  }
  static markAllNotificationsRead(): void {
    const notifs = this.getNotifications().map(n => ({ ...n, isRead: true }));
    setStorage(STORAGE_KEYS.NOTIFICATIONS, notifs);
  }

  // Account History & Activities
  static getActivities(): ActivityEvent[] {
    return getStorage<ActivityEvent[]>(STORAGE_KEYS.ACTIVITIES, INITIAL_ACTIVITIES);
  }
  static addActivity(action: string, type: ActivityEvent['type'] = 'booking', userId: string = 'usr_nayyar'): ActivityEvent {
    const activities = this.getActivities();
    const now = new Date();
    const formattedDate = now.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    const formattedTime = now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).toLowerCase();
    
    const newAct: ActivityEvent = {
      id: `act_${Date.now()}`,
      userId,
      action,
      timestamp: `${formattedDate}, ${formattedTime}`,
      type
    };
    activities.unshift(newAct);
    // Keep last 30 activities
    if (activities.length > 30) activities.pop();
    setStorage(STORAGE_KEYS.ACTIVITIES, activities);
    return newAct;
  }

  // Currency
  static getActiveCurrency(): CurrencyCode {
    return getStorage<CurrencyCode>(STORAGE_KEYS.ACTIVE_CURRENCY, 'USD');
  }
  static setActiveCurrency(currency: CurrencyCode): void {
    setStorage(STORAGE_KEYS.ACTIVE_CURRENCY, currency);
  }
}

// Utility: Currency Formatting
export function formatCurrency(amount: number, fromCurrency: CurrencyCode = 'USD', targetCurrency: CurrencyCode = 'USD'): string {
  // Convert from fromCurrency to USD, then to targetCurrency
  const usdAmount = amount / (CURRENCY_RATES[fromCurrency] || 1);
  const finalAmount = usdAmount * (CURRENCY_RATES[targetCurrency] || 1);
  const symbol = CURRENCY_SYMBOLS[targetCurrency] || '$';

  return `${symbol}${Math.round(finalAmount).toLocaleString()}`;
}
