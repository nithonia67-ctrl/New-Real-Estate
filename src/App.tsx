import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { GlobalModalContainer } from './components/modals/GlobalModalContainer';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { PropertiesPage } from './pages/public/PropertiesPage';
import { PropertyDetailPage } from './pages/public/PropertyDetailPage';
import { LandMarketplacePage } from './pages/public/LandMarketplacePage';
import { LandDetailPage } from './pages/public/LandDetailPage';
import { VehicleMarketplacePage } from './pages/public/VehicleMarketplacePage';
import { VehicleDetailPage } from './pages/public/VehicleDetailPage';
import { StaysPage } from './pages/public/StaysPage';
import { ExperiencesPage } from './pages/public/ExperiencesPage';
import { MapSearchPage } from './pages/public/MapSearchPage';
import { AgentsPage } from './pages/public/AgentsPage';
import { AgenciesPage } from './pages/public/AgenciesPage';
import { BlogPage } from './pages/public/BlogPage';
import { PricingMembershipPage } from './pages/public/PricingMembershipPage';
import { AdvertisePublicPage } from './pages/public/AdvertisePublicPage';
import { FavoritesPage } from './pages/public/FavoritesPage';

// Vendor / Agent Dashboard Pages
import { DashboardOverviewPage } from './pages/dashboard/DashboardOverviewPage';
import { DashboardListingsPage } from './pages/dashboard/DashboardListingsPage';
import { DashboardCRMLeadsPage } from './pages/dashboard/DashboardCRMLeadsPage';
import { DashboardBookingsPage } from './pages/dashboard/DashboardBookingsPage';
import { DashboardCampaignsPage } from './pages/dashboard/DashboardCampaignsPage';

// Super Admin Console Pages
import { SuperAdminOverviewPage } from './pages/superadmin/SuperAdminOverviewPage';
import { SuperAdminVerificationsPage } from './pages/superadmin/SuperAdminVerificationsPage';
import { SuperAdminCustomFieldsPage } from './pages/superadmin/SuperAdminCustomFieldsPage';
import { SuperAdminBrandingPage } from './pages/superadmin/SuperAdminBrandingPage';

function AppContent() {
  const { currentView, toastMessage } = useApp();

  const renderPage = () => {
    switch (currentView) {
      // Public Views
      case 'home':
        return <HomePage />;
      case 'properties':
        return <PropertiesPage />;
      case 'property_detail':
        return <PropertyDetailPage />;
      case 'land':
        return <LandMarketplacePage />;
      case 'land_detail':
        return <LandDetailPage />;
      case 'vehicles':
        return <VehicleMarketplacePage />;
      case 'vehicle_detail':
        return <VehicleDetailPage />;
      case 'stays':
        return <StaysPage />;
      case 'experiences':
        return <ExperiencesPage />;
      case 'map_search':
        return <MapSearchPage />;
      case 'agents':
        return <AgentsPage />;
      case 'agencies':
        return <AgenciesPage />;
      case 'blog':
        return <BlogPage />;
      case 'pricing':
        return <PricingMembershipPage />;
      case 'advertise_landing':
        return <AdvertisePublicPage />;
      case 'favorites':
        return <FavoritesPage />;

      // Vendor Dashboard
      case 'dashboard_overview':
        return <DashboardOverviewPage />;
      case 'dashboard_listings':
      case 'dashboard_my_listings':
      case 'dashboard_add_listing':
        return <DashboardListingsPage />;
      case 'dashboard_crm':
        return <DashboardCRMLeadsPage />;
      case 'dashboard_bookings':
        return <DashboardBookingsPage />;
      case 'dashboard_campaigns':
      case 'dashboard_advertising':
        return <DashboardCampaignsPage />;

      // Super Admin
      case 'superadmin_overview':
        return <SuperAdminOverviewPage />;
      case 'superadmin_verifications':
      case 'superadmin_moderation':
      case 'superadmin_ad_approvals':
        return <SuperAdminVerificationsPage />;
      case 'superadmin_custom_fields':
        return <SuperAdminCustomFieldsPage />;
      case 'superadmin_branding':
      case 'superadmin_brand_settings':
        return <SuperAdminBrandingPage />;

      default:
        return <HomePage />;
    }
  };

  const isMapSearch = currentView === 'map_search';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans text-slate-900 selection:bg-emerald-500 selection:text-white">
      {/* Universal Navigation Header */}
      <Header />

      {/* Main Viewport Content */}
      <main className="flex-1">
        {renderPage()}
      </main>

      {/* Global Footer (omitted on map search for optimal full-height viewport) */}
      {!isMapSearch && <Footer />}

      {/* Interactive Modal Manager (Mortgage calc, VIP viewing, Test drive, 360 virtual tour, Trade-in) */}
      <GlobalModalContainer />

      {/* Toast Notification Banner */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900/95 backdrop-blur-md text-white px-5 py-3.5 rounded-2xl shadow-2xl border border-slate-700 text-xs font-bold flex items-center space-x-2 animate-in fade-in slide-in-from-bottom-4 duration-300">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}

export function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}

export default App;

