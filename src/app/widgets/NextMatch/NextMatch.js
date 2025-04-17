import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../../styles/nextMatch.module.scss';
import { get } from '@/services/api';

const NextMatch = () => {
  const [nextMatch, setNextMatch] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNextMatch = async () => {
      try {
        setIsLoading(true);
        // Get the next match (first one from upcoming matches)
        const matches = await get('/matches/upcomingMatches.php', { limit: 1 });
        
        if (matches && matches.length > 0) {
          setNextMatch(matches[0]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch next match:", error);
        setError("Failed to load next match information");
        setIsLoading(false);
      }
    };

    fetchNextMatch();
  }, []);

  // Show loading state
  if (isLoading) {
    return (
      <div className={styles.nextMatchCard}>
        <div className={styles.shimmerContainer}>
          <div className={styles.shimmerHeader}></div>
          <div className={styles.shimmerTeam}></div>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className={styles.nextMatchCard}>
        <div className={styles.errorContainer}>
          <i className="bi bi-exclamation-circle"></i>
          <p>Unable to load next match</p>
        </div>
      </div>
    );
  }

  // Show no matches state
  if (!nextMatch) {
    return (
      <div className={styles.nextMatchCard}>
        <div className={styles.noMatchContainer}>
          <i className="bi bi-calendar-x"></i>
          <p>No upcoming matches scheduled</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.nextMatchCard}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <motion.img 
          src={nextMatch.competitionImage} 
          alt={nextMatch.competition}
          className={styles.leagueLogo}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.3 }}
        />
        <motion.div 
          className={styles.matchDetails}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <p>Next Match</p>
          <p>{nextMatch.date} <strong>{nextMatch.time}</strong></p>
        </motion.div>
        <motion.div 
          className={styles.awayIndicator}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.3 }}
        >
          {nextMatch.isHome === '1' ? 'H' : 'A'}
        </motion.div>
      </div>
      
      <motion.div 
        className={styles.teamDetails}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.3 }}
      >
        <img 
          src={nextMatch.opponentLogo} 
          alt={nextMatch.opponent} 
          className={styles.teamLogo} 
        />
        <div>
          <p className={styles.teamName}>{nextMatch.opponent}</p>
          <p className={styles.stadium}>{nextMatch.stadium}</p>
        </div>
      </motion.div>
      
      <motion.div 
        className={styles.ctaButton}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.3 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <button className="btn btn-sm btn-success">
          <i className="bi bi-calendar-check me-1"></i> Match Details
        </button>
      </motion.div>
    </motion.div>
  );
};

export default NextMatch;