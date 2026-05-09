import React from "react";
import { motion } from "motion/react";
import { Handshake, Search, Filter, Globe, MapPin, ExternalLink, ShieldCheck, Star, Users, Building2, Briefcase } from "lucide-react";

export const DonorPartners: React.FC = () => {
  const partners = [
    { name: "منظمة الإغاثة العالمية", type: "شريك استراتيجي", location: "صنعاء، اليمن", impact: "+١٠٠ ألف مستفيد", logo: "https://images.unsplash.com/photo-1599305090748-3663bc648841?auto=format&fit=crop&q=80&w=200" },
    { name: "مؤسسة يمن الخير", type: "شريك تنفيذ", location: "عدن، اليمن", impact: "٥٠ مشروع تعليمي", logo: "https://images.unsplash.com/photo-1599305090748-3663bc648841?auto=format&fit=crop&q=80&w=200" },
    { name: "الجمعية الطبية اليمنية", type: "شريك طبي", location: "تعز، اليمن", impact: "١٥ عيادة متنقلة", logo: "https://images.unsplash.com/photo-1599305090748-3663bc648841?auto=format&fit=crop&q=80&w=200" },
    { name: "بنك الأمل للتمويل", type: "شريك مالي", location: "حضرموت، اليمن", impact: "تمكين ٢٠٠٠ أسرة", logo: "https://images.unsplash.com/photo-1599305090748-3663bc648841?auto=format&fit=crop&q=80&w=200" },
  ];

  return (
    <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-800">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
            <Handshake className="w-8 h-8 text-amber-600" />
            شركاء العطاء
          </h2>
          <p className="text-slate-500 font-bold italic">شبكة من المنظمات والمؤسسات الموثوقة التي تضمن وصول تبرعاتك لمستحقيها بأعلى معايير الجودة والشفافية</p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
           {[
               { label: 'إجمالي الشركاء', val: '٥٤', color: 'amber', icon: Building2 },
               { label: 'شركاء التنفيذ', val: '٣٨', color: 'blue', icon: Briefcase },
               { label: 'منظمات دولية', val: '١٢', color: 'emerald', icon: Globe },
               { label: 'الموثوقية', val: '١٠٠٪', color: 'indigo', icon: ShieldCheck },
           ].map((stat, i) => (
                <div key={i} className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-sm flex items-center justify-between group hover:shadow-xl transition-all">
                    <div>
                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">{stat.label}</span>
                        <h3 className="text-3xl font-black text-slate-900 mt-1 font-mono tracking-tighter">{stat.val}</h3>
                    </div>
                    <div className={`w-14 h-14 rounded-2xl bg-${stat.color}-50 text-${stat.color}-600 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-7 h-7" />
                    </div>
                </div>
           ))}
      </div>

      <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
        <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="relative flex-1 group">
                 <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-amber-600 transition-colors w-5 h-5" />
                 <input 
                    type="text" 
                    placeholder="البحث في قائمة الشركاء الموثوقين..." 
                    className="w-full py-5 pr-16 pl-8 bg-slate-50 border-transparent rounded-[30px] focus:bg-white focus:ring-4 focus:ring-amber-50 focus:border-amber-200 outline-none transition-all font-medium italic"
                 />
            </div>
            <button className="p-5 bg-slate-50 rounded-[24px] text-slate-400 hover:text-amber-600 transition-all">
                <Filter className="w-6 h-6" />
            </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-10">
            {partners.map((partner, i) => (
                <motion.div 
                    key={i}
                    whileHover={{ scale: 1.02 }}
                    className="p-8 bg-white rounded-[40px] border border-slate-100 shadow-sm hover:shadow-2xl transition-all flex flex-col lg:flex-row items-center gap-8 relative group"
                >
                    <div className="w-32 h-32 rounded-[32px] bg-slate-50 border border-slate-100 overflow-hidden shrink-0 flex items-center justify-center p-4 group-hover:bg-amber-50 transition-colors">
                         <img referrerPolicy="no-referrer" src={partner.logo} alt={partner.name} className="max-w-full grayscale group-hover:grayscale-0 transition-all opacity-50 group-hover:opacity-100 scale-90 group-hover:scale-100" />
                    </div>
                    <div className="flex-1 text-center lg:text-right space-y-3">
                         <div className="flex flex-col lg:flex-row lg:items-center gap-3">
                            <h4 className="text-2xl font-black text-slate-900 group-hover:text-amber-600 transition-colors italic tracking-tight uppercase leading-none">{partner.name}</h4>
                            <span className="text-[8px] font-black px-2 py-1 bg-amber-50 text-amber-600 rounded uppercase tracking-widest mx-auto lg:mx-0 shrink-0">
                                {partner.type}
                            </span>
                         </div>
                         <div className="flex flex-wrap justify-center lg:justify-start gap-4">
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                <MapPin className="w-4 h-4 text-amber-400" />
                                {partner.location}
                            </div>
                            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 italic">
                                <Star className="w-4 h-4 text-amber-400" />
                                {partner.impact}
                            </div>
                         </div>
                    </div>
                    <button className="p-4 bg-slate-50 rounded-2xl text-slate-300 hover:text-amber-600 hover:bg-white hover:shadow-lg transition-all absolute top-6 left-6 lg:static">
                        <ExternalLink className="w-5 h-5" />
                    </button>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};
