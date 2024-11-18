"use client";
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/homePageNews.module.scss';
import { get } from '@/services/api';

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

const ShimmerCard = () => (
    <div className="col-12 col-md-3 mb-4">
        <div className={`${styles.imageContainer} card ${styles.shimmerCard}`}>
            <div className={styles.imageOverlay}></div>
            <div className={styles.shimmerImage}></div>
            <div className={styles.shimmerText}></div>
            <div className={styles.shimmerTextBelow}></div>
        </div>
    </div>
);

const LatestNews = ({ openPopup }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [popupImage, setPopupImage] = useState('');
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageClick = (title, image) => {
        if (openPopup) {
            setPopupTitle(title);
            setPopupImage(image);
            setIsPopupOpen(true);
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await get('/news/getAllNews.php');
                setNewsData(data);
            } catch (error) {
                setError("Failed to load news. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchNews();
    }, []);

    return (
        <div className="container">
            <div className={`${styles.scrollableRow} row`}>
            {loading ? (
                    [1, 2, 3, 4].map((_, index) => (
                        <ShimmerCard key={index} />
                    ))
                ) : newsData.length === 0 ? (
                    <p>No news available</p>
                ) : (
                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Report | SINGIDA BIG STARS 1-1 JKT', '/images/jkt.png')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.imageOverlay}></div>
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
                            )}
            </div>

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
