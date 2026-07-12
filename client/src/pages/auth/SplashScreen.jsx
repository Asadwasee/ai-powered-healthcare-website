import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function SplashScreen() {
  const navigate = useNavigate();

  useEffect(() => {
    // 3 seconds ke baad automatically home page par navigate karega
    const timer = setTimeout(() => {
      navigate("/home");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      
      {/* Brand Logo & Icon Container */}
      <div className="flex flex-col items-center gap-4 mb-4">
        
        {/* Actual Brand SVG Icon (Scaled up beautifully for Splash Screen) */}
        <div className="bg-teal-600 text-white p-4 rounded-2xl shadow-lg shadow-teal-100 animate-pulse">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-10 w-10" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            strokeWidth={2.5}
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" 
            />
          </svg>
        </div>

        {/* Exact Brand Text Matching Your Navbar Styling */}
        <span className="text-4xl font-black text-slate-900 tracking-tight mt-2">
          AI<span className="text-teal-600">Health</span>
        </span>
      </div>

      {/* Tagline */}
      <p className="text-gray-500 font-medium tracking-wide">
        Your Healthcare Companion
      </p>

      {/* Matching Teal Loader */}
      <div className="mt-8">
        <div className="w-8 h-8 border-4 border-teal-600 border-t-transparent rounded-full animate-spin"></div>
      </div>

    </div>
  );
}

export default SplashScreen;