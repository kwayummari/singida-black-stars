"use client";
import React from 'react';
import styles from "../../styles/AllMatches.module.scss";

const matches = [
    {
        date: "Tue 22 Oct",
        time: "9:45 PM",
        location: "A",
        opponent: "Yanga Sc",
        stadium: "Benjamin Mkapa Stadium",
        opponentLogo: "/images/yanga.png",
    },
    {
        date: "Tue 25 Oct",
        time: "9:45 PM",
        location: "H",
        opponent: "Simba Sc",
        stadium: "CCM LITI",
        opponentLogo: "/images/simba.png",
    },
    {
        date: "Tue 28 Oct",
        time: "9:45 PM",
        location: "A",
        opponent: "Azam",
        stadium: "Azam Complex",
        opponentLogo: "/images/azam.webp",
    },
    {
        date: "Tue 22 Oct",
        time: "9:45 PM",
        location: "H",
        opponent: "Coastal Union",
        stadium: "CCM LITI",
        opponentLogo: "/images/coastal.png",
    },
    {
        date: "Tue 22 Oct",
        time: "9:45 PM",
        location: "H",
        opponent: "Fountain Gates",
        stadium: "CCM LITI",
        opponentLogo: "/images/fountain.jpg",
    },
    {
        date: "Tue 22 Oct",
        time: "9:45 PM",
        location: "H",
        opponent: "Pamba Jiji",
        stadium: "CCM LITI",
        opponentLogo: "/images/pamba.png",
    },
];

const AllMatches = () => {
    return (
        <div className="container">
            {matches.map((match, index) => (
                <div key={index} className={`row mb-2 ${styles.card}`}>
                    <div className={`col-3 ${styles.part1}`}>
                        <div className={styles.paragraphs}>
                            <img src="/images/nbc2.png" alt="NBC Premier League" className={styles.leagueLogo} />
                            <p>{match.date} <br /><strong>{match.time}</strong></p>
                        </div>
                        <p className={match.location === "H" ? styles.locationH : styles.locationA}>{match.location}</p>
                    </div>
                    <div className={`col-9 ${styles.part2}`}>
                        <div className={styles.opponent}>
                            <img src={match.opponentLogo} alt={match.opponent} className={styles.opponentLogo} />
                            <p><strong>{match.opponent}</strong> <br />{match.stadium}</p>
                        </div>
                        <button type="button" className={`btn btn-success ${styles.button}`}>
                            <i className="bi bi-dribbble"></i> <strong>Match Center</strong>
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AllMatches;
