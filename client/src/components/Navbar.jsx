import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();

    // Navigation links array matching your routes perfectly
    const navLinks = [
        { name: 'Home', path: '/home' },
        { name: 'Find Doctors', path: '/doctors' },
        { name: 'Pharmacy Store', path: '/medicines' },
        { name: 'Emergency Support', path: '/emergency' },
        { name: 'Medical Blog', path: '/blog' },
        { name: 'Contact Us', path: '/contact' },
    ];

    // Helper function to check active route styling
    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white border-b border-gray-100 sticky top-0 z-50 backdrop-blur-md bg-white/90">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16 items-center">
                    
                    {/* Brand Logo */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link to="/home" className="flex items-center gap-2 group">
                            <div className="bg-teal-600 text-white p-2 rounded-xl group-hover:bg-teal-700 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                </svg>
                            </div>
                            <span className="text-lg font-black text-slate-900 tracking-tight">
                                AI<span className="text-teal-600">Health</span>
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex space-x-1 lg:space-x-4">
                        {navLinks.map((link) => (
                            <Link
                                key={link.path}
                                to={link.path}
                                className={`px-3 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                                    isActive(link.path)
                                        ? 'bg-teal-50 text-teal-700'
                                        : 'text-gray-500 hover:text-slate-900 hover:bg-gray-50'
                                }`}
                            >
                                {link.name}
                            </Link>
                        ))}
                    </div>

                    {/* Right Utilities (Cart + CTA Button) */}
                    <div className="hidden md:flex items-center gap-4">
                        {/* Shopping Cart Icon Link */}
                        <Link to="/checkout" className="p-2 text-gray-400 hover:text-teal-600 rounded-xl hover:bg-teal-50/50 transition-all relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                            {/* Simple operational dynamic active dot indication */}
                            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-teal-500"></span>
                        </Link>

                        <Link to="/login" className="bg-slate-900 hover:bg-black text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-all">
                            Account Portal
                        </Link>
                    </div>

                    {/* Mobile Hamburger Button */}
                    <div className="md:hidden flex items-center gap-2">
                        <Link to="/checkout" className="p-2 text-gray-500 relative">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                        </Link>
                        <button
                            onClick={() => setIsOpen(!isOpen)}
                            className="p-2 rounded-xl text-gray-500 hover:bg-gray-100 focus:outline-none"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Expandable Drawer Panel */}
            {isOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 px-4 pt-2 pb-4 space-y-1 shadow-inner animate-fadeIn">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-sm font-bold ${
                                isActive(link.path)
                                    ? 'bg-teal-50 text-teal-700'
                                    : 'text-gray-600 hover:bg-gray-50 hover:text-slate-900'
                            }`}
                        >
                            {link.name}
                        </Link>
                    ))}
                    <div className="pt-4 border-t border-gray-100 mt-2">
                        <Link
                            to="/login"
                            onClick={() => setIsOpen(false)}
                            className="w-full block text-center bg-teal-600 hover:bg-teal-700 text-white font-bold text-sm py-3 rounded-xl"
                        >
                            Account Portal
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;