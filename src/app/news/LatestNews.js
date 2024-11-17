"use client";
import React, { useState, useEffect, useRef } from 'react';
import styles from '../../styles/Latest.module.scss';
import ImageCard from '../widgets/ImageCardContainer/ImageCardContainer';
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

const Latest = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const scrollRef = useRef(null);
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    useEffect(() => {
        const scroll = scrollRef.current;
        let scrollAmount = 0;

        const scrollInterval = setInterval(() => {
            if (scroll) {
                scrollAmount += 1;
                scroll.scrollLeft = scrollAmount;
                if (scroll.scrollLeft + scroll.offsetWidth >= scroll.scrollWidth) {
                    scrollAmount = 0;
                }
            }
        }, 20);

        return () => clearInterval(scrollInterval);
    }, []);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await get('/news/latestNews.php');
                setNewsData(data);
            } catch (error) {
                setError("Failed to load news. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchNews();
    }, []);


    const handleCardClick = (item) => {
        setSelectedCard(item);
    };

    const closeModal = () => {
        setSelectedCard(null);
    };

    return (
        <div className="container">
            <p className={styles.header}>Latest News</p>
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            <div className={`${styles.scrollableRow} row`} ref={scrollRef}>
            {loading ? (
                    [1, 2, 3, 4].map((_, index) => (
                        <ShimmerCard key={index} />
                    ))
                ) : newsData.length === 0 ? (
                    <p>No news available</p>
                ) : (
                newsData.map((item, index) => (
                    <ImageCard
                        key={index}
                        imageSrc={item.imageSrc}
                        altText= 'Exclusive News Image'
                        description={item.caption}
                        reportDate={item.reportDate}
                        onClick={() => handleCardClick(item)}
                    />
                ))
                )}
            </div>

            {selectedCard && (
                <div
                    className="modal fade show d-block"
                    tabIndex="-1"
                    role="dialog"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
                >
                    <div className="modal-dialog modal-lg modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{selectedCard.altText}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={selectedCard.imageSrc}
                                    alt={selectedCard.altText}
                                    className="img-fluid mb-3"
                                    style={{height: '500px', width: '100%', objectFit: 'cover',}}
                                />
                                <div
                                    dangerouslySetInnerHTML={{
                                        __html: selectedCard.description, // Render the CKEditor HTML description
                                    }}
                                />
                                <p>{timeAgo(selectedCard.reportDate)}</p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={closeModal}>Close</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Latest;
