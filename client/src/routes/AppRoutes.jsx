import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
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
import MedicineList from '../pages/medicine/MedicineList.jsx';
import MedicineDetails from '../pages/medicine/MedicineDetails.jsx';
import Checkout from '../pages/medicine/Checkout.jsx'; 
import LabTests from '../pages/main/LabTests';
import MyLabBookings from '../pages/main/MyLabBookings';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/signup', element: <Signup /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    // MainLayout ke andar aapka Navbar automatically include ho jayega
    element: <MainLayout />, 
    children: [
      { path: '/home', element: <Home /> },
      { path: '/doctors', element: <Doctors /> },
      { path: '/doctors/:id', element: <DoctorDetails /> },
      { path: '/book-appointment/:id', element: <AppointmentBooking /> },
      { path: '/emergency', element: <Emergency /> },
      { path: '/ai-consultant', element: <Emergency /> },
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:id', element: <BlogDetails /> },
      { path: '/contact', element: <Contact /> },
      { path: '/medicines', element: <MedicineList /> },
      { path: '/medicines/:id', element: <MedicineDetails /> },
      { path: '/checkout', element: <Checkout />  },
      { path: '/lab-tests', element: <LabTests /> },
      { path: '/my-lab-bookings', element: <MyLabBookings /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};