"use client";
import React, { useState, useEffect } from 'react';
import styles from "../../styles/allNews.module.scss";
import { get } from "../../services/api"; // Import your custom 'get' function

const NewsCard = ({ image, title, description, onClick }) => (
    <div className="col-12 col-md-3 mb-4" onClick={onClick}>
        <div className={`${styles.imageContainer} card`}>
            <div className={styles.imageOverlay}></div>
            <img src={image} alt="News logo" className={styles.carouselImage} />
            <div className={styles.imageText}>
                <p>{title}</p>
            </div>
            <div className={styles.imageTextBelow}>
                <p>{description}</p>
            </div>
        </div>
    </div>
);

const AllNews = () => {
    const [newsData, setNewsData] = useState([]);
    const [selectedCard, setSelectedCard] = useState(null);
    const [loading, setLoading] = useState(true);
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

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="container">
            <p className={styles.header}>All News</p>
            <div className="row">
                {newsData.map((news) => (
                    <NewsCard
                        key={news.id}
                        image={news.image}
                        title={news.title}
                        description={news.description}
                        onClick={() => handleCardClick(news)}
                    />
                ))}
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
                                    alt={selectedCard.altText}
                                    className="img-fluid mb-3"
                                />
                                <p>{selectedCard.description}</p>
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
