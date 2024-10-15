"use client";
import React, { useState } from 'react';
import styles from "../../styles/allNews.module.scss";

const newsData = [
    {
        id: 1,
        image: "/images/nyerere.png",
        title: "Tutakuenzi Daima Baba wa Taifa, Mwl. Julius Kambarage Nyerere 🇹🇿",
        description: "Kumbukizi ya baba wa taifa",
    },
    {
        id: 2,
        image: "/images/Taifa.png",
        title: "Tunaitakia Timu ya Taifa @taifastars_🇹🇿 kila la kheri kwenye mchezo wa leo ugenini dhidi ya Congo DR.",
        description: "@taifastars_🇹🇿",
    },
    {
        id: 3,
        image: "/images/next.png",
        title: `Singida Black Stars SC 🆚 Namungo FC
                🗓️ Oktoba 20, 2024
                🕓 Saa 10:00 Jioni
                🏟️ CCM Liti Stadium
                🏆NBC Premier League`,
        description: "Match Day | 4 days to go",
    },
    {
        id: 4,
        image: "/images/jkt.png",
        title: "Report | SINGIDA BIG STARS 1-1 JKT",
        description: "Match Reports | 2 days ago",
    },
    {
        id: 4,
        image: "/images/warmup.png",
        title: "Timu yetu ina jezi kali za warmup kuliko timu zote msimu huu.",
        description: "Kazi nzuri ya @wakazitanzania",
    },
    {
        id: 4,
        image: "/images/liti.png",
        title: "Unatamani tuboreshe kitu gani unapokuja uwanjani CCM LITI kutazama mechi zetu?",
        description: "Tunasoma maoni.",
    },
    {
        id: 4,
        image: "/images/jkt.png",
        title: "Report | SINGIDA BIG STARS 1-1 JKT",
        description: "Match Reports | 2 days ago",
    },
    {
        id: 4,
        image: "/images/jkt.png",
        title: "Report | SINGIDA BIG STARS 1-1 JKT",
        description: "Match Reports | 2 days ago",
    },
];

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
    const [selectedCard, setSelectedCard] = useState(null);
    const handleCardClick = (item) => {
        setSelectedCard(item);
    };

    const closeModal = () => {
        setSelectedCard(null);
    };
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
                                <p>{selectedCard.reportDate}</p>
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