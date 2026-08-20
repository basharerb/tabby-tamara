import React, { useState } from 'react';
import { Shield, Key, Clock, X, Check, AlertCircle } from 'lucide-react';
import { getSecurityConfig, saveSecurityConfig, lockAppImmediately } from '../services/security';

interface SecuritySettingsModalProps {
  onClose: () => void;
  onLockNow: () => void;
}

export const SecuritySettingsModal: React.FC<SecuritySettingsModalProps> = ({ onClose, onLockNow }) => {
  const [config, setConfig] = useState(getSecurityConfig());
  const [currentPin, setCurrentPin] = useState('');
  const [newPin, setNewPin] = useState('');
  const [confirmPin, setConfirmPin] = useState('');
  const [msg, setMsg] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleSaveTimeout = (minutes: number) => {
    saveSecurityConfig({ timeoutMinutes: minutes });
    setConfig(getSecurityConfig());
    setMsg({ type: 'success', text: `تم تغيير مدة وقت الخروج إلى ${minutes} دقائق` });
  };

  const handleToggleEnabled = (enabled: boolean) => {
    saveSecurityConfig({ enabled });
    setConfig(getSecurityConfig());
    setMsg({ 
      type: 'success', 
      text: enabled ? 'تم تفعيل نظام الحماية بعد الخروج' : 'تم تعطيل الحماية التلقائية' 
    });
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);

    if (currentPin !== config.pin) {
      setMsg({ type: 'error', text: 'رمز الدخول الحالي غير صحيح' });
      return;
    }

    if (newPin.length !== 4 || !/^\d+$/.test(newPin)) {
      setMsg({ type: 'error', text: 'يجب أن يتكون الرمز الجديد من 4 أرقام فقط' });
      return;
    }

    if (newPin !== confirmPin) {
      setMsg({ type: 'error', text: 'الرمز الجديد وتأكيده غير متطابقين' });
      return;
    }

    saveSecurityConfig({ pin: newPin });
    setConfig(getSecurityConfig());
    setCurrentPin('');
    setNewPin('');
    setConfirmPin('');
    setMsg({ type: 'success', text: 'تم تغيير رمز الدخول بنجاح!' });
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      <div className="w-full max-w-lg p-6 sm:p-8 rounded-3xl border border-slate-800 bg-slate-900 shadow-2xl space-y-6 relative text-slate-100">
        
        {/* CLOSE BUTTON */}
        <button 
          onClick={onClose}
          className="absolute top-6 left-6 p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>

        {/* HEADER */}
        <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
          <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">إعدادات الأمان وقفل الخروج</h3>
            <p className="text-xs text-slate-400">التحكم في رمز الدخول ومؤقت الـ 5 دقائق بعد الخروج</p>
          </div>
        </div>

        {/* FEEDBACK MSG */}
        {msg && (
          <div className={`p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            msg.type === 'success' ? 'bg-emerald-950/50 border border-emerald-500/30 text-emerald-300' : 'bg-red-950/50 border border-red-500/30 text-red-300'
          }`}>
            {msg.type === 'success' ? <Check className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {msg.text}
          </div>
        )}

        {/* LOCK NOW QUICK ACTION */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 flex items-center justify-between">
          <div>
            <div className="text-xs font-bold text-white">قفل النظام الفوري</div>
            <div className="text-[11px] text-slate-400">قفل الشاشة فوراً واختبار رمز الدخول</div>
          </div>
          <button
            onClick={() => {
              onLockNow();
              onClose();
            }}
            className="px-3.5 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs transition-colors cursor-pointer flex items-center gap-1.5"
          >
            <Shield className="w-3.5 h-3.5" /> قفل الآن
          </button>
        </div>

        {/* AUTO-LOCK TOGGLE */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-950 border border-slate-800">
          <div>
            <div className="text-xs font-bold text-white">تفعيل القفل عند الخروج</div>
            <div className="text-[11px] text-slate-400">طلب رمز الدخول بعد مغادرة التطبيق</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              checked={config.enabled} 
              onChange={(e) => handleToggleEnabled(e.target.checked)} 
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:right-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500"></div>
          </label>
        </div>

        {/* TIMEOUT CONFIGURATION */}
        <div className="space-y-2">
          <label className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-emerald-400" /> مهلة القفل بعد الخروج من التطبيق:
          </label>
          <div className="grid grid-cols-4 gap-2 text-xs">
            {[1, 3, 5, 10].map((mins) => (
              <button
                key={mins}
                onClick={() => handleSaveTimeout(mins)}
                className={`py-2 px-3 rounded-xl border font-bold text-center transition-all cursor-pointer ${
                  config.timeoutMinutes === mins
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300'
                    : 'bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                {mins} {mins === 1 ? 'دقيقة' : 'دقائق'}
              </button>
            ))}
          </div>
        </div>

        {/* CHANGE PIN FORM */}
        <form onSubmit={handleChangePin} className="space-y-3 pt-2 border-t border-slate-800">
          <div className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
            <Key className="w-4 h-4 text-orange-400" /> تغيير رمز الدخول (PIN Code):
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs dir-rtl">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">الرمز الحالي:</label>
              <input
                type="password"
                maxLength={4}
                value={currentPin}
                onChange={(e) => setCurrentPin(e.target.value)}
                placeholder="****"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center text-white font-mono tracking-widest"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">الرمز الجديد:</label>
              <input
                type="password"
                maxLength={4}
                value={newPin}
                onChange={(e) => setNewPin(e.target.value)}
                placeholder="****"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center text-white font-mono tracking-widest"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">تأكيد الرمز:</label>
              <input
                type="password"
                maxLength={4}
                value={confirmPin}
                onChange={(e) => setConfirmPin(e.target.value)}
                placeholder="****"
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-center text-white font-mono tracking-widest"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold transition-colors cursor-pointer"
          >
            حفظ الرمز الجديد
          </button>
        </form>

      </div>
    </div>
  );
};
