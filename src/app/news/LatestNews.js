"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from '../../styles/homePageNews.module.scss';
import { post } from '@/services/api';

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

// News Card Component
const NewsCard = ({ news, onClick }) => (
    <motion.div 
        className="col-12 col-md-6 col-lg-3 mb-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        whileHover={{ 
            y: -5,
            transition: { duration: 0.2 }
        }}
        onClick={() => onClick(news)}
        style={{ cursor: 'pointer' }}
    >
        <div className={styles.newsCard}>
            <div className={styles.imageContainer}>
                <div className={styles.imageOverlay}></div>
                <img 
                    src={news.imageSrc} 
                    alt={news.caption}
                    className={styles.newsImage}
                />
                <motion.div 
                    className={styles.newsCategory}
                    initial={{ x: -10, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                >
                    {news.categoryName}
                </motion.div>
            </div>
            <div className={styles.newsContent}>
                <h3 className={styles.newsTitle}>{news.title}</h3>
                <p className={styles.newsCaption}>{news.caption}</p>
                <div className={styles.newsFooter}>
                    <span className={styles.newsDate}>
                        <i className="bi bi-clock me-1"></i>
                        {timeAgo(news.reportDate)}
                    </span>
                    <motion.span 
                        className={styles.readMore}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        Read More <i className="bi bi-arrow-right"></i>
                    </motion.span>
                </div>
            </div>
        </div>
    </motion.div>
);

// Shimmer Card for Loading State
const ShimmerCard = () => (
    <div className="col-12 col-md-6 col-lg-3 mb-4">
        <div className={styles.newsCard}>
            <div className={`${styles.imageContainer} ${styles.shimmer}`}></div>
            <div className={styles.newsContent}>
                <div className={`${styles.shimmerTitle} ${styles.shimmer}`}></div>
                <div className={`${styles.shimmerCaption} ${styles.shimmer}`}></div>
                <div className={`${styles.shimmerFooter} ${styles.shimmer}`}></div>
            </div>
        </div>
    </div>
);

const LatestNews = ({ openPopup, categoryId }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedNews, setSelectedNews] = useState(null);
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleCardClick = (news) => {
        if (openPopup) {
            setSelectedNews(news);
            setIsPopupOpen(true);
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await post('/news/newsByCategory.php', { id: categoryId, limit: 4 });
                setNewsData(data);
                setError(null);
            } catch (error) {
                console.error("Failed to load news:", error);
                setError("Failed to load news. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        if (categoryId) {
            fetchNews();
        }
    }, [categoryId]);

    // Variants for popup animations
    const backdropVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1 }
    };

    const popupVariants = {
        hidden: { 
            opacity: 0,
            scale: 0.8,
            y: 50
        },
        visible: { 
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 20,
                stiffness: 300
            }
        },
        exit: {
            opacity: 0,
            scale: 0.8,
            y: 50
        }
    };

    // Container variant for staggered children
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    return (
        <div className="container-fluid p-0">
            {/* Loading shimmer */}
            {loading && (
                <div className="row">
                    {[1, 2, 3, 4].map((_, index) => (
                        <ShimmerCard key={index} />
                    ))}
                </div>
            )}

            {/* Error message */}
            {!loading && error && (
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            )}

            {/* No news message */}
            {!loading && !error && newsData.length === 0 && (
                <div className={styles.noNewsContainer}>
                    <i className="bi bi-newspaper"></i>
                    <p>No news articles found in this category.</p>
                </div>
            )}

            {/* News grid */}
            {!loading && !error && newsData.length > 0 && (
                <motion.div 
                    className="row"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {newsData.map((news, index) => (
                        <NewsCard 
                            key={news.id || index}
                            news={news}
                            onClick={handleCardClick}
                        />
                    ))}
                </motion.div>
            )}

            {/* Popup for news details */}
            <AnimatePresence>
                {isPopupOpen && selectedNews && openPopup && (
                    <motion.div 
                        className={styles.popupOverlay}
                        variants={backdropVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        onClick={() => setIsPopupOpen(false)}
                    >
                        <motion.div 
                            className={styles.popupContent}
                            variants={popupVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button 
                                type="button" 
                                className={styles.closePopup}
                                onClick={() => setIsPopupOpen(false)}
                            >
                                <i className="bi bi-x-lg"></i>
                            </button>
                            
                            <div className={styles.popupHeader}>
                                <h2>{selectedNews.title}</h2>
                                <div className={styles.popupMeta}>
                                    <span>
                                        <i className="bi bi-tag me-1"></i>
                                        {selectedNews.categoryName}
                                    </span>
                                    <span>
                                        <i className="bi bi-clock me-1"></i>
                                        {timeAgo(selectedNews.reportDate)}
                                    </span>
                                </div>
                            </div>
                            
                            <div className={styles.popupImageContainer}>
                                <img 
                                    src={selectedNews.imageSrc} 
                                    alt={selectedNews.title}
                                    className={styles.popupImage}
                                />
                            </div>
                            
                            <div 
                                className={styles.popupDescription}
                                dangerouslySetInnerHTML={{
                                    __html: selectedNews.description
                                }}
                            />
                            
                            <div className={styles.popupFooter}>
                                <button 
                                    className="btn btn-success"
                                    onClick={() => window.location.href = '/news'}
                                >
                                    View All News
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default LatestNews;