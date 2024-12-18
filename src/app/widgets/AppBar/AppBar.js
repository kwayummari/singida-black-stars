"use client"
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../../styles/appBar.module.scss';
import SearchSideBar from './SearchSideBar';
import LoginSideBar from './LoginSideBar';
import BottomSheetBar from './BottomSheet';
import Link from 'next/link';

const AppBar = () => {
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);
  const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const searchSidebarRef = useRef(null);
  const loginSidebarRef = useRef(null);
  const bottomSheetRef = useRef(null);
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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`${styles.appBar} d-flex align-items-center bg-dark`}>
      <div className={styles.logoPart}>
        <Link href="/" passHref>
          <img
            src="/images/logo.png"
            className={styles.logo}
            alt="Picture of the author"
          />
        </Link>
      </div>
      <div className={styles.textPart + " d-flex flex-column flex-grow-1"}>
        <div className={`${styles.topBar} text-white`}>
          <div className={`${styles.topMenus}`}>
            <p className={`${styles.paragraph} m-0`}>CLUB SITE</p>
            <p className={`${styles.paragraph} m-0`}><i className="bi bi-ticket-perforated"></i> TICKETS</p>
            <p className={`${styles.paragraph} m-0`}><i className="bi bi-shop"></i> STORE</p>
            <p className={`${styles.paragraph} m-0`}><i className="bi bi-phone-flip"></i> APP</p>
          </div>
          <p className={`${styles.paragraph} m-0`} onClick={toggleLoginSidebar}><i className="bi bi-person-circle"></i> LOG IN</p>
        </div>
        <div className={styles.bottomBar + " bg-dark text-white"}>
          <div className={`${styles.bottomMenus}`}>
            <div></div>
            <div className={`${styles.responsiveMenu}`}>
              <Link href="/news" passHref>
                <p className={`${styles.bottomParagraph} m-0`} style={{ cursor: "pointer" }}>NEWS</p>
              </Link>
              <Link href="/matches" passHref><p className={`${styles.bottomParagraph} m-0`}> MATCHES</p></Link>
              <Link href="/teams" passHref><p className={`${styles.bottomParagraph} m-0`}> TEAMS</p></Link>
              <p className={`${styles.bottomParagraph} m-0`}> IFOLLOW</p>
            </div>
            <div className={`${styles.supportMenu}`}>
              <i className="bi bi-search p-3" onClick={toggleSearchSidebar}></i>
              <i className="bi bi-list p-3" onClick={toggleBottomSheet}></i>
            </div>
          </div>
        </div>
      </div>
      <div
        ref={searchSidebarRef}
        className={`offcanvas offcanvas-end overlay ${isSearchSidebarOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{ width: '400px' }}
      >
        <SearchSideBar toggleSearchSidebar={toggleSearchSidebar} />
      </div>
      <div
        ref={loginSidebarRef}
        className={`offcanvas offcanvas-end overlay ${isLoginSidebarOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{ width: '400px' }}
      >
        <LoginSideBar toggleLoginSidebar={toggleLoginSidebar} />
      </div>
      <div
        ref={bottomSheetRef}
        className={`offcanvas offcanvas-bottom ${isBottomSheetOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{ height: '84%', maxHeight: '100%', width: '100%', backgroundColor: '#0b7a3f', scrollBehavior: 'smooth', overflow: 'scroll' }}
      >
        <div className="offcanvas-header">
          <button type="button" className="btn-close btn-close-white" onClick={toggleBottomSheet}></button>
        </div>
        <BottomSheetBar toggleBottomSheet={toggleBottomSheet} />
      </div>
    </header>
  );
};

export default AppBar;
