import React, { useState } from 'react';
import { Product, CheckoutState } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { StoreSection } from './components/StoreSection';
import { PaymentModal } from './components/PaymentModal';
import { MerchantDashboard } from './components/MerchantDashboard';
import { DevPortal } from './components/DevPortal';
import { AccountantCalculator } from './components/AccountantCalculator';

export function App() {
  const [activeTab, setActiveTab] = useState<'store' | 'simulator' | 'dashboard' | 'devportal' | 'accountant'>('accountant');
  const [checkoutState, setCheckoutState] = useState<CheckoutState>({
    isOpen: false,
    product: null,
    provider: 'tabby',
    step: 'select_plan',
    phone: '',
    otp: '',
    selectedPlan: ''
  });

  const handleOpenCheckout = (product: Product, provider: 'tabby' | 'tamara') => {
    setCheckoutState({
      isOpen: true,
      product,
      provider,
      step: 'select_plan',
      phone: '0551234567',
      otp: '',
      selectedPlan: ''
    });
  };

  const handleCloseCheckout = () => {
    setCheckoutState(prev => ({ ...prev, isOpen: false }));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-emerald-500 selection:text-slate-950">
      
      {/* Top Header */}
      <Header activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {activeTab === 'accountant' && (
          <AccountantCalculator />
        )}

        {activeTab === 'store' && (
          <StoreSection onOpenCheckout={handleOpenCheckout} />
        )}

        {activeTab === 'simulator' && (
          <div className="py-8 space-y-6">
            <div className="text-center max-w-2xl mx-auto space-y-2">
              <h2 className="text-3xl font-black text-white">محاكي عملية الدفع الفوري (OTP Flow Simulator)</h2>
              <p className="text-xs text-slate-300">
                اختر منتجك أدناه لتجربة طريقة إدخال الجوال ورمز التحقق والموافقة الحية على التقسيط عبر تابي وتمارا.
              </p>
            </div>
            <StoreSection onOpenCheckout={handleOpenCheckout} />
          </div>
        )}

        {activeTab === 'dashboard' && (
          <MerchantDashboard />
        )}

        {activeTab === 'devportal' && (
          <DevPortal />
        )}
      </main>

      {/* Interactive Payment Flow Modal */}
      {checkoutState.isOpen && (
        <PaymentModal
          checkoutState={checkoutState}
          onClose={handleCloseCheckout}
          onSuccess={() => {
            console.log('Payment successful!');
          }}
        />
      )}

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default App;
