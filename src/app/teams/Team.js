"use client";
import React from 'react';
import styles from "../../styles/Team.module.scss";

const playerData = [
    {
        category: "GoalKeepers",
        number: "1",
        FirstName: "Jojo",
        LastName: "Wollacott",
        image: "/images/yanga.png",
    },
    {
        category: "Mid fielders",
        number: "1",
        FirstName: "Tchakei",
        LastName: "Marouf",
        image: "/images/tchakei.png",
    },
  ]

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
    return (
        <div className="container">
            <div className="row mt-2">
                {playerData.map((Player) => (
                    <PlayerCard
                        key={Player.id}
                        image={Player.image}
                        number={Player.number}
                        LastName={Player.LastName}
                        FirstName={Player.FirstName}
                        category={Player.category}
                    />
                ))}
            </div>
        </div>
    );
}

export default AllTeam;