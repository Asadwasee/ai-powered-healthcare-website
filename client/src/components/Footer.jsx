import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 font-sans antialiased">
            
            {/* --- Main Footer Links Grid --- */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                
                {/* Column 1: Brand Logo & Mission */}
                <div className="space-y-4">
                    <Link to="/home" className="flex items-center gap-2 group">
                        <div className="bg-teal-600 text-white p-2 rounded-xl group-hover:bg-teal-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                            </svg>
                        </div>
                        <span className="text-lg font-black text-white tracking-tight">
                            AI<span className="text-teal-400">Health</span>
                        </span>
                    </Link>
                    <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
                        Next-generation clinical solutions connecting dynamic full-stack architecture with medical diagnostics. Empowering patient support ecosystems round the clock.
                    </p>
                    {/* Social Icons Placeholder */}
                    <div className="flex gap-3 pt-2">
                        <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-xs text-slate-400 hover:text-teal-400 transition-colors cursor-pointer">In</span>
                        <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-xs text-slate-400 hover:text-teal-400 transition-colors cursor-pointer">Git</span>
                        <span className="w-8 h-8 rounded-xl bg-slate-800 border border-slate-700/50 flex items-center justify-center text-xs text-slate-400 hover:text-teal-400 transition-colors cursor-pointer">X</span>
                    </div>
                </div>

                {/* Column 2: Navigation Hub */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest">Navigation</h3>
                    <ul className="space-y-2.5 text-xs font-semibold">
                        <li><Link to="/home" className="hover:text-white transition-colors">Home Dashboard</Link></li>
                        <li><Link to="/doctors" className="hover:text-white transition-colors">Find Expert Doctors</Link></li>
                        <li><Link to="/medicines" className="hover:text-white transition-colors">Digital Pharmacy</Link></li>
                        <li><Link to="/blog" className="hover:text-white transition-colors">Medical Articles & Blog</Link></li>
                    </ul>
                </div>

                {/* Column 3: Platform Modules */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest">Core Features</h3>
                    <ul className="space-y-2.5 text-xs font-semibold">
                        <li><Link to="/ai-consultant" className="hover:text-white transition-colors">AI Symptom Screening</Link></li>
                        <li><Link to="/emergency" className="hover:text-white transition-colors">Emergency Quick Action</Link></li>
                        <li><Link to="/checkout" className="hover:text-white transition-colors">Cart & Logistics Management</Link></li>
                        <li><Link to="/contact" className="hover:text-white transition-colors">Support & Help Desk</Link></li>
                    </ul>
                </div>

                {/* Column 4: Contact & Support */}
                <div className="space-y-4">
                    <h3 className="text-xs font-bold text-teal-400 uppercase tracking-widest">Contact Info</h3>
                    <ul className="space-y-3 text-xs text-slate-400">
                        <li className="flex items-start gap-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-400 shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                            <span>Lahore Development Region, Punjab, Pakistan</span>
                        </li>
                        <li className="flex items-center gap-2.5">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-teal-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            <span>support@aihealthcare.com</span>
                        </li>
                    </ul>
                </div>

            </div>

            {/* --- Bottom Copyright Bar --- */}
            <div className="bg-slate-950 text-slate-500 py-6 border-t border-slate-900/60">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-[11px] font-medium tracking-wide">
                    <div>
                        &copy; {new Date().getFullYear()} AIHealth Portal. All medical diagnostic systems encrypted.
                    </div>
                    <div className="flex gap-6">
                        <span className="hover:text-slate-400 cursor-pointer">Privacy Protocol</span>
                        <span className="hover:text-slate-400 cursor-pointer">Terms of Operation</span>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;