import React from 'react';
import styles from '../../../styles/Latest.module.scss';

const timeAgo = (timestamp) => {
    const now = new Date();
    const postDate = new Date(timestamp);
    const diffInMs = now - postDate;
    const diffInSecs = Math.floor(diffInMs / 1000);
    const diffInMins = Math.floor(diffInSecs / 60);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);
    const diffInMonths = Math.floor(diffInDays / 30);

    if (diffInDays < 1) {
        if (diffInHours < 1) {
            return `${diffInMins} minutes ago`;
        }
        return `${diffInHours} hours ago`;
    }

    if (diffInDays < 30) {
        return `${diffInDays} days ago`;
    }

    return diffInMonths === 1
        ? '1 month ago'
        : `${diffInMonths} months ago`;
};

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
            <p>{timeAgo(reportDate)}</p>
            </div>
        </div>
    </div>
);

export default ImageCard;
