"use client";
import React from 'react';
import styles from "../../styles/AllResults.module.scss";

const matches = [
    {
        date: "Tue 22 Oct",
        time: "9:45 PM",
        location: "A",
        opponent: "Yanga Sc",
        stadium: "Benjamin Mkapa Stadium",
        opponentLogo: "/images/yanga.png",
        score: {
            opponentScore: 3,
            ourScore: 4,
            halftime: "0 - 1"
        }
    },
    {
        date: "Tue 25 Oct",
        time: "9:45 PM",
        location: "H",
        opponent: "Simba Sc",
        stadium: "CCM LITI",
        opponentLogo: "/images/simba.png",
        score: {
            opponentScore: 3,
            ourScore: 4,
            halftime: "0 - 1"
        }
    },
    {
        date: "Tue 28 Oct",
        time: "9:45 PM",
        location: "A",
        opponent: "Azam",
        stadium: "Azam Complex",
        opponentLogo: "/images/azam.webp",
        score: {
            opponentScore: 3,
            ourScore: 4,
            halftime: "0 - 1"
        }
    },
    {
        date: "Tue 22 Oct",
        time: "9:45 PM",
        location: "H",
        opponent: "Coastal Union",
        stadium: "CCM LITI",
        opponentLogo: "/images/coastal.png",
        score: {
            opponentScore: 3,
            ourScore: 4,
            halftime: "0 - 1"
        }
    },
    {
        date: "Tue 22 Oct",
        time: "9:45 PM",
        location: "H",
        opponent: "Fountain Gates",
        stadium: "CCM LITI",
        opponentLogo: "/images/fountain.jpg",
        score: {
            opponentScore: 3,
            ourScore: 4,
            halftime: "0 - 1"
        }
    },
    {
        date: "Tue 22 Oct",
        time: "9:45 PM",
        location: "H",
        opponent: "Pamba Jiji",
        stadium: "CCM LITI",
        opponentLogo: "/images/pamba.png",
        score: {
            opponentScore: 3,
            ourScore: 4,
            halftime: "0 - 1"
        }
    },
];

const AllResults = () => {
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
                        <div></div>
                        <div className={styles.matchDetails}>
                            <div className={styles.team}>
                                <p>Singida Black Stars</p>
                                <img src='/images/logo.png' alt={match.homeTeam} className={styles.teamLogo} />
                            </div>
                            <div className={styles.score}>
                                <p className={styles.header}>FT</p>
                                <p className={styles.fulltimeScore}><strong>{match.score.opponentScore} | {match.score.ourScore}</strong></p>
                                <p className={styles.halftimeScore}>HT {match.score.halftime}</p>
                            </div>
                            <div className={styles.team}>
                                <img src={match.opponentLogo} alt={match.awayTeam} className={styles.teamLogo} />
                                <p>{match.opponent}</p>
                            </div>
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

export default AllResults;