"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "../../styles/AllMatches.module.scss";
import { get } from '@/services/api';

// Shimmer component for loading state
const ShimmerCard = () => (
    <motion.div 
        className="col-12 mb-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
    >
        <div className={`row mb-2 ${styles.card} ${styles.shimmerCard}`}>
            <div className={`col-3 ${styles.part1}`}>
                <div className={styles.shimmerLeagueLogo}></div>
                <div className={styles.shimmerDate}></div>
            </div>
            <div className={`col-9 ${styles.part2}`}>
                <div className={styles.shimmerOpponent}></div>
                <div className={styles.shimmerButton}></div>
            </div>
        </div>
    </motion.div>
);

const AllMatches = () => {
    const [matchesData, setMatchesData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentSeason, setCurrentSeason] = useState('2024/2025');
    const [selectedCompetition, setSelectedCompetition] = useState(null);
    const [competitions, setCompetitions] = useState([]);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                // This would be a new API endpoint to get all competitions
                const data = await get('/competitions/getAllCompetitions.php');
                setCompetitions(data);
            } catch (error) {
                console.error("Failed to load competitions:", error);
            }
        };

        fetchCompetitions();
    }, []);

    useEffect(() => {
        const fetchMatches = async () => {
            try {
                setLoading(true);
                
                // Build query parameters
                const params = { season: currentSeason };
                if (selectedCompetition) {
                    params.competition_id = selectedCompetition;
                }
                
                const data = await get('/matches/getAllMatches.php', params);
                setMatchesData(data);
                setError(null);
            } catch (error) {
                console.error("Failed to load matches:", error);
                setError("Failed to load matches. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchMatches();
    }, [currentSeason, selectedCompetition]);

    // Handle competition filter change
    const handleCompetitionChange = (e) => {
        const value = e.target.value;
        setSelectedCompetition(value ? parseInt(value) : null);
    };

    // Handle season filter change
    const handleSeasonChange = (e) => {
        setCurrentSeason(e.target.value);
    };

    return (
        <div className="container">
            {/* Filter controls */}
            <div className={styles.filterContainer}>
                <div className="row mb-4">
                    <div className="col-md-6 mb-2 mb-md-0">
                        <label htmlFor="seasonFilter" className={styles.filterLabel}>Season:</label>
                        <select 
                            id="seasonFilter" 
                            className="form-select"
                            value={currentSeason}
                            onChange={handleSeasonChange}
                        >
                            <option value="2024/2025">2024/2025</option>
                            <option value="2023/2024">2023/2024</option>
                        </select>
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="competitionFilter" className={styles.filterLabel}>Competition:</label>
                        <select 
                            id="competitionFilter" 
                            className="form-select"
                            value={selectedCompetition || ''}
                            onChange={handleCompetitionChange}
                        >
                            <option value="">All Competitions</option>
                            {competitions.map(comp => (
                                <option key={comp.id} value={comp.id}>
                                    {comp.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Error message */}
            {error && (
                <div className="alert alert-danger" role="alert">
                    <i className="bi bi-exclamation-triangle-fill me-2"></i>
                    {error}
                </div>
            )}

            {/* Loading state */}
            <AnimatePresence>
                {loading && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {[1, 2, 3, 4].map((_, index) => (
                            <ShimmerCard key={index} />
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* No matches message */}
            {!loading && matchesData.length === 0 && !error && (
                <div className={styles.noMatchesContainer}>
                    <i className="bi bi-calendar-x"></i>
                    <p>No scheduled matches found.</p>
                    <p className={styles.noMatchesSubtext}>Try changing your filter selections.</p>
                </div>
            )}

            {/* Matches list */}
            <AnimatePresence>
                {!loading && matchesData.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {matchesData.map((match, index) => (
                            <motion.div 
                                key={match.id || index}
                                className={`row mb-3 ${styles.card}`}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                whileHover={{ 
                                    y: -5,
                                    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
                                }}
                            >
                                <div className={`col-md-3 ${styles.part1}`}>
                                    <div className={styles.paragraphs}>
                                        <img 
                                            src={`https://singidablackstars.co.tz/admin/${match.competitionImage}`} 
                                            alt={match.competition} 
                                            className={styles.leagueLogo} 
                                        />
                                        <div>
                                            <p>{match.date}</p>
                                            <p><strong>{match.time}</strong></p>
                                        </div>
                                    </div>
                                    <div className={match.isHome === "1" ? styles.locationH : styles.locationA}>
                                        {match.isHome === "1" ? 'H' : 'A'}
                                    </div>
                                </div>
                                <div className={`col-md-9 ${styles.part2}`}>
                                    <div className={styles.opponent}>
                                        <img 
                                            src={`https://singidablackstars.co.tz/admin/${match.opponentLogo}`} 
                                            alt={match.opponent} 
                                            className={styles.opponentLogo} 
                                        />
                                        <div>
                                            <p><strong>{match.opponent}</strong></p>
                                            <p>{match.stadium}</p>
                                        </div>
                                    </div>
                                    <motion.button 
                                        type="button" 
                                        className={`btn btn-success ${styles.button}`}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <i className="bi bi-dribbble me-2"></i>
                                        <strong>Match Center</strong>
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AllMatches;