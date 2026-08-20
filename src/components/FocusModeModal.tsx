import React, { useState, useEffect } from 'react';
import { SaleOrder, PaymentGateway } from '../types';
import { saveNewSale, getSavedSales, computeSummaryStats } from '../services/storage';
import { 
  Zap, 
  X, 
  CheckCircle2, 
  Plus, 
  ShoppingBag, 
  DollarSign, 
  TrendingUp, 
  Calculator, 
  Sparkles,
  ArrowRight
} from 'lucide-react';

interface FocusModeModalProps {
  onClose: () => void;
  onSaleAdded: () => void;
  tabbyRate: number;
  tabbyFixed: number;
  tamaraRate: number;
  tamaraFixed: number;
}

export const FocusModeModal: React.FC<FocusModeModalProps> = ({
  onClose,
  onSaleAdded,
  tabbyRate,
  tabbyFixed,
  tamaraRate,
  tamaraFixed
}) => {
  const [gateway, setGateway] = useState<PaymentGateway>('tabby');
  const [amount, setAmount] = useState<number | ''>('');
  const [customerName, setCustomerName] = useState('');
  const [orderNum, setOrderNum] = useState(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
  const [notes, setNotes] = useState('');
  const [successMsg, setSuccessMsg] = useState(false);
  const [lastAddedOrder, setLastAddedOrder] = useState<SaleOrder | null>(null);

  // إحصائيات سريعة للتركيز
  const sales = getSavedSales();
  const stats = computeSummaryStats(sales);

  // حساب الرسوم والصافي المباشر
  const currentRate = gateway === 'tabby' ? tabbyRate : tamaraRate;
  const currentFixed = gateway === 'tabby' ? tabbyFixed : tamaraFixed;
  const numAmount = Number(amount) || 0;
  const previewComm = (numAmount * (currentRate / 100)) + currentFixed;
  const previewVat = previewComm * 0.15;
  const previewTotalDeduct = previewComm + previewVat;
  const previewNet = Math.max(0, numAmount - previewTotalDeduct);

  const handlePresetAmount = (preset: number) => {
    setAmount(preset);
  };

  const handleAddSale = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!amount || Number(amount) <= 0) return;

    const newSale = saveNewSale({
      orderNumber: orderNum || `INV-${Date.now()}`,
      customerName: customerName || 'عميل كاشير',
      date: new Date().toISOString().split('T')[0],
      gateway,
      grossAmount: Number(amount),
      notes: notes || 'مبيعات وضع التركيز السريع',
      tabbyRate,
      tabbyFixed,
      tamaraRate,
      tamaraFixed
    });

    setLastAddedOrder(newSale);
    setAmount('');
    setCustomerName('');
    setNotes('');
    setOrderNum(`INV-${Math.floor(1000 + Math.random() * 9000)}`);
    setSuccessMsg(true);
    onSaleAdded();

    setTimeout(() => {
      setSuccessMsg(false);
    }, 2500);
  };

  // استماع لزر Enter للتسجيل السريع
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && amount && Number(amount) > 0) {
        handleAddSale();
      } else if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [amount, gateway, customerName, notes]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-950/95 backdrop-blur-2xl animate-fadeIn selection:bg-emerald-500 selection:text-slate-950">
      <div className="w-full max-w-4xl max-h-[92vh] overflow-y-auto rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900 via-slate-950 to-slate-900 shadow-2xl p-6 sm:p-8 space-y-6 relative text-slate-100">
        
        {/* HEADER BAR */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-emerald-500/20 border border-amber-500/30 text-amber-400">
              <Zap className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-black text-white">نظام التركيز السريع (Focus Mode)</h2>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold">
                  خالي من المشتتات ⚡
                </span>
              </div>
              <p className="text-xs text-slate-400">واجهة تسجيل مبيعات فائقة السرعة للمحاسبين والكاشير</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2.5 rounded-2xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer flex items-center gap-1.5 text-xs font-bold"
          >
            <X className="w-4 h-4" /> إنهاء وضع التركيز
          </button>
        </div>

        {/* QUICK STATS CARDS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">إجمالي عمليات اليوم:</div>
            <div className="text-lg font-black text-white font-mono">{stats.ordersCount} طلبات</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-1">
            <div className="text-emerald-400 font-medium">مبيعات تابي (Tabby):</div>
            <div className="text-lg font-black text-emerald-300 font-mono">{stats.tabbySales.toLocaleString()} ر.س</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-purple-950/30 border border-purple-500/30 space-y-1">
            <div className="text-purple-400 font-medium">مبيعات تمارا (Tamara):</div>
            <div className="text-lg font-black text-purple-300 font-mono">{stats.tamaraSales.toLocaleString()} ر.س</div>
          </div>
          <div className="p-3.5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-1">
            <div className="text-slate-400 font-medium">الصافي المستحق التراكمي:</div>
            <div className="text-lg font-black text-amber-400 font-mono">{stats.totalNet.toLocaleString()} ر.س</div>
          </div>
        </div>

        {/* SUCCESS TOAST */}
        {successMsg && lastAddedOrder && (
          <div className="p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 text-emerald-200 text-xs font-bold flex items-center justify-between animate-fadeIn">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 animate-bounce" />
              <span>تم تسجيل العملية رقم <span className="font-mono text-white">{lastAddedOrder.orderNumber}</span> بمبلغ <span className="font-mono text-white">{lastAddedOrder.grossAmount} ر.س</span> عبر {lastAddedOrder.gateway === 'tabby' ? 'تابي 🟢' : 'تمارا 🟣'} بنجاح!</span>
            </div>
            <span className="text-[11px] text-emerald-300 bg-emerald-900/50 px-2.5 py-1 rounded-lg">الصافي: {lastAddedOrder.netAmount} ر.س</span>
          </div>
        )}

        {/* FOCUS ENTRY FORM */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          
          {/* INPUT FORM (7 COLS) */}
          <form onSubmit={handleAddSale} className="md:col-span-7 space-y-5 p-6 rounded-3xl bg-slate-900/90 border border-slate-800">
            
            {/* GATEWAY TOGGLE PILLS */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300">اختيار بوابة الدفع:</label>
              <div className="grid grid-cols-2 gap-3 dir-rtl">
                <button
                  type="button"
                  onClick={() => setGateway('tabby')}
                  className={`p-3.5 rounded-2xl border font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    gateway === 'tabby'
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-lg shadow-emerald-500/20 scale-[1.02]'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-emerald-400" /> تابي (Tabby)
                </button>
                <button
                  type="button"
                  onClick={() => setGateway('tamara')}
                  className={`p-3.5 rounded-2xl border font-black text-sm flex items-center justify-center gap-2 transition-all cursor-pointer ${
                    gateway === 'tamara'
                      ? 'bg-purple-500/20 border-purple-500 text-purple-300 shadow-lg shadow-purple-500/20 scale-[1.02]'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                  }`}
                >
                  <span className="w-3 h-3 rounded-full bg-purple-500" /> تمارا (Tamara)
                </button>
              </div>
            </div>

            {/* AMOUNT INPUT & PRESETS */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-300 flex items-center justify-between">
                <span>مبلغ الفاتورة الإجمالي (ر.س):</span>
                <span className="text-[11px] text-amber-400 font-normal">أزرار اختيار سريع ⚡</span>
              </label>

              <input
                type="number"
                step="0.01"
                required
                autoFocus
                value={amount}
                onChange={(e) => setAmount(e.target.value === '' ? '' : Number(e.target.value))}
                placeholder="أدخل المبلغ مثلاً 500"
                className="w-full bg-slate-950 border-2 border-amber-500/40 focus:border-amber-400 rounded-2xl p-4 text-2xl font-black text-white font-mono text-center outline-none transition-all placeholder:text-slate-600"
              />

              {/* QUICK AMOUNT BUTTONS */}
              <div className="grid grid-cols-6 gap-1.5 pt-1">
                {[50, 100, 250, 500, 1000, 2000].map((preset) => (
                  <button
                    key={preset}
                    type="button"
                    onClick={() => handlePresetAmount(preset)}
                    className="py-2 px-1 rounded-xl bg-slate-950 hover:bg-slate-800 border border-slate-800 hover:border-slate-600 text-slate-300 font-mono text-xs font-bold transition-all active:scale-95 cursor-pointer"
                  >
                    +{preset}
                  </button>
                ))}
              </div>
            </div>

            {/* OPTIONAL DETAILS (CUSTOMER & NOTES) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">اسم العميل (اختياري):</label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="عميل عام"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="text-slate-400 block mb-1">رقم الطلب:</label>
                <input
                  type="text"
                  value={orderNum}
                  onChange={(e) => setOrderNum(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono"
                />
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={!amount || Number(amount) <= 0}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-emerald-500 to-emerald-400 hover:from-emerald-400 hover:to-emerald-300 disabled:opacity-50 disabled:cursor-not-allowed text-slate-950 font-black text-lg transition-all shadow-xl shadow-emerald-500/20 active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <Plus className="w-6 h-6" /> تسجيل العملية فوراً (Enter ↵)
            </button>
          </form>

          {/* LIVE FEE & NET CALCULATOR DISPLAY (5 COLS) */}
          <div className="md:col-span-5 p-6 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-950 to-slate-950 border border-slate-800 space-y-5">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Calculator className="w-4 h-4 text-emerald-400" /> الحساب اللحظي المباشر للطلب
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">البوابة المختارة:</span>
                <span className={`font-bold ${gateway === 'tabby' ? 'text-emerald-400' : 'text-purple-400'}`}>
                  {gateway === 'tabby' ? `تابي (${tabbyRate}% + ${tabbyFixed} ر.س)` : `تمارا (${tamaraRate}% + ${tamaraFixed} ر.س)`}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">المبلغ الإجمالي:</span>
                <span className="font-mono text-white font-bold">{numAmount.toLocaleString()} ر.س</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">رسوم البوابة (العمولة):</span>
                <span className="font-mono text-red-400 font-bold">-{previewComm.toFixed(2)} ر.س</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800">
                <span className="text-slate-400">15% ضريبة على العمولة:</span>
                <span className="font-mono text-orange-400 font-bold">-{previewVat.toFixed(2)} ر.س</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-red-950/30 border border-red-500/30">
                <span className="text-red-300 font-bold">إجمالي الخصم:</span>
                <span className="font-mono text-red-400 font-bold">-{previewTotalDeduct.toFixed(2)} ر.س</span>
              </div>
            </div>

            {/* NET PAYOUT BIG CARD */}
            <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/60 via-emerald-900/40 to-slate-900 border-2 border-emerald-500/40 space-y-1 text-center">
              <div className="text-xs text-emerald-300 font-bold">الصافي الذي ستستلمه في حسابك:</div>
              <div className="text-3xl font-black text-emerald-400 font-mono tracking-tight">
                {previewNet.toFixed(2)} <span className="text-sm font-normal text-emerald-300">ر.س</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
