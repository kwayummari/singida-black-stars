"use client";
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/homePageNews.module.scss';
import { get, post } from '@/services/api';

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

const LatestNews = ({ openPopup, categoryId }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [popupDescription, setPopupDescription] = useState('');
    const [popupImage, setPopupImage] = useState('');
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleImageClick = (title, image, description) => {
        if (openPopup) {
            setPopupTitle(title);
            setPopupImage(image);
            setPopupDescription(description)
            setIsPopupOpen(true);
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await post('/news/newsByCategory.php', { id: categoryId });
                setNewsData(data);
            } catch (error) {
                setError("Failed to load news. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchNews();
        }
    }, [categoryId]);

    return (
        <div className="container">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className={`${styles.scrollableRow} row`}>
                {loading ? (
                    [1, 2, 3, 4].map((_, index) => (
                        <ShimmerCard key={index} />
                    ))
                ) : newsData.length === 0 ? (
                    <p>No news available</p>
                ) : (
                    newsData.map((news) => (
                        <div className="col-12 col-md-3">
                            <div
                                className={`${styles.imageContainer} card`}
                                onClick={() => handleImageClick(news.title, news.imageSrc, news.description)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className={styles.imageOverlay}></div>
                                <img
                                    src={news.imageSrc}
                                    alt="Picture of the News"
                                    className={styles.carouselImage}
                                />
                                <div className={styles.imageText}>
                                    <p>{news.caption}</p>
                                </div>
                                <div className={styles.imageTextBelow}>
                                    <p style={{ color: '#fff' }}> Reports | {timeAgo(news.reportDate)}</p>
                                </div>
                            </div>
                        </div>))
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
                        <div
                            dangerouslySetInnerHTML={{
                                __html: popupDescription,
                            }}
                            className={styles.popupDescription}
                        />
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
