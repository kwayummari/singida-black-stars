"use client"
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from '../../styles/appBar.module.scss';
import SearchSideBar from './SearchSideBar';
import LoginSideBar from './LoginSideBar';

const AppBar = () => {
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);
  const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  // Refs for sidebars and bottom sheet
  const searchSidebarRef = useRef(null);
  const loginSidebarRef = useRef(null);
  const bottomSheetRef = useRef(null);

  const toggleSearchSidebar = () => {
    setIsSearchSidebarOpen(!isSearchSidebarOpen);
    setIsLoginSidebarOpen(false); // Close login if search is opened
  };

  const toggleLoginSidebar = () => {
    setIsLoginSidebarOpen(!isLoginSidebarOpen);
    setIsSearchSidebarOpen(false); // Close search if login is opened
  };

  const toggleBottomSheet = () => {
    setIsBottomSheetOpen(!isBottomSheetOpen);
  };

  // Close when clicking outside
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
    // Add event listener to detect outside clicks
    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className={`${styles.appBar} d-flex align-items-center bg-dark`}>
      <div className={styles.logoPart}>
        <Image
          src="/images/logo.png"
          width={150}
          height={150}
          alt="Picture of the author"
        />
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
              <p className={`${styles.bottomParagraph} m-0`}>CLUB SITE</p>
              <p className={`${styles.bottomParagraph} m-0`}> TICKETS</p>
              <p className={`${styles.bottomParagraph} m-0`}> STORE</p>
              <p className={`${styles.bottomParagraph} m-0`}> APP</p>
            </div>
            <div className={`${styles.supportMenu}`}>
              <i className="bi bi-search" onClick={toggleSearchSidebar}></i>
              <i className="bi bi-list" onClick={toggleBottomSheet}></i>
            </div>
          </div>
        </div>
      </div>

      {/* Search Sidebar */}
      <div
        ref={searchSidebarRef}
        className={`offcanvas offcanvas-end ${isSearchSidebarOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{ width: '400px' }}
      >
        <SearchSideBar toggleSearchSidebar={toggleSearchSidebar} />
      </div>

      {/* Login Sidebar */}
      <div
        ref={loginSidebarRef}
        className={`offcanvas offcanvas-end ${isLoginSidebarOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{ width: '400px' }}
      >
        <LoginSideBar toggleSearchSidebar={toggleSearchSidebar} />
      </div>

      {/* Bottom Sheet */}
      <div
        ref={bottomSheetRef}
        className={`offcanvas offcanvas-bottom ${isBottomSheetOpen ? 'show' : ''}`}
        tabIndex="-1"
        style={{ height: '84%', maxHeight: '100%', width: '100%' }}
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title">Bottom Sheet</h5>
          <button type="button" className="btn-close" onClick={toggleBottomSheet}></button>
        </div>
        <div className="offcanvas-body">
          <p>Bottom Sheet Content</p>
        </div>
      </div>
    </header>
  );
};

export default AppBar;
