"use client"
import React from 'react';
import styles from '../../../styles/homePageNews.module.scss';

const MainSponsor = () => (
    <div className="container">
        <div className={`${styles.scrollableRow} row`}>
            <div className="col-6 col-md-3">
                <div className={`${styles.imageContainer} card`}>
                    <img
                        src="/images/pmBet.svg"
                        alt="Picture of the logo"
                        className={styles.carouselImage}
                    />
                    <div className={styles.imageText}>
                        <p>Report | SINGIDA BIG STARS 1-1 JKT</p>
                    </div>
                    <div className={styles.imageTextBelow}>
                        <p>Match Reports | 2 days ago</p>
                    </div>
                </div>
            </div>
            <div className="col-6 col-md-3">
                <div className={`${styles.imageContainer} card`}>
                    <img
                        src="/images/jersey.png"
                        alt="Picture of the logo"
                        className={styles.carouselImage}
                    />
                    <div className={styles.imageText}>
                        <p>Report | SINGIDA BIG STARS 1-1 JKT</p>
                    </div>
                    <div className={styles.imageTextBelow}>
                        <p>Match Reports | 2 days ago</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MainSponsor;
