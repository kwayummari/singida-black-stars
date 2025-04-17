"use client"
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../../styles/appBar.module.scss';
import SearchSideBar from './SearchSideBar';
import LoginSideBar from './LoginSideBar';
import BottomSheetBar from './BottomSheet';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const AppBar = () => {
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);
  const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchSidebarRef = useRef(null);
  const loginSidebarRef = useRef(null);
  const bottomSheetRef = useRef(null);
  const pathname = usePathname();
  
  const toggleSearchSidebar = () => {
    setIsSearchSidebarOpen(!isSearchSidebarOpen);
    setIsLoginSidebarOpen(false);
  };

  
  const toggleLoginSidebar = () => {
    setIsLoginSidebarOpen(!isLoginSidebarOpen);
    setIsSearchSidebarOpen(false);
  };
  
  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };
  
  const handleClickOutside = (event) => {
    if (
      searchSidebarRef.current && !searchSidebarRef.current.contains(event.target) &&
      loginSidebarRef.current && !loginSidebarRef.current.contains(event.target) &&
      bottomSheetRef.current && !bottomSheetRef.current.contains(event.target)
    ) {
      setIsSearchSidebarOpen(false);
      setIsLoginSidebarOpen(false);
      setIsBottomSheetOpen(false);
    }
  };
  
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const menuItems = [
    { path: '/news', label: 'NEWS' },
    { path: '/matches', label: 'MATCHES' },
    { path: '/teams', label: 'TEAMS' },
    { path: '#', label: 'IFOLLOW' }
  ];

  return (
    <motion.header 
      className={`${styles.appBar} ${isScrolled ? styles.scrolled : ''} d-flex align-items-center`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.logoPart}
        whileHover={{ scale: 1.05 }}
        transition={{ duration: 0.3 }}
      >
        <Link href="/" passHref>
          <img
            src="/images/logo.png"
            className={styles.logo}
            alt="Singida Black Stars Logo"
          />
        </Link>
      </motion.div>
      <div className={styles.textPart + " d-flex flex-column flex-grow-1"}>
        <div className={`${styles.topBar} text-white`}>
          <div className={`${styles.topMenus}`}>
            <motion.p 
              className={`${styles.paragraph} m-0`}
              whileHover={{ backgroundColor: '#0b7a3f' }}
            >
              CLUB SITE
            </motion.p>
            <motion.p 
              className={`${styles.paragraph} m-0`}
              whileHover={{ backgroundColor: '#0b7a3f' }}
            >
              <i className="bi bi-ticket-perforated"></i> TICKETS
            </motion.p>
            <motion.p 
              className={`${styles.paragraph} m-0`}
              whileHover={{ backgroundColor: '#0b7a3f' }}
            >
              <i className="bi bi-shop"></i> STORE
            </motion.p>
            <motion.p 
              className={`${styles.paragraph} m-0`}
              whileHover={{ backgroundColor: '#0b7a3f' }}
            >
              <i className="bi bi-phone-flip"></i> APP
            </motion.p>
          </div>
          <motion.p 
            className={`${styles.paragraph} m-0`} 
            onClick={toggleLoginSidebar}
            whileHover={{ backgroundColor: '#0b7a3f' }}
            style={{ cursor: 'pointer' }}
          >
            <i className="bi bi-person-circle"></i> LOG IN
          </motion.p>
        </div>
        <div className={styles.bottomBar + " bg-dark text-white"}>
          <div className={`${styles.bottomMenus}`}>
            <div></div>
            <div className={`${styles.responsiveMenu}`}>
              {menuItems.map((item) => (
                <Link href={item.path} passHref key={item.label}>
                  <motion.p 
                    className={`${styles.bottomParagraph} m-0 ${pathname === item.path ? styles.active : ''}`}
                    whileHover={{ color: '#0b7a3f' }}
                    style={{ cursor: "pointer" }}
                    initial={pathname === item.path ? { color: '#0b7a3f' } : {}}
                  >
                    {item.label}
                  </motion.p>
                </Link>
              ))}
            </div>
            <div className={`${styles.supportMenu}`}>
              <motion.i 
                className="bi bi-search p-3" 
                onClick={toggleSearchSidebar}
                whileHover={{ scale: 1.2, color: '#0b7a3f' }}
                whileTap={{ scale: 0.9 }}
              ></motion.i>
              <motion.i 
                className="bi bi-list p-3" 
                onClick={toggleBottomSheet}
                whileHover={{ scale: 1.2, color: '#0b7a3f' }}
                whileTap={{ scale: 0.9 }}
              ></motion.i>
            </div>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isSearchSidebarOpen && (
          <motion.div
            ref={searchSidebarRef}
            className={`offcanvas offcanvas-end overlay show`}
            tabIndex="-1"
            style={{ width: '400px' }}
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <SearchSideBar toggleSearchSidebar={toggleSearchSidebar} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isLoginSidebarOpen && (
          <motion.div
            ref={loginSidebarRef}
            className={`offcanvas offcanvas-end overlay show`}
            tabIndex="-1"
            style={{ width: '400px' }}
            initial={{ x: 400 }}
            animate={{ x: 0 }}
            exit={{ x: 400 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <LoginSideBar toggleLoginSidebar={toggleLoginSidebar} />
          </motion.div>
        )}
      </AnimatePresence>
      
      <AnimatePresence>
        {isBottomSheetOpen && (
          <motion.div
            ref={bottomSheetRef}
            className={`offcanvas offcanvas-bottom show`}
            tabIndex="-1"
            style={{ height: '84%', maxHeight: '100%', width: '100%', backgroundColor: '#0b7a3f', scrollBehavior: 'smooth', overflow: 'scroll' }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="offcanvas-header">
              <motion.button 
                type="button" 
                className="btn-close btn-close-white" 
                onClick={toggleBottomSheet}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              ></motion.button>
            </div>
            <BottomSheetBar toggleBottomSheet={toggleBottomSheet} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

export default AppBar;