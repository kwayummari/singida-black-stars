"use client";
import React from 'react';
import styles from "../../styles/Team.module.scss";

const playerData = [
    {
        category: "GoalKeepers",
        number: "1",
        FirstName: "Mohamed",
        LastName: "Kamara",
        image: "/images/kamara.png",
    },
    {
        category: "Defenders",
        number: "4",
        FirstName: "Khalid",
        LastName: "Habibu",
        image: "/images/khalid.png",
    },
    {
        category: "Midfielders",
        number: "10",
        FirstName: "Tchakei",
        LastName: "Marouf",
        image: "/images/tchakei.png",
    },
    {
        category: "Forwards",
        number: "39",
        FirstName: "Elvis",
        LastName: "Rupia",
        image: "/images/elvis.png",
    },
    {
        category: "Forwards",
        number: "9",
        FirstName: "Victorien",
        LastName: "Adebayor",
        image: "/images/adebayo.png",
    },
];

const groupPlayersByCategory = (players) => {
    return players.reduce((acc, player) => {
        const { category } = player;
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(player);
        return acc;
    }, {});
};

const PlayerCard = ({ image, number, LastName, FirstName, category }) => (
    <div className="col-12 col-md-3 mb-4">
        <div className={`${styles.imageContainer} card`}>
            <div className={styles.imageOverlay}></div>
            <img src={image} alt="News logo" className={styles.carouselImage} />
            <div className={styles.imageText}>
                <p>{number}</p>
            </div>
            <div className={styles.imageTextBelow}>
                <p>{LastName}<br /> <strong>{FirstName}</strong></p>
            </div>
            <div className={styles.categories}>
                <p>{category}</p>
            </div>
        </div>
    </div>
);

const AllTeam = () => {
    const groupedPlayers = groupPlayersByCategory(playerData);

    return (
        <div className="container">
            {Object.entries(groupedPlayers).map(([category, players]) => (
                <div key={category} className="mb-5">
                    <h2 className="text-left mb-3"><strong>{category}</strong></h2>
                    <div className="row">
                        {players.map((player) => (
                            <PlayerCard
                                key={player.number}
                                image={player.image}
                                number={player.number}
                                LastName={player.LastName}
                                FirstName={player.FirstName}
                                category={player.category}
                            />
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllTeam;
