function SplashScreen() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 to-teal-50">
      
      {/* Logo */}
      <div className="w-24 h-24 rounded-full bg-white shadow-lg flex items-center justify-center mb-6 text-primary">
        Logo
      </div>

      {/* App Name */}
      <h1 className="text-3xl font-bold text-center text-gray-800 text-primary">
        AI-Powered Healthcare Website
      </h1>

      {/* Tagline */}
      <p className="text-gray-500 mt-2 text-gray-500">
        Your Healthcare Companion
      </p>

      {/* Loader */}
      <div className="mt-8">
        <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin "></div>
      </div>

    </div>
  );
}

export default SplashScreen;