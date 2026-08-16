import React from 'react';
import { ShoppingBag, CreditCard, LayoutDashboard, Code, Sparkles, Calculator, Database } from 'lucide-react';

interface HeaderProps {
  activeTab: 'system' | 'accountant' | 'store' | 'simulator' | 'dashboard' | 'devportal';
  setActiveTab: (tab: 'system' | 'accountant' | 'store' | 'simulator' | 'dashboard' | 'devportal') => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab }) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-800/80 bg-slate-950/80 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo & Badges */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="flex items-center">
                <span className="px-3 py-1.5 rounded-r-xl bg-emerald-400 text-slate-950 font-black text-lg tracking-wider">
                  tabby
                </span>
                <span className="px-3 py-1.5 rounded-l-xl bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 text-white font-black text-lg tracking-wider">
                  tamara
                </span>
              </div>
            </div>
            <div className="hidden md:flex items-center gap-2 border-r border-slate-800 pr-4 mr-2">
              <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-slate-900 border border-slate-700 text-slate-300">
                <Sparkles className="w-3 h-3 text-amber-400" /> النظام المحاسبي الشامل للتسويات
              </span>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="hidden lg:flex items-center gap-1.5 bg-slate-900/90 p-1.5 rounded-2xl border border-slate-800">
            
            <button
              onClick={() => setActiveTab('system')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'system'
                  ? 'bg-emerald-400 text-slate-950 shadow-md font-black'
                  : 'text-emerald-400 hover:bg-emerald-950/40 border border-emerald-500/30'
              }`}
            >
              <Database className="w-4 h-4" />
              النظام المحاسبي والتسويات (ERP System) 🏢
            </button>

            <button
              onClick={() => setActiveTab('accountant')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'accountant'
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-400" />
              حاسبة القيود
            </button>

            <button
              onClick={() => setActiveTab('store')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'store'
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <ShoppingBag className="w-4 h-4 text-emerald-400" />
              المتجر والمنتجات
            </button>

            <button
              onClick={() => setActiveTab('simulator')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'simulator'
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <CreditCard className="w-4 h-4 text-orange-400" />
              محاكاة الدفع (OTP)
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <LayoutDashboard className="w-4 h-4 text-purple-400" />
              لوحة التجار
            </button>

            <button
              onClick={() => setActiveTab('devportal')}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'devportal'
                  ? 'bg-slate-800 text-white shadow-md border border-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              <Code className="w-4 h-4 text-cyan-400" />
              المطورين
            </button>
          </nav>

          {/* Action Links */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span>الريال السعودي (SAR)</span>
            </div>
          </div>

        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden flex items-center justify-around py-3 border-t border-slate-800 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('system')}
            className={`text-xs px-3 py-1.5 rounded-lg font-bold flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'system' ? 'bg-emerald-400 text-slate-950 font-black' : 'text-emerald-400'
            }`}
          >
            <Database className="w-3.5 h-3.5" /> النظام المحاسبي
          </button>
          <button
            onClick={() => setActiveTab('accountant')}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'accountant' ? 'bg-slate-800 text-white' : 'text-slate-400'
            }`}
          >
            <Calculator className="w-3.5 h-3.5" /> القيود
          </button>
          <button
            onClick={() => setActiveTab('store')}
            className={`text-xs px-3 py-1.5 rounded-lg font-semibold flex items-center gap-1 whitespace-nowrap ${
              activeTab === 'store' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> المتجر
          </button>
        </div>

      </div>
    </header>
  );
};
