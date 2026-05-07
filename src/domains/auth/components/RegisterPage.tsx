import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, Lock, User, Shield, ArrowRight, Loader2, CheckCircle2, Phone } from 'lucide-react';
import { createUserWithEmailAndPassword, RecaptchaVerifier, signInWithPhoneNumber, ConfirmationResult } from 'firebase/auth';
import { doc, setDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { auth, db } from '../../core/services/firebase';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../core/context/RoleContext';

export const RegisterPage: React.FC = () => {
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  
  // Shared state
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { availableRoles } = useRole();

  // Email state
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Phone state
  const [phone, setPhone] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);

  useEffect(() => {
    if (!(window as any).recaptchaVerifier) {
      (window as any).recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
        size: 'invisible'
      });
    }
  }, []);

  const handleEmailRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      const userData: any = {
        uid: user.uid,
        displayName,
        role: selectedRole,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      };
      if (user.email) userData.email = user.email;
      if (user.phoneNumber) userData.phoneNumber = user.phoneNumber;

      await setDoc(doc(db, 'users', user.uid), userData);

      navigate('/');
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.startsWith('+')) {
      setError('يرجى إدخال رقم هاتف بالصيغة الدولية (+966...)');
      return;
    }
    
    setLoading(true);
    setError(null);
    try {
      const appVerifier = (window as any).recaptchaVerifier;
      const result = await signInWithPhoneNumber(auth, phone, appVerifier);
      setConfirmationResult(result);
      setOtpSent(true);
    } catch (err: any) {
      handleAuthError(err);
    } finally {
      setLoading(false);
    }
  };

  const handlePhoneVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    
    setLoading(true);
    setError(null);
    try {
      const result = await confirmationResult.confirm(otp);
      const user = result.user;

      // Check if user exists
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (!userDoc.exists()) {
        const userData: any = {
          uid: user.uid,
          displayName,
          role: selectedRole,
          isActive: true,
          createdAt: serverTimestamp(),
          updatedAt: serverTimestamp(),
          lastLoginAt: serverTimestamp()
        };
        if (user.email) userData.email = user.email;
        if (user.phoneNumber) userData.phoneNumber = user.phoneNumber;

        await setDoc(doc(db, 'users', user.uid), userData);
      }
      navigate('/');
    } catch (err: any) {
      setError('كود التحقق غير صحيح أو انتهت صلاحيته.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthError = (err: any) => {
    console.error(err);
    if (err.code === 'auth/email-already-in-use') {
      setError('هذا البريد الإلكتروني مسجل مسبقاً. حاول تسجيل الدخول.');
    } else if (err.code === 'auth/invalid-phone-number') {
      setError('رقم الهاتف غير صالح. يرجى إدخال رقم بالصيغة الدولية.');
    } else if (err.code === 'auth/unauthorized-domain') {
      setError('النطاق الحالي غير مصرح به في فايربيس (إعدادات Auth -> Authorized Domains).');
    } else {
      setError('حدث خطأ. تأكد من صحة البيانات والمحاولة لاحقاً.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 relative" dir="rtl">
      <div id="recaptcha-container"></div>
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50/50 rounded-full blur-[120px] -z-10" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-indigo-50/50 rounded-full blur-[120px] -z-10" />

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-2xl bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100 overflow-hidden flex flex-col md:flex-row"
      >
        {/* Sidebar Info */}
        <div className="md:w-64 bg-slate-900 p-8 text-white flex flex-col justify-between">
          <div>
            <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-blue-600/20">
              <Shield className="w-6 h-6" />
            </div>
            <h2 className="text-xl font-bold mb-2">عضوية بلّغ</h2>
            <p className="text-slate-400 text-sm leading-relaxed">كن جزءاً من التغيير الإيجابي في مجتمعك من خلال منصتنا الموحدة.</p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs text-slate-300">بلاغات فورية</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs text-slate-300">خصوصية تامة</span>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-1 p-8 md:p-12 overflow-y-auto max-h-[90vh]">
          <h1 className="text-2xl font-bold text-slate-900 mb-6">إنشاء حساب جديد</h1>
          
          <div className="flex p-1 bg-slate-100 rounded-xl mb-6">
            <button 
              onClick={() => { setMethod('email'); setOtpSent(false); setError(null); }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${method === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Mail className="w-4 h-4" />
              البريد الإلكتروني
            </button>
            <button 
              onClick={() => { setMethod('phone'); setOtpSent(false); setError(null); }}
              className={`flex-1 py-3 px-4 rounded-lg text-sm font-bold transition-all flex items-center justify-center gap-2 ${method === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Phone className="w-4 h-4" />
              رقم الهاتف
            </button>
          </div>

          <form onSubmit={method === 'email' ? handleEmailRegister : (otpSent ? handlePhoneVerify : handlePhoneRequest)} className="space-y-5">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">الاسم الكامل</label>
              <div className="relative">
                <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input 
                  type="text"
                  value={displayName}
                  onChange={(e) => setDisplayName(e.target.value)}
                  disabled={otpSent}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all disabled:opacity-50"
                  placeholder="مثال: أحمد محمد"
                  required
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              {method === 'email' ? (
                <motion.div key="email-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">البريد الإلكتروني</label>
                    <div className="relative">
                      <Mail className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="name@example.com"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">كلمة المرور</label>
                    <div className="relative">
                      <Lock className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                        placeholder="••••••••"
                        required
                        minLength={6}
                      />
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="phone-fields" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="space-y-5">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">رقم الهاتف (بالصيغة الدولية)</label>
                    <div className="relative">
                      <Phone className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                      <input 
                        type="tel"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        disabled={otpSent}
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all text-left dir-ltr disabled:opacity-50"
                        placeholder="+966xxxxxxxxx"
                        required
                      />
                    </div>
                  </div>

                  {otpSent && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="space-y-1.5">
                      <label className="text-xs font-bold text-slate-500 mr-1">رمز التحقق (OTP)</label>
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
                </motion.div>
              )}
            </AnimatePresence>

            {!otpSent && (
              <div className="space-y-2 pt-2 border-t border-slate-100">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">اختر نوع الحساب</label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-32 overflow-y-auto pr-1 custom-scrollbar">
                  {availableRoles
                    .filter(role => !['admin', 'leadership'].includes(role.category || ''))
                    .map((role) => (
                    <button
                      key={role.slug}
                      type="button"
                      onClick={() => setSelectedRole(role.slug)}
                      className={`py-2 px-1 rounded-xl border text-xs font-bold transition-all flex flex-col items-center justify-center gap-1 ${
                        selectedRole === role.slug 
                        ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                        : 'bg-white border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-500'
                      }`}
                    >
                      <span className="truncate w-full text-center">{role.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {error && (
              <p className="text-red-500 text-xs text-center font-bold bg-red-50 p-3 rounded-xl border border-red-100">{error}</p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-xl py-3.5 font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group mt-4 shadow-lg shadow-slate-200"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  {method === 'email' ? 'إنشاء الحساب' : (otpSent ? 'تأكيد الحساب' : 'إرسال كود التحقق')}
                  <ArrowRight className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>
            
            {method === 'phone' && otpSent && (
              <button 
                type="button" 
                onClick={() => { setOtpSent(false); setOtp(''); }}
                className="w-full text-center text-xs font-bold text-slate-500 mt-2 hover:text-blue-600 transition-colors"
              >
                تغيير الرقم أو إعادة الإرسال؟
              </button>
            )}
          </form>

          <p className="mt-6 text-center text-sm text-slate-500 font-medium">
            لديك حساب بالفعل؟ <button onClick={() => navigate('/login')} className="text-blue-600 font-bold hover:underline">تسجيل الدخول</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

