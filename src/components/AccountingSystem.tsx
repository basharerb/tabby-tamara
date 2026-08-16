import React, { useState, useEffect } from 'react';
import { 
  OrderRecord, 
  SettlementRecord, 
  ContractSetting, 
  SummaryBalances, 
  PaymentProvider 
} from '../types';
import { 
  getOrders, 
  saveOrder, 
  deleteOrder, 
  getSettlements, 
  saveSettlement, 
  deleteSettlement, 
  getContractSettings, 
  saveContractSettings, 
  calculateSummaryBalances, 
  resetToSampleData 
} from '../services/storage';
import { 
  PlusCircle, 
  Building2, 
  Wallet, 
  ArrowUpRight, 
  ArrowDownLeft, 
  Trash2, 
  RefreshCw, 
  CheckCircle2, 
  FileText, 
  Clock, 
  Calendar, 
  Percent, 
  DollarSign, 
  Download,
  AlertCircle,
  Layers,
  Database
} from 'lucide-react';

export const AccountingSystem: React.FC = () => {
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [settlements, setSettlements] = useState<SettlementRecord[]>([]);
  const [contracts, setContracts] = useState<ContractSetting>(getContractSettings());
  const [summary, setSummary] = useState<SummaryBalances>(calculateSummaryBalances());

  const [activeViewTab, setActiveViewTab] = useState<'overview' | 'orders' | 'settlements' | 'statement' | 'settings'>('overview');

  // New Order Form State
  const [newOrderNumber, setNewOrderNumber] = useState(`INV-2026-${Math.floor(100 + Math.random() * 900)}`);
  const [newCustomerName, setNewCustomerName] = useState('');
  const [newOrderDate, setNewOrderDate] = useState(new Date().toISOString().split('T')[0]);
  const [newOrderProvider, setNewOrderProvider] = useState<PaymentProvider>('tabby');
  const [newOrderAmount, setNewOrderAmount] = useState<number | ''>('');
  const [newOrderNotes, setNewOrderNotes] = useState('');
  const [orderFormSuccess, setOrderFormSuccess] = useState(false);

  // New Settlement Form State
  const [newStlNumber, setNewStlNumber] = useState(`STL-${Math.floor(1000 + Math.random() * 9000)}`);
  const [newBankRef, setNewBankRef] = useState('NCB-' + Math.floor(100000 + Math.random() * 900000));
  const [newStlDate, setNewStlDate] = useState(new Date().toISOString().split('T')[0]);
  const [newStlProvider, setNewStlProvider] = useState<PaymentProvider>('tabby');
  const [newStlAmount, setNewStlAmount] = useState<number | ''>('');
  const [newStlNotes, setNewStlNotes] = useState('');
  const [stlFormSuccess, setStlFormSuccess] = useState(false);

  // Reload data
  const refreshData = () => {
    setOrders(getOrders());
    setSettlements(getSettlements());
    setContracts(getContractSettings());
    setSummary(calculateSummaryBalances());
  };

  useEffect(() => {
    refreshData();
  }, []);

  // Handle Add Order
  const handleAddOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newOrderAmount || Number(newOrderAmount) <= 0) return;

    saveOrder({
      orderNumber: newOrderNumber || `INV-${Date.now()}`,
      customerName: newCustomerName || 'عميل عام',
      date: newOrderDate,
      provider: newOrderProvider,
      grossAmount: Number(newOrderAmount),
      status: 'pending_payout',
      notes: newOrderNotes
    });

    // Reset form
    setNewOrderNumber(`INV-2026-${Math.floor(100 + Math.random() * 900)}`);
    setNewCustomerName('');
    setNewOrderAmount('');
    setNewOrderNotes('');
    setOrderFormSuccess(true);
    setTimeout(() => setOrderFormSuccess(false), 3000);

    refreshData();
  };

  // Handle Add Settlement
  const handleAddSettlement = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStlAmount || Number(newStlAmount) <= 0) return;

    saveSettlement({
      settlementNumber: newStlNumber || `STL-${Date.now()}`,
      date: newStlDate,
      provider: newStlProvider,
      bankReference: newBankRef || `REF-${Date.now()}`,
      amountReceived: Number(newStlAmount),
      notes: newStlNotes
    });

    // Reset form
    setNewStlNumber(`STL-${Math.floor(1000 + Math.random() * 9000)}`);
    setNewBankRef('NCB-' + Math.floor(100000 + Math.random() * 900000));
    setNewStlAmount('');
    setNewStlNotes('');
    setStlFormSuccess(true);
    setTimeout(() => setStlFormSuccess(false), 3000);

    refreshData();
  };

  // Handle Delete Order
  const handleDeleteOrder = (id: string) => {
    if (confirm('هل أنت تأكد من حذف حركة هذه الفاتورة؟')) {
      deleteOrder(id);
      refreshData();
    }
  };

  // Handle Delete Settlement
  const handleDeleteSettlement = (id: string) => {
    if (confirm('هل أنت تأكد من حذف حركة الحوالة البنكية؟')) {
      deleteSettlement(id);
      refreshData();
    }
  };

  // Save Contracts
  const handleSaveContracts = (e: React.FormEvent) => {
    e.preventDefault();
    saveContractSettings(contracts);
    alert('تم حفظ نسب العمولة والعقود بنجاح!');
    refreshData();
  };

  // Reset to default sample
  const handleResetData = () => {
    if (confirm('هل تريد إعادة تحميل البيانات النموذجية لإعادة الاختبار؟')) {
      resetToSampleData();
      refreshData();
    }
  };

  return (
    <div className="space-y-8 py-6">
      
      {/* Top Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-slate-900 to-emerald-950/30">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <Database className="w-3.5 h-3.5 text-emerald-400" /> النظام المحاسبي المتكامل لإدارة فواتير وحوالات تابي وتمارا
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              نظام المحاسبة والتسويات المالية <span className="text-emerald-400">تابي</span> & <span className="text-orange-400">تمارا</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              سجّل الفواتير الحالية، احسب العمولات والضريبة تلقائياً، سجّل الحوالات البنكية المحصلة، واعرف <strong className="text-emerald-400">المبلغ المتبقي القائم طرف تابي وتمارا</strong> في أي لحظة مع التخزين الدائم.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button 
              onClick={handleResetData}
              className="px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-bold text-slate-300 flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5 text-emerald-400" /> عينة البيانات
            </button>
          </div>
        </div>
      </div>

      {/* Primary KPI Balance Cards (أهم الأرصدة والمبالغ المتبقية) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        
        {/* Card 1: Total Remaining Outstanding Balance */}
        <div className="p-6 rounded-3xl glass-panel border border-emerald-500/40 bg-gradient-to-br from-emerald-950/40 to-slate-900/90 shadow-xl space-y-2 relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-300 uppercase tracking-wide">إجمالي الرصيد القائم المتبقي</span>
            <span className="p-2 rounded-xl bg-emerald-500/20 text-emerald-400">
              <Wallet className="w-5 h-5" />
            </span>
          </div>

          <div className="text-3xl font-black text-white font-mono">
            {summary.totalRemainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-300">ر.س</span>
          </div>

          <p className="text-[11px] text-slate-300">
            صافي المستحق غير المحول حتى الآن من تابي وتمارا
          </p>
        </div>

        {/* Card 2: Tabby Outstanding Balance */}
        <div className="p-6 rounded-3xl glass-panel border border-emerald-500/30 bg-slate-900/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-emerald-400">رصيد تابي المتبقي (Tabby Due)</span>
            <span className="px-2 py-0.5 rounded bg-emerald-400 text-slate-950 font-black text-[10px]">tabby</span>
          </div>

          <div className="text-2xl font-black text-white font-mono">
            {summary.tabbyRemainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-400">ر.س</span>
          </div>

          <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
            <span>المبيعات: <strong className="text-white font-mono">{summary.tabbyGrossSales.toLocaleString()}</strong></span>
            <span>المحول للبنك: <strong className="text-emerald-400 font-mono">{summary.tabbySettledInBank.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Card 3: Tamara Outstanding Balance */}
        <div className="p-6 rounded-3xl glass-panel border border-orange-500/30 bg-slate-900/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-orange-400">رصيد تمارا المتبقي (Tamara Due)</span>
            <span className="px-2 py-0.5 rounded bg-gradient-to-r from-orange-500 to-purple-600 text-white font-black text-[10px]">tamara</span>
          </div>

          <div className="text-2xl font-black text-white font-mono">
            {summary.tamaraRemainingBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-400">ر.س</span>
          </div>

          <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
            <span>المبيعات: <strong className="text-white font-mono">{summary.tamaraGrossSales.toLocaleString()}</strong></span>
            <span>المحول للبنك: <strong className="text-orange-400 font-mono">{summary.tamaraSettledInBank.toLocaleString()}</strong></span>
          </div>
        </div>

        {/* Card 4: Total Commissions & VAT Input */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 bg-slate-900/90 space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-300">إجمالي العمولات والضريبة</span>
            <span className="p-2 rounded-xl bg-purple-500/20 text-purple-400">
              <Percent className="w-4 h-4" />
            </span>
          </div>

          <div className="text-2xl font-black text-amber-400 font-mono">
            {(summary.totalCommissions + summary.totalVatInput).toLocaleString('en-US', { minimumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-400">ر.س</span>
          </div>

          <div className="text-[11px] text-slate-400 flex justify-between pt-1 border-t border-slate-800">
            <span>العمولة: <strong className="text-orange-400 font-mono">{summary.totalCommissions.toFixed(0)}</strong></span>
            <span>ضريبة المدخلات: <strong className="text-amber-400 font-mono">{summary.totalVatInput.toFixed(0)}</strong></span>
          </div>
        </div>

      </div>

      {/* ERP View Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto p-2 bg-slate-900/90 rounded-2xl border border-slate-800">
        
        <button
          onClick={() => setActiveViewTab('overview')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === 'overview' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <PlusCircle className="w-4 h-4" /> تسجيل حركة جديدة (طلب / حوالة بنكية)
        </button>

        <button
          onClick={() => setActiveViewTab('orders')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === 'orders' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <FileText className="w-4 h-4" /> سجل الفواتير والعمولات ({orders.length})
        </button>

        <button
          onClick={() => setActiveViewTab('settlements')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === 'settlements' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Building2 className="w-4 h-4" /> سجل الحوالات المحصلة ({settlements.length})
        </button>

        <button
          onClick={() => setActiveViewTab('statement')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === 'statement' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Layers className="w-4 h-4" /> كشف الحساب والمطابقة الكلية
        </button>

        <button
          onClick={() => setActiveViewTab('settings')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
            activeViewTab === 'settings' ? 'bg-emerald-500 text-slate-950 font-black' : 'text-slate-400 hover:text-white'
          }`}
        >
          <Percent className="w-4 h-4" /> إعدادات عقود العمولات
        </button>

      </div>

      {/* VIEW 1: FORMS OVERVIEW (تسجيل طلب جديد أو تسجيل حوالة بنكية) */}
      {activeViewTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* Form 1: Add Order */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <PlusCircle className="w-4 h-4 text-emerald-400" /> 1. تسجيل فاتورة / طلب جديد (New Sale)
              </h3>
              <span className="text-xs text-emerald-400 font-bold">حساب العمولات تلقائياً</span>
            </div>

            {orderFormSuccess && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 font-bold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> تم تسجيل الفاتورة وحساب عمولتها ورصيدها المتبقي بنجاح!
              </div>
            )}

            <form onSubmit={handleAddOrder} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">رقم الفاتورة / الطلب:</label>
                  <input 
                    type="text" 
                    required
                    value={newOrderNumber}
                    onChange={(e) => setNewOrderNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">تاريخ الفاتورة:</label>
                  <input 
                    type="date" 
                    required
                    value={newOrderDate}
                    onChange={(e) => setNewOrderDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">وسيلة الدفع:</label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setNewOrderProvider('tabby')}
                      className={`py-2 rounded-lg font-bold text-xs ${
                        newOrderProvider === 'tabby' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      Tabby
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewOrderProvider('tamara')}
                      className={`py-2 rounded-lg font-bold text-xs ${
                        newOrderProvider === 'tamara' ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Tamara
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">اسم العميل:</label>
                  <input 
                    type="text" 
                    placeholder="مثال: فهد العتيبي"
                    value={newCustomerName}
                    onChange={(e) => setNewCustomerName(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">إجمالي الفاتورة شامل الضريبة (SAR):</label>
                <input 
                  type="number"
                  step="0.01"
                  required
                  placeholder="مثال: 3600"
                  value={newOrderAmount}
                  onChange={(e) => setNewOrderAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg font-black text-white font-mono focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">ملاحظات الفاتورة (اختياري):</label>
                <input 
                  type="text"
                  placeholder="اسم المنتج أو المرجع"
                  value={newOrderNotes}
                  onChange={(e) => setNewOrderNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl tabby-btn text-xs font-black cursor-pointer flex items-center justify-center gap-2"
              >
                <PlusCircle className="w-4 h-4" /> حفظ الفاتورة وإدراجها في السجل
              </button>
            </form>
          </div>

          {/* Form 2: Add Settlement */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white flex items-center gap-2">
                <Building2 className="w-4 h-4 text-orange-400" /> 2. تسجيل حوالة / تسوية بنكية محصلة (Bank Deposit)
              </h3>
              <span className="text-xs text-orange-400 font-bold">تحديث الرصيد المتبقي</span>
            </div>

            {stlFormSuccess && (
              <div className="p-3 rounded-xl bg-orange-500/20 border border-orange-500/40 text-orange-300 text-xs flex items-center gap-2 font-bold animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-orange-400" /> تم إدراج الحوالة البنكية وتحديث الرصيد المتبقي بنجاح!
              </div>
            )}

            <form onSubmit={handleAddSettlement} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">جهة التحويل البنكي:</label>
                  <div className="grid grid-cols-2 gap-1 p-1 bg-slate-950 rounded-xl border border-slate-800">
                    <button
                      type="button"
                      onClick={() => setNewStlProvider('tabby')}
                      className={`py-2 rounded-lg font-bold text-xs ${
                        newStlProvider === 'tabby' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400'
                      }`}
                    >
                      Tabby
                    </button>
                    <button
                      type="button"
                      onClick={() => setNewStlProvider('tamara')}
                      className={`py-2 rounded-lg font-bold text-xs ${
                        newStlProvider === 'tamara' ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'text-slate-400'
                      }`}
                    >
                      Tamara
                    </button>
                  </div>
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">تاريخ التحويل:</label>
                  <input 
                    type="date" 
                    required
                    value={newStlDate}
                    onChange={(e) => setNewStlDate(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">رقم مرجع التسوية:</label>
                  <input 
                    type="text" 
                    required
                    value={newStlNumber}
                    onChange={(e) => setNewStlNumber(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="text-slate-300 font-bold block mb-1">الرقم المرجعي للبنك (Bank Ref):</label>
                  <input 
                    type="text" 
                    required
                    value={newBankRef}
                    onChange={(e) => setNewBankRef(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono focus:outline-none focus:border-orange-500"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">المبلغ المحول فعلياً لحساب البنك (SAR):</label>
                <input 
                  type="number"
                  step="0.01"
                  required
                  placeholder="مثال: 3453.95"
                  value={newStlAmount}
                  onChange={(e) => setNewStlAmount(e.target.value === '' ? '' : Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-3 text-lg font-black text-white font-mono focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">ملاحظات الحوالة:</label>
                <input 
                  type="text"
                  placeholder="كشف حساب الأسبوع الأول"
                  value={newStlNotes}
                  onChange={(e) => setNewStlNotes(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-slate-200 focus:outline-none focus:border-orange-500"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-xl tamara-btn text-xs font-black cursor-pointer flex items-center justify-center gap-2"
              >
                <Building2 className="w-4 h-4" /> حفظ الحوالة وتصفياتها في الحساب
              </button>
            </form>
          </div>

        </div>
      )}

      {/* VIEW 2: ORDERS LEDGER TABLE */}
      {activeViewTab === 'orders' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" /> دفتر سجل الفواتير والعمولات المسجلة
            </h3>
            <span className="text-xs text-slate-400">إجمالي الفواتير: <strong className="text-white font-mono">{orders.length}</strong></span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">رقم الفاتورة</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">البوابة</th>
                  <th className="p-3">العميل</th>
                  <th className="p-3">المبلغ الإجمالي</th>
                  <th className="p-3">العمولة</th>
                  <th className="p-3">ضريبة 15%</th>
                  <th className="p-3">الصافي المتوقع</th>
                  <th className="p-3">ملاحظات</th>
                  <th className="p-3 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">{ord.orderNumber}</td>
                    <td className="p-3 text-slate-400">{ord.date}</td>
                    <td className="p-3">
                      {ord.provider === 'tabby' ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30 text-[10px]">Tabby</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-purple-950 text-orange-400 font-bold border border-orange-500/30 text-[10px]">Tamara</span>
                      )}
                    </td>
                    <td className="p-3 text-slate-200 font-sans">{ord.customerName}</td>
                    <td className="p-3 font-bold text-white">{ord.grossAmount.toLocaleString()} ر.س</td>
                    <td className="p-3 text-orange-400">-{ord.baseCommission.toFixed(2)}</td>
                    <td className="p-3 text-amber-400">-{ord.vatOnCommission.toFixed(2)}</td>
                    <td className="p-3 font-bold text-emerald-400">{ord.netAmount.toLocaleString()} ر.س</td>
                    <td className="p-3 text-slate-400 font-sans text-[11px]">{ord.notes || '-'}</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => handleDeleteOrder(ord.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30 transition-colors cursor-pointer"
                        title="حذف الفاتورة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: SETTLEMENTS TABLE */}
      {activeViewTab === 'settlements' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Building2 className="w-4 h-4 text-orange-400" /> سجل الحوالات البنكية المحصلة
            </h3>
            <span className="text-xs text-slate-400">عدد الحوالات: <strong className="text-white font-mono">{settlements.length}</strong></span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">رقم مرجع التسوية</th>
                  <th className="p-3">التاريخ</th>
                  <th className="p-3">جهة التحويل</th>
                  <th className="p-3">مرجع البنك (Bank Ref)</th>
                  <th className="p-3">المبلغ المحول للبنك</th>
                  <th className="p-3">البيان / ملاحظات</th>
                  <th className="p-3 text-center">إجراء</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                {settlements.map((stl) => (
                  <tr key={stl.id} className="hover:bg-slate-900/40">
                    <td className="p-3 font-bold text-white">{stl.settlementNumber}</td>
                    <td className="p-3 text-slate-400">{stl.date}</td>
                    <td className="p-3">
                      {stl.provider === 'tabby' ? (
                        <span className="px-2 py-0.5 rounded bg-emerald-950 text-emerald-400 font-bold border border-emerald-500/30 text-[10px]">Tabby</span>
                      ) : (
                        <span className="px-2 py-0.5 rounded bg-purple-950 text-orange-400 font-bold border border-orange-500/30 text-[10px]">Tamara</span>
                      )}
                    </td>
                    <td className="p-3 text-cyan-400">{stl.bankReference}</td>
                    <td className="p-3 font-bold text-emerald-400 text-sm">{stl.amountReceived.toLocaleString()} ر.س</td>
                    <td className="p-3 text-slate-400 font-sans text-[11px]">{stl.notes || '-'}</td>
                    <td className="p-3 text-center">
                      <button 
                        onClick={() => handleDeleteSettlement(stl.id)}
                        className="p-1.5 rounded-lg bg-red-950/40 text-red-400 hover:bg-red-900/60 border border-red-500/30 transition-colors cursor-pointer"
                        title="حذف الحوالة"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 4: STATEMENT OF ACCOUNT (كشف حساب ومطابقة التسويات) */}
      {activeViewTab === 'statement' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h3 className="text-lg font-black text-white">كشف حساب التسويات الكلي ومطابقة الأرصدة (Statement of Account)</h3>
              <p className="text-xs text-slate-400 mt-0.5">تقييم المبيعات، الإقتطاعات، المحصل، والأرصدة المتبقية القائمة</p>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-right text-xs text-slate-300">
              <thead className="bg-slate-900 text-slate-400 border-b border-slate-800">
                <tr>
                  <th className="p-3">البيان / البوابة</th>
                  <th className="p-3">المبيعات الإجمالية</th>
                  <th className="p-3">إجمالي العمولات</th>
                  <th className="p-3">ضريبة المدخلات (15%)</th>
                  <th className="p-3">الصافي المستحق</th>
                  <th className="p-3">المستلم في البنك</th>
                  <th className="p-3 font-bold text-white">الرصيد المتبقي القائم</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-mono">
                
                {/* Tabby row */}
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-emerald-400 font-sans flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400"></span> تابي (Tabby)
                  </td>
                  <td className="p-3 text-white">{summary.tabbyGrossSales.toLocaleString()} ر.س</td>
                  <td className="p-3 text-orange-400">-{summary.tabbyCommissions.toFixed(2)}</td>
                  <td className="p-3 text-amber-400">-{summary.tabbyVatInput.toFixed(2)}</td>
                  <td className="p-3 text-white font-bold">{summary.tabbyNetExpected.toLocaleString()} ر.س</td>
                  <td className="p-3 text-emerald-400">{summary.tabbySettledInBank.toLocaleString()} ر.س</td>
                  <td className="p-3 font-black text-emerald-400 text-sm bg-emerald-950/20">
                    {summary.tabbyRemainingBalance.toLocaleString()} ر.س
                  </td>
                </tr>

                {/* Tamara row */}
                <tr className="hover:bg-slate-900/40">
                  <td className="p-3 font-bold text-orange-400 font-sans flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-orange-500"></span> تمارا (Tamara)
                  </td>
                  <td className="p-3 text-white">{summary.tamaraGrossSales.toLocaleString()} ر.س</td>
                  <td className="p-3 text-orange-400">-{summary.tamaraCommissions.toFixed(2)}</td>
                  <td className="p-3 text-amber-400">-{summary.tamaraVatInput.toFixed(2)}</td>
                  <td className="p-3 text-white font-bold">{summary.tamaraNetExpected.toLocaleString()} ر.س</td>
                  <td className="p-3 text-orange-400">{summary.tamaraSettledInBank.toLocaleString()} ر.س</td>
                  <td className="p-3 font-black text-orange-400 text-sm bg-purple-950/20">
                    {summary.tamaraRemainingBalance.toLocaleString()} ر.س
                  </td>
                </tr>

                {/* Total Summary Row */}
                <tr className="bg-slate-900 font-black text-white border-t-2 border-slate-700 text-sm">
                  <td className="p-3 font-sans">الإجمالي العام (Total Summary):</td>
                  <td className="p-3">{summary.totalGrossSales.toLocaleString()} ر.س</td>
                  <td className="p-3 text-orange-400">-{summary.totalCommissions.toFixed(2)}</td>
                  <td className="p-3 text-amber-400">-{summary.totalVatInput.toFixed(2)}</td>
                  <td className="p-3">{summary.totalNetExpected.toLocaleString()} ر.س</td>
                  <td className="p-3 text-emerald-400">{summary.totalSettledInBank.toLocaleString()} ر.س</td>
                  <td className="p-3 text-emerald-400 bg-emerald-950/40 text-base">
                    {summary.totalRemainingBalance.toLocaleString()} ر.س
                  </td>
                </tr>

              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 5: CONTRACT SETTINGS */}
      {activeViewTab === 'settings' && (
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 max-w-2xl space-y-5">
          <h3 className="text-base font-extrabold text-white border-b border-slate-800 pb-3">
            تعديل نسب العمولة وفق عقود متجرك مع تابي وتمارا
          </h3>

          <form onSubmit={handleSaveContracts} className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
              <div className="font-bold text-emerald-400">عقد تابي (Tabby Rate Config)</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">النسبة المئوية (%):</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={contracts.tabbyRate}
                    onChange={(e) => setContracts({ ...contracts, tabbyRate: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الرسم الثابت (SAR):</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={contracts.tabbyFixed}
                    onChange={(e) => setContracts({ ...contracts, tabbyFixed: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-purple-950/30 border border-orange-500/30 space-y-3">
              <div className="font-bold text-orange-400">عقد تمارا (Tamara Rate Config)</div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">النسبة المئوية (%):</label>
                  <input 
                    type="number" 
                    step="0.01" 
                    value={contracts.tamaraRate}
                    onChange={(e) => setContracts({ ...contracts, tamaraRate: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">الرسم الثابت (SAR):</label>
                  <input 
                    type="number" 
                    step="0.1" 
                    value={contracts.tamaraFixed}
                    onChange={(e) => setContracts({ ...contracts, tamaraFixed: Number(e.target.value) })}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="py-3 px-6 rounded-xl tabby-btn font-extrabold cursor-pointer"
            >
              حفظ إعدادات العقود
            </button>
          </form>
        </div>
      )}

    </div>
  );
};
