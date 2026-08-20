import React from 'react';
import { RakeezFinancialSummary, Invoice, Product } from '../../types/rakeezTypes';
import { 
  TrendingUp, 
  DollarSign, 
  Receipt, 
  Package, 
  AlertTriangle, 
  Plus, 
  ArrowUpRight, 
  CheckCircle2, 
  FileText,
  Building2,
  PieChart
} from 'lucide-react';

interface RakeezDashboardViewProps {
  summary: RakeezFinancialSummary;
  invoices: Invoice[];
  products: Product[];
  onNavigate: (tab: string) => void;
}

export const RakeezDashboardView: React.FC<RakeezDashboardViewProps> = ({
  summary,
  invoices,
  products,
  onNavigate
}) => {
  const recentInvoices = invoices.slice(0, 5);
  const lowStockProducts = products.filter(p => p.stockQuantity <= p.minStockAlert);

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* QUICK ACTIONS BANNER */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-amber-950/40 via-slate-900 to-slate-950 border border-amber-500/30 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1 text-center sm:text-right">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <span className="px-2.5 py-0.5 rounded-md bg-amber-500 text-slate-950 font-black text-xs">الركيز ERP</span>
            <span className="text-xs font-bold text-amber-300">أهلاً بك في لوحة القيادة المالية والتشغيلية</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-black text-white">
            ملخص الأداء المالي والأرباح لشركة الركيز
          </h2>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => onNavigate('sales')}
            className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs flex items-center gap-2 transition-all cursor-pointer shadow-lg shadow-emerald-500/20"
          >
            <Plus className="w-4 h-4" /> فاتورة مبيعات جديدة
          </button>
          <button
            onClick={() => onNavigate('inventory')}
            className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
          >
            <Package className="w-4 h-4 text-amber-400" /> إضافة منتج جديد
          </button>
        </div>
      </div>

      {/* KPI STATS CARDS GRID */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* REVENUE */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-emerald-950/40 to-slate-900 border border-emerald-500/30 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">إجمالي مبيعات الركيز</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
              <TrendingUp className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">
              {summary.totalRevenue.toLocaleString()} <span className="text-xs text-slate-400 font-sans">ر.س</span>
            </div>
            <div className="text-[11px] text-emerald-400 font-bold mt-1">
              عدد الفواتير الصادرة: {summary.invoicesCount} فاتورة
            </div>
          </div>
        </div>

        {/* EXPENSES */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-red-950/40 to-slate-900 border border-red-500/30 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">المصروفات والمشتريات</span>
            <div className="p-2 rounded-xl bg-red-500/10 text-red-400">
              <Receipt className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">
              {summary.totalExpenses.toLocaleString()} <span className="text-xs text-slate-400 font-sans">ر.س</span>
            </div>
            <div className="text-[11px] text-red-400 font-bold mt-1">
              تشمل الإيجارات والمرافق والتشغيل
            </div>
          </div>
        </div>

        {/* NET PROFIT */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-900 border border-amber-500/40 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-300">صافي الأرباح التشغيلية</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
              <DollarSign className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {summary.netProfit.toLocaleString()} <span className="text-xs text-amber-300 font-sans">ر.س</span>
            </div>
            <div className="text-[11px] text-slate-400 font-bold mt-1">
              (المبيعات - المصروفات)
            </div>
          </div>
        </div>

        {/* INVENTORY VALUE & ALERTS */}
        <div className="p-5 rounded-2xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-purple-500/30 space-y-3 shadow-lg">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-400">قيمة البضاعة بالمخزون</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-400">
              <Package className="w-5 h-5" />
            </div>
          </div>
          <div>
            <div className="text-2xl font-black text-white font-mono">
              {summary.inventoryTotalValue.toLocaleString()} <span className="text-xs text-slate-400 font-sans">ر.س</span>
            </div>
            <div className="text-[11px] text-purple-300 font-bold mt-1">
              منتجات على وشك النفاد: {summary.lowStockCount} منتج
            </div>
          </div>
        </div>

      </div>

      {/* RECENT INVOICES & LOW STOCK TABLES */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* RECENT INVOICES (8 COLS) */}
        <div className="lg:col-span-8 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" /> أحدث فواتير المبيعات الضريبية
            </h3>
            <button
              onClick={() => onNavigate('sales')}
              className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              عرض الكل <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs dir-rtl">
              <thead className="bg-slate-950 text-slate-400 border-b border-slate-800 font-bold">
                <tr>
                  <th className="p-3">رقم الفاتورة</th>
                  <th className="p-3">اسم العميل</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">طريقة الدفع</th>
                  <th className="p-3">الإجمالي الشامل</th>
                  <th className="p-3">الحالة</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {recentInvoices.map((inv) => (
                  <tr key={inv.id} className="hover:bg-slate-800/40">
                    <td className="p-3 font-mono font-bold text-amber-400">{inv.invoiceNumber}</td>
                    <td className="p-3 font-bold text-white">{inv.customerName}</td>
                    <td className="p-3 text-slate-400 font-mono">{inv.date}</td>
                    <td className="p-3 text-slate-300">
                      {inv.paymentMethod === 'cash' && 'كاش 💵'}
                      {inv.paymentMethod === 'card' && 'شبكة 💳'}
                      {inv.paymentMethod === 'bank_transfer' && 'تحويل بنكي 🏛️'}
                      {inv.paymentMethod === 'credit' && 'آجل ⏳'}
                    </td>
                    <td className="p-3 font-mono font-bold text-emerald-400">{inv.grandTotal.toLocaleString()} ر.س</td>
                    <td className="p-3">
                      <span className="px-2 py-0.5 rounded-md bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-[10px]">
                        مدفوعة بالكامل
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* STOCK ALERT PANEL (4 COLS) */}
        <div className="lg:col-span-4 p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-black text-white flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-amber-400" /> تنبيهات المخزون
            </h3>
            <button
              onClick={() => onNavigate('inventory')}
              className="text-xs text-amber-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
            >
              إدارة <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {lowStockProducts.length === 0 ? (
            <div className="p-4 rounded-2xl bg-emerald-950/20 border border-emerald-500/30 text-emerald-300 text-xs text-center font-bold">
              جميع المنتجات متوفرة وكميات المخزون مطمئنة 👍
            </div>
          ) : (
            <div className="space-y-2">
              {lowStockProducts.map((p) => (
                <div key={p.id} className="p-3 rounded-2xl bg-red-950/30 border border-red-500/30 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-bold text-white">{p.name}</div>
                    <div className="text-[10px] text-slate-400 font-mono">رمز: {p.code}</div>
                  </div>
                  <div className="text-right">
                    <div className="font-mono font-bold text-red-400">{p.stockQuantity} {p.unit} باقي</div>
                    <div className="text-[10px] text-slate-400">الحد الأدنى: {p.minStockAlert}</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* VAT PAYABLE SUMMARY CARD */}
          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/40 to-slate-950 border border-amber-500/30 space-y-2">
            <div className="text-xs font-bold text-amber-300 flex items-center gap-1.5">
              <PieChart className="w-4 h-4 text-amber-400" /> صافي ضريبة القيمة المضافة (15% VAT):
            </div>
            <div className="text-xl font-black text-amber-400 font-mono">
              {summary.netVatPayable.toLocaleString()} ر.س
            </div>
            <div className="text-[10px] text-slate-400">
              المحصلة من العملاء: {summary.totalVatCollected} ر.س | المدفوعة للموردين: {summary.totalVatPaid} ر.س
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
