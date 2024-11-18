"use client";
import React, { useState, useEffect } from 'react';
import styles from '../../../styles/neck.module.scss';
import League from '../League/league';
import NextMatch from '../NextMatch/NextMatch';
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

const Neck = ({ openPopup }) => {
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
                const data = await get('/news/last2News.php');
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
                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Kikosi chetu kinachoanza kwenye mchezo wetu wa leo dhidi ya JKT Tanzania', '/images/lineup.png')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.imageOverlay}></div>
                        <img
                            src="/images/lineup.png"
                            alt="Picture of the logo"
                            className={styles.carouselImage}
                        />
                        <div className={styles.imageText}>
                            <p>Kikosi chetu kinachoanza </p>
                        </div>
                        <div className={styles.imageTextBelow}>
                            <p>#Inawezekana 🏆#NBCPremierLeague</p>
                        </div>
                    </div>
                </div>

                {/* Other components */}
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

export default Neck;
