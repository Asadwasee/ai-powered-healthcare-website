import { createBrowserRouter, RouterProvider, Navigate } from 'react-router-dom';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';

// Pages lazy loading ya direct imports
import SplashScreen from '../pages/auth/SplashScreen';
import Login from '../pages/auth/Login';
import Signup from '../pages/auth/Signup';
import ForgotPassword from '../pages/auth/ForgotPassword';
import Home from '../pages/main/Home';
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
      { path: '/contact', element: <Contact /> },
    ],
  },
  {
    path: '*',
    element: <Navigate to="/home" replace />,
  },
]);

export const AppRoutes = () => <RouterProvider router={router} />;