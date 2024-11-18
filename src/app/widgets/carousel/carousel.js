import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from '../../../styles/carousel.module.scss';

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
                const data = await post('/news/newsByCategory.php', { id: categoryId });
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
                                <p>Club News | 9 hours ago</p>
                            </div>
                        </div>
                    </div>
                </Link>
            )}

            {isPopupOpen && openPopup && (
                <div className={styles.popup}>
                    <div className={styles.popupContent}>
                        <h2 className={styles.popupTitle}><strong>CCM KIRUMBA</strong></h2>
                        <img
                            src="/images/carousel.png"
                            alt="News Image"
                            className={styles.popupImage}
                        />
                        <p className={styles.popupDescription}>
                            Nunua tiketi yako kwa shilingi 1,000/= tu uje kufurahi na timu yako pendwa kwenye
                            mchezo wetu dhidi ya JKT Tanzania Jumapili Septemba 29, 2024. <br /><br />

                            Vituo zinapopatikana tiketi<br /><br />

                            1. Justine Gomwa - Utemini<br />
                            2. James Masegese - Mandewa<br />
                            3. Dofa Phone Accessories - Ipembe<br />
                            4. Hamis Senzota - Majengo<br />
                            5. Hamis Kitila - Ipembe<br /><br />

                            Pia unaweza kununua tiketi yako mapema kwa @ncard_tanzania kupitia simu yako ya mkononi.
                        </p>
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
