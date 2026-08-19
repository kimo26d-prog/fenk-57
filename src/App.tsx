import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { NotificationPanel } from './components/NotificationPanel';
import { ChatDrawer } from './components/ChatDrawer';
import { LoginModal } from './components/LoginModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { AddStoreModal, AddProductModal, CraftsmanRegisterModal } from './components/Modals';
import { ToastContainer } from './components/Toast';
import { PushNotificationToast } from './components/PushNotificationToast';
import { VipSubscriptionModal } from './components/VipSubscriptionModal';

import { HomeView } from './views/HomeView';
import { StoresView } from './views/StoresView';
import { StoreDetailView } from './views/StoreDetailView';
import { ProductsView } from './views/ProductsView';
import { CraftsmenView } from './views/CraftsmenView';
import { CraftsmanProfileView } from './views/CraftsmanProfileView';
import { VendorDashboardView } from './views/VendorDashboardView';
import { AdminDashboardView } from './views/AdminDashboardView';
import { CustomerProfileView } from './views/CustomerProfileView';
import { VipView } from './views/VipView';
import { AlgeriaMap } from './components/AlgeriaMap';

const MainLayout: React.FC = () => {
  const { page } = useApp();

  const renderCurrentView = () => {
    switch (page) {
      case 'home':
        return <HomeView />;
      case 'map':
        return (
          <div className="pt-20 min-h-screen">
            <AlgeriaMap />
          </div>
        );
      case 'stores':
        return <StoresView />;
      case 'store-detail':
        return <StoreDetailView />;
      case 'products':
        return <ProductsView />;
      case 'craftsmen':
        return <CraftsmenView />;
      case 'craftsman-profile':
        return <CraftsmanProfileView />;
      case 'profile':
      case 'orders-tracking':
        return <CustomerProfileView />;
      case 'dashboard':
        return <VendorDashboardView />;
      case 'admin':
        return <AdminDashboardView />;
      case 'vip':
        return <VipView />;
      default:
        return <HomeView />;
    }
  };

  const isDashboard = page === 'dashboard' || page === 'admin';

  return (
    <div className="min-h-screen bg-[#0a0a0f] text-slate-100 font-sans selection:bg-[#00d4c8] selection:text-black">
      {/* Top Navigation */}
      <Navbar />

      {/* Main View Area */}
      <main className="min-h-[calc(100vh-16rem)]">
        {renderCurrentView()}
      </main>

      {/* Footer for non-dashboard pages */}
      {!isDashboard && <Footer />}

      {/* Global Modals & Drawers */}
      <PushNotificationToast />
      <CartDrawer />
      <NotificationPanel />
      <ChatDrawer />
      <LoginModal />
      <OrderSuccessModal />
      <AddStoreModal />
      <AddProductModal />
      <CraftsmanRegisterModal />
      <VipSubscriptionModal />
      <ToastContainer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainLayout />
    </AppProvider>
  );
}
