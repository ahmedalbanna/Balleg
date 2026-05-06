import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, User, Shield, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../../core/services/firebase';
import { useNavigate } from 'react-router-dom';
import { useRole } from '../../core/context/RoleContext';

export const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [selectedRole, setSelectedRole] = useState('citizen');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { availableRoles } = useRole();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Create user profile in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName,
        role: selectedRole,
        isActive: true,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        lastLoginAt: serverTimestamp()
      });

      navigate('/');
    } catch (err: any) {
      setError('حدث خطأ أثناء إنشاء الحساب. تأكد من صحة البيانات.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] p-4 relative" dir="rtl">
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
            <div className="flex items-center gap-3">
              <div className="w-6 h-6 bg-green-500/20 text-green-500 rounded-lg flex items-center justify-center">
                <CheckCircle2 className="w-4 h-4" />
              </div>
              <span className="text-xs text-slate-300">تتبع ذكي</span>
            </div>
          </div>
        </div>

        {/* Form Area */}
        <div className="flex-1 p-8 md:p-12">
          <h1 className="text-2xl font-bold text-slate-900 mb-8">إنشاء حساب جديد</h1>
          
          <form onSubmit={handleRegister} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">الاسم الكامل</label>
                <div className="relative">
                  <User className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <input 
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pr-11 pl-4 focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="مثال: أحمد محمد"
                    required
                  />
                </div>
              </div>

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
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mr-1">اختر الدور الوظيفي (للعرض التوضيحي)</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 h-40 overflow-y-auto pr-2 custom-scrollbar border border-slate-100 rounded-xl p-2 bg-slate-50/50">
                {availableRoles.map((role) => (
                  <button
                    key={role.slug}
                    type="button"
                    onClick={() => setSelectedRole(role.slug)}
                    className={`p-3 rounded-xl border text-xs font-medium transition-all flex flex-col items-center gap-2 ${
                      selectedRole === role.slug 
                      ? 'bg-blue-600 border-blue-600 text-white shadow-md' 
                      : 'bg-white border-slate-200 text-slate-600 hover:border-blue-500 hover:text-blue-500'
                    }`}
                  >
                    <span>{role.name}</span>
                  </button>
                ))}
              </div>
            </div>

            {error && (
              <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>
            )}

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 text-white rounded-2xl py-4 font-bold hover:bg-slate-800 transition-all flex items-center justify-center gap-3 group mt-4 shadow-xl shadow-slate-200"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : (
                <>
                  إنشاء الحساب
                  <ArrowRight className="w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                </>
              )}
            </button>
          </form>

          <p className="mt-8 text-center text-sm text-slate-500">
            لديك حساب بالفعل؟ <button onClick={() => navigate('/login')} className="text-blue-600 font-bold hover:underline">تسجيل الدخول</button>
          </p>
        </div>
      </motion.div>
    </div>
  );
};
