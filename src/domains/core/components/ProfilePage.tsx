import React from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, Shield, Building2, Calendar, MapPin, Camera, Star } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { profile } = useAuth();

  if (!profile) return null;

  return (
    <div className="max-w-4xl mx-auto p-6" dir="rtl">
      <div className="bg-white rounded-[2.5rem] border border-slate-200 overflow-hidden shadow-sm">
        <div className="h-48 bg-gradient-to-l from-blue-600 to-indigo-700 relative">
          <div className="absolute -bottom-16 right-10">
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
              <button className="absolute bottom-2 left-2 p-2 bg-white rounded-xl shadow-lg border border-slate-100 text-blue-600 hover:scale-110 transition-transform">
                <Camera size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="pt-20 p-10">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-3xl font-black text-slate-900 mb-1">{profile.displayName}</h1>
              <div className="flex flex-wrap gap-2">
                <div className="flex items-center gap-2 text-blue-600 font-bold text-sm bg-blue-50 py-1 px-3 rounded-lg w-fit">
                  <Shield size={14} />
                  {profile.role}
                </div>
                {profile.role === 'citizen' && (
                  <div className="flex items-center gap-2 text-emerald-600 font-bold text-sm bg-emerald-50 py-1 px-3 rounded-lg w-fit border border-emerald-100">
                    <Star size={14} className="fill-emerald-600" />
                    85 نقطة سمعة
                  </div>
                )}
              </div>
            </div>
            <button className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-sm font-bold hover:bg-slate-800 transition-all">
              تعديل الملف الشخصي
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">المعلومات الشخصية</h3>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400">
                  <Mail size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">البريد الإلكتروني</p>
                  <p className="text-sm font-bold text-slate-900">{profile.email || 'غير متوفر'}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400">
                  <Phone size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">رقم الهاتف</p>
                  <p className="text-sm font-bold text-slate-900" dir="ltr">{profile.phoneNumber || '+967 7xxxxxxx'}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">معلومات العمل</h3>
              
              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400">
                  <Building2 size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">القسم / الإدارة</p>
                  <p className="text-sm font-bold text-slate-900">{profile.departmentId || 'المواطنة الرقمية'}</p>
                </div>
              </div>

              <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center gap-4">
                <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm border border-slate-100 text-slate-400">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400">تاريخ الانضمام</p>
                  <p className="text-sm font-bold text-slate-900">مارس 2024</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
