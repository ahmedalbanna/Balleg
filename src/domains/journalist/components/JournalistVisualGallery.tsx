import React from "react";
import { motion } from "motion/react";
import { Image, Search, Filter, Camera, Video, Eye, Download, Trash2, Heart, Share2, Plus, Maximize2, Tag, Calendar } from "lucide-react";

export const JournalistVisualGallery: React.FC = () => {
    const galleryItems = [
        { id: "IMG-001", title: "مخيم النزوح في مأرب", type: "Photo", category: "Humanitarian", date: "اليوم", views: "٨٥٠", url: "https://images.unsplash.com/photo-1542273917363-3b1817f69a2d?q=80&w=400" },
        { id: "VID-001", title: "فيديو: القصف على الحديدة", type: "Video", category: "Conflict", date: "أمس", views: "٢,٤٠٠", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?q=80&w=400" },
        { id: "IMG-002", title: "توزيع المساعدات في تعز", type: "Photo", category: "Relief", date: "منذ يومين", views: "١,١٠٠", url: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=400" },
        { id: "IMG-003", title: "أطفال المدرسة في صنعاء", type: "Photo", category: "Social", date: "قبل أسبوع", views: "٩٢٠", url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?q=80&w=400" },
    ];

    return (
        <div className="p-4 md:p-8 space-y-12 animate-in fade-in duration-1000">
            <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-3xl font-black text-slate-800 tracking-tighter italic uppercase flex items-center gap-3">
                        <Image className="w-8 h-8 text-indigo-600" />
                        المعرض المرئي
                    </h2>
                    <p className="text-slate-500 font-bold italic">أرشفة الصور ومقاطع الفيديو الميدانية، إدارة حقوق النشر، والمعالجة البصرية الأولية</p>
                </div>
                <div className="flex gap-3">
                    <button className="flex items-center gap-3 px-6 py-4 bg-slate-900 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 transition-all shadow-xl shadow-slate-900/10 active:scale-95 leading-none">
                        <Plus className="w-4 h-4" />
                        رفع وسائط جديدة
                    </button>
                    <button className="flex items-center gap-3 px-6 py-4 bg-indigo-600 text-white rounded-[24px] font-black uppercase tracking-widest text-[10px] hover:bg-slate-900 transition-all shadow-xl shadow-indigo-500/20 active:scale-95 leading-none">
                        <Camera className="w-4 h-4" />
                        بدء جلسة تصوير
                    </button>
                </div>
            </header>

            <div className="bg-white rounded-[40px] border border-slate-100 shadow-xl overflow-hidden">
                <div className="p-10 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex gap-4">
                        <button className="px-6 py-3 bg-slate-900 text-white rounded-2xl text-[10px] font-black uppercase tracking-widest italic">الكل</button>
                        <button className="px-6 py-3 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-slate-100">الصور</button>
                        <button className="px-6 py-3 bg-slate-50 text-slate-400 rounded-2xl text-[10px] font-black uppercase tracking-widest italic hover:bg-slate-100">منوعات</button>
                    </div>
                    <div className="flex gap-4 flex-1 max-w-lg">
                        <div className="relative flex-1 group">
                             <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-600 transition-colors w-5 h-5" />
                             <input 
                                type="text" 
                                placeholder="البحث في الوسائط..."
                                className="w-full py-4 pr-16 pl-6 bg-slate-50 border-transparent rounded-[24px] focus:bg-white focus:ring-4 focus:ring-indigo-50 focus:border-indigo-200 outline-none transition-all font-medium italic"
                             />
                        </div>
                        <button className="p-4 bg-slate-50 rounded-2xl text-slate-400 hover:text-indigo-600 transition-all">
                            <Filter className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 p-10">
                    {galleryItems.map((item, i) => (
                        <motion.div 
                            key={i} 
                            whileHover={{ y: -8 }}
                            className="group relative bg-slate-50 rounded-[32px] overflow-hidden shadow-sm hover:shadow-2xl transition-all"
                        >
                            <div className="aspect-[4/5] relative">
                                <img referrerPolicy="no-referrer" src={item.url} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                     <div className="flex gap-2">
                                        <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all">
                                            <Download className="w-4 h-4" />
                                        </button>
                                        <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-white/20 transition-all">
                                            <Share2 className="w-4 h-4" />
                                        </button>
                                        <button className="p-3 bg-white/10 backdrop-blur-md rounded-xl text-white hover:bg-indigo-600 transition-all ml-auto">
                                            <Maximize2 className="w-4 h-4" />
                                        </button>
                                     </div>
                                </div>
                                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full flex items-center gap-2 shadow-xl">
                                    {item.type === 'Video' ? <Video className="w-3 h-3 text-indigo-600" /> : <Camera className="w-3 h-3 text-indigo-600" />}
                                    <span className="text-[8px] font-black uppercase text-slate-900 tracking-widest">{item.type}</span>
                                </div>
                            </div>
                            <div className="p-6">
                                <span className="text-[8px] font-black text-indigo-600 uppercase tracking-[0.2em] italic mb-1 block">{item.category}</span>
                                <h4 className="text-sm font-black text-slate-900 italic tracking-tighter uppercase leading-tight mb-4 group-hover:text-indigo-600 transition-colors">{item.title}</h4>
                                <div className="flex items-center justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest italic">
                                    <div className="flex items-center gap-1.5 font-mono">
                                        <Eye className="w-3 h-3" />
                                        {item.views}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar className="w-3 h-3" />
                                        {item.date}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
                
                <div className="p-10 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
                    <button className="px-12 py-5 bg-white border border-slate-200 rounded-[24px] text-[10px] font-black uppercase tracking-[0.3em] text-slate-400 hover:bg-slate-900 hover:text-white hover:border-slate-900 transition-all shadow-sm">
                        تحميل المزيد من الوسائط
                    </button>
                </div>
            </div>
        </div>
    );
};
