"use client"
import React from 'react';
import styles from '../../../styles/MainSponsor.module.scss';

const MainSponsorMobile = () => (
    <div className={`${styles.container} card mb-4 mt-5 rounded-0`}>
        <div className={`column`}>
            <div className="row-12">
                <div className={`card ${styles.card}`}>
                    <div className={styles.logos}>
                        <img
                            src="/images/sponsors/wakazi.png"
                            alt="Picture of the logo"
                            className={styles.sponsorLogo}
                        />
                        <div class={styles.vl}></div>
                        <img
                            src="/images/logo.png"
                            alt="Picture of the logo"
                            className={styles.teamLogo}
                        />
                    </div>
                    <div>
                        <h5 className={styles.sponsorText}>OFFICIAL TECHNICAL SPONSOR</h5>
                    </div>
                </div>
            </div>
            <div className="row-12">
                <div className={`card ${styles.card}`}>
                    <img
                        src="/images/jersey.png"
                        alt="Picture of the logo"
                        className={styles.jersey}
                    />
                    <div>
                        <h5 className={styles.jerseyText}>2024/25 Home Shirt (Adult)</h5>
                        <h5 className={styles.price}>Tsh 50,000</h5>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MainSponsorMobile;
