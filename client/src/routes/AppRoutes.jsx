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

/* 
  💡 NOTE FOR ASAD:
  Navbar aur Footer global components hain, is liye inhein yahan har route mein alag se 
  add karne ki zaroorat nahi hoti. Inhein direct "src/layouts/MainLayout.jsx" file mein 
  import karke <Outlet /> ke upar aur neeche lagaya jata hai.
*/

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
      
      // NEW AI ROUTE: Symptom checker widget ki redirection ke liye
      { path: '/ai-consultant', element: <Emergency /> }, // Abi ke liye Emergency par map kiya hai, bad mein change kar sakte hain
      
      { path: '/blog', element: <Blog /> },
      { path: '/blog/:id', element: <BlogDetails /> },
      { path: '/contact', element: <Contact /> },
      { path: '/medicines', element: <MedicineList /> },
      { path: '/medicines/:id', element: <MedicineDetails /> },
      { path: '/checkout', element: <Checkout />  },
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