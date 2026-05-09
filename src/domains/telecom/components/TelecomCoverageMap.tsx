import React from "react";
import TelecomMapView from "./TelecomMapView";
import { Search, Filter, Signal, Layers, MapPin, Radio } from "lucide-react";

export const TelecomCoverageMap: React.FC = () => {
    return (
        <div className="h-[calc(100vh-64px)] flex flex-col p-4 md:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                <h1 className="text-3xl font-black text-slate-900 tracking-tighter italic uppercase">Coverage Intelligence</h1>
                <p className="text-slate-500 font-medium text-sm mt-1">تحليل نطاقات التغطية وجودة الإشارة بالزمن الحقيقي</p>
                </div>
                <div className="flex bg-white p-1.5 rounded-3xl border border-slate-100 shadow-sm grow max-w-md">
                    <div className="flex items-center px-4">
                        <Search className="w-4 h-4 text-slate-400" />
                    </div>
                    <input 
                        className="bg-transparent border-none outline-none text-sm font-bold w-full p-2 placeholder:text-slate-300"
                        placeholder="ابحث عن مدينة، منطقة، أو موقع برج..."
                    />
                    <button className="bg-slate-900 text-white px-6 py-2 rounded-2xl text-[10px] font-black uppercase italic tracking-widest hover:bg-blue-600 transition-colors">
                        GO
                    </button>
                </div>
            </div>

            <div className="flex-1 rounded-[3rem] border border-slate-100 shadow-2xl relative overflow-hidden bg-white">
                <TelecomMapView points={[]} center={[15.3694, 44.191]} zoom={12} />
                
                <div className="absolute top-6 left-6 z-10 flex flex-col gap-3">
                    {[
                        { icon: Signal, label: "5G Coverage", color: "text-blue-600" },
                        { icon: Radio, label: "LTE Towers", color: "text-indigo-600" },
                        { icon: Layers, label: "Heatmap", color: "text-rose-600" },
                    ].map((btn, i) => (
                        <button key={i} className="bg-white/90 backdrop-blur-md p-4 rounded-3xl shadow-xl border border-white flex items-center gap-3 hover:scale-105 transition-transform">
                             <btn.icon className={`w-5 h-5 ${btn.color}`} />
                             <span className="text-[10px] font-black uppercase text-slate-900">{btn.label}</span>
                        </button>
                    ))}
                </div>

                <div className="absolute bottom-6 right-6 z-10 w-80 bg-white/90 backdrop-blur-xl border border-white rounded-[2.5rem] p-6 shadow-2xl space-y-4">
                    <div className="flex items-center justify-between">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Selected Region Status</h4>
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    </div>
                    <div className="space-y-4 font-bold text-slate-900">
                        <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                             <span className="text-[11px] text-slate-400">Current Load</span>
                             <span className="text-lg">84 MB/s</span>
                        </div>
                        <div className="flex justify-between items-end border-b border-slate-100 pb-2">
                             <span className="text-[11px] text-slate-400">Avg. Latency</span>
                             <span className="text-lg">24ms</span>
                        </div>
                        <div className="flex justify-between items-end">
                             <span className="text-[11px] text-slate-400">Total Users</span>
                             <span className="text-lg">12,402</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
