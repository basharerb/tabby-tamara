import React, { useState, useEffect } from 'react';
import { Lock, ShieldAlert, RotateCcw, AlertTriangle, Delete, Building2 } from 'lucide-react';
import { unlockApp, resetPinToDefault, getSecurityConfig } from '../services/security';

interface LockScreenProps {
  onUnlocked: () => void;
}

export const LockScreen: React.FC<LockScreenProps> = ({ onUnlocked }) => {
  const [pin, setPin] = useState<string>('');
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [shake, setShake] = useState<boolean>(false);
  const [showResetConfirm, setShowResetConfirm] = useState<boolean>(false);
  const [config, setConfig] = useState(getSecurityConfig());

  const handleKeyPress = (digit: string) => {
    if (pin.length < 4) {
      const newPin = pin + digit;
      setPin(newPin);
      setErrorMsg(null);

      if (newPin.length === 4) {
        attemptUnlock(newPin);
      }
    }
  };

  const handleDelete = () => {
    if (pin.length > 0) {
      setPin(pin.slice(0, -1));
      setErrorMsg(null);
    }
  };

  const handleClear = () => {
    setPin('');
    setErrorMsg(null);
  };

  const attemptUnlock = (enteredPin: string) => {
    const result = unlockApp(enteredPin);
    if (result.success) {
      onUnlocked();
    } else {
      setShake(true);
      setErrorMsg(result.message || 'رمز الدخول غير صحيح');
      setTimeout(() => {
        setShake(false);
        setPin('');
      }, 600);
    }
  };

  const handleResetPin = () => {
    resetPinToDefault();
    setConfig(getSecurityConfig());
    setShowResetConfirm(false);
    setPin('');
    setErrorMsg('تمت إعادة ضبط رمز الدخول إلى 1234 بنجاح');
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key >= '0' && e.key <= '9') {
        handleKeyPress(e.key);
      } else if (e.key === 'Backspace') {
        handleDelete();
      } else if (e.key === 'Escape') {
        handleClear();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [pin]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-2xl animate-fadeIn selection:bg-amber-500 selection:text-slate-950 dir-rtl">
      <div className={`w-full max-w-md p-8 rounded-3xl border border-slate-800 bg-gradient-to-b from-slate-900/90 via-slate-950 to-slate-900/90 shadow-2xl space-y-6 text-center ${shake ? 'animate-bounce' : ''}`}>
        
        {/* RAKEEZ BRANDING */}
        <div className="space-y-3">
          <div className="inline-flex items-center justify-center p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
            <Building2 className="w-8 h-8 animate-pulse" />
          </div>
          
          <div className="flex justify-center items-center gap-2">
            <span className="px-3 py-1 rounded-xl bg-gradient-to-r from-amber-500 to-emerald-500 text-slate-950 font-black text-xs">
              نظام الركيز ERP
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-red-950/80 text-red-300 font-bold border border-red-500/30 text-[11px]">
              🔒 قفل الأمان العالي
            </span>
          </div>

          <h2 className="text-xl sm:text-2xl font-black text-white">
            شاشة تأكيد أمان النظام
          </h2>
          <p className="text-xs text-slate-400 max-w-xs mx-auto">
            تم قفل النظام تلقائياً بعد توقف الاستخدام (أكثر من {config.timeoutMinutes} دقائق) لحماية البيانات وحفظ الخصوصية.
          </p>
        </div>

        {/* ERROR OR STATUS MESSAGE */}
        {errorMsg ? (
          <div className="p-3 rounded-xl bg-red-950/50 border border-red-500/40 text-red-300 text-xs font-bold flex items-center justify-center gap-2 animate-fadeIn">
            <ShieldAlert className="w-4 h-4 text-red-400" />
            {errorMsg}
          </div>
        ) : (
          <div className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 text-slate-400 text-xs font-medium">
            يرجى إدخال رمز الدخول (PIN) المكون من 4 أرقام للمتابعة
          </div>
        )}

        {/* PIN DOTS INDICATOR */}
        <div className="flex justify-center items-center gap-4 py-2">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index < pin.length
                  ? 'bg-amber-400 shadow-lg shadow-amber-500/50 scale-110 border-2 border-amber-300'
                  : 'bg-slate-800 border border-slate-700'
              }`}
            />
          ))}
        </div>

        {/* KEYPAD NUMBERS */}
        <div className="grid grid-cols-3 gap-3 dir-ltr max-w-xs mx-auto">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num)}
              className="h-14 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-white text-xl font-black transition-all active:scale-95 cursor-pointer shadow-md"
            >
              {num}
            </button>
          ))}
          <button
            onClick={handleClear}
            className="h-14 rounded-2xl bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-slate-200 text-xs font-bold transition-all active:scale-95 cursor-pointer"
          >
            مسح
          </button>
          <button
            onClick={() => handleKeyPress('0')}
            className="h-14 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/40 text-white text-xl font-black transition-all active:scale-95 cursor-pointer shadow-md"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="h-14 rounded-2xl bg-slate-900/40 hover:bg-slate-800 border border-slate-800 text-slate-400 hover:text-red-400 text-xs font-bold transition-all active:scale-95 flex items-center justify-center cursor-pointer"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        {/* DEFAULT PIN HELPER & RESET */}
        <div className="pt-2 border-t border-slate-900 flex flex-col items-center gap-2">
          <div className="text-[11px] text-slate-500">
            💡 الرمز الافتراضي للأمان: <span className="font-mono text-amber-400 font-bold">1234</span>
          </div>

          {!showResetConfirm ? (
            <button
              onClick={() => setShowResetConfirm(true)}
              className="text-[11px] text-slate-400 hover:text-slate-200 underline flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" /> نسيت الرمز؟ إعادة ضبط إلى 1234
            </button>
          ) : (
            <div className="p-3 rounded-xl bg-orange-950/40 border border-orange-500/30 text-xs space-y-2 w-full animate-fadeIn">
              <div className="text-orange-300 font-bold flex items-center justify-center gap-1">
                <AlertTriangle className="w-3.5 h-3.5" /> إعادة ضبط رمز الأمان إلى (1234)؟
              </div>
              <div className="flex gap-2 justify-center">
                <button
                  onClick={handleResetPin}
                  className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs cursor-pointer"
                >
                  نعم، اضبط الرمز
                </button>
                <button
                  onClick={() => setShowResetConfirm(false)}
                  className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs cursor-pointer"
                >
                  إلغاء
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
