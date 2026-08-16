import React, { useState } from 'react';
import { Product, CheckoutState } from '../types';
import { X, CheckCircle2, ShieldCheck, Phone, KeyRound, Sparkles, ArrowRight, Lock, Calendar } from 'lucide-react';

interface PaymentModalProps {
  checkoutState: CheckoutState;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal: React.FC<PaymentModalProps> = ({
  checkoutState,
  onClose,
  onSuccess
}) => {
  const { product, provider } = checkoutState;
  const [step, setStep] = useState<'select_plan' | 'phone_verification' | 'otp' | 'success'>('select_plan');
  const [phone, setPhone] = useState('0551234567');
  const [otp, setOtp] = useState(['5', '8', '2', '4']);
  const [loading, setLoading] = useState(false);

  if (!product) return null;

  const isTabby = provider === 'tabby';
  const installment4 = (product.price / 4).toFixed(2);
  const installment3 = (product.price / 3).toFixed(2);

  const handleNextStep = () => {
    if (step === 'select_plan') {
      setStep('phone_verification');
    } else if (step === 'phone_verification') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('otp');
      }, 800);
    } else if (step === 'otp') {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setStep('success');
      }, 1200);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fadeIn">
      
      <div className="relative w-full max-w-lg rounded-3xl glass-panel border border-slate-700 shadow-2xl overflow-hidden text-slate-100">
        
        {/* Top Header Bar */}
        <div className={`p-5 flex items-center justify-between border-b ${
          isTabby 
            ? 'bg-gradient-to-r from-emerald-950 to-slate-900 border-emerald-500/30' 
            : 'bg-gradient-to-r from-purple-950 to-slate-900 border-orange-500/30'
        }`}>
          <div className="flex items-center gap-3">
            {isTabby ? (
              <span className="px-3 py-1 rounded-lg bg-emerald-400 text-slate-950 font-black text-sm tracking-wider">
                tabby
              </span>
            ) : (
              <span className="px-3 py-1 rounded-lg bg-gradient-to-r from-orange-500 to-purple-600 text-white font-black text-sm tracking-wider">
                tamara
              </span>
            )}
            <div>
              <h3 className="text-sm font-extrabold text-white">
                محاكاة الدفع عبر {isTabby ? 'تابي' : 'تمارا'}
              </h3>
              <p className="text-[10px] text-slate-300">عملية مؤمنة 100% بدون فوائد</p>
            </div>
          </div>

          <button 
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Product summary card */}
        <div className="p-4 bg-slate-900/60 border-b border-slate-800 flex items-center gap-3">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-12 h-12 rounded-xl object-cover border border-slate-700" 
          />
          <div className="flex-1">
            <h4 className="text-xs font-bold text-white line-clamp-1">{product.name}</h4>
            <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
              <span>الإجمالي: <strong className="text-white">{product.price.toLocaleString()} {product.currency}</strong></span>
            </div>
          </div>
        </div>

        {/* Step Body */}
        <div className="p-6 space-y-6">

          {/* STEP 1: Select Plan */}
          {step === 'select_plan' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">
                1. اختر خطة التقسيط المناسبة لك:
              </h4>

              {isTabby ? (
                <div className="p-4 rounded-2xl bg-emerald-950/40 border-2 border-emerald-500/60 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-emerald-400">4 دفعات متساوية كل شهر</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 font-bold">
                      الأكثر اختياراً
                    </span>
                  </div>

                  <div className="text-xl font-black text-white">
                    {installment4} {product.currency} <span className="text-xs text-slate-400 font-normal">/ شهرياً</span>
                  </div>

                  <div className="text-xs text-slate-300 space-y-1.5 pt-2 border-t border-emerald-500/20">
                    <div className="flex justify-between">
                      <span>• اليوم (عند الشراء):</span>
                      <strong className="text-emerald-400">{installment4} {product.currency}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>• الدفعة 2 (بعد 30 يوم):</span>
                      <strong className="text-white">{installment4} {product.currency}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>• الدفعة 3 (بعد 60 يوم):</span>
                      <strong className="text-white">{installment4} {product.currency}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>• الدفعة 4 (بعد 90 يوم):</span>
                      <strong className="text-white">{installment4} {product.currency}</strong>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-4 rounded-2xl bg-purple-950/40 border-2 border-orange-500/60 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-orange-400">قسّمها على 3 دفعات</span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-orange-500/20 text-orange-300 border border-orange-500/40 font-bold">
                        متوافق شريعاً
                      </span>
                    </div>

                    <div className="text-xl font-black text-white">
                      {installment3} {product.currency} <span className="text-xs text-slate-400 font-normal">/ شهرياً</span>
                    </div>

                    <div className="text-xs text-slate-300 space-y-1 pt-2 border-t border-purple-500/20">
                      <div className="flex justify-between">
                        <span>• الدفعة 1 (الآن):</span>
                        <strong className="text-orange-400">{installment3} {product.currency}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>• الدفعة 2 (بعد شهر):</span>
                        <strong className="text-white">{installment3} {product.currency}</strong>
                      </div>
                      <div className="flex justify-between">
                        <span>• الدفعة 3 (بعد شهرين):</span>
                        <strong className="text-white">{installment3} {product.currency}</strong>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <button
                onClick={handleNextStep}
                className={`w-full py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  isTabby ? 'tabby-btn' : 'tamara-btn'
                }`}
              >
                متابعة وإدخال رقم الجوال &larr;
              </button>
            </div>
          )}

          {/* STEP 2: Phone Verification */}
          {step === 'phone_verification' && (
            <div className="space-y-4">
              <h4 className="text-xs font-extrabold uppercase text-slate-300 tracking-wider">
                2. إدخال رقم الجوال المسجل في {isTabby ? 'تابي' : 'تمارا'}:
              </h4>

              <div className="space-y-2">
                <label className="text-xs text-slate-400 block">رقم الجوال السعودية (+966):</label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5" />
                  <input 
                    type="text" 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="05XXXXXXXX" 
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl py-3 pr-10 pl-4 text-sm text-white font-mono focus:outline-none focus:border-emerald-500"
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  سيتم إرسال رمز تفعيل مؤقت مكون من 4 أرقام عبر SMS للموافقة الفورية.
                </p>
              </div>

              <button
                onClick={handleNextStep}
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  isTabby ? 'tabby-btn' : 'tamara-btn'
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    جاري إرسال الرمز...
                  </span>
                ) : (
                  <>إرسال رمز التفعيل OTP &larr;</>
                )}
              </button>
            </div>
          )}

          {/* STEP 3: OTP Code */}
          {step === 'otp' && (
            <div className="space-y-4 text-center">
              <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center mx-auto text-emerald-400">
                <KeyRound className="w-6 h-6" />
              </div>

              <div>
                <h4 className="text-sm font-extrabold text-white">إدخال رمز التحقق (OTP)</h4>
                <p className="text-xs text-slate-400 mt-1">
                  تم إرسال الرمز التجريبي إلى الرقم <span className="font-mono text-emerald-400">{phone}</span>
                </p>
              </div>

              <div className="flex justify-center gap-2 dir-ltr">
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    type="text"
                    maxLength={1}
                    value={digit}
                    readOnly
                    className="w-12 h-12 text-center text-lg font-bold bg-slate-900 border border-slate-700 rounded-xl text-white font-mono focus:border-emerald-500 focus:outline-none"
                  />
                ))}
              </div>

              <button
                onClick={handleNextStep}
                disabled={loading}
                className={`w-full py-3.5 rounded-xl font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer ${
                  isTabby ? 'tabby-btn' : 'tamara-btn'
                }`}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    جاري التحقق والموافقة...
                  </span>
                ) : (
                  <>تأكيد الطلب وتفعيل التقسيط &larr;</>
                )}
              </button>
            </div>
          )}

          {/* STEP 4: Success */}
          {step === 'success' && (
            <div className="space-y-4 text-center py-4">
              <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center mx-auto text-emerald-400 animate-bounce">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs px-3 py-1 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-500/40 font-bold">
                  تمت الموافقة بنجاح 🎉
                </span>
                <h4 className="text-lg font-black text-white mt-2">
                  مبارك! تم شحن الطلب وتقسيط الفاتورة عبر {isTabby ? 'تابي' : 'تمارا'}
                </h4>
                <p className="text-xs text-slate-300 mt-1 max-w-sm mx-auto">
                  تم دفع الجرء الأول بقيمة <strong className="text-emerald-400">{isTabby ? installment4 : installment3} {product.currency}</strong> بنجاح وتأكيد جدول الدفعات القادمة.
                </p>
              </div>

              <button
                onClick={() => {
                  onSuccess();
                  onClose();
                }}
                className="w-full py-3.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-extrabold text-xs cursor-pointer border border-slate-700"
              >
                العودة إلى المتجر
              </button>
            </div>
          )}

        </div>

      </div>

    </div>
  );
};
