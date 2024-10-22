"use client";
import React, { useState } from 'react';
import styles from '../../../styles/neck.module.scss';
import League from '../League/league';
import NextMatch from '../NextMatch/NextMatch';

const Neck = ({ openPopup }) => {
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

                {/* Second Image Container */}
                <div className="col-12 col-md-3">
                    <div
                        className={`${styles.imageContainer} card`}
                        onClick={() => handleImageClick('33_metacha ndiye Golikipa wa kwanza kuokoa mkwaju wa penati kwenye @ligikuu ya @nbc_tanzania msimu wa 2024/2025.', '/images/metacha.png')}
                        style={{ cursor: 'pointer' }}
                    >
                        <div className={styles.imageOverlay}></div>
                        <img
                            src="/images/metacha.png"
                            alt="Picture of the logo"
                            className={styles.carouselImage}
                        />
                        <div className={styles.imageText}>
                            <p>Golikipa wa kwanza kuokoa penati msimu wa 2024/2025.</p>
                        </div>
                        <div className={styles.imageTextBelow}>
                            <p>@ligikuu @tanfootball @nbc_tanzania @azamtvsports @tbc_online</p>
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
