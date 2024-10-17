"use client";
import React from 'react';
import styles from "../../styles/Sponsors.module.scss";

const sponsors = [
    {
        name: "Kamara",
        image: "/images/kamara.png",
    },
    {
        name: "Kamara",
        image: "/images/kamara.png",
    },
    {
        name: "Kamara",
        image: "/images/kamara.png",
    },
    {
        name: "Kamara",
        image: "/images/kamara.png",
    },
    {
        name: "Kamara",
        image: "/images/kamara.png",
    },
];

const PlayerCard = ({ image, name }) => (
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

const AllTeam = () => {
    return (
        <div className="container">
                    <div className="row">
                        {sponsors.map((player) => (
                            <PlayerCard
                                key={player.number}
                                image={player.image}
                                name={player.name}
                            />
                        ))}
                    </div>
        </div>
    );
};

export default AllTeam;
