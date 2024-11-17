"use client";
import React, { useState, useEffect } from 'react';
import styles from "../../styles/allNews.module.scss";
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

const NewsCard = ({ image, title, description, caption, onClick }) => (
    <div className="col-12 col-md-3 mb-4" onClick={onClick}>
        <div className={`${styles.imageContainer} card`}>
            <div className={styles.imageOverlay}></div>
            <img src={image} alt="News logo" className={styles.carouselImage} />
            <div className={styles.imageText}>
                <p>{title}</p>
            </div>
            <div className={styles.imageTextBelow}>
                <p>{caption}</p>
            </div>
        </div>
    </div>
);

// Shimmer Card for Loading State
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

const AllNews = () => {
    const [selectedCard, setSelectedCard] = useState(null);
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

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

    const handleCardClick = (item) => {
        setSelectedCard(item);
    };

    const closeModal = () => {
        setSelectedCard(null);
    };

    return (
        <div className="container">
            <p className={styles.header}>All News</p>

            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}

            <div className="row">
                {loading ? (
                    [1, 2, 3, 4].map((_, index) => (
                        <ShimmerCard key={index} />
                    ))
                ) : newsData.length === 0 ? (
                    <p>No news available</p>
                ) : (
                    newsData.map((news) => (
                        <NewsCard
                            key={news.id}
                            image={news.image}
                            title={news.title}
                            description={news.description} // raw HTML description
                            caption={news.caption}
                            onClick={() => handleCardClick(news)}
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
                                <h5 className="modal-title" id="exampleModalLabel">{selectedCard.title}</h5>
                                <button type="button" className="btn-close" aria-label="Close" onClick={closeModal}></button>
                            </div>
                            <div className="modal-body">
                                <img
                                    src={selectedCard.image}
                                    alt={selectedCard.title}
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
}

export default AllNews;
