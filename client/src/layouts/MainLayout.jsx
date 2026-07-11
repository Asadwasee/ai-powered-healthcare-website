import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar'; // Hum ne jo abhi banaya
import Footer from '../components/Footer'; // Jab aap footer banayein gy tab un-comment kar lena

const MainLayout = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Global Header Navigation */}
      <Navbar /> 

      {/* Dynamic Route Pages Render Here */}
      <main className="flex-grow">
        <Outlet /> 
      </main>

      {/* Global Footer Layer - Abhi comment kiya hai */}
      { <Footer /> }
      {/* <footer className="bg-white border-t py-4 text-center text-xs text-gray-400">Footer Component Pending</footer> */}
    </div>
  );
};

export default MainLayout;