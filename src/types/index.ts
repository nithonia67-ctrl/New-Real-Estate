export type UserRole = 
  | 'visitor'
  | 'buyer'
  | 'tenant'
  | 'property_owner'
  | 'agent'
  | 'agency'
  | 'developer'
  | 'land_seller'
  | 'vehicle_seller'
  | 'vehicle_dealer'
  | 'service_provider'
  | 'advertiser'
  | 'admin'
  | 'superadmin';

export type CurrencyCode = 'USD' | 'KES' | 'TZS' | 'UGX' | 'RWF' | 'ETB' | 'EUR';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  whatsapp?: string;
  role: UserRole;
  avatar: string;
  isVerified: boolean;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  status: 'active' | 'suspended' | 'pending';
  membershipTier: 'free' | 'starter' | 'pro' | 'agency' | 'enterprise';
  agencyId?: string;
  dealershipId?: string;
  location: string;
  createdAt: string;
  bio?: string;
}

export type PropertyType = 
  | 'apartment'
  | 'house'
  | 'villa'
  | 'bungalow'
  | 'condo'
  | 'loft'
  | 'penthouse'
  | 'commercial'
  | 'office'
  | 'retail'
  | 'warehouse'
  | 'land'
  | 'development';

export type ListingStatus = 
  | 'draft'
  | 'pending'
  | 'approved'
  | 'published'
  | 'active'
  | 'featured'
  | 'suspended'
  | 'expired'
  | 'rejected';

export type Purpose = 'buy' | 'rent' | 'stay';

export interface CustomFieldDefinition {
  id: string;
  category: 'property' | 'land' | 'vehicle' | 'stay' | 'experience';
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'currency' | 'dropdown' | 'checkbox' | 'date' | 'location' | 'boolean' | 'select';
  options?: string[];
  required: boolean;
  filterable?: boolean;
  searchable?: boolean;
  order?: number;
}

export type CustomField = CustomFieldDefinition;

export interface FloorPlan {
  id: string;
  title: string;
  bedrooms: number;
  bathrooms: number;
  sizeSqft: number;
  imageUrl: string;
  description?: string;
}

export interface PropertyAttachment {
  id: string;
  title: string;
  type: string;
  fileSize: string;
  url: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description: string;
  purpose: 'buy' | 'rent' | 'stay';
  propertyType: PropertyType;
  price: number;
  pricePeriod?: 'month' | 'year' | 'night' | 'total';
  currency: CurrencyCode;
  country: string;
  region: string;
  city: string;
  area: string;
  address: string;
  coordinates?: { lat: number; lng: number };
  bedrooms: number;
  bathrooms: number;
  propertySizeSqft: number;
  landSizeSqft?: number;
  landAcreage?: number;
  yearBuilt?: number;
  parkingSpaces?: number;
  images: string[];
  featuredImage: string;
  videoUrl?: string;
  virtualTourUrl?: string; // 360 tour
  features: string[];
  amenities: string[];
  customFields?: Record<string, string | number | boolean>;
  floorPlans?: FloorPlan[];
  attachments?: PropertyAttachment[];
  subProperties?: Array<{ id: string; name: string; price: number; type: string; size: string; status: string }>;
  status: ListingStatus;
  isFeatured: boolean;
  isVerified: boolean;
  isOpenHouse?: boolean;
  openHouseDate?: string;
  viewsCount: number;
  favoritesCount: number;
  inquiriesCount: number;
  rating: number;
  reviewsCount: number;
  agentId: string;
  agencyId?: string;
  createdAt: string;
  updatedAt: string;
}

export interface LandListing {
  id: string;
  title: string;
  slug: string;
  description: string;
  purpose: 'sale' | 'lease';
  landType: 'residential' | 'agricultural' | 'commercial' | 'industrial' | 'beach' | 'development';
  totalAcreage: number;
  price: number;
  pricePerAcre: number;
  currency: CurrencyCode;
  country: string;
  region: string;
  city: string;
  area: string;
  titleDeedStatus: 'Ready Title Deed' | 'Freehold' | 'Leasehold 99 Years' | 'Sectional Title' | 'Allotment Letter' | 'Processing';
  tenure: 'Freehold' | 'Leasehold' | 'Customary';
  zoning: 'Residential' | 'Commercial' | 'Agricultural' | 'Mixed Use' | 'Special Economic Zone';
  roadAccess: 'Tarmac' | 'All-weather Murram' | 'Graded Earth' | 'Highway Frontage';
  waterAccess: boolean;
  electricityAccess: boolean;
  fenced: boolean;
  developmentStatus: 'Greenfield' | 'Serviced Plots' | 'Partially Developed' | 'Cleared';
  images: string[];
  featuredImage: string;
  coordinates?: { lat: number; lng: number };
  documents?: string[];
  status: ListingStatus;
  isFeatured: boolean;
  isVerified: boolean;
  agentId: string;
  createdAt: string;
}

export type VehicleBodyType = 'sedan' | 'suv' | 'truck' | 'van' | 'motorcycle' | 'bus' | 'coupe' | 'wagon' | 'convertible' | 'commercial';
export type FuelType = 'petrol' | 'diesel' | 'hybrid' | 'electric';
export type TransmissionType = 'automatic' | 'manual';
export type VehicleCondition = 'brand_new' | 'foreign_used' | 'locally_used';

export interface Vehicle {
  id: string;
  title: string;
  slug: string;
  make: string;
  model: string;
  year: number;
  price: number;
  currency: CurrencyCode;
  bodyType: VehicleBodyType;
  condition: VehicleCondition;
  mileageKm: number;
  fuelType: FuelType;
  transmission: TransmissionType;
  engineSizeCc: number;
  driveType: '2WD' | '4WD' | 'AWD';
  color: string;
  location: string;
  country: string;
  vin?: string;
  registrationNumber?: string;
  importStatus: 'Duty Paid / Registered' | 'Direct Import Under Clearance' | 'Brand New Dealership';
  sellerType: 'dealer' | 'individual' | 'agency';
  dealershipId?: string;
  images: string[];
  featuredImage: string;
  features: string[];
  description: string;
  status: ListingStatus;
  isFeatured: boolean;
  isVerified: boolean;
  viewsCount: number;
  favoritesCount: number;
  rating: number;
  createdAt: string;
}

export interface Dealership {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  tagline: string;
  description: string;
  country: string;
  city: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website?: string;
  establishedYear: number;
  inventoryCount: number;
  isVerified: boolean;
  rating: number;
  reviewsCount: number;
  openingHours: string;
  specialties: string[];
}

export interface Experience {
  id: string;
  title: string;
  slug: string;
  category: 'safari' | 'diving' | 'cultural' | 'food' | 'outdoor' | 'wildlife' | 'sailing' | 'paddling';
  country: string;
  city: string;
  location: string;
  pricePerPerson: number;
  currency: CurrencyCode;
  duration: string;
  groupSize: string;
  languages: string[];
  included: string[];
  images: string[];
  featuredImage: string;
  description: string;
  rating: number;
  reviewsCount: number;
  hostName: string;
  hostAvatar: string;
  status: ListingStatus;
  isFeatured: boolean;
}

export interface Stay {
  id: string;
  title: string;
  slug: string;
  stayType: 'villa' | 'beach_bungalow' | 'luxury_lodge' | 'safari_camp' | 'boutique_hotel' | 'apartment';
  country: string;
  city: string;
  area: string;
  pricePerNight: number;
  currency: CurrencyCode;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  images: string[];
  featuredImage: string;
  amenities: string[];
  rating: number;
  reviewsCount: number;
  isGuestFavorite: boolean;
  isVerified: boolean;
  hostName: string;
  hostAvatar: string;
}

export interface Agent {
  id: string;
  name: string;
  slug: string;
  title: string;
  avatar: string;
  coverImage?: string;
  agencyId?: string;
  agencyName?: string;
  phone: string;
  whatsapp: string;
  email: string;
  licenseNumber: string;
  areasServed: string[];
  languages: string[];
  bio: string;
  rating: number;
  reviewsCount: number;
  activeListingsCount: number;
  dealsClosed: number;
  experienceYears: number;
  isVerified: boolean;
  socials?: { linkedin?: string; twitter?: string; facebook?: string };
}

export interface Agency {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  tagline: string;
  description: string;
  city: string;
  country: string;
  address: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  agentsCount: number;
  listingsCount: number;
  rating: number;
  reviewsCount: number;
  isVerified: boolean;
}

export interface Area {
  id: string;
  name: string;
  slug: string;
  city: string;
  country: string;
  description: string;
  image: string;
  propertiesCount: number;
  avgPriceSqft: number;
  highlights: string[];
  coordinates?: { lat: number; lng: number };
}

export type LeadStatus = 'new' | 'contacted' | 'qualified' | 'viewing' | 'negotiation' | 'won' | 'lost';

export interface CRMLead {
  id: string;
  name: string;
  email: string;
  phone: string;
  source: 'Website Inquiry' | 'WhatsApp Direct' | 'Ad Campaign' | 'Walk-In' | 'Referral';
  interestedItemType: 'property' | 'land' | 'vehicle' | 'stay' | 'service';
  interestedItemId?: string;
  interestedItemTitle: string;
  budget: number;
  currency: CurrencyCode;
  location: string;
  status: LeadStatus;
  agentId: string;
  assignedAgentName: string;
  score: number; // 1-100
  notes: string;
  lastActivity: string;
  nextFollowUp: string;
  dealValue?: number;
  createdAt: string;
}

