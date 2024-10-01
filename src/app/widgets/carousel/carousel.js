import React from 'react';
import styles from '../../../styles/carousel.module.scss';

const CarouselWidget = () => (
    <div className="column">
        <div className={`row-md-6 row-sm-6`}>
            <div className={`${styles.imageContainer} p-2`}>
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
    </div>
);

export default CarouselWidget;