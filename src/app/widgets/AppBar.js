import React from 'react';
import Image from 'next/image';
import styles from '../../styles/appBar.module.scss';

const AppBar = () => (
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
        <div className={`${styles.topMenus} `}>
          <p className={`${styles.paragraph} m-0`}>CLUB SITE</p>
          <p className={`${styles.paragraph} m-0`}><i class="bi bi-ticket-perforated"></i> TICKETS</p>
          <p className={`${styles.paragraph} m-0`}><i className="bi bi-shop"></i> STORE</p>
          <p className={`${styles.paragraph} m-0`}><i class="bi bi-phone-flip"></i> APP</p>
        </div>
        <p className={`${styles.paragraph} m-0`}><i class="bi bi-person-circle"></i> LOG IN</p>
      </div>
      <div className={styles.bottomBar + " bg-dark"}>
        <p className="m-0"></p>
      </div>
    </div>
  </header>
);

export default AppBar;
