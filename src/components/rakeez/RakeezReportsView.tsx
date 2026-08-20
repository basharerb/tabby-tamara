import React from 'react';
import { RakeezFinancialSummary, Invoice, Expense } from '../../types/rakeezTypes';
import { 
  BarChart3, 
  Printer, 
  TrendingUp, 
  Receipt, 
  PieChart, 
  DollarSign, 
  CheckCircle2, 
  FileSpreadsheet
} from 'lucide-react';

interface RakeezReportsViewProps {
  summary: RakeezFinancialSummary;
  invoices: Invoice[];
  expenses: Expense[];
}

export const RakeezReportsView: React.FC<RakeezReportsViewProps> = ({
  summary,
  invoices,
  expenses
}) => {
  // Payment methods breakdown
  const paymentBreakdown = {
    card: invoices.filter(i => i.paymentMethod === 'card').reduce((sum, i) => sum + i.grandTotal, 0),
    cash: invoices.filter(i => i.paymentMethod === 'cash').reduce((sum, i) => sum + i.grandTotal, 0),
    bank_transfer: invoices.filter(i => i.paymentMethod === 'bank_transfer').reduce((sum, i) => sum + i.grandTotal, 0),
    credit: invoices.filter(i => i.paymentMethod === 'credit').reduce((sum, i) => sum + i.grandTotal, 0),
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      
      {/* HEADER BAR */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl">
        <div className="space-y-1">
          <h2 className="text-xl font-black text-white flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-amber-400" /> التقارير المحاسبية والإقرار الضريبي (15% VAT)
          </h2>
          <p className="text-xs text-slate-400">قائمة الأرباح والخسائر الملخصة، الإقرار الضريبي، وتوزيع المدفوعات</p>
        </div>

        <button
          onClick={() => window.print()}
          className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer border border-slate-700"
        >
          <Printer className="w-4 h-4 text-amber-400" /> طباعة التقرير المالي
        </button>
      </div>

      {/* PROFIT & LOSS STATEMENT CARD */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <DollarSign className="w-4 h-4 text-amber-400" /> قائمة الأرباح والخسائر التشغيلية (P&L Statement)
        </h3>

        <div className="space-y-3 text-xs dir-rtl">
          <div className="flex justify-between items-center p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30">
            <span className="font-bold text-emerald-300">إجمالي المبيعات والإيرادات:</span>
            <span className="font-mono text-base font-black text-emerald-400">+{summary.totalRevenue.toLocaleString()} ر.س</span>
          </div>

          <div className="flex justify-between items-center p-3.5 rounded-2xl bg-red-950/30 border border-red-500/30">
            <span className="font-bold text-red-300">إجمالي المصروفات والتكاليف التشغيلية:</span>
            <span className="font-mono text-base font-black text-red-400">-{summary.totalExpenses.toLocaleString()} ر.س</span>
          </div>

          <div className="flex justify-between items-center p-4 rounded-2xl bg-gradient-to-r from-amber-950/60 via-slate-900 to-slate-900 border-2 border-amber-500/50">
            <div>
              <span className="font-black text-sm text-amber-300 block">صافي الربح التشغيلي قبل الضريبة:</span>
              <span className="text-[11px] text-slate-400">مجموع الإيرادات ناقص التكاليف</span>
            </div>
            <span className="font-mono text-2xl font-black text-amber-400">
              {summary.netProfit.toLocaleString()} ر.س
            </span>
          </div>
        </div>
      </div>

      {/* VAT 15% TAX RETURN SUMMARY CARD */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-5 shadow-xl">
        <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <PieChart className="w-4 h-4 text-amber-400" /> إقرار ضريبة القيمة المضافة (ZATCA 15% VAT Return)
        </h3>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs dir-rtl">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold">الضريبة المحصلة من المبيعات (المستحقة للدولة):</div>
            <div className="text-xl font-black text-amber-400 font-mono">+{summary.totalVatCollected.toLocaleString()} ر.س</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-bold">الضريبة المدفوعة للموردين (المستردة):</div>
            <div className="text-xl font-black text-emerald-400 font-mono">-{summary.totalVatPaid.toLocaleString()} ر.س</div>
          </div>

          <div className="p-4 rounded-2xl bg-gradient-to-br from-amber-950/50 to-slate-900 border border-amber-500/40 space-y-1">
            <div className="text-amber-300 font-bold">صافي الضريبة الواجب سدادها للهيئة:</div>
            <div className="text-xl font-black text-amber-400 font-mono">{summary.netVatPayable.toLocaleString()} ر.س</div>
          </div>
        </div>
      </div>

      {/* PAYMENT METHODS BREAKDOWN */}
      <div className="p-6 rounded-3xl bg-slate-900/90 border border-slate-800 space-y-4 shadow-xl">
        <h3 className="text-sm font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
          <FileSpreadsheet className="w-4 h-4 text-emerald-400" /> توزيع المبيعات حسب طرق الدفع
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs dir-rtl">
          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400">شبكة ومدفوعات الإلكترونية:</div>
            <div className="text-lg font-bold text-white font-mono">{paymentBreakdown.card.toLocaleString()} ر.س</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400">كاش ونقدية:</div>
            <div className="text-lg font-bold text-white font-mono">{paymentBreakdown.cash.toLocaleString()} ر.س</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400">تحويلات بنكية:</div>
            <div className="text-lg font-bold text-white font-mono">{paymentBreakdown.bank_transfer.toLocaleString()} ر.س</div>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 space-y-1">
            <div className="text-slate-400">آجل وديون:</div>
            <div className="text-lg font-bold text-white font-mono">{paymentBreakdown.credit.toLocaleString()} ر.س</div>
          </div>
        </div>
      </div>

    </div>
  );
};
