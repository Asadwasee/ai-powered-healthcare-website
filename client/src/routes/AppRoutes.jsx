import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Pages lazy loading ya direct imports
import SplashScreen from '../pages/auth/SplashScreen';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Home from '../pages/main/Home';
import Doctors from '../pages/main/Doctors';
import DoctorDetails from '../pages/main/DoctorDetails';
import AppointmentBooking from '../pages/main/AppointmentBooking';
import Medicines from '../pages/main/Medicines';
import MedicineDetails from '../pages/main/MedicineDetails';
import Cart from '../pages/main/Cart';
import Checkout from '../pages/main/Checkout';
import LabTests from '../pages/main/LabTests';
import Emergency from '../pages/main/Emergency';
import Blog from '../pages/main/Blog';
import Contact from '../pages/main/Contact';

const router = createBrowserRouter([
  {
    path: '/',
    element: <SplashScreen />,
  },
  {
    /* Auth Routing Tree */
    element: <AuthLayout />,
    children: [
      { path: '/login', element: <Login /> },
      { path: '/signup', element: <Signup /> },
      { path: '/forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    /* Main Platform Routing Tree */
    element: <MainLayout />,
    children: [
      { path: '/home', element: <Home /> },
      { path: '/doctors', element: <Doctors /> },
      { path: '/doctors/:id', element: <DoctorDetails /> },
      { path: '/book-appointment', element: <AppointmentBooking /> },
      { path: '/medicines', element: <Medicines /> },
      { path: '/medicines/:id', element: <MedicineDetails /> },
      { path: '/cart', element: <Cart /> },
      { path: '/checkout', element: <Checkout /> },
      { path: '/lab-tests', element: <LabTests /> },
      { path: '/emergency', element: <Emergency /> },
      { path: '/blog', element: <Blog /> },
      { path: '/contact', element: <Contact /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;