"use client";
import React, { useState } from 'react';
import styles from '../../../styles/homePageNews.module.scss';

const PlayerNews = ({ openPopup }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [popupTitle, setPopupTitle] = useState('');
    const [popupImage, setPopupImage] = useState('');

    const handleImageClick = (title, image) => {
        if (openPopup) {
            setPopupTitle(title);
            setPopupImage(image);
            setIsPopupOpen(true);
        }
    };

    return (
        <div className="container">
            <div className={`${styles.scrollableRow} row`}>

                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Mchezaji wetu @gego1561 ameitwa kwenye Kikosi cha Timu ya Taifa @taifastars_ kuelekea michezo miwili ya kuwania tiketi ya kufuzu AFCON 2025 dhidi ya Congo.', '/images/khalid.png')}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src="/images/khalid.png"
                            alt="Picture of the logo"
                            className={styles.carouselImage}
                        />
                        <div className={styles.imageText}>
                            <p>Mchezaji wetu @gego1561 ameitwa kwenye Kikosi cha Timu ya Taifa @taifastars_ kuelekea michezo miwili ya kuwania tiketi ya kufuzu AFCON 2025 dhidi ya Congo.</p>
                        </div>
                        <div className={styles.imageTextBelow}>
                            <p>#nationalteamcallup</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Tunamtakia Heri ya Kumbukizi ya Siku ya Kuzaliwa kwa Beki wetu Ibrahim Imoro', '/images/imoro.png')}
                        style={{ cursor: 'pointer' }}
                    >
                        <img
                            src="/images/imoro.png"
                            alt="Picture of the logo"
                            className={styles.carouselImage}
                        />
                        <div className={styles.imageText}>
                            <p>Tunamtakia Heri ya Kumbukizi ya Siku ya Kuzaliwa kwa Beki wetu Ibrahim Imoro</p>
                        </div>
                        <div className={styles.imageTextBelow}>
                            <p>Happy Birthday @imoro_ibrahim5 🎂 <br /><br />#HappyBirthday</p>
                        </div>
                    </div>
                </div>

                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('Report | SINGIDA BIG STARS 1-1 JKT', '/images/jkt.png')}
                        style={{ cursor: 'pointer' }}
                    >
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

export default PlayerNews;