export interface BookingReservation {
  id: string;
  userId: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  type: 'property_viewing' | 'vehicle_test_drive' | 'stay_reservation' | 'experience_booking' | 'service_request';
  itemId: string;
  itemTitle: string;
  itemType: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled' | 'rescheduled';
  guestsCount?: number;
  totalPrice?: number;
  currency?: CurrencyCode;
  notes?: string;
  createdAt: string;
}

export interface ChatMessage {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  text: string;
  timestamp: string;
  isRead: boolean;
  attachmentUrl?: string;
  itemContext?: {
    type: 'property' | 'vehicle' | 'land';
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export interface Conversation {
  id: string;
  participantId: string;
  participantName: string;
  participantAvatar: string;
  participantRole: string;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
  itemContext?: {
    type: 'property' | 'vehicle' | 'land';
    id: string;
    title: string;
    price: number;
    image: string;
  };
}

export type AdObjective = 
  | 'views'
  | 'leads'
  | 'messages'
  | 'promote_listing'
  | 'promote_business'
  | 'traffic';

export type AdPlacement = 
  | 'homepage_hero'
  | 'search_top'
  | 'property_sidebar'
  | 'vehicle_feed'
  | 'sponsored_card'
  | 'native_banner';

export type AdStatus = 
  | 'draft'
  | 'pending_review'
  | 'approved'
  | 'active'
  | 'paused'
  | 'rejected'
  | 'completed';

export interface AdCampaign {
  id: string;
  userId: string;
  advertiserName: string;
  title: string;
  objective: AdObjective;
  targetCategory: 'property' | 'land' | 'vehicle' | 'stay' | 'experience' | 'dealership' | 'agency';
  promotedItemId?: string;
  promotedItemTitle?: string;
  headline: string;
  description: string;
  callToAction: 'View Listing' | 'Contact Agent' | 'Book Viewing' | 'Get Best Deal' | 'Visit Showroom';
  destinationUrl: string;
  creativeImageUrl: string;
  targetLocations: string[]; // countries / cities
  targetAudienceInterests: string[];
  placements: AdPlacement[];
  budgetType: 'daily' | 'lifetime';
  budgetAmount: number;
  spentAmount: number;
  currency: CurrencyCode;
  startDate: string;
  endDate: string;
  status: AdStatus;
  impressions: number;
  clicks: number;
  leads: number;
  conversions: number;
  ctr: number;
  costPerLead: number;
  riskScore?: 'low' | 'medium' | 'flagged';
  moderationNotes?: string;
  createdAt: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  userId: string;
  userName: string;
  userEmail: string;
  amount: number;
  currency: CurrencyCode;
  description: string;
  paymentMethod: 'M-Pesa Express' | 'Credit Card / Stripe' | 'PayPal' | 'Bank Transfer' | 'Airtel Money';
  status: 'paid' | 'pending' | 'failed' | 'refunded';
  itemType: 'membership' | 'advertising_credits' | 'featured_boost' | 'booking_deposit';
  date: string;
  dueDate: string;
  downloadUrl?: string;
}

export interface Review {
  id: string;
  targetId: string; // agentId, propertyId, dealershipId
  targetType: 'agent' | 'agency' | 'property' | 'vehicle' | 'dealership' | 'stay' | 'experience';
  authorName: string;
  authorAvatar: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  isVerifiedPurchase: boolean;
  status: 'approved' | 'pending' | 'flagged';
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  category: string;
  authorName: string;
  authorRole: string;
  authorAvatar: string;
  publishedAt: string;
  readTime: string;
  tags: string[];
  featured: boolean;
}

export interface BrandSettings {
  brandName: string;
  tagline: string;
  logoUrl: string;
  darkLogoUrl: string;
  faviconUrl: string;
  primaryColor: string; // e.g. emerald #059669
  secondaryColor: string; // e.g. amber/orange #d97706
  accentColor: string;
  supportEmail: string;
  supportPhone: string;
  supportWhatsapp: string;
  officeAddress: string;
  heroHeadline: string;
  heroSubheadline: string;
  heroImageUrl: string;
  defaultCurrency: CurrencyCode;
  exchangeRates?: Record<CurrencyCode | string, number>;
  socials: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    tiktok?: string;
  };
}

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'inquiry' | 'message' | 'booking' | 'ad_approved' | 'listing_approved' | 'payment' | 'system';
  link?: string;
  isRead: boolean;
  createdAt: string;
}

export interface ActivityEvent {
  id: string;
  userId: string;
  action: string;
  timestamp: string;
  type: 'booking' | 'invoice' | 'property' | 'profile' | 'favorite' | 'message' | 'reservation' | 'ad';
}
