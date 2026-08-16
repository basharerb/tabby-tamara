import React from 'react';
import { ShieldCheck, Zap, CalendarCheck } from 'lucide-react';

interface TamaraWidgetProps {
  price: number;
  currency?: string;
  onSelect?: () => void;
  compact?: boolean;
}

export const TamaraWidget: React.FC<TamaraWidgetProps> = ({
  price,
  currency = 'ر.س',
  onSelect,
  compact = false
}) => {
  const installment3 = (price / 3).toFixed(2);
  const installment4 = (price / 4).toFixed(2);

  if (compact) {
    return (
      <div 
        onClick={onSelect}
        className="p-3 rounded-xl bg-purple-950/40 border border-orange-500/30 hover:border-purple-400/60 cursor-pointer transition-all flex items-center justify-between group"
      >
        <div className="flex items-center gap-2.5">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-r from-orange-500 to-purple-600 flex items-center justify-center text-white font-black text-xs">
            tamara
          </div>
          <div>
            <div className="text-xs text-slate-300">
              قسّمها على <span className="font-bold text-orange-400">3 أو 4 دفعات</span> ابتداءً من <span className="font-bold text-white">{installment4} {currency}</span>
            </div>
            <div className="text-[10px] text-slate-400">متوافق مع الشريعة الإسلامية</div>
          </div>
        </div>
        <span className="text-xs font-semibold text-orange-400 group-hover:translate-x-[-2px] transition-transform">
          اختر تمارا &larr;
        </span>
      </div>
    );
  }

  return (
    <div className="p-5 rounded-2xl bg-gradient-to-b from-purple-950/40 to-slate-900/80 border border-purple-500/30 shadow-lg relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-orange-500 via-pink-500 to-purple-600" />
      
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="px-3 py-1 rounded-md bg-gradient-to-r from-orange-500 to-purple-600 text-white font-black text-sm tracking-wide">
            tamara
          </div>
          <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/30">
            دفعات ميسرة بدون فوائد
          </span>
        </div>
        <div className="text-xs text-orange-400 flex items-center gap-1 font-medium">
          <ShieldCheck className="w-3.5 h-3.5" /> معتمد إسلامياً
        </div>
      </div>

      <p className="text-sm text-slate-300 mb-4">
        خيارك المرن للتسوق: قسّم فاتورتك على <span className="font-bold text-white">3 دفعات</span> ({installment3} {currency}) أو <span className="font-bold text-orange-400">4 دفعات</span> ({installment4} {currency}).
      </p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-slate-900/90 p-2.5 rounded-xl border border-orange-500/40 text-center">
          <div className="text-[11px] text-orange-400 font-bold">الدفعة الأولية</div>
          <div className="text-xs font-extrabold text-white mt-0.5">{installment3}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">عند الشراء فوراً</div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[11px] text-slate-400 font-medium">الشهر التالي</div>
          <div className="text-xs font-extrabold text-slate-200 mt-0.5">{installment3}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">تلقائياً من بطاقتك</div>
        </div>

        <div className="bg-slate-900/60 p-2.5 rounded-xl border border-slate-800 text-center">
          <div className="text-[11px] text-slate-400 font-medium">الشهر الثاني</div>
          <div className="text-xs font-extrabold text-slate-200 mt-0.5">{installment3}</div>
          <div className="text-[9px] text-slate-400 mt-0.5">اكتمال الدفع</div>
        </div>
      </div>

      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-2 border-t border-slate-800">
        <span className="flex items-center gap-1">
          <Zap className="w-3.5 h-3.5 text-orange-400" /> موافقة سريعة بدون تعقيد
        </span>
        {onSelect && (
          <button
            onClick={onSelect}
            className="px-4 py-1.5 rounded-lg tamara-btn text-xs font-bold cursor-pointer"
          >
            ادفع عبر تمارا
          </button>
        )}
      </div>
    </div>
  );
};
