"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from "../../styles/AllResults.module.scss";
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
            <div className={`col-md-3 ${styles.part1}`}>
                <div className={styles.shimmerLeagueLogo}></div>
                <div className={styles.shimmerDate}></div>
            </div>
            <div className={`col-md-9 ${styles.part2}`}>
                <div className={styles.shimmerMatchDetails}></div>
                <div className={styles.shimmerButton}></div>
            </div>
        </div>
    </motion.div>
);

const AllResults = () => {
    const [resultsData, setResultsData] = useState([]);
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
        const fetchResults = async () => {
            try {
                setLoading(true);
                
                // Build query parameters
                const params = { season: currentSeason };
                if (selectedCompetition) {
                    params.competition_id = selectedCompetition;
                }
                
                const data = await get('/results/getAllResults.php', params);
                setResultsData(data);
                setError(null);
            } catch (error) {
                console.error("Failed to load results:", error);
                setError("Failed to load match results. Please try again later.");
            } finally {
                setLoading(false);
            }
        };
    
        fetchResults();
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

            {/* No results message */}
            {!loading && resultsData.length === 0 && !error && (
                <div className={styles.noResultsContainer}>
                    <i className="bi bi-calendar-x"></i>
                    <p>No match results found.</p>
                    <p className={styles.noResultsSubtext}>Try changing your filter selections.</p>
                </div>
            )}

            {/* Results list */}
            <AnimatePresence>
                {!loading && resultsData.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                    >
                        {resultsData.map((result, index) => (
                            <motion.div 
                                key={result.id || index}
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
                                            src={`https://singidablackstars.co.tz/admin/${result.competitionImage}`} 
                                            alt={result.competition} 
                                            className={styles.leagueLogo} 
                                        />
                                        <div>
                                            <p>{result.date}</p>
                                            <p><strong>{result.time}</strong></p>
                                        </div>
                                    </div>
                                    <div className={result.isHome === "1" ? styles.locationH : styles.locationA}>
                                        {result.isHome === "1" ? 'H' : 'A'}
                                    </div>
                                </div>
                                <div className={`col-md-9 ${styles.part2}`}>
                                    <div></div>
                                    <div className={styles.matchDetails}>
                                        <div className={styles.team}>
                                            <p>{result.homeTeamName}</p>
                                            <img 
                                                src={`https://singidablackstars.co.tz/admin/${result.homeTeamLogo}`} 
                                                alt={result.homeTeamName} 
                                                className={styles.teamLogo} 
                                            />
                                        </div>
                                        <div className={styles.score}>
                                            <p className={styles.header}>FT</p>
                                            <p className={styles.fulltimeScore}>
                                                <strong>{result.homeTeamScoreFt} | {result.awayTeamScoreFt}</strong>
                                            </p>
                                            <p className={styles.halftimeScore}>
                                                HT {result.homeTeamScoreHt} - {result.awayTeamScoreHt}
                                            </p>
                                        </div>
                                        <div className={styles.team}>
                                            <img 
                                                src={`https://singidablackstars.co.tz/admin/${result.awayTeamLogo}`} 
                                                alt={result.awayTeamName} 
                                                className={styles.teamLogo} 
                                            />
                                            <p>{result.awayTeamName}</p>
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

export default AllResults;