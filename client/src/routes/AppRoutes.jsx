import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Doctors from '../pages/main/Doctors';
import DoctorDetails from '../pages/main/DoctorDetails';
import AppointmentBooking from '../pages/main/AppointmentBooking';
import Emergency from '../pages/main/Emergency';
import Blog from '../pages/main/Blog';
import BlogDetails from '../pages/main/BlogDetails';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/doctors" replace />
  },
  {
    element: <AuthLayout />,
    children: [
      { path: '/auth/login', element: <Login /> },
      { path: '/auth/signup', element: <Signup /> },
      { path: '/auth/forgot-password', element: <ForgotPassword /> },
    ],
  },
  {
    element: <MainLayout />,
    children: [
      { path: '/home', element: <Navigate to="/doctors" replace /> },
      { path: '/doctors', element: <Doctors /> },
      { path: '/doctors/:id', element: <DoctorDetails /> },
      { path: '/book-appointment/:id', element: <AppointmentBooking /> },
      { path: '/emergency', element: <Emergency /> },
      { path: '/blog', element: <Blog /> },
      {path: '/blog/:id', element: <BlogDetails />}
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
]);

export const AppRoutes = () => {
return <RouterProvider router={router} />;
}