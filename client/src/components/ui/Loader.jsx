export const Loader = () => (
  <div className="fixed inset-0 bg-white/80 backdrop-blur-md flex flex-col items-center justify-center z-50 animate-fade-in">
    <div className="w-12 h-12 border-4 border-gray-100 border-t-primary rounded-full animate-spin"></div>
    <span className="text-sm font-medium text-primary mt-3 tracking-wide">Please wait...</span>
  </div>
);