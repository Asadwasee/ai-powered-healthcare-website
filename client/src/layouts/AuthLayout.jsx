import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-linear-to-tr from-blue-50 to-teal-50 px-4">
      <div className="max-w-md w-full bg-white p-8 rounded-2xl shadow-xl border border-gray-100 animate-zoom-in">
        <Outlet />
      </div>
    </div>
  );
};
export default AuthLayout;