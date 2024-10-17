"use client";
import React from 'react';
import styles from "../../styles/Sponsors.module.scss";

const sponsors = [
    {
        name: "NBC",
        image: "/images/nbc.png",
    },
    {
        name: "Azam Max",
        image: "/images/azam.png",
    },
    {
        name: "Kamara",
        image: "/images/gsm.png",
    },
    {
        name: "PM BET",
        image: "/images/pmbet3.png",
    },
    {
        name: "Kamara",
        image: "/images/airtel.webp",
    },
];

const PartnersCard = ({ image, name }) => (
    <div className="col-12 col-md-6 mb-4">
        <div className={`${styles.imageContainer} card`}>
            <div className={styles.imageOverlay}></div>
            <img src={image} alt="News logo" className={styles.carouselImage} />
            <div className={styles.imageTextBelow}>
                <p><strong>{name}</strong></p>
            </div>
        </div>
    </div>
);

const Partners = () => {
    return (
        <div className="container mt-4">
                    <div className="row">
                        {sponsors.map((player) => (
                            <PartnersCard
                                key={player.number}
                                image={player.image}
                                name={player.name}
                            />
                        ))}
                    </div>
        </div>
    );
};

export default Partners;
