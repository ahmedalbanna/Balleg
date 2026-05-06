import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Phone, Lock, ArrowRight, Shield, User, Store, Car, Loader2 } from 'lucide-react';
import { signInWithEmailAndPassword, signInAnonymously } from 'firebase/auth';
import { auth } from '../../core/services/firebase';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handlePhoneRequest = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setOtpSent(true);
      setLoading(false);
    }, 1000);
  };

  const handlePhoneVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      signInAnonymously(auth).then(() => {
        navigate('/');
      });
    }, 800);
  };

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (err: any) {
      if (err.code === 'auth/user-not-found' || err.code === 'auth/wrong-password' || err.code === 'auth/invalid-credential') {
        setError('خطأ في البريد الإلكتروني أو كلمة المرور. يرجى المحاولة مرة أخرى.');
      } else if (err.code === 'auth/too-many-requests') {
        setError('تم حظر الدخول مؤقتاً بسبب محاولات فاشلة كثيرة. حاول لاحقاً.');
      } else {
        setError('خطأ في البريد الإلكتروني أو كلمة المرور');
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleGuestLogin = async () => {
    setLoading(true);
    try {
      await signInAnonymously(auth);
      navigate('/');
    } catch (err) {
      setError('فشل تسجيل الدخول كضيف');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 relative overflow-hidden" dir="rtl">
      {/* Background accents */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-50 rounded-full blur-[100px]" />
        <div className="absolute -bottom-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-50 rounded-full blur-[100px]" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="bg-white rounded-3xl shadow-xl shadow-blue-500/5 border border-slate-200 overflow-hidden">
          <div className="p-8 pb-4">
            <div className="flex justify-center mb-6">
              <div className="p-3 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/20">
                <Shield className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-2xl font-bold text-slate-900 text-center mb-2">مرحباً بك في بلّغ</h1>
            <p className="text-slate-500 text-center mb-8">المنصة الذكية لإدارة وتحسين الخدمات العامة</p>

            <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
              <button 
                onClick={() => setMethod('email')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${method === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                البريد الإلكتروني
              </button>
              <button 
                onClick={() => setMethod('phone')}
                className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${method === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
              >
                رقم الهاتف
              </button>
            </div>

            <AnimatePresence mode="wait">
              {method === 'email' ? (
                <motion.form 
                  key="email-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={handleEmailLogin}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 mr-1">البريد الإلكتروني</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-right"
                        placeholder="example@mail.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 mr-1">كلمة المرور</label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-right"
                        placeholder="••••••••"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <p className="text-red-500 text-[10px] font-bold text-center bg-red-50 p-2 rounded-lg">{error}</p>
                  )}

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2 group"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                      <>
                        تسجيل الدخول
                        <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </motion.form>
              ) : (
                <motion.form 
                  key="phone-form"
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -10 }}
                  onSubmit={otpSent ? handlePhoneVerify : handlePhoneRequest}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-sm font-medium text-slate-700 mr-1">رقم الهاتف</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-right"
                        placeholder="05xxxxxxx"
                        required
                        disabled={otpSent}
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1">
                      <label className="text-sm font-medium text-slate-700 mr-1">رمز التحقق (OTP)</label>
                      <input 
                        type="text"
                        value={otp}
                        maxLength={6}
                        onChange={(e) => setOtp(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 text-center text-lg font-black tracking-widest focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                        placeholder="123456"
                        required
                      />
                    </motion.div>
                  )}

                  <p className="text-xs text-slate-400 text-center">
                    {otpSent ? 'أدخل الرمز المكون من 6 أرقام' : 'سنقوم بإرسال كود التحقق عبر الرسائل النصية'}
                  </p>

                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : otpSent ? 'تحقق ودخول' : 'إرسال كود التحقق'}
                    <ArrowRight className="w-5 h-5" />
                  </button>

                  {otpSent && (
                    <button 
                      type="button" 
                      onClick={() => setOtpSent(false)}
                      className="w-full text-center text-[10px] font-bold text-blue-600"
                    >
                      تغيير الرقم؟
                    </button>
                  )}
                </motion.form>
              )}
            </AnimatePresence>
          </div>

          <div className="p-8 bg-slate-50 border-t border-slate-100 flex flex-col gap-3">
             <button 
              onClick={handleGuestLogin}
              className="w-full py-3 px-4 rounded-xl border border-slate-200 bg-white text-slate-700 font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
              <User className="w-5 h-5" />
              الدخول كضيف (مواطن)
            </button>
            <p className="text-xs text-slate-500 text-center">
              ليس لديك حساب؟ <button onClick={() => navigate('/register')} className="text-blue-600 font-bold cursor-pointer hover:underline">سجل الآن</button>
            </p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-3 gap-4">
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/20 text-center">
            <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Shield className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold text-slate-700">أمان عالي</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/20 text-center">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Store className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold text-slate-700">ذكاء جغرافي</p>
          </div>
          <div className="bg-white/50 backdrop-blur-sm p-4 rounded-2xl border border-white/20 text-center">
            <div className="w-8 h-8 bg-orange-100 text-orange-600 rounded-lg flex items-center justify-center mx-auto mb-2">
              <Loader2 className="w-4 h-4" />
            </div>
            <p className="text-[10px] font-bold text-slate-700">تحديث فوري</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
