import React, { useState } from 'react';
import { Calculator, DollarSign, FileText, Percent, ArrowLeftRight, CheckCircle2, Download, Table, HelpCircle, FileSpreadsheet, RefreshCw } from 'lucide-react';

export const AccountantCalculator: React.FC = () => {
  // Single Invoice State
  const [saleAmount, setSaleAmount] = useState<number>(1000);
  const [provider, setProvider] = useState<'tabby' | 'tamara'>('tabby');
  
  // Custom Rates (can be tailored according to merchant contract)
  const [tabbyRate, setTabbyRate] = useState<number>(3.5); // %
  const [tabbyFixed, setTabbyFixed] = useState<number>(1.0); // SAR
  
  const [tamaraRate, setTamaraRate] = useState<number>(3.99); // %
  const [tamaraFixed, setTamaraFixed] = useState<number>(1.5); // SAR

  const vatRate = 15; // 15% VAT in KSA

  // Calculations
  const rate = provider === 'tabby' ? tabbyRate : tamaraRate;
  const fixedFee = provider === 'tabby' ? tabbyFixed : tamaraFixed;

  const baseCommission = (saleAmount * (rate / 100)) + fixedFee;
  const vatOnCommission = baseCommission * (vatRate / 100);
  const totalCommissionDeducted = baseCommission + vatOnCommission;
  const netAmountReceivedInBank = Math.max(0, saleAmount - totalCommissionDeducted);

  const effectiveFeePercentage = saleAmount > 0 ? ((totalCommissionDeducted / saleAmount) * 100).toFixed(2) : '0';

  // Batch Settlement Calculator State
  const [batchTotalSales, setBatchTotalSales] = useState<number>(50000);
  const [batchOrdersCount, setBatchOrdersCount] = useState<number>(35);

  const batchBaseCommission = (batchTotalSales * (rate / 100)) + (batchOrdersCount * fixedFee);
  const batchVatOnCommission = batchBaseCommission * (vatRate / 100);
  const batchTotalDeducted = batchBaseCommission + batchVatOnCommission;
  const batchNetBankPayout = Math.max(0, batchTotalSales - batchTotalDeducted);

  return (
    <div className="space-y-10 py-6">
      
      {/* Accountant Banner Header */}
      <div className="p-6 sm:p-8 rounded-3xl glass-panel border border-emerald-500/30 bg-gradient-to-r from-slate-950 via-emerald-950/20 to-purple-950/20">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
              <Calculator className="w-3.5 h-3.5" /> النظام المحاسبي المتخصص للتجار والقيود المزدوجة
            </div>
            <h1 className="text-2xl sm:text-4xl font-black text-white">
              حاسبة عمولات وتسويات <span className="text-emerald-400">تابي</span> و <span className="text-orange-400">تمارا</span> للمحاسبين
            </h1>
            <p className="text-xs sm:text-sm text-slate-300 max-w-3xl leading-relaxed">
              احسب العمولات الدقيقة المخصومة من قبل تابي وتمارا، ضريبة القيمة المضافة (15%) على العمولة، صافي المبلغ المحول للبنك، واستخرج القيد المحاسبي المزدوج الجاهز للترحيل في دفتر اليومية برقم الحسابات.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center min-w-[200px]">
            <div className="text-[11px] text-slate-400 font-semibold">ضريبة القيمة المضافة KSA</div>
            <div className="text-xl font-black text-amber-400 mt-0.5">15% على العمولة</div>
            <div className="text-[10px] text-slate-500 mt-1">حسب تعليمات هيئة الزكاة والضريبة</div>
          </div>
        </div>
      </div>

      {/* Main Grid: Single Invoice & Contract Rates Setup */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Column: Settings & Custom Contract Rates */}
        <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h3 className="text-base font-extrabold text-white flex items-center gap-2">
              <Percent className="w-4 h-4 text-emerald-400" /> نسبة عقد المتجر (Contract Rates)
            </h3>
            <span className="text-xs text-slate-400">قابل للتعديل</span>
          </div>

          {/* Tabby Rate Config */}
          <div className="p-4 rounded-2xl bg-emerald-950/30 border border-emerald-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">عمولة تابي (Tabby Fee)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300">عقد تابي</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">النسبة المئوية (%):</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={tabbyRate}
                  onChange={(e) => setTabbyRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">الرسم الثابت (ر.س):</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={tabbyFixed}
                  onChange={(e) => setTabbyFixed(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold focus:outline-none focus:border-emerald-500"
                />
              </div>
            </div>
          </div>

          {/* Tamara Rate Config */}
          <div className="p-4 rounded-2xl bg-purple-950/30 border border-orange-500/30 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-orange-400">عمولة تمارا (Tamara Fee)</span>
              <span className="text-[10px] px-2 py-0.5 rounded bg-orange-500/20 text-orange-300">عقد تمارا</span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">النسبة المئوية (%):</label>
                <input 
                  type="number" 
                  step="0.01"
                  value={tamaraRate}
                  onChange={(e) => setTamaraRate(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">الرسم الثابت (ر.س):</label>
                <input 
                  type="number" 
                  step="0.1"
                  value={tamaraFixed}
                  onChange={(e) => setTamaraFixed(Number(e.target.value))}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl p-2.5 text-white font-mono font-bold focus:outline-none focus:border-orange-500"
                />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-900 text-[11px] text-slate-400 border border-slate-800 space-y-1">
            <div className="font-bold text-slate-200">💡 ملاحظة للمحاسب:</div>
            <div>يتم إضافة 15% ضريبة قيمة مضافة فقط على قيمة العمولة والرسم الثابت وتعتبر ضريبة مدخلات قابلة للاسترداد.</div>
          </div>
        </div>

        {/* Middle & Right Column: Calculator Input & Detailed Results */}
        <div className="lg:col-span-2 space-y-6">
          
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-extrabold text-white">حساب عمولة عملية شراء واحدة (Single Transaction)</h3>
              <span className="text-xs text-emerald-400 font-bold">حساب فوري</span>
            </div>

            {/* Provider Switcher & Sale Input */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              
              <div className="sm:col-span-2 space-y-1.5">
                <label className="text-xs text-slate-300 font-bold block">مبلغ الفاتورة الإجمالي شامل الضريبة (ر.س):</label>
                <div className="relative">
                  <span className="absolute right-3.5 top-3 text-slate-400 text-sm font-bold">SAR</span>
                  <input 
                    type="number"
                    value={saleAmount}
                    onChange={(e) => setSaleAmount(Number(e.target.value))}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pr-14 pl-4 text-xl font-black text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs text-slate-300 font-bold block">وسيلة الدفع:</label>
                <div className="grid grid-cols-2 gap-1.5 p-1 bg-slate-950 rounded-xl border border-slate-800">
                  <button
                    onClick={() => setProvider('tabby')}
                    className={`py-2 rounded-lg font-black text-xs transition-all ${
                      provider === 'tabby' ? 'bg-emerald-400 text-slate-950' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    tabby
                  </button>
                  <button
                    onClick={() => setProvider('tamara')}
                    className={`py-2 rounded-lg font-black text-xs transition-all ${
                      provider === 'tamara' ? 'bg-gradient-to-r from-orange-500 to-purple-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    tamara
                  </button>
                </div>
              </div>

            </div>

            {/* Calculation Breakdown Result Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
              
              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-semibold block">إجمالي الفاتورة</span>
                <span className="text-lg font-black text-white font-mono mt-1 block">
                  {saleAmount.toLocaleString('en-US', { minimumFractionDigits: 2 })} ر.س
                </span>
                <span className="text-[10px] text-slate-500 block mt-1">100% المبيعات</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-semibold block">عمولة الوسيط ({rate}%)</span>
                <span className="text-lg font-black text-orange-400 font-mono mt-1 block">
                  {baseCommission.toFixed(2)} ر.س
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">شامل الرسم الثابت ({fixedFee} ر.س)</span>
              </div>

              <div className="p-4 rounded-2xl bg-slate-900/90 border border-slate-800 text-center">
                <span className="text-[11px] text-slate-400 font-semibold block">ضريبة العمولة (15%)</span>
                <span className="text-lg font-black text-amber-400 font-mono mt-1 block">
                  {vatOnCommission.toFixed(2)} ر.س
                </span>
                <span className="text-[10px] text-slate-400 block mt-1">ضريبة مدخلات مستردة</span>
              </div>

              <div className="p-4 rounded-2xl bg-emerald-950/50 border border-emerald-500/40 text-center">
                <span className="text-[11px] text-emerald-300 font-bold block">صافي الإيداع في البنك</span>
                <span className="text-xl font-black text-emerald-400 font-mono mt-1 block">
                  {netAmountReceivedInBank.toFixed(2)} ر.س
                </span>
                <span className="text-[10px] text-emerald-300/80 block mt-1">النسبة الفعلية: {effectiveFeePercentage}%</span>
              </div>

            </div>

          </div>

          {/* Double Entry Accounting Journal Entry (القيد المحاسبي المزدوج) */}
          <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-emerald-400" />
                <h3 className="text-base font-extrabold text-white">القيد المحاسبي المزدوج المتوازن (Journal Entry)</h3>
              </div>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-900 border border-slate-700 text-slate-300 font-mono">
                دفتر اليومية العامة
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-right text-xs text-slate-300 dir-rtl">
                <thead className="bg-slate-900/90 text-slate-400 border-b border-slate-800">
                  <tr>
                    <th className="p-3">رقم الحساب</th>
                    <th className="p-3">اسم الحساب (Account Name)</th>
                    <th className="p-3 text-center">مدين (Debit SAR)</th>
                    <th className="p-3 text-center">دائن (Credit SAR)</th>
                    <th className="p-3">البيان الشارح</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-mono">
                  {/* Debit: Receivable / Bank */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 text-slate-400">120401</td>
                    <td className="p-3 font-bold text-emerald-400">
                      حـ/ وسيط تسويات {provider === 'tabby' ? 'تابي (Tabby Clearing)' : 'تمارا (Tamara Clearing)'}
                    </td>
                    <td className="p-3 text-center font-bold text-emerald-400">
                      {netAmountReceivedInBank.toFixed(2)}
                    </td>
                    <td className="p-3 text-center text-slate-500">-</td>
                    <td className="p-3 text-slate-400 font-sans">صافي المبلغ المستحق المحول للبنك</td>
                  </tr>

                  {/* Debit: Commission Expense */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 text-slate-400">520109</td>
                    <td className="p-3 font-bold text-orange-400">
                      حـ/ مصاريف عمولات دفع {provider === 'tabby' ? 'تابي' : 'تمارا'}
                    </td>
                    <td className="p-3 text-center font-bold text-orange-400">
                      {baseCommission.toFixed(2)}
                    </td>
                    <td className="p-3 text-center text-slate-500">-</td>
                    <td className="p-3 text-slate-400 font-sans">عمولة الخدمة الفنية والرسم الثابت</td>
                  </tr>

                  {/* Debit: Input VAT on Commission */}
                  <tr className="hover:bg-slate-900/40">
                    <td className="p-3 text-slate-400">210502</td>
                    <td className="p-3 font-bold text-amber-400">
                      حـ/ ضريبة القيمة المضافة على المدخلات (VAT Input 15%)
                    </td>
                    <td className="p-3 text-center font-bold text-amber-400">
                      {vatOnCommission.toFixed(2)}
                    </td>
                    <td className="p-3 text-center text-slate-500">-</td>
                    <td className="p-3 text-slate-400 font-sans">15% ضريبة على عمولة الخدمة</td>
                  </tr>

                  {/* Credit: Sales Revenue */}
                  <tr className="hover:bg-slate-900/40 bg-slate-900/20">
                    <td className="p-3 text-slate-400">410101</td>
                    <td className="p-3 font-bold text-white">
                      حـ/ إيرادات المبيعات الإجمالية (Sales Revenue)
                    </td>
                    <td className="p-3 text-center text-slate-500">-</td>
                    <td className="p-3 text-center font-bold text-white">
                      {saleAmount.toFixed(2)}
                    </td>
                    <td className="p-3 text-slate-400 font-sans">إجمالي قيمة المبيعات شامل الضريبة</td>
                  </tr>

                  {/* Total Row */}
                  <tr className="bg-slate-900 font-black text-white border-t-2 border-slate-700">
                    <td colSpan={2} className="p-3 text-slate-300 font-sans">إجمالي القيد المحاسبي المتوازن:</td>
                    <td className="p-3 text-center text-emerald-400">
                      {(netAmountReceivedInBank + baseCommission + vatOnCommission).toFixed(2)}
                    </td>
                    <td className="p-3 text-center text-emerald-400">
                      {saleAmount.toFixed(2)}
                    </td>
                    <td className="p-3 text-emerald-400 font-sans text-xs flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> القيد متوازن 100%
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>

          </div>

        </div>

      </div>

      {/* Batch Payout Reconciliation Calculator (حاسبة الدفعة والتسوية البنكية الكاملة) */}
      <div className="p-6 rounded-3xl glass-panel border border-slate-800 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-800 pb-3">
          <div>
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <FileSpreadsheet className="w-5 h-5 text-emerald-400" /> حاسبة كشف التسوية الأسبوعية / الشهري (Batch Settlement Auditor)
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              مطابقة كشف الحساب البنكي الوارد من تابي أو تمارا لعدة طلبات دفعة واحدة.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs px-3 py-1 rounded-xl bg-slate-900 text-slate-300 border border-slate-800 font-mono">
              تصفية ومطابقة البنك
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Inputs */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 text-xs">
            <h4 className="font-extrabold text-white text-sm">بيانات الدفعة الكلية (Batch Inputs)</h4>
            
            <div>
              <label className="text-slate-300 block mb-1">إجمالي المبيعات بالدفعة (SAR):</label>
              <input 
                type="number"
                value={batchTotalSales}
                onChange={(e) => setBatchTotalSales(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>

            <div>
              <label className="text-slate-300 block mb-1">عدد الطلبات بالدفعة (Orders Count):</label>
              <input 
                type="number"
                value={batchOrdersCount}
                onChange={(e) => setBatchOrdersCount(Number(e.target.value))}
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono font-bold text-sm focus:outline-none focus:border-emerald-500"
              />
            </div>
          </div>

          {/* Results Summary */}
          <div className="md:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">إجمالي العمولات المخصومة</span>
              <div className="text-xl font-black text-orange-400 font-mono">
                {batchBaseCommission.toFixed(2)} ر.س
              </div>
              <p className="text-[11px] text-slate-400">
                نسبة العقد ({rate}%) + الرسوم الثابتة ({batchOrdersCount} × {fixedFee} ر.س)
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
              <span className="text-xs text-slate-400 font-semibold block">ضريبة القيمة المضافة 15%</span>
              <div className="text-xl font-black text-amber-400 font-mono">
                {batchVatOnCommission.toFixed(2)} ر.س
              </div>
              <p className="text-[11px] text-slate-400">
                تضاف في الإقرار الضريبي لحساب الضريبة الخصيمة (Input VAT)
              </p>
            </div>

            <div className="sm:col-span-2 p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs text-emerald-300 font-bold block">المبلغ الصافي المطابق للتحويل البنكي (Net Bank Deposit)</span>
                <div className="text-3xl font-black text-emerald-400 font-mono mt-1">
                  {batchNetBankPayout.toFixed(2)} ر.س
                </div>
              </div>

              <div className="text-xs text-slate-300 space-y-1 text-left">
                <div>إجمالي خصم العمولات + الضريبة: <strong className="text-orange-400 font-mono">{batchTotalDeducted.toFixed(2)} ر.س</strong></div>
                <div>النسبة الإجمالية المقتطعة: <strong className="text-amber-400 font-mono">{((batchTotalDeducted / (batchTotalSales || 1)) * 100).toFixed(2)}%</strong></div>
              </div>
            </div>

          </div>

        </div>
      </div>

    </div>
  );
};
