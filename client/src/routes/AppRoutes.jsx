import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Pages imports
import SplashScreen from '../pages/auth/SplashScreen';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Home from '../pages/main/Home';
import Doctors from '../pages/main/Doctors';
import DoctorDetails from '../pages/main/DoctorDetails';
import AppointmentBooking from '../pages/main/AppointmentBooking';
import Emergency from '../pages/main/Emergency';
import Blog from '../pages/main/Blog';
import BlogDetails from '../pages/main/BlogDetails';
import Contact from '../pages/main/Contact';

const router = createBrowserRouter([
  // ✅ Splash Screen - only one root route
  {
    path: '/',
    element: <SplashScreen />,
  },
  // ✅ Auth Routes
  {
    path: '/auth',
    element: <AuthLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <Signup /> },
      { path: 'forgot-password', element: <ForgotPassword /> },
    ],
  },
  // ✅ Main App Routes
  {
    path: '/app',
    element: <MainLayout />,
    children: [
      { path: 'home', element: <Home /> },
      { path: 'doctors', element: <Doctors /> },
      { path: 'doctors/:id', element: <DoctorDetails /> },
      { path: 'book-appointment/:id', element: <AppointmentBooking /> },
      { path: 'emergency', element: <Emergency /> },
      { path: 'blog', element: <Blog /> },
      { path: 'blog/:id', element: <BlogDetails /> },
      { path: 'contact', element: <Contact /> },
    ],
  },
  // ✅ Redirect to doctors (no duplicate route)
  {
    path: '/doctors',
    element: <Navigate to="/app/doctors" replace />,
  },
  // ✅ Catch-all redirect
  {
    path: '*',
    element: <Navigate to="/app/home" replace />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};