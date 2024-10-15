import React from 'react';
import styles from '../../../styles/Latest.module.scss';

const ImageCard = ({ imageSrc, altText, description, reportDate, onClick }) => (
    <div className="col-12 col-md-4" onClick={onClick}>
        <div className={`${styles.imageContainer} card`}>
            <img
                src={imageSrc}
                alt={altText}
                className={styles.carouselImage}
            />
            <div className={styles.overlay}></div>
            <div className={styles.imageText}>
                <p>{description}</p>
            </div>
            <div className={styles.imageTextBelow}>
                <p>{reportDate}</p>
            </div>
        </div>
    </div>
);

export default ImageCard;
