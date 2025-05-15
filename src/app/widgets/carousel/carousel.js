import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../../styles/carousel.module.scss';
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

const CarouselWidget = ({ openPopup }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [newsData, setNewsData] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [currentIndex, setCurrentIndex] = useState(0);

    const handleClick = () => {
        if (openPopup) {
            setIsPopupOpen(true);
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setIsLoading(true);
                const data = await get('/news/banner.php');
                setNewsData(data);
            } catch (error) {
                console.log("Failed to load news. Please try again later.");
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();

        // Auto-rotation for multiple banner items
        if (newsData.length > 1) {
            const rotationTimer = setInterval(() => {
                setCurrentIndex((prevIndex) => 
                    prevIndex === newsData.length - 1 ? 0 : prevIndex + 1
                );
            }, 5000);
            
            return () => clearInterval(rotationTimer);
        }
    }, [newsData.length]);

    if (isLoading || newsData.length === 0) {
        return (
            <div className={styles.shimmerContainer}>
                <div className={styles.shimmerImage}></div>
                <div className={styles.shimmerOverlay}></div>
                <div className={styles.shimmerText}></div>
                <div className={styles.shimmerSubText}></div>
            </div>
        );
    }

    const currentNews = newsData[currentIndex] || newsData[0];

    return (
        <div className={styles.carouselContainer}>
            {openPopup ? (
                <motion.div
                    className={`${styles.row}`}
                    onClick={handleClick}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    style={{ cursor: 'pointer' }}
                >
                    <div className={styles.imageContainer}>
                        <img
                            src={`https://singidablackstars.co.tz/admin/${currentNews.imageSrc}`}
                            alt="Featured news"
                            className={styles.carouselImage}
                        />
                        <div className={styles.gradientOverlay}></div>
                        <motion.div 
                            className={styles.imageText}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <p>Preview | {currentNews.title}</p>
                        </motion.div>
                        <motion.div 
                            className={styles.imageTextBelow}
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                        >
                            <p>Club News | {timeAgo(currentNews.reportDate)}</p>
                        </motion.div>
                    </div>
                </motion.div>
            ) : (
                <Link href="/news" passHref>
                    <motion.div
                        className={`${styles.row}`}
                        whileHover={{ scale: 1.02 }}
                        transition={{ duration: 0.3 }}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.imageContainer}>
                            <img
                                src={`https://singidablackstars.co.tz/admin/${currentNews.imageSrc}`}
                                alt="Featured news"
                                className={styles.carouselImage}
                            />
                            <div className={styles.gradientOverlay}></div>
                            <motion.div 
                                className={styles.imageText}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p>Preview | {currentNews.title}</p>
                            </motion.div>
                            <motion.div 
                                className={styles.imageTextBelow}
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                            >
                                <p>Club News | {timeAgo(currentNews.reportDate)}</p>
                            </motion.div>
                        </div>
                    </motion.div>
                </Link>
            )}

            {/* Navigation dots for multiple news items */}
            {newsData.length > 1 && (
                <div className={styles.carouselDots}>
                    {newsData.map((_, index) => (
                        <motion.div 
                            key={index}
                            className={`${styles.dot} ${index === currentIndex ? styles.activeDot : ''}`}
                            onClick={() => setCurrentIndex(index)}
                            whileHover={{ scale: 1.2 }}
                        />
                    ))}
                </div>
            )}

            <AnimatePresence>
                {isPopupOpen && openPopup && (
                    <motion.div 
                        className={styles.popupOverlay}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        <motion.div 
                            className={styles.popup}
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            <div className={styles.popupContent}>
                                <motion.h2 
                                    className={styles.popupTitle}
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <strong>{currentNews.title}</strong>
                                </motion.h2>
                                <motion.img
                                    src={`https://singidablackstars.co.tz/admin/${currentNews.imageSrc}`}
                                    alt="News Image"
                                    className={styles.popupImage}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                />
                                <motion.div
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3 }}
                                    className={styles.popupDescription}
                                    dangerouslySetInnerHTML={{
                                        __html: currentNews.description,
                                    }}
                                />
                                <motion.button 
                                    onClick={() => setIsPopupOpen(false)} 
                                    className={styles.closePopup}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    Close
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default CarouselWidget;