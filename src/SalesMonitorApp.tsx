import React, { useState, useEffect } from 'react';
import { SaleOrder, SummaryStats, PaymentGateway } from './types';
import { getSavedSales, saveNewSale, deleteSale, computeSummaryStats, resetSalesData } from './services/storage';
import { 
  PlusCircle, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  Search, 
  Filter, 
  FileSpreadsheet, 
  Receipt,
  Calculator,
  Percent,
  Sparkles
} from 'lucide-react';

export const SalesMonitorApp: React.FC = () => {
  const [sales, setSales] = useState<SaleOrder[]>([]);
  const [stats, setStats] = useState<SummaryStats>({
    totalSales: 0,
    tabbySales: 0,
    tamaraSales: 0,
    totalCommissions: 0,
    totalVat: 0,
    totalNet: 0,
    ordersCount: 0
  });

  // Filter & Search State
  const [filterGateway, setFilterGateway] = useState<'all' | 'tabby' | 'tamara'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Custom Contract Rates
  const [tabbyRate, setTabbyRate] = useState<number>(3.5);
  const [tabbyFixed, setTabbyFixed] = useState<number>(1.0);
  const [tamaraRate, setTamaraRate] = useState<number>(3.99);
  const [tamaraFixed, setTamaraFixed] = useState<number>(1.5);
  const [showSettings, setShowSettings] = useState(false);

  // New Sale Form State
  const [orderNum, setOrderNum] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [customerName, setCustomerName] = useState('');
  const [saleDate, setSaleDate] = useState(new Date().toISOString().split('T')[0]);
  const [gateway, setGateway] = useState<PaymentGateway>('tabby');
  const [amount, setAmount] = useState<number | ''>('');
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);

  // Load sales data
  const refresh = () => {
    const list = getSavedSales();
    setSales(list);
    setStats(computeSummaryStats(list));
  };

  useEffect(() => {
    refresh();
  }, []);

  // Live fee preview for form
  const currentRate = gateway === 'tabby' ? tabbyRate : tamaraRate;
  const currentFixed = gateway === 'tabby' ? tabbyFixed : tamaraFixed;
  const numAmount = Number(amount) || 0;
  const previewComm = (numAmount * (currentRate / 100)) + currentFixed;
  const previewVat = previewComm * 0.15;
  const previewTotalDeduct = previewComm + previewVat;
  const previewNet = Math.max(0, numAmount - previewTotalDeduct);

  // Handle submit form
  const handleAddSale = (e: React.FormEvent) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    saveNewSale({
      orderNumber: orderNum || `INV-${Date.now()}`,
      customerName: customerName || 'عميل عام',
      date: saleDate,
      gateway,
      grossAmount: Number(amount),
      notes,
      tabbyRate,
      tabbyFixed,
      tamaraRate,
      tamaraFixed
    });

    // Reset Form
    setOrderNum(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    setCustomerName('');
    setAmount('');
    setNotes('');
    setSuccessMsg(true);
    setTimeout(() => setSuccessMsg(false), 3000);

    refresh();
  };

  // Handle Delete
  const handleDelete = (id: string) => {
    if (confirm('هل أنت تأكد من حذف عملية البيع هذه؟')) {
      deleteSale(id);
      refresh();
    }
  };

  // Reset Data
  const handleReset = () => {
    if (confirm('هل تريد إعادة تحميل مبيعات العينة للتجربة؟')) {
      resetSalesData();
      refresh();
    }
  };

  // Filtered Sales List
  const filteredSales = sales.filter(s => {
    if (filterGateway !== 'all' && s.gateway !== filterGateway) return false;
    if (searchQuery.trim() !== '') {
      const q = searchQuery.toLowerCase();
      const matchNum = s.orderNumber.toLowerCase().includes(q);
      const matchCust = s.customerName.toLowerCase().includes(q);
      const matchNotes = s.notes ? s.notes.toLowerCase().includes(q) : false;
      return matchNum || matchCust || matchNotes;
    }
    return true;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 sm:p-8 font-sans selection:bg-emerald-500 selection:text-slate-950">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* APP HEADER */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl glass-panel border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/30 shadow-2xl">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-r-lg bg-emerald-400 text-slate-950 font-black text-xs">tabby</span>
              <span className="px-2.5 py-1 rounded-l-lg bg-gradient-to-r from-orange-500 to-purple-600 text-white font-black text-xs">tamara</span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 mr-2">
                برنامج مراقبة ومحاسبة المبيعات
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
              برنامج مراقبة مبيعات وعمولات <span className="text-emerald-400">تابي</span> و <span className="text-orange-400">تمارا</span>
            </h1>
            <p className="text-xs text-slate-400">
              تسجيل المبيعات، حساب عمولة كل طلب تلقائياً، والاحتفاظ بجميع السجلات في مكان واحد.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={() => setShowSettings(!showSettings)}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <Percent className="w-3.5 h-3.5 text-orange-400" /> نسبة العقود
            </button>
            <button 
              onClick={handleReset}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> إعادة الضبط
            </button>
          </div>
        </header>

        {/* CUSTOM CONTRACT RATES PANEL */}
        {showSettings && (
          <div className="p-6 rounded-3xl glass-panel border border-orange-500/30 bg-slate-900/90 space-y-4 animate-fadeIn">
            <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Percent className="w-4 h-4 text-orange-400" /> إعداد نسب العمولات المخصصة للمتجر (Contract Rates)
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-2">
                <div className="font-bold text-emerald-400">عقد تابي (Tabby Rate):</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">النسبة المئوية (%):</label>
                    <input 
                      type="number" step="0.01" value={tabbyRate} onChange={(e) => setTabbyRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">رسم ثابت (ر.س):</label>
                    <input 
                      type="number" step="0.1" value={tabbyFixed} onChange={(e) => setTabbyFixed(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white font-mono"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-purple-950/30 border border-orange-500/30 space-y-2">
                <div className="font-bold text-orange-400">عقد تمارا (Tamara Rate):</div>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-slate-400 block mb-1">النسبة المئوية (%):</label>
                    <input 
                      type="number" step="0.01" value={tamaraRate} onChange={(e) => setTamaraRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white font-mono"
                    />
                  </div>
                  <div>
                    <label className="text-slate-400 block mb-1">رسم ثابت (ر.س):</label>
                    <input 
                      type="number" step="0.1" value={tamaraFixed} onChange={(e) => setTamaraFixed(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2 text-white font-mono"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SUMMARY STATS CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          
          <div className="p-5 rounded-3xl glass-panel border border-slate-800 space-y-1">
            <span className="text-xs text-slate-400 font-semibold block">إجمالي مبيعات تابي وتمارا</span>
            <div className="text-2xl font-black text-white font-mono">
              {stats.totalSales.toLocaleString()} <span className="text-xs font-normal text-slate-400">ر.س</span>
            </div>
            <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
              <span>تابي: <strong className="text-emerald-400 font-mono">{stats.tabbySales.toLocaleString()}</strong></span>
              <span>تمارا: <strong className="text-orange-400 font-mono">{stats.tamaraSales.toLocaleString()}</strong></span>
            </div>
          </div>

          <div className="p-5 rounded-3xl glass-panel border border-orange-500/30 bg-slate-900/60 space-y-1">
            <span className="text-xs text-slate-400 font-semibold block">إجمالي العمولات المخصومة</span>
            <div className="text-2xl font-black text-orange-400 font-mono">
              {stats.totalCommissions.toFixed(2)} <span className="text-xs font-normal text-slate-400">ر.س</span>
            </div>
            <p className="text-[11px] text-slate-400">حسب نسب العقود المعتمدة</p>
          </div>

          <div className="p-5 rounded-3xl glass-panel border border-amber-500/30 bg-slate-900/60 space-y-1">
            <span className="text-xs text-slate-400 font-semibold block">ضريبة القيمة المضافة 15%</span>
            <div className="text-2xl font-black text-amber-400 font-mono">
              {stats.totalVat.toFixed(2)} <span className="text-xs font-normal text-slate-400">ر.س</span>
            </div>
            <p className="text-[11px] text-slate-400">ضريبة على العمولات (مدخلات مستردة)</p>
          </div>

          <div className="p-5 rounded-3xl glass-panel border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 to-slate-900/90 space-y-1">
            <span className="text-xs text-emerald-300 font-bold block">صافي المبالغ المستحقة لمتجرك</span>
            <div className="text-2xl font-black text-emerald-400 font-mono">
              {stats.totalNet.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-300">ر.س</span>
            </div>
            <p className="text-[11px] text-emerald-300/80">عدد العمليات: {stats.ordersCount} طلبات</p>
          </div>

        </div>

        {/* ADD SALE FORM */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <PlusCircle className="w-5 h-5 text-emerald-400" /> إضافة عملية بيع جديدة وتلقائياً حساب عمولتها
            </h2>
            <span className="text-xs text-slate-400">تخزين دائم في البرنامج</span>
          </div>

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-bold animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" /> تم حفظ الطلب بنجاح وتحديث إجمالي العمولات والصافي!
            </div>
          )}

          <form onSubmit={handleAddSale} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              
              <div>
                <label className="text-slate-300 font-bold block mb-1">رقم الفاتورة / الطلب:</label>
                <input 
                  type="text" 
                  required
                  value={orderNum}
                  onChange={(e) => setOrderNum(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">تاريخ البيع:</label>
                <input 
                  type="date" 
                  required
                  value={saleDate}
                  onChange={(e) => setSaleDate(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">اسم العميل:</label>
                <input 
                  type="text" 
                  placeholder="مثال: فهد العتيبي"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">بوابة الدفع (الوسيط):</label>
                <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    type="button"
                    onClick={() => setGateway('tabby')}
                    className={`py-2 rounded-lg font-black text-xs transition-all ${
                      gateway === 'tabby' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400'
                    }`}
                  >
                    tabby
                  </button>
                  <button
                    type="button"
                    onClick={() => setGateway('tamara')}
                    className={`py-2 rounded-lg font-black text-xs transition-all ${
                      gateway === 'tamara' ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'text-slate-400'
                    }`}
                  >
                    tamara
                  </button>
                </div>
              </div>

            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              
              <div className="sm:col-span-2">
                <label className="text-slate-300 font-bold block mb-1">مبلغ البيع الإجمالي شامل الضريبة (ر.س):</label>
                <input 
                  type="number"
                  step="0.01"
                  required
                  placeholder="أدخل المبلغ هنا (مثال: 3600)"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg font-black text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">بيان / اسم المنتج:</label>
                <input 
                  type="text"
                  placeholder="شاشة سامسونج / جوال آيفون"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

            </div>

            {/* Live calculation bar before saving */}
            {numAmount > 0 && (
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs animate-fadeIn">
                <div className="text-slate-300">
                  معاينة الخصم فورياً: العمولة (<strong className="text-orange-400 font-mono">{previewComm.toFixed(2)} ر.س</strong>) + ضريبة 15% (<strong className="text-amber-400 font-mono">{previewVat.toFixed(2)} ر.س</strong>)
                </div>
                <div className="text-emerald-400 font-bold">
                  الصافي المتوقع لمتجرك: <span className="text-base font-black font-mono text-white mr-1">{previewNet.toFixed(2)} SAR</span>
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3.5 rounded-xl tabby-btn text-xs font-black cursor-pointer flex items-center justify-center gap-2"
            >
              <PlusCircle className="w-4 h-4" /> حفظ عملية البيع والعمولة في السجل
            </button>
          </form>
        </div>

        {/* SALES MONITOR TABLE & FILTERS */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Receipt className="w-5 h-5 text-emerald-400" /> جدول مراقبة المبيعات والعمولات المسجلة
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">سجل كامل بكل عملية بيع وقيمة العمولة المقتطعة</p>
            </div>

            {/* Filter and Search */}
            <div className="flex flex-wrap items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute right-3 top-2.5" />
                <input 
                  type="text"
                  placeholder="بحث باسم العميل أو الفاتورة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="bg-slate-900 border border-slate-700 rounded-xl py-1.5 pr-8 pl-3 text-xs text-white focus:outline-none focus:border-emerald-500 w-48"
                />
              </div>

              {/* Gateway Filter buttons */}
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-xl border border-slate-800">
                <button
                  onClick={() => setFilterGateway('all')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    filterGateway === 'all' ? 'bg-slate-800 text-white' : 'text-slate-400'
                  }`}
                >
                  الكل ({sales.length})
                </button>
                <button
                  onClick={() => setFilterGateway('tabby')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    filterGateway === 'tabby' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/40' : 'text-slate-400'
                  }`}
                >
                  تابي
                </button>
                <button
                  onClick={() => setFilterGateway('tamara')}
                  className={`px-2.5 py-1 rounded-lg text-xs font-bold ${
                    filterGateway === 'tamara' ? 'bg-purple-950 text-orange-400 border border-orange-500/40' : 'text-slate-400'
                  }`}
                >
                  تمارا
                </button>
              </div>
            </div>

          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">رقم الفاتورة</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">اسم العميل</th>
                  <th className="p-3">البوابة</th>
                  <th className="p-3">مبلغ البيع</th>
                  <th className="p-3">عمولة الوسيط</th>
                  <th className="p-3">ضريبة 15%</th>
                  <th className="p-3">إجمالي الخصم</th>
                  <th className="p-3 font-bold text-white">الصافي المستحق</th>
                  <th className="p-3">ملاحظات</th>
                  <th className="p-3 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {filteredSales.length === 0 ? (
                  <tr>
                    <td colSpan={11} className="p-8 text-center text-slate-500 font-sans">
                      لا توجد عمليات مبيعات مطابقة للبحث أو التصفية الحالية.
                    </td>
                  </tr>
                ) : (
                  filteredSales.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-900/40">
                      <td className="p-3 font-bold text-white">{item.orderNumber}</td>
                      <td className="p-3 text-slate-400">{item.date}</td>
                      <td className="p-3 text-slate-200 font-sans">{item.customerName}</td>
                      <td className="p-3">
                        {item.gateway === 'tabby' ? (
                          <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30 text-[10px]">
                            Tabby
                          </span>
                        ) : (
                          <span className="px-2 py-0.5 rounded bg-purple-950 text-orange-400 font-bold border border-orange-500/30 text-[10px]">
                            Tamara
                          </span>
                        )}
                      </td>
                      <td className="p-3 font-bold text-white">{item.grossAmount.toLocaleString()} ر.س</td>
                      <td className="p-3 text-orange-400">-{item.commissionFee.toFixed(2)}</td>
                      <td className="p-3 text-amber-400">-{item.vatOnCommission.toFixed(2)}</td>
                      <td className="p-3 text-red-400 font-bold">-{item.totalDeduction.toFixed(2)}</td>
                      <td className="p-3 font-bold text-emerald-400 text-sm bg-emerald-950/10">
                        {item.netAmount.toLocaleString()} ر.س
                      </td>
                      <td className="p-3 text-slate-400 font-sans text-[11px]">{item.notes || '-'}</td>
                      <td className="p-3 text-center">
                        <button 
                          onClick={() => handleDelete(item.id)}
                          className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30 transition-colors cursor-pointer"
                          title="حذف العملية"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>

        {/* FOOTER */}
        <footer className="text-center text-xs text-slate-500 py-4 border-t border-slate-800">
          برنامج مراقبة مبيعات وعمولات تابي وتمارا © {new Date().getFullYear()} - تم الحفظ والتحديث تلقائياً
        </footer>

      </div>
    </div>
  );
};
