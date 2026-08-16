import React from 'react';
import { MerchantMetric, SettlementTransaction } from '../types';
import { TrendingUp, DollarSign, ShoppingCart, Percent, ArrowUpRight, ArrowDownRight, RefreshCw, Layers, CheckCircle } from 'lucide-react';

const METRICS: MerchantMetric[] = [
  {
    title: 'إجمالي مبيعات التقسيط (BNPL Sales)',
    value: '428,500 ر.س',
    change: '+34.2%',
    isPositive: true,
    subtext: 'مقارنة بالشهور الماضية بدون تابي وتجارة'
  },
  {
    title: 'مبيعات تابي (Tabby Volume)',
    value: '235,100 ر.س',
    change: '+54.8%',
    isPositive: true,
    subtext: '55% من إجمالي مبيعات التقسيط'
  },
  {
    title: 'مبيعات تمارا (Tamara Volume)',
    value: '193,400 ر.س',
    change: '+45.2%',
    isPositive: true,
    subtext: '45% من إجمالي مبيعات التقسيط'
  },
  {
    title: 'متوسط قيمة السلة (AOV Boost)',
    value: '1,450 ر.س',
    change: '+68.0%',
    isPositive: true,
    subtext: 'ارتفاع بقيمة 590 ر.س لكل طلب'
  }
];

const TRANSACTIONS: SettlementTransaction[] = [
  {
    id: 'TXN-9021',
    date: '2026-08-16',
    provider: 'tabby',
    customerName: 'فهد العتيبي',
    amount: 3600,
    fee: 108,
    netAmount: 3492,
    status: 'completed'
  },
  {
    id: 'TXN-9022',
    date: '2026-08-16',
    provider: 'tamara',
    customerName: 'سارة الدوسري',
    amount: 4800,
    fee: 144,
    netAmount: 4656,
    status: 'completed'
  },
  {
    id: 'TXN-9023',
    date: '2026-08-15',
    provider: 'tabby',
    customerName: 'عبدالله الشمري',
    amount: 2400,
    fee: 72,
    netAmount: 2328,
    status: 'completed'
  },
  {
    id: 'TXN-9024',
    date: '2026-08-15',
    provider: 'tamara',
    customerName: 'نورة القحطاني',
    amount: 1800,
    fee: 54,
    netAmount: 1746,
    status: 'completed'
  },
  {
    id: 'TXN-9025',
    date: '2026-08-14',
    provider: 'tabby',
    customerName: 'محمد المطيري',
    amount: 1200,
    fee: 36,
    netAmount: 1164,
    status: 'refunded'
  }
];

export const MerchantDashboard: React.FC = () => {
  return (
    <div className="space-y-8 py-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-slate-800">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-xs font-bold border border-purple-500/30">
              Merchant Analytics Center
            </span>
          </div>
          <h2 className="text-2xl font-black text-white mt-1">لوحة تحكم مبيعات تابي وتمارا للتجار</h2>
          <p className="text-xs text-slate-400 mt-1">
            متابعة فورية للتحصيلات، العمولات، والتسويات البنكية اليومية لمتجرك الإلكتروني.
          </p>
        </div>

        <button className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-700 text-xs font-extrabold text-white flex items-center gap-2 self-start sm:self-auto cursor-pointer">
          <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> تحديث البيانات الفورية
        </button>
      </div>

      {/* Metrics Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {METRICS.map((metric, idx) => (
          <div key={idx} className="p-5 rounded-2xl glass-panel border border-slate-800 hover:border-slate-700 transition-all">
            <div className="flex items-center justify-between">
              <span className="text-xs text-slate-400 font-semibold">{metric.title}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-bold flex items-center gap-0.5 ${
                metric.isPositive ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-red-500/20 text-red-400'
              }`}>
                {metric.change} {metric.isPositive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
              </span>
            </div>

            <div className="text-2xl font-black text-white mt-3">{metric.value}</div>
            <p className="text-[11px] text-slate-400 mt-1">{metric.subtext}</p>
          </div>
        ))}
      </div>

      {/* Analytics Chart & Volume Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Tabby vs Tamara Comparison */}
        <div className="lg:col-span-2 p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white">توزيع مبيعات تابي مقابل تمارا</h3>
            <span className="text-xs text-slate-400">آخر 30 يوم</span>
          </div>

          <div className="space-y-5">
            {/* Tabby bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-emerald-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span> تابي (Tabby 4 Payments)
                </span>
                <span className="font-mono text-slate-200">235,100 ر.س (55%)</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-emerald-500 to-teal-300 rounded-full" style={{ width: '55%' }}></div>
              </div>
            </div>

            {/* Tamara bar */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-orange-400 flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500"></span> تمارا (Tamara Pay in 3/4)
                </span>
                <span className="font-mono text-slate-200">193,400 ر.س (45%)</span>
              </div>
              <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden border border-slate-800">
                <div className="h-full bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>

          {/* Key Insights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t border-slate-800/80">
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-emerald-400">معدل الاعتماد والقبول</div>
              <p className="text-slate-300 leading-relaxed">
                تزيد مبيعات تابي بنسبة 18% على السلات ذات القيمة التي تتجاوز 2000 ريال.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 text-xs space-y-1">
              <div className="font-bold text-orange-400">معدل التحويل (CR)</div>
              <p className="text-slate-300 leading-relaxed">
                ارتفعت نسبة إكمال الشراء بدون إلغاء بنسبة +42% بفضل تفعيل خياري تابي وتمارا معاً.
              </p>
            </div>
          </div>
        </div>

        {/* Settlement Summary */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5">
          <h3 className="text-base font-extrabold text-white">ملخص التسويات المالية القادمة</h3>
          
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
            <div className="text-xs text-emerald-400 font-semibold">تسوية تابي الأسبوعية</div>
            <div className="text-xl font-black text-white">41,200 ر.س</div>
            <div className="text-[11px] text-slate-400">تاريخ الإيداع المتوقع: الثلاثاء القادم</div>
          </div>

          <div className="p-4 rounded-2xl bg-purple-950/30 border border-orange-500/30 space-y-2">
            <div className="text-xs text-orange-400 font-semibold">تسوية تمارا الأسبوعية</div>
            <div className="text-xl font-black text-white">38,900 ر.س</div>
            <div className="text-[11px] text-slate-400">تاريخ الإيداع المتوقع: الأربعاء القادم</div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-xs text-slate-400 border border-slate-800 flex items-center justify-between">
            <span>نسبة العمولة المتوسطة:</span>
            <strong className="text-white font-mono">3.0% + 1 ر.س</strong>
          </div>
        </div>

      </div>

      {/* Settlements Table */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-extrabold text-white">سجل المعاملات والتسويات الأخيرة</h3>
          <span className="text-xs text-emerald-400 font-semibold cursor-pointer hover:underline">عرض الكل &larr;</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right text-xs text-slate-300">
            <thead className="text-slate-400 bg-slate-900/80 border-b border-slate-800">
              <tr>
                <th className="p-3">رقم العملية</th>
                <th className="p-3">التاريخ</th>
                <th className="p-3">البوابة</th>
                <th className="p-3">اسم العميل</th>
                <th className="p-3">المبلغ الإجمالي</th>
                <th className="p-3">الرسوم</th>
                <th className="p-3">المبلغ الصافي</th>
                <th className="p-3">الحالة</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {TRANSACTIONS.map((tx) => (
                <tr key={tx.id} className="hover:bg-slate-900/40">
                  <td className="p-3 font-mono font-bold text-white">{tx.id}</td>
                  <td className="p-3 font-mono">{tx.date}</td>
                  <td className="p-3">
                    {tx.provider === 'tabby' ? (
                      <span className="px-2 py-0.5 rounded-md bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30 text-[10px]">
                        Tabby
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-md bg-purple-950 text-orange-400 font-bold border border-orange-500/30 text-[10px]">
                        Tamara
                      </span>
                    )}
                  </td>
                  <td className="p-3 text-slate-200">{tx.customerName}</td>
                  <td className="p-3 font-bold text-white font-mono">{tx.amount.toLocaleString()} ر.س</td>
                  <td className="p-3 text-slate-400 font-mono">-{tx.fee} ر.س</td>
                  <td className="p-3 font-bold text-emerald-400 font-mono">{tx.netAmount.toLocaleString()} ر.س</td>
                  <td className="p-3">
                    {tx.status === 'completed' ? (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-bold">
                        <CheckCircle className="w-3 h-3" /> مكتمل
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 font-bold">
                        مسترد
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
