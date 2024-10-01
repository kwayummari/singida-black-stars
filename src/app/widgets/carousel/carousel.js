import React from 'react';
import styles from '../../../styles/carousel.module.scss';

const CarouselWidget = () => (
    <div className="column">
        <div className={`row-md-6 row-sm-6 p-5`}>
            <div className={`card`}>
            <img
              src="/images/carousel.png"
                    alt="Picture of the logo"
                    className={styles.carouselImage}
            />
            </div>
        </div>
    </div>
);

export default CarouselWidget;