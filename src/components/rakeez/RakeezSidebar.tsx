import React from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Receipt, 
  BarChart3, 
  Users, 
  ShieldCheck,
  LogOut
} from 'lucide-react';

interface RakeezSidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  lowStockAlertCount: number;
  onLogout?: () => void;
}

export const RakeezSidebar: React.FC<RakeezSidebarProps> = ({
  activeTab,
  onTabChange,
  lowStockAlertCount,
  onLogout
}) => {
  const menuItems = [
    {
      id: 'dashboard',
      label: 'لوحة القيادة',
      icon: LayoutDashboard,
      badge: null
    },
    {
      id: 'sales',
      label: 'المبيعات والكاشير',
      icon: ShoppingBag,
      badge: null
    },
    {
      id: 'inventory',
      label: 'المخزون والمنتجات',
      icon: Package,
      badge: lowStockAlertCount > 0 ? `${lowStockAlertCount} نقص` : null
    },
    {
      id: 'expenses',
      label: 'المصروفات والمشتريات',
      icon: Receipt,
      badge: null
    },
    {
      id: 'reports',
      label: 'التقارير والإقرار الضريبي',
      icon: BarChart3,
      badge: '15% VAT'
    },
    {
      id: 'hr',
      label: 'الموظفين والرواتب',
      icon: Users,
      badge: null
    }
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 space-y-2 dir-rtl">
      <div className="p-3 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-1.5 shadow-xl">
        <div className="px-3 py-2 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
          قائمة نظام الركيز ERP
        </div>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`w-full p-3 rounded-xl font-bold text-xs flex items-center justify-between transition-all cursor-pointer ${
                isActive
                  ? 'bg-gradient-to-r from-amber-500/20 via-amber-500/10 to-slate-900 border border-amber-500/40 text-amber-300 shadow-md'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon className={`w-4 h-4 ${isActive ? 'text-amber-400' : 'text-slate-400'}`} />
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                  isActive ? 'bg-amber-500 text-slate-950' : 'bg-red-950/60 text-red-300 border border-red-500/30'
                }`}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* SECURITY FOOTER IN SIDEBAR */}
      <div className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-amber-950/30 border border-slate-800/80 text-center space-y-2 shadow-lg">
        <div className="flex justify-center text-amber-400">
          <ShieldCheck className="w-5 h-5 animate-pulse" />
        </div>
        <div className="text-xs font-bold text-white">نظام أمان الركيز 🛡️</div>
        <div className="text-[10px] text-slate-400 leading-relaxed">
          قفل وخروج تلقائي فور الخمول لمدة 5 دقائق لضمان سرية الحسابات
        </div>
        
        {onLogout && (
          <button
            onClick={onLogout}
            className="w-full mt-2 py-2 rounded-xl bg-red-950/50 hover:bg-red-900/60 border border-red-500/30 text-xs font-bold text-red-300 flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <LogOut className="w-3.5 h-3.5 text-red-400" />
            <span>تسجيل الخروج</span>
          </button>
        )}
      </div>
    </aside>
  );
};
