"use client"
import React from 'react';
import styles from '../../../styles/neck.module.scss';
import League from '../League/league';
import NextMatch from '../NextMatch/NextMatch';

const Neck = () => (
    <div className="container">
        <div className={`${styles.scrollableRow} row`}>
            <div className="col-12 col-md-3">
                <div className={`${styles.imageContainer} card`}>
                    <img
                        src="/images/jkt.png"
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
            <div className="col-12 col-md-3">
                <div className={`${styles.imageContainer} card`}>
                    <img
                        src="/images/carousel.png"
                        alt="Picture of the logo"
                        className={styles.carouselImage}
                    />
                    <div className={styles.imageText}>
                        <p>Preview | MTIBWA SUGAR</p>
                    </div>
                    <div className={styles.imageTextBelow}>
                        <p>Club News | 2 days ago</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className={`${styles.imageContainer} card`}>
                    <League />
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className={`${styles.imageContainer} card`}>
                    <NextMatch />
                </div>
            </div>
        </div>
    </div>
);

export default Neck;
