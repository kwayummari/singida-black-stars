"use client";
import React, { useState } from 'react';
import styles from '../../../styles/homePageNews.module.scss';

const LatestNews = ({ openPopup }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [popupImage, setPopupImage] = useState('');

    // Handle image click to open popup
    const handleImageClick = (title, image) => {
        if (openPopup) {
            setPopupTitle(title);
            setPopupImage(image);
            setIsPopupOpen(true); // Open the popup
        }
    };

    return (
        <div className="container">
            <div className={`${styles.scrollableRow} row`}>
                {/* First Image Container */}
                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Report | SINGIDA BIG STARS 1-1 JKT', '/images/jkt.png')}
                        style={{ cursor: 'pointer' }}
                    >
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

                {/* Second Image Container */}
                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Report | SINGIDA BIG STARS 1-1 JKT', '/images/jkt.png')}
                        style={{ cursor: 'pointer' }}
                    >
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

                {/* Third Image Container */}
                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Report | SINGIDA BIG STARS 1-1 JKT', '/images/jkt.png')}
                        style={{ cursor: 'pointer' }}
                    >
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

                {/* Fourth Image Container */}
                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Report | SINGIDA BIG STARS 1-1 JKT', '/images/jkt.png')}
                        style={{ cursor: 'pointer' }}
                    >
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
            </div>

            {/* Popup Section */}
            {isPopupOpen && openPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2 className={styles.popupTitle}>{popupTitle}</h2>
                        <img
                            src={popupImage}
                            alt="Popup image"
                            className={styles.popupImage}
                        />
                        <p className={styles.popupDescription}>
                            Detailed news description or content goes here.
                        </p>
                        <button
                            onClick={() => setIsPopupOpen(false)}
                            className={styles.closePopup}
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default LatestNews;
