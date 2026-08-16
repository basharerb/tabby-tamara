import React from 'react';
import { ShieldCheck, GitBranch, Terminal, Heart } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="border-t border-slate-800/80 bg-slate-950/90 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-r-lg bg-emerald-400 text-slate-950 font-black text-sm">tabby</span>
              <span className="px-2.5 py-1 rounded-l-lg bg-gradient-to-r from-orange-500 to-purple-600 text-white font-black text-sm">tamara</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              منصة تفاعلية مخصصة لعرض واختبار تكامل بوابات التقسيط والدفع الآجل (BNPL) لتابي وتمارا في المملكة العربية السعودية والخليج.
            </p>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">حالة المستودع والمشروع</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <GitBranch className="w-3.5 h-3.5 text-emerald-400" />
                المستودع المحلي: <span className="text-slate-200 font-mono">tabby-tamara</span>
              </li>
              <li className="flex items-center gap-2">
                <Terminal className="w-3.5 h-3.5 text-orange-400" />
                الفرع الرئيسي: <span className="text-slate-200 font-mono">main</span>
              </li>
              <li className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
                جاهز للرفع على GitHub
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">مميزات تابي وتمارا</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>• تقسيط على 3 أو 4 دفعات ميسرة</li>
              <li>• بدون فوائد وبدون رسوم تأخير</li>
              <li>• موافقة فورية بالهوية ورقم الجوال</li>
              <li>• متوافق مع الضوابط الشرعية</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">تعليمات الرفع السريع</h4>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300">
              <div>git remote add origin ...</div>
              <div className="text-emerald-400">git push -u origin main</div>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>
            جميع الحقوق محفوظة © {new Date().getFullYear()} منصة تابي وتمارا (Tabby & Tamara BNPL Platform)
          </div>
          <div className="flex items-center gap-1">
            صُمم بكل شَغَف <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500 inline" /> لدعم تجارة الخليج العربي
          </div>
        </div>

      </div>
    </footer>
  );
};
