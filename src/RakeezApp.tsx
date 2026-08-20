import React, { useState, useEffect } from 'react';
import { RakeezHeader } from './components/rakeez/RakeezHeader';
import { RakeezSidebar } from './components/rakeez/RakeezSidebar';
import { RakeezDashboardView } from './components/rakeez/RakeezDashboardView';
import { RakeezSalesView } from './components/rakeez/RakeezSalesView';
import { RakeezInventoryView } from './components/rakeez/RakeezInventoryView';
import { RakeezExpensesView } from './components/rakeez/RakeezExpensesView';
import { RakeezReportsView } from './components/rakeez/RakeezReportsView';
import { RakeezHRView } from './components/rakeez/RakeezHRView';
import { AdminLoginView } from './components/AdminLoginView';
import { LockScreen } from './components/LockScreen';
import { SecuritySettingsModal } from './components/SecuritySettingsModal';

import { 
  getRakeezProducts, 
  getRakeezInvoices, 
  getRakeezExpenses, 
  getRakeezEmployees, 
  computeRakeezSummary, 
  resetRakeezData 
} from './services/rakeezStorage';

import { 
  recordActivity,
  recordExitTime, 
  checkShouldLock, 
  lockAppImmediately 
} from './services/security';

export const RakeezApp: React.FC = () => {
  const isLoginPagePath = typeof window !== 'undefined' && window.location.pathname.includes('admin-login');
  
  // Default session active so user enters directly into Rakeez ERP Accounting system
  const [authSession, setAuthSession] = useState<{ username: string; role: string } | null>(() => {
    const saved = localStorage.getItem('rakeez_auth_session');
    if (saved) {
      try { return JSON.parse(saved); } catch { }
    }
    return { username: 'admin', role: 'المسؤول الرئيسي' };
  });

  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [products, setProducts] = useState(getRakeezProducts());
  const [invoices, setInvoices] = useState(getRakeezInvoices());
  const [expenses, setExpenses] = useState(getRakeezExpenses());
  const [employees, setEmployees] = useState(getRakeezEmployees());
  const [summary, setSummary] = useState(computeRakeezSummary());

  // Security & Lock State
  const [isLocked, setIsLocked] = useState<boolean>(() => checkShouldLock());
  const [showSecuritySettings, setShowSecuritySettings] = useState<boolean>(false);

  const refreshData = () => {
    const p = getRakeezProducts();
    const i = getRakeezInvoices();
    const e = getRakeezExpenses();
    const emp = getRakeezEmployees();
    setProducts(p);
    setInvoices(i);
    setExpenses(e);
    setEmployees(emp);
    setSummary(computeRakeezSummary());
  };

  useEffect(() => {
    refreshData();

    // 1. تتبع حركة ونشاط المستخدم لإلغاء مؤقت الخمول
    const handleUserInteraction = () => {
      recordActivity();
    };

    window.addEventListener('mousemove', handleUserInteraction);
    window.addEventListener('keydown', handleUserInteraction);
    window.addEventListener('click', handleUserInteraction);
    window.addEventListener('scroll', handleUserInteraction);
    window.addEventListener('touchstart', handleUserInteraction);

    // 2. تتبع مغادرة الصفحة أو خفاء التبويب
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') {
        recordExitTime();
      } else if (document.visibilityState === 'visible') {
        if (checkShouldLock()) {
          setIsLocked(true);
        }
      }
    };

    const handlePageHide = () => recordExitTime();
    const handleBlur = () => recordExitTime();
    const handleFocus = () => {
      if (checkShouldLock()) {
        setIsLocked(true);
      }
    };

    // 3. فحص دوري دقيق كل 3 ثوانٍ لمعرفة هل مر 3 دقائق من الخمول أو الخروج
    const interval = setInterval(() => {
      if (checkShouldLock()) {
        setIsLocked(true);
      }
    }, 3000);

    window.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('pagehide', handlePageHide);
    window.addEventListener('blur', handleBlur);
    window.addEventListener('focus', handleFocus);

    return () => {
      window.removeEventListener('mousemove', handleUserInteraction);
      window.removeEventListener('keydown', handleUserInteraction);
      window.removeEventListener('click', handleUserInteraction);
      window.removeEventListener('scroll', handleUserInteraction);
      window.removeEventListener('touchstart', handleUserInteraction);
      window.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('pagehide', handlePageHide);
      window.removeEventListener('blur', handleBlur);
      window.removeEventListener('focus', handleFocus);
      clearInterval(interval);
    };
  }, []);

  const handleReset = () => {
    if (confirm('هل تريد إعادة تحميل بيانات عينة نظام الركيز؟')) {
      resetRakeezData();
      refreshData();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('rakeez_auth_session');
    lockAppImmediately();
    setIsLocked(true);
  };

  const handleLoginSuccess = (user: string) => {
    setAuthSession({ username: user, role: 'المسؤول الرئيسي' });
    setIsLocked(false);
    recordActivity();
    if (typeof window !== 'undefined' && window.location.pathname.includes('admin-login')) {
      window.history.pushState({}, '', '/');
    }
  };

  if (isLoginPagePath && !authSession) {
    return <AdminLoginView onLoginSuccess={handleLoginSuccess} />;
  }

  const currentUsername = authSession ? authSession.username : 'admin';

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans selection:bg-amber-500 selection:text-slate-950 dir-rtl">
      <div className="max-w-7xl mx-auto space-y-6">
        
        {/* RAKEEZ HEADER */}
        <RakeezHeader
          activeTab={activeTab}
          onTabChange={setActiveTab}
          onOpenSecurity={() => setShowSecuritySettings(true)}
          onLockNow={() => {
            lockAppImmediately();
            setIsLocked(true);
          }}
          onResetData={handleReset}
          onLogout={handleLogout}
          username={currentUsername}
        />

        {/* MAIN BODY: SIDEBAR + CONTENT */}
        <div className="flex flex-col md:flex-row items-start gap-6">
          
          {/* SIDEBAR */}
          <RakeezSidebar
            activeTab={activeTab}
            onTabChange={setActiveTab}
            lowStockAlertCount={summary.lowStockCount}
            onLogout={handleLogout}
          />

          {/* MAIN CONTENT AREA */}
          <main className="flex-1 w-full min-w-0">
            {activeTab === 'dashboard' && (
              <RakeezDashboardView
                summary={summary}
                invoices={invoices}
                products={products}
                onNavigate={setActiveTab}
              />
            )}

            {activeTab === 'sales' && (
              <RakeezSalesView
                products={products}
                invoices={invoices}
                onRefresh={refreshData}
              />
            )}

            {activeTab === 'inventory' && (
              <RakeezInventoryView
                products={products}
                onRefresh={refreshData}
              />
            )}

            {activeTab === 'expenses' && (
              <RakeezExpensesView
                expenses={expenses}
                onRefresh={refreshData}
              />
            )}

            {activeTab === 'reports' && (
              <RakeezReportsView
                summary={summary}
                invoices={invoices}
                expenses={expenses}
              />
            )}

            {activeTab === 'hr' && (
              <RakeezHRView
                employees={employees}
                onRefresh={refreshData}
              />
            )}
          </main>

        </div>

        {/* FOOTER */}
        <footer className="text-center text-xs text-slate-500 py-6 border-t border-slate-900">
          نظام الركيز للإدارة والمحاسبة والـ ERP المتكامل © {new Date().getFullYear()} - جميع الحقوق محفوظة لشركة الركيز
        </footer>

      </div>

      {/* LOCK SCREEN OVERLAY */}
      {isLocked && (
        <LockScreen onUnlocked={() => setIsLocked(false)} />
      )}

      {/* SECURITY SETTINGS MODAL */}
      {showSecuritySettings && (
        <SecuritySettingsModal
          onClose={() => setShowSecuritySettings(false)}
          onLockNow={() => {
            lockAppImmediately();
            setIsLocked(true);
          }}
        />
      )}
    </div>
  );
};

export default RakeezApp;
