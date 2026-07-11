import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const navigate = useNavigate();
    const [symptomInput, setSymptomInput] = useState('');
    const [featuredMeds, setFeaturedMeds] = useState([]);
    const [loadingMeds, setLoadingMeds] = useState(true);

    // Fetch only top 3 medicines from your existing backend for the Featured section
    useEffect(() => {
        const fetchFeaturedMedicines = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/medicines');
                if (response.data.success) {
                    // Taking first 3 items for home display
                    setFeaturedMeds(response.data.data.slice(0, 3));
                }
            } catch (err) {
                console.error('Failed to fetch featured supplies:', err);
            } finally {
                setLoadingMeds(false);
            }
        };
        fetchFeaturedMedicines();
    }, []);

    // Handle Quick AI Symptom Redirect
    const handleSymptomSubmit = (e) => {
        e.preventDefault();
        if (symptomInput.trim()) {
            // Passing the text to AI consultant page via state route parameters
            navigate('/ai-consultant', { state: { query: symptomInput } });
        }
    };

    return (
        <div className="bg-gray-50/50 min-h-screen text-gray-800 antialiased font-sans">
            
            {/* --- 1. HERO SECTION --- */}
            <header className="relative bg-white border-b border-gray-100 overflow-hidden py-16 lg:py-24">
                <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-teal-400/10 to-transparent rounded-full blur-3xl pointer-events-none"></div>
                <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-slate-200/40 to-transparent rounded-full blur-3xl pointer-events-none"></div>

                <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
                    <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 bg-teal-50 text-teal-700 px-4 py-1.5 rounded-full text-xs font-bold tracking-wide uppercase border border-teal-100/60">
                            <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                            Next-Generation Clinical Ecosystem
                        </div>
                        
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-slate-900 tracking-tight leading-none">
                            Intelligence Meets <br />
                            <span className="text-teal-600 bg-gradient-to-r from-teal-600 to-teal-500 bg-clip-text text-transparent">Healthcare Delivery</span>
                        </h1>
                        
                        <p className="text-gray-600 text-base md:text-lg max-w-xl mx-auto lg:mx-0 leading-relaxed">
                            Experience automated pharmaceutical dispatches, live practitioner scheduling, and rapid clinical diagnostic insights powered by modern artificial intelligence.
                        </p>

                        {/* --- 2. NEW: AI SYMPTOM CHECKER WIDGET --- */}
                        <form onSubmit={handleSymptomSubmit} className="max-w-xl mx-auto lg:mx-0 bg-white p-2 rounded-2xl shadow-md border border-gray-100 flex gap-2 items-center mt-4">
                            <div className="pl-3 text-teal-500">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                                </svg>
                            </div>
                            <input 
                                type="text" 
                                value={symptomInput}
                                onChange={(e) => setSymptomInput(e.target.value)}
                                placeholder="Describe symptoms (e.g., Mild fever, chronic headache)..."
                                className="flex-1 bg-transparent py-2 text-sm text-gray-800 focus:outline-none placeholder-gray-400"
                            />
                            <button type="submit" className="bg-teal-600 hover:bg-teal-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl transition-all shadow-xs shrink-0">
                                Analyze Now
                            </button>
                        </form>
                    </div>

                    {/* Right Card Panel Graphic */}
                    <div className="lg:col-span-5 relative hidden lg:block">
                        <div className="bg-gradient-to-tr from-slate-900 to-slate-800 rounded-3xl p-8 text-white shadow-2xl border border-slate-700/50 space-y-8 relative overflow-hidden">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <span className="text-[10px] font-bold text-teal-400 tracking-widest uppercase">Smart Core Engine</span>
                                    <h3 className="text-xl font-bold tracking-tight">AI Health Vital Metrics</h3>
                                </div>
                                <div className="bg-white/10 p-2 rounded-xl"><span className="block w-2 h-2 rounded-full bg-teal-400"></span></div>
                            </div>
                            <div className="space-y-3">
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                                    <span className="text-slate-300">Neural Diagnosis Output</span>
                                    <span className="font-mono font-bold text-teal-400">Stable (0.02s)</span>
                                </div>
                                <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex justify-between items-center text-xs">
                                    <span className="text-slate-300">Active Laboratory Nodes</span>
                                    <span className="font-mono font-bold text-teal-400">Online</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </header>

            {/* --- 3. NEW: HOW IT WORKS SECTION --- */}
            <section className="bg-white border-b border-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
                        <h2 className="text-xs font-bold text-teal-600 tracking-widest uppercase">Simple Workflow</h2>
                        <p className="text-3xl font-extrabold text-slate-950 tracking-tight">How The Platform Protects You</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
                        {/* Step 1 */}
                        <div className="text-center space-y-4 relative">
                            <div className="w-12 h-12 mx-auto bg-teal-50 text-teal-600 border border-teal-100 rounded-2xl flex items-center justify-center font-black text-lg shadow-xs">1</div>
                            <h3 className="font-bold text-slate-900 text-lg">AI Smart Analysis</h3>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">Input your medical data or symptoms into our trained neural pipeline for an instant health report.</p>
                        </div>
                        {/* Step 2 */}
                        <div className="text-center space-y-4 relative">
                            <div className="w-12 h-12 mx-auto bg-teal-50 text-teal-600 border border-teal-100 rounded-2xl flex items-center justify-center font-black text-lg shadow-xs">2</div>
                            <h3 className="font-bold text-slate-900 text-lg">Physician Match</h3>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">Connect seamlessly with qualified consultants and schedule appointments for detailed diagnosis.</p>
                        </div>
                        {/* Step 3 */}
                        <div className="text-center space-y-4 relative">
                            <div className="w-12 h-12 mx-auto bg-teal-50 text-teal-600 border border-teal-100 rounded-2xl flex items-center justify-center font-black text-lg shadow-xs">3</div>
                            <h3 className="font-bold text-slate-900 text-lg">Doorstep Pharmacy</h3>
                            <p className="text-sm text-gray-500 max-w-xs mx-auto leading-relaxed">Get validated clinical supplies and essential items packed securely and dispatched to your exact location.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 4. CORE SERVICES SECTION --- */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center max-w-2xl mx-auto space-y-2 mb-16">
                    <h2 className="text-xs font-bold text-teal-600 tracking-widest uppercase">Integrated Platform Modules</h2>
                    <p className="text-3xl font-extrabold text-slate-950 tracking-tight">Everything Required For Automated Medical Management</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Block 1 */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all">
                        <div className="space-y-4">
                            <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">AI Smart Health Assistant</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Analyze your medical symptoms instantly using our trained deep learning models and natural language agents.</p>
                        </div>
                        <Link to="/ai-consultant" className="mt-6 w-full text-center bg-gray-50 group-hover:bg-teal-600 group-hover:text-white font-bold text-xs py-3 rounded-xl transition-all">Start AI Screening →</Link>
                    </div>
                    {/* Block 2 */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all">
                        <div className="space-y-4">
                            <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Find Expert Doctors</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Connect seamlessly with verified healthcare professionals, specialists, and clinicians for clinical sessions.</p>
                        </div>
                        <Link to="/doctors" className="mt-6 w-full text-center bg-gray-50 group-hover:bg-teal-600 group-hover:text-white font-bold text-xs py-3 rounded-xl transition-all">Book Appointment →</Link>
                    </div>
                    {/* Block 3 */}
                    <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-col justify-between group shadow-xs hover:shadow-md transition-all">
                        <div className="space-y-4">
                            <div className="bg-slate-50 w-12 h-12 rounded-xl flex items-center justify-center text-teal-600 group-hover:bg-teal-50 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}><g transform="rotate(-45 12 12)"><rect x="4" y="8" width="16" height="8" rx="4" /><line x1="12" y1="8" x2="12" y2="16" /></g></svg>
                            </div>
                            <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-600 transition-colors">Digital Pharmacy Store</h3>
                            <p className="text-sm text-gray-500 leading-relaxed">Order critical clinical supplies, tablets, or gelatin capsules securely with real-time stock parameters.</p>
                        </div>
                        <Link to="/medicines" className="mt-6 w-full text-center bg-gray-50 group-hover:bg-teal-600 group-hover:text-white font-bold text-xs py-3 rounded-xl transition-all">Browse Catalog →</Link>
                    </div>
                </div>
            </section>

            {/* --- 5. NEW: DYNAMIC FEATURED MEDICINES SECTION --- */}
            <section className="bg-white border-t border-b border-gray-100 py-20">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-end mb-12 gap-4">
                        <div className="space-y-2 text-center sm:text-left">
                            <h2 className="text-xs font-bold text-teal-600 tracking-widest uppercase">Pharmacy Essentials</h2>
                            <p className="text-3xl font-extrabold text-slate-950 tracking-tight">Top Dispatched Clinical Products</p>
                        </div>
                        <Link to="/medicines" className="text-sm font-bold text-teal-600 hover:text-teal-700 mx-auto sm:mx-0 shrink-0">View Full Catalog →</Link>
                    </div>

                    {loadingMeds ? (
                        <div className="text-center py-12 text-gray-400 font-medium text-sm">Loading featured medical catalog items...</div>
                    ) : featuredMeds.length === 0 ? (
                        <div className="text-center py-12 text-gray-400 border border-dashed rounded-2xl text-sm">No items configured in the database inventory yet.</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {featuredMeds.map((med) => (
                                <div key={med._id} className="bg-gray-50/40 rounded-2xl border border-gray-100 p-5 flex flex-col justify-between hover:shadow-xs transition-all group">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="text-[10px] font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded-full uppercase tracking-wider">{med.category}</span>
                                            <span className="text-sm font-mono font-black text-slate-950">Rs.{med.price}</span>
                                        </div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-teal-600 transition-colors line-clamp-1">{med.name}</h3>
                                        <p className="text-[11px] text-gray-400 font-medium mb-2">By {med.manufacturer}</p>
                                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{med.description}</p>
                                    </div>
                                    <Link to={`/medicines/${med._id}`} className="mt-5 w-full text-center bg-white border border-gray-200 hover:bg-gray-50 text-slate-700 font-bold text-xs py-2.5 rounded-xl transition-colors">View Product Details</Link>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* --- 6. NEW: PATIENT TESTIMONIALS --- */}
            <section className="max-w-7xl mx-auto px-4 py-20">
                <div className="text-center max-w-xl mx-auto space-y-2 mb-16">
                    <h2 className="text-xs font-bold text-teal-600 tracking-widest uppercase">Platform Reviews</h2>
                    <p className="text-3xl font-extrabold text-slate-950 tracking-tight">Trusted By Hundreds Of Active Patients</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4 shadow-2xs">
                        <p className="text-xs text-gray-500 leading-relaxed italic">"AI symptom screening feature bohot fast aur accurate response deta hai. Doctors se directly connect hona aur appointment schedule karna is platform par intehai aasan hai."</p>
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                            <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">AW</div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-900">Asad Waseem</h4>
                                <p className="text-[10px] text-gray-400">Verified Platform User</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4 shadow-2xs">
                        <p className="text-xs text-gray-500 leading-relaxed italic">"Medicine dispatch network bohot solid hai. Subah capsule aur syrup order kiye thay, real-time tracking ke saath sham tak parcel safely deliver ho gaya."</p>
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                            <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">UM</div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-900">Usama Khan</h4>
                                <p className="text-[10px] text-gray-400">Regular Patient</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-2xl p-6 border border-gray-100 space-y-4 shadow-2xs">
                        <p className="text-xs text-gray-500 leading-relaxed italic">"Clean design layouts and responsive features. The medical history management layer makes tracking clinical parameters exceptionally comfortable."</p>
                        <div className="flex items-center gap-3 pt-2 border-t border-gray-50">
                            <div className="w-8 h-8 rounded-full bg-slate-100 font-bold text-xs flex items-center justify-center text-slate-700">AH</div>
                            <div>
                                <h4 className="text-xs font-bold text-slate-900">Ahsan Raza</h4>
                                <p className="text-[10px] text-gray-400">Clinical Client</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* --- 7. PLATFORM NUMERICS --- */}
            <section className="bg-slate-900 text-white relative overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
                    <div className="space-y-1">
                        <div className="text-3xl md:text-4xl font-black text-teal-400 font-mono tracking-tight">99%</div>
                        <div className="text-xs font-semibold text-slate-400 tracking-wide uppercase">AI Diagnostic Accuracy</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl md:text-4xl font-black text-teal-400 font-mono tracking-tight">500+</div>
                        <div className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Certified Doctors</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl md:text-4xl font-black text-teal-400 font-mono tracking-tight">10k+</div>
                        <div className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Medicines Dispatched</div>
                    </div>
                    <div className="space-y-1">
                        <div className="text-3xl md:text-4xl font-black text-teal-400 font-mono tracking-tight">24/7</div>
                        <div className="text-xs font-semibold text-slate-400 tracking-wide uppercase">Virtual AI Support</div>
                    </div>
                </div>
            </section>

            {/* --- 8. FOOTER --- */}
            <footer className="bg-white border-t border-gray-100 py-8 text-center text-xs text-gray-400 font-medium tracking-wide">
                &copy; {new Date().getFullYear()} AI Healthcare Platform. All System Diagnostics Encrypted.
            </footer>
        </div>
    );
};

export default Home;