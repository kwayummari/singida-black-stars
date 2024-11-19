"use client";
import React, { useState, useEffect } from 'react';
import styles from "../../styles/AllMatches.module.scss";
import { get } from '@/services/api';

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
const AllMatches = () => {
    const [matchesData, setMatchesData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                const data = await get('/matches/getAllMatches.php');
                setMatchesData(data);
            } catch (error) {
                setError("Failed to load matches. Please try again later.");
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
                        <div className={styles.opponent}>
                            <img src={match.opponentLogo} alt={match.opponent} className={styles.opponentLogo} />
                            <p><strong>{match.opponent}</strong> <br />{match.stadium}</p>
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

export default AllMatches;