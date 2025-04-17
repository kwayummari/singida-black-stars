"use client"
import { useState, useEffect } from 'react';
import styles from "./../styles/index.module.scss"
import CarouselWidget from "./widgets/carousel/carousel";
import HomePageNews from "./widgets/HomePageNews/HomePageNews";
import MainSponsor from "./widgets/MainSponsor/MainSponsor";
import MainSponsorMobile from "./widgets/MainSponsor/MainSponsorMobile";
import Neck from "./widgets/neck/neck";
import { motion } from "framer-motion";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Handle responsive design
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    
    handleResize();
    window.addEventListener("resize", handleResize);
    
    // Simulate loading for smooth transitions
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(timer);
    };
  }, []);

  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <img 
          src="/images/logo.png" 
          alt="Singida Black Stars Logo" 
          className={styles.loadingLogo} 
        />
        <div className={styles.loadingBar}>
          <div className={styles.loadingProgress}></div>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.page}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7 }}
      >
        <CarouselWidget openPopup={false} />
      </motion.div>
      
      <motion.div
        initial={{ y: 30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.2 }}
      >
        <Neck openPopup={true} />
      </motion.div>
      
      <motion.div
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.4 }}
      >
        <HomePageNews LatestNewsNo='4' PlayerNewsNo='4' CommercialNo='4' />
      </motion.div>
      
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        {isMobile ? <MainSponsorMobile /> : <MainSponsor />}
      </motion.div>
    </motion.div>
  );
}