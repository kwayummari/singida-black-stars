import React from 'react';
import styles from '../../../styles/neck.module.scss';

const Neck = () => (
    <div className="container">
        <div className={`${styles.scrollableRow} row`}>
            <div className="col-12 col-md-3">
                <div className={`${styles.imageContainer} card p-2`}>
                    <img
                        src="/images/carousel.png"
                        alt="Picture of the logo"
                        className={styles.carouselImage}
                    />
                    <div className={styles.imageText}>
                        <p>Preview | CCM KIRUMBA</p>
                    </div>
                    <div className={styles.imageTextBelow}>
                        <p>Club News | 9 hours ago</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className={`${styles.imageContainer} card p-2`}>
                    <img
                        src="/images/carousel.png"
                        alt="Picture of the logo"
                        className={styles.carouselImage}
                    />
                    <div className={styles.imageText}>
                        <p>Preview | CCM</p>
                    </div>
                    <div className={styles.imageTextBelow}>
                        <p>Club Blog | 9 hours ago</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className={`${styles.imageContainer} card p-2`}>
                    <img
                        src="/images/carousel.png"
                        alt="Picture of the logo"
                        className={styles.carouselImage}
                    />
                    <div className={styles.imageText}>
                        <p>Preview | League Table</p>
                    </div>
                    <div className={styles.imageTextBelow}>
                        <p>Club News | 9 hours ago</p>
                    </div>
                </div>
            </div>
            <div className="col-12 col-md-3">
                <div className={`${styles.imageContainer} card p-2`}>
                    <img
                        src="/images/carousel.png"
                        alt="Picture of the logo"
                        className={styles.carouselImage}
                    />
                    <div className={styles.imageText}>
                        <p>Preview | KIRUMBA</p>
                    </div>
                    <div className={styles.imageTextBelow}>
                        <p>Club News | 9 hours ago</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default Neck;
