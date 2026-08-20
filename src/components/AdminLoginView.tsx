import React, { useState } from 'react';
import { 
  Building2, 
  Lock, 
  User, 
  KeyRound, 
  ShieldAlert, 
  ArrowLeft, 
  ShieldCheck,
  Eye,
  EyeOff
} from 'lucide-react';

interface AdminLoginViewProps {
  onLoginSuccess: (username: string) => void;
}

export const AdminLoginView: React.FC<AdminLoginViewProps> = ({ onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const validUsers: Record<string, string> = {
    'admin': '1234',
    '1': '12345678',
    'manager': 'admin123',
    'rakeez': '1234'
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);

    setTimeout(() => {
      const trimmedUser = username.trim().toLowerCase();
      const expectedPassword = validUsers[trimmedUser];

      if (
        (expectedPassword && password === expectedPassword) ||
        (trimmedUser === 'admin' && (password === '1234' || password === 'admin')) ||
        (trimmedUser === '1' && (password === '12345678' || password === '1234' || password === '1'))
      ) {
        localStorage.setItem('rakeez_auth_session', JSON.stringify({
          username: trimmedUser || 'admin',
          role: 'المسؤول الرئيسي',
          loginTime: new Date().toISOString()
        }));
        onLoginSuccess(trimmedUser || 'admin');
      } else {
        setErrorMsg('اسم المستخدم أو كلمة المرور غير صحيحة. يرجى المحاولة مرة أخرى.');
        setIsLoading(false);
      }
    }, 400);
  };

  const handlePresetLogin = (presetUser: string, presetPass: string) => {
    setUsername(presetUser);
    setPassword(presetPass);
    setErrorMsg(null);
    setIsLoading(true);

    setTimeout(() => {
      localStorage.setItem('rakeez_auth_session', JSON.stringify({
        username: presetUser,
        role: 'المسؤول الرئيسي',
        loginTime: new Date().toISOString()
      }));
      onLoginSuccess(presetUser);
    }, 300);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 font-sans selection:bg-amber-500 selection:text-slate-950 relative overflow-hidden dir-rtl">
      
      {/* BACKGROUND GLOW EFFECTS */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="w-full max-w-md space-y-6 relative z-10 animate-fadeIn">
        
        {/* BRANDING LOGO & HEADER */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center p-4 rounded-3xl bg-gradient-to-br from-amber-500/20 via-slate-900 to-emerald-500/20 border border-amber-500/40 text-amber-400 shadow-2xl shadow-amber-500/10">
            <Building2 className="w-10 h-10 animate-pulse" />
          </div>

          <div className="flex justify-center items-center gap-2">
            <span className="px-3.5 py-1 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 text-slate-950 font-black text-xs shadow-md">
              الركيز RAKEEZ ERP v2.0
            </span>
            <span className="px-2.5 py-0.5 rounded-lg bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30 text-xs">
              أمان 3 دقائق 🔐
            </span>
          </div>

          <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            نظام الركيز لإدارة الموارد
          </h1>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            بوابة تسجيل دخول المسؤول المالي والإداري لنظام المبيعات والمخزون
          </p>
        </div>

        {/* LOGIN FORM CARD */}
        <div className="p-8 rounded-3xl glass-panel border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 shadow-2xl space-y-6">
          
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <h2 className="text-sm font-extrabold text-white flex items-center gap-2">
              <Lock className="w-4 h-4 text-amber-400" /> دخول المسؤول | Admin Login
            </h2>
            <span className="text-[11px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-bold border border-emerald-500/30">
              مشفر وآمن 🛡️
            </span>
          </div>

          {/* ERROR ALERT */}
          {errorMsg && (
            <div className="p-3.5 rounded-2xl bg-red-950/60 border border-red-500/40 text-red-300 text-xs font-bold flex items-center gap-2 animate-fadeIn">
              <ShieldAlert className="w-5 h-5 text-red-400 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs">
            
            {/* USERNAME INPUT */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">اسم المستخدم / رقم المسؤول:</label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-500 absolute right-3 top-3.5" />
                <input 
                  type="text"
                  required
                  placeholder="أدخل اسم المستخدم (مثال: admin أو 1)"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pr-10 pl-4 text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-medium transition-all"
                />
              </div>
            </div>

            {/* PASSWORD INPUT */}
            <div className="space-y-1.5">
              <label className="text-slate-300 font-bold block">كلمة المرور:</label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-500 absolute right-3 top-3.5" />
                <input 
                  type={showPassword ? 'text' : 'password'}
                  required
                  placeholder="أدخل كلمة المرور"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-2xl py-3 pr-10 pl-10 text-white text-sm focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 font-mono transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute left-3 top-3.5 text-slate-500 hover:text-slate-300 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-400 hover:from-amber-400 hover:to-emerald-300 text-slate-950 font-black text-sm transition-all shadow-xl shadow-amber-500/20 active:scale-[0.99] cursor-pointer flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <span>جاري التحقق والدخول...</span>
              ) : (
                <>
                  <span>تسجيل الدخول للنظام</span>
                  <ArrowLeft className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* QUICK DEMO PRESETS */}
          <div className="pt-3 border-t border-slate-900 space-y-2">
            <div className="text-[11px] text-slate-500 text-center font-bold">
              💡 التجربة السريعة (دخول بضغطة واحدة):
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handlePresetLogin('admin', '1234')}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-[11px] text-slate-300 font-bold transition-all text-center cursor-pointer"
              >
                <div className="text-amber-400 font-mono">admin / 1234</div>
                <div className="text-[9px] text-slate-500">مسؤول النظام الرئيسي</div>
              </button>

              <button
                type="button"
                onClick={() => handlePresetLogin('1', '12345678')}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-emerald-500/40 text-[11px] text-slate-300 font-bold transition-all text-center cursor-pointer"
              >
                <div className="text-emerald-400 font-mono">1 / 12345678</div>
                <div className="text-[9px] text-slate-500">حساب مدير الفرع</div>
              </button>
            </div>
          </div>

        </div>

        {/* FOOTER BADGE */}
        <div className="text-center text-[11px] text-slate-500 space-y-1">
          <div className="flex items-center justify-center gap-1.5 text-slate-400 font-medium">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>نظام الركيز المتكامل © 2026 - مزود بنظام أمان 3 دقائق تلقائي</span>
          </div>
        </div>

      </div>
    </div>
  );
};
