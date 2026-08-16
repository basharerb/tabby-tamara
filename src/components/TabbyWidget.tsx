import React from 'react';
import { CreditCard, Sparkles, CheckCircle2 } from 'lucide-react';

interface TabbyWidgetProps {
  price: number;
  currency?: string;
  onSelect?: () => void;
  compact?: boolean;
}

export const TabbyWidget: React.FC<TabbyWidgetProps> = ({
  price,
  currency = 'ر.س',
  onSelect,
  compact = false
}) => {
  const installment = (price / 4).toFixed(2);

  if (compact) {
    return (
      <div 
        onClick={onSelect}
        className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 hover:border-emerald-400/60 cursor-pointer transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-emerald-400/20 flex items-center justify-center text-emerald-400 font-extrabold text-xs tracking-wider">
            tabby
          </div>
          <div>
            <div className="text-xs text-slate-300">
              قسّمها على <span className="font-bold text-emerald-400">4 دفعات</span> بقيمة <span className="font-bold text-white">{installment} {currency}</span>
            </div>
            <div className="text-[10px] text-slate-400">بدون فوائد أو رسوم تأخير</div>
          </div>
        </div>
        <span className="text-xs font-semibold text-emerald-400 group-hover:translate-x-[-2px] transition-transform">
          اختر تابي &larr;
        </span>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-b from-emerald-950/40 to-slate-900/80 border border-emerald-500/30 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-300" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="px-2.5 py-1 rounded-md bg-emerald-400 text-slate-950 font-black text-sm tracking-wide">
            tabby
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
            4 دفعات بدون فوائد
          </span>
        </div>
        <div className="text-xs text-emerald-400 flex items-center gap-1 font-medium">
          <Sparkles className="w-3.5 h-3.5" /> موافقة فورية
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4">
        اشترِ الآن وقسّم مشترياتك على <span className="font-bold text-white">4 دفعات متساوية</span> بقيمة <span className="font-bold text-emerald-400">{installment} {currency}</span> لكل دفعة.
      </p>

      <div className="grid grid-cols-4 gap-2 mb-4">
        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-emerald-500/30 text-center">
          <div className="text-[11px] text-emerald-400 font-bold">اليوم</div>
          <div className="text-xs font-extrabold text-white mt-0.5">{installment}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">الدفعة 1</div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[11px] text-slate-400 font-medium">بعد 30 يوم</div>
          <div className="text-xs font-extrabold text-slate-200 mt-0.5">{installment}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">الدفعة 2</div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[11px] text-slate-400 font-medium">بعد 60 يوم</div>
          <div className="text-xs font-extrabold text-slate-200 mt-0.5">{installment}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">الدفعة 3</div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[11px] text-slate-400 font-medium">بعد 90 يوم</div>
          <div className="text-xs font-extrabold text-slate-200 mt-0.5">{installment}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">الدفعة 4</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span className="flex items-center gap-1">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> لا توجد رسوم خفية
        </span>
        {onSelect && (
          <button
            onClick={onSelect}
            className="px-4 py-1.5 rounded-lg tabby-btn text-xs font-bold cursor-pointer"
          >
            ادفع عبر تابي
          </button>
        )}
      </div>
    </div>
  );
};
