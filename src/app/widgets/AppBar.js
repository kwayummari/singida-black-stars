import React from 'react';
import Image from 'next/image';
import styles from '../../styles/appBar.scss';

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
    <div className={styles.textPart + "d-flex flex-column flex-grow-1"}>
      <div className={`${styles.topBar} bg-success text-white`}>
        <p className="m-0">CLUB SITE</p>
      </div>
      <div className={styles.bottomBar + " bg-light"}>
      <p className="m-0">kwayu</p>
      </div>
    </div>
  </header>
);

export default AppBar;
