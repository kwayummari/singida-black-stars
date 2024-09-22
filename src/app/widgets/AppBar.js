"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import styles from '../../styles/appBar.module.scss';

const AppBar = () => {
  const [isSearchSidebarOpen, setIsSearchSidebarOpen] = useState(false);
  const [isLoginSidebarOpen, setIsLoginSidebarOpen] = useState(false);
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

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
      <div className={`${styles.sidebar} ${isSearchSidebarOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={toggleSearchSidebar}>X</button>
        <p>Search Content</p>
      </div>

      {/* Login Sidebar */}
      <div className={`${styles.sidebar} ${isLoginSidebarOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={toggleLoginSidebar}>X</button>
        <p>Login Form</p>
      </div>

      {/* Bottom Sheet */}
      <div className={`${styles.bottomSheet} ${isBottomSheetOpen ? styles.open : ''}`}>
        <button className={styles.closeButton} onClick={toggleBottomSheet}>X</button>
        <p>Bottom Sheet Content</p>
      </div>
    </header>
  );
};

export default AppBar;
