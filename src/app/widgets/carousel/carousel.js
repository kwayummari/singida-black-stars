import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../../styles/carousel.module.scss';

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
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleClick = () => {
        if (openPopup) {
            setIsPopupOpen(true);
        }
    };

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await post('/news/banner.php', { id: categoryId });
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
        <div className="column">
            {openPopup ? (
                <div
                    className={`${styles.row} row-md-6 row-sm-6 `}
                    onClick={handleClick}
                    style={{ cursor: 'pointer' }}
                >
                    <div className={styles.imageContainer}>
                        <img
                            src="/images/carousel.png"
                            alt="Picture of the logo"
                            className={styles.carouselImage}
                        />
                        <div className={styles.imageText}>
                            <p>Preview | CCM KIRUMBA</p>
                        </div>
                        <div className={styles.imageTextBelow}>
                            <p>Club News | 9 hours ago</p>
                        </div>
                    </div>
                </div>
            ) : (
                <Link href="/news" passHref>
                    <div
                        className={`${styles.row} row-md-6 row-sm-6 `}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.imageContainer}>
                            <img
                                src={newsData[0].imageSrc}
                                alt="Picture of the logo"
                                className={styles.carouselImage}
                            />
                            <div className={styles.imageText}>
                                <p>Preview | {newsData[0].caption}</p>
                            </div>
                            <div className={styles.imageTextBelow}>
                                <p>Club News | {timeAgo(newsData[0].reportDate)}</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {isPopupOpen && openPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2 className={styles.popupTitle}><strong>{newsData[0].title}</strong></h2>
                        <img
                            src={newsData[0].imageSrc}
                            alt="News Image"
                            className={styles.popupImage}
                        />
                        <div
                            dangerouslySetInnerHTML={{
                                __html: newsData[0].description,
                            }}
                            className={styles.popupDescription}
                        />
                        <button onClick={() => setIsPopupOpen(false)} className={styles.closePopup}>
                            Close
                        </button>
                    </div>
                </div>
            )}

        </div>
    );
};

export default CarouselWidget;
