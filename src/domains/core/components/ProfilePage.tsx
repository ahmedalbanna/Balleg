import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Building2, Calendar, MapPin, Camera, Star, LogOut, Settings, Bell, ChevronRight, Save } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useRole } from '../context/RoleContext';
import { cn } from '../utils/cn';
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { toast } from 'sonner';

export const ProfilePage: React.FC = () => {
  const { profile, signOut, refreshProfile } = useAuth();
  const { currentRole } = useRole();
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedNeighborhood, setSelectedNeighborhood] = useState(profile?.neighborhood || "حي الصافية");

  if (!profile) return null;

  const handleUpdateNeighborhood = async () => {
    setIsUpdating(true);
    try {
      const userRef = doc(db, 'users', profile.uid);
      await updateDoc(userRef, {
        neighborhood: selectedNeighborhood
      });
      await refreshProfile();
      toast.success("تم تحديث الحي بنجاح");
    } catch (error) {
      console.error(error);
      toast.error("فشل تحديث البيانات");
    } finally {
      setIsUpdating(false);
    }
  };

  const themeColor = currentRole?.themeColor || '#3b82f6';

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-6" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[2rem] md:rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm"
      >
        {/* Cover Header */}
        <div 
          className="h-40 md:h-48 relative transition-colors duration-500"
          style={{ 
            background: `linear-gradient(to left, ${themeColor}, ${themeColor}dd)` 
          }}
        >
          <div className="absolute -bottom-16 right-1/2 translate-x-1/2 md:translate-x-0 md:right-10">
            <div className="relative group">
              <div className="w-32 h-32 rounded-3xl bg-white p-1 shadow-xl">
                 <div className="w-full h-full rounded-[1.25rem] bg-slate-100 flex items-center justify-center overflow-hidden">
                  {profile.profileImageUrl ? (
                    <img src={profile.profileImageUrl} alt="" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-12 h-12 text-slate-300" />
                  )}
                </div>
              </div>
              <button 
                className="absolute bottom-2 left-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 transition-transform active:scale-90"
                style={{ color: themeColor }}
              >
                <Camera size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Profile Content */}
        <div className="pt-20 p-6 md:p-10">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-10 text-center md:text-right">
            <div className="mb-6 md:mb-0">
              <h1 className="text-2xl md:text-3xl font-black text-slate-900 mb-2">{profile.displayName}</h1>
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                <div 
                  className="flex items-center gap-2 font-bold text-xs md:text-sm py-1.5 px-3 rounded-xl w-fit"
                  style={{ backgroundColor: `${themeColor}10`, color: themeColor }}
                >
                  <Shield size={14} />
                  {currentRole?.name || profile.role}
                </div>
                {profile.role === 'citizen' && (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs md:text-sm bg-emerald-50 py-1.5 px-3 rounded-xl w-fit border border-emerald-100">
                    <Star size={14} className="fill-emerald-600" />
                    85 نقطة سمعة
                  </div>
                )}
              </div>
            </div>
            <div className="flex gap-3 w-full md:w-auto">
              <button 
                className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl text-sm font-bold hover:bg-slate-800 transition-all active:scale-95 shadow-lg shadow-slate-900/10"
              >
                تعديل الحساب
              </button>
              <button 
                onClick={() => signOut()}
                className="px-4 py-3 bg-red-50 text-red-600 rounded-2xl text-sm font-bold hover:bg-red-100 transition-all active:scale-95 border border-red-100 flex items-center gap-2"
              >
                <LogOut size={18} />
                <span className="hidden sm:inline">خروج</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">المعلومات الأساسية</h3>
                <Settings size={14} className="text-slate-300" />
              </div>
              
              <div className="group p-4 bg-slate-50 hover:bg-white transition-all rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-md hover:shadow-slate-200/50">
                <div 
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 transition-colors"
                  style={{ color: themeColor }}
                >
                  <Mail size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 mb-0.5">البريد الإلكتروني</p>
                  <p className="text-sm font-bold text-slate-900 truncate max-w-[200px]">{profile.email || 'غير متوفر'}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </div>

              <div className="group p-4 bg-slate-50 hover:bg-white transition-all rounded-2xl border border-slate-100 flex items-center gap-4 hover:shadow-md hover:shadow-slate-200/50">
                <div 
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 transition-colors"
                  style={{ color: themeColor }}
                >
                  <Phone size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 mb-0.5">رقم الهاتف</p>
                  <p className="text-sm font-bold text-slate-900" dir="ltr">{profile.phoneNumber || '+967 7xxxxxxx'}</p>
                </div>
                <ChevronRight size={14} className="text-slate-300" />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between px-1">
                <h3 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">تفاصيل العمل</h3>
                <Building2 size={14} className="text-slate-300" />
              </div>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div 
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 transition-colors"
                  style={{ color: themeColor }}
                >
                  <MapPin size={20} />
                </div>
                <div className="flex-1">
                  <p className="text-[10px] font-bold text-slate-400 mb-0.5">المنطقة / الحي المتابع</p>
                  {profile.role === 'neighborhood' ? (
                    <div className="flex gap-2">
                       <select 
                        value={selectedNeighborhood}
                        onChange={(e) => setSelectedNeighborhood(e.target.value)}
                        className="bg-white border border-slate-200 rounded-lg text-xs font-bold p-1 px-2 outline-none"
                       >
                          <option value="حي الصافية">حي الصافية</option>
                          <option value="حي النزهة">حي النزهة</option>
                          <option value="حي الروضة">حي الروضة</option>
                          <option value="حي الملز">حي الملز</option>
                          <option value="حي العليا">حي العليا</option>
                       </select>
                       <button 
                        onClick={handleUpdateNeighborhood}
                        disabled={isUpdating || selectedNeighborhood === profile.neighborhood}
                        className="p-1 px-2 bg-slate-900 text-white rounded-lg text-[10px] font-black disabled:opacity-30 transition-all hover:bg-slate-800"
                       >
                         {isUpdating ? "..." : "حفظ"}
                       </button>
                    </div>
                  ) : (
                    <p className="text-sm font-bold text-slate-900">{profile.neighborhood || profile.departmentId || 'المقر الرئيسي'}</p>
                  )}
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div 
                  className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 transition-colors"
                  style={{ color: themeColor }}
                >
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 mb-0.5">تاريخ الانضمام</p>
                  <p className="text-sm font-bold text-slate-900">مارس 2024</p>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 pt-10 border-t border-slate-100 flex items-center justify-center">
            <button 
              onClick={() => signOut()}
              className="md:hidden flex items-center gap-3 text-red-500 font-bold text-sm bg-red-50/50 px-8 py-4 rounded-3xl active:scale-95 transition-all w-full"
            >
              <LogOut size={20} />
              تسجيل الخروج من المنظومة
            </button>
            <p className="hidden md:block text-[11px] text-slate-400 font-medium">
              سياسة الخصوصية • شروط الاستخدام • نسخة ٢.٤.٠
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
