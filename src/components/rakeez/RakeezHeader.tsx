import React from 'react';
import { 
  Building2, 
  Shield, 
  Lock, 
  RefreshCw, 
  Calendar, 
  Zap,
  LogOut,
  UserCheck
} from 'lucide-react';
import { lockAppImmediately } from '../../services/security';

interface RakeezHeaderProps {
  onOpenSecurity: () => void;
  onLockNow: () => void;
  onResetData: () => void;
  activeTab: string;
  onTabChange: (tab: string) => void;
  onLogout?: () => void;
  username?: string;
}

export const RakeezHeader: React.FC<RakeezHeaderProps> = ({
  onOpenSecurity,
  onLockNow,
  onResetData,
  activeTab,
  onTabChange,
  onLogout,
  username = 'admin'
}) => {
  const currentDate = new Date().toLocaleDateString('ar-SA', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <header className="p-5 sm:p-6 rounded-3xl glass-panel border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-amber-950/20 shadow-2xl space-y-4">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        
        {/* LOGO & TITLE */}
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/40 text-amber-400 shadow-xl shadow-amber-500/10">
            <Building2 className="w-8 h-8" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-3 py-0.5 rounded-lg bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black text-xs">
                الركيز RAKEEZ
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-300 font-bold border border-amber-500/30">
                نظام ERP والمحاسبة المتكامل v2.0
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-1">
              نظام الركيز للإدارة المالية والمبيعات والمخزون
            </h1>
          </div>
        </div>

        {/* TOP ACTION BUTTONS */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="hidden lg:flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium">
            <Calendar className="w-3.5 h-3.5 text-amber-400" />
            {currentDate}
          </div>

          <button
            onClick={() => onTabChange('sales')}
            className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-400 hover:to-emerald-500 text-slate-950 text-xs font-black flex items-center gap-1.5 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <Zap className="w-3.5 h-3.5" /> كاشير الركيز السريع
          </button>

          <button
            onClick={onOpenSecurity}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="إعدادات حماية الخروج برمز الدخول (3 دقائق)"
          >
            <Shield className="w-3.5 h-3.5 text-emerald-400" /> حماية 3 دقائق
          </button>

          <button
            onClick={onLockNow}
            className="px-3.5 py-2 rounded-xl bg-red-950/60 hover:bg-red-900/60 border border-red-500/40 text-xs font-bold text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="قفل النظام فوراً"
          >
            <Lock className="w-3.5 h-3.5 text-red-400" /> قفل
          </button>

          <button
            onClick={onResetData}
            className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-400 hover:text-slate-200 flex items-center gap-1.5 transition-colors cursor-pointer"
            title="إعادة ضبط بيانات عينة الركيز"
          >
            <RefreshCw className="w-3.5 h-3.5 text-amber-400" /> إعادة الضبط
          </button>

          {onLogout && (
            <button
              onClick={onLogout}
              className="px-3.5 py-2 rounded-xl bg-red-900/40 hover:bg-red-800/60 border border-red-500/40 text-xs font-bold text-red-300 flex items-center gap-1.5 transition-colors cursor-pointer"
              title="تسجيل الخروج والعودة لشاشة الدخول"
            >
              <LogOut className="w-3.5 h-3.5 text-red-400" /> تسجيل الخروج
            </button>
          )}
        </div>

      </div>
    </header>
  );
};
