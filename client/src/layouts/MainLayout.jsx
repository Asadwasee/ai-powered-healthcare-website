import { Outlet } from 'react-router-dom';
// Yahan Navbar aur Footer components import honge
const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-slate-50/50">
      <nav className="h-16 border-b border-gray-100 bg-white sticky top-0 z-40">Navbar Placeholder</nav>
      <main className="grow max-w-7xl w-full mx-auto px-4 py-6">
        <Outlet /> {/* Child pages yahan render honge */}
      </main>
      <footer className="bg-slate-900 text-white p-8">Footer Placeholder</footer>
    </div>
  );
};
export default MainLayout;