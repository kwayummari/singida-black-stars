"use client";
import React, { useState, useEffect } from 'react';
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

const ShimmerCard = () => (
    <div className="col-12 col-md-3 mb-4">
        <div className={`row mb-2 ${styles.card}`}>
            <div className={`col-3 ${styles.part1}`}>
                <div className={styles.paragraphs}>
                    {/* <img src="/images/nbc2.png" alt="NBC Premier League" className={styles.leagueLogo} /> */}
                    <p> <br /><strong></strong></p>
                </div>
                {/* <p className={match.isHome === "1" ? styles.locationH : styles.locationA}>{match.isHome === "1" ? 'H' : 'A'}</p> */}
            </div>
            <div className={`col-9 ${styles.part2}`}>
                <div className={styles.opponent}>
                    {/* <img src={match.opponentLogo} alt={match.opponent} className={styles.opponentLogo} /> */}
                    {/* <p><strong>{match.opponent}</strong> <br />{match.stadium}</p> */}
                </div>
                {/* <button type="button" className={`btn btn-success ${styles.button}`}>
                            <i className="bi bi-dribbble"></i> <strong>Match Center</strong>
                        </button> */}
            </div>
        </div>
    </div>
);

const AllResults = () => {
    const [matchesData, setMatchesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await get('/results/getAllResults.php');
                setMatchesData(data);
            } catch (error) {
                setError("Failed to load results. Please try again later.");
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className="container">
            {loading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {loading ? (
                [1, 2, 3, 4].map((_, index) => (
                    <ShimmerCard key={index} />
                ))
            ) : matchesData.length === 0 ? (
                <p>No matches available</p>
            ) : (
                matchesData.map((match, index) => (
                    <div key={index} className={`row mb-2 ${styles.card}`}>
                        <div className={`col-3 ${styles.part1}`}>
                            <div className={styles.paragraphs}>
                                <img src={match.competitionImage} alt="NBC Premier League" className={styles.leagueLogo} />
                                <p>{match.date} <br /><strong>{match.time}</strong></p>
                            </div>
                            <p className={match.isHome === "1" ? styles.locationH : styles.locationA}>{match.isHome === "1" ? 'H' : 'A'}</p>
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
                ))
            )}
        </div>
    );
};

export default AllResults;