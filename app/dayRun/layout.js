"use client"

import React, { useState, useEffect } from 'react';
import '@fontsource/inter'; // Importing Inter font styles
import Navbar from '../../components/Navbar';
import Navigation from '../../components/Navigation';



export default function RootLayout({ children }) {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setShowScrollButton(scrollY > 300); // Adjust the value based on when you want the button to appear
    };

    window.addEventListener('scroll', handleScroll);
    
    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className='flex max-w-screen-xl mx-auto p-4'>
      <Navigation /> {/* Include the side navigation component */}
      <div className='flex-1'>
        <Navbar />
        <div className='mt-8'>{children}</div>
        {showScrollButton && (
          <button
            onClick={scrollToTop}
            className='fixed bottom-4 right-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600'
          >
            Scroll to Top
          </button>
        )}
      </div>
    </div>
  );
}
