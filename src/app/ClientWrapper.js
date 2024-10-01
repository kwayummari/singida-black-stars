'use client';

import { useState, useEffect } from 'react';
import AppBar from './widgets/AppBar/AppBar';
import AppBarMobile from './widgets/AppBar/AppBarMobile';

export default function ClientWrapper({ children }) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      {isMobile ? <AppBarMobile /> : <AppBar />}
      {children}
    </>
  );
}
