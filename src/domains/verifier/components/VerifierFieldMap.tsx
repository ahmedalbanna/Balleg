import React from "react";
import VerifierMapView from "./VerifierMapView";
import { Search, MapPin, Navigation, Eye, Filter, Shield } from "lucide-react";

export const VerifierFieldMap: React.FC = () => {
    return (
        <div className="h-[calc(100vh-64px)] flex flex-col p-4 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase underline decoration-emerald-500 decoration-8 underline-offset-4">Field Intelligence</h1>
                    <p className="text-slate-500 font-medium text-sm mt-3">تتبع مباشر لعمليات التوثيق الميداني والمناطق الحرجة</p>
                </div>
                <div className="flex bg-white p-1.5 rounded-3xl border border-slate-100 shadow-xl grow max-w-lg">
                    <div className="flex items-center px-5">
                        <Search className="w-5 h-5 text-slate-400" />
                    </div>
                    <input 
                        className="bg-transparent border-none outline-none text-sm font-bold w-full p-3 placeholder:text-slate-300"
                        placeholder="ابحث عن منطقة أو إحداثيات أو نقطة توثيق..."
                    />
                    <button className="bg-slate-900 text-white px-8 py-3 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-emerald-600 transition-all">
                        LOCATE
                    </button>
                </div>
            </div>

            <div className="flex-1 rounded-[4rem] border-8 border-white shadow-2xl relative overflow-hidden bg-slate-50">
                <VerifierMapView points={[]} center={[15.3694, 44.191]} zoom={14} />
                
                <div className="absolute top-8 left-8 z-10 flex flex-col gap-4">
                    {[
                        { icon: MapPin, label: "Points of Interest", color: "text-blue-600" },
                        { icon: Shield, label: "Verified Zones", color: "text-emerald-600" },
                        { icon: Eye, label: "Active Observers", color: "text-orange-600" },
                    ].map((btn, i) => (
                        <button key={i} className="bg-white/95 backdrop-blur-md p-5 rounded-[2rem] shadow-2xl border border-white flex items-center gap-4 hover:scale-110 transition-transform group">
                             <btn.icon className={`w-6 h-6 ${btn.color} group-hover:rotate-12 transition-transform`} />
                             <span className="text-[10px] font-black uppercase text-slate-900 tracking-tighter">{btn.label}</span>
                        </button>
                    ))}
                </div>

                <div className="absolute bottom-8 right-8 z-10 w-96 bg-slate-900/90 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-10 text-white shadow-2xl space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <Navigation className="w-6 h-6 text-emerald-400" />
                            <h4 className="text-xs font-black uppercase italic tracking-widest">Active Verification</h4>
                        </div>
                        <span className="text-[10px] font-black bg-emerald-500 px-3 py-1 rounded-full">LIVE</span>
                    </div>
                    <div className="space-y-5">
                        <div className="p-5 bg-white/5 rounded-3xl border border-white/5">
                            <p className="text-[10px] font-black text-slate-400 uppercase mb-2">Selected Sector</p>
                            <p className="text-lg font-black italic">Sector 4-B (West Bank)</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <p className="text-[9px] font-black text-slate-500 uppercase">Status</p>
                                <p className="text-sm font-black text-emerald-400">Protected</p>
                            </div>
                            <div className="bg-white/5 p-4 rounded-2xl">
                                <p className="text-[9px] font-black text-slate-500 uppercase">Documents</p>
                                <p className="text-sm font-black">1.2k Files</p>
                            </div>
                        </div>
                    </div>
                    <button className="w-full bg-white text-slate-900 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-emerald-400 transition-colors">
                        View Detailed Data
                    </button>
                </div>
            </div>
        </div>
    );
};
