import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styles from '../../../styles/league.module.scss';
import { get } from '@/services/api';

const FullLeague = () => {
  const [leagueData, setLeagueData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const singidaRowRef = useRef(null);

  useEffect(() => {
    const fetchLeagueStandings = async () => {
      try {
        setIsLoading(true);
        // Get the active league standings
        const data = await get('/leagues/getStandings.php');
        setLeagueData(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Failed to fetch league standings:", error);
        setError("Failed to load league standings. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchLeagueStandings();
  }, []);

  useEffect(() => {
    // Scroll to Singida Black Stars row when data is loaded
    if (leagueData && singidaRowRef.current) {
      singidaRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [leagueData]);

  // If loading, show shimmer effect
  if (isLoading) {
    return (
      <div className={styles.leagueTable}>
        <div className={styles.shimmerContainer}>
          <div className={styles.shimmerHeader}></div>
          {[1, 2, 3, 4, 5, 6, 7].map(index => (
            <div key={index} className={styles.shimmerRow}></div>
          ))}
        </div>
      </div>
    );
  }

  // If error, show error message
  if (error) {
    return (
      <div className={styles.leagueTable}>
        <div className={styles.errorContainer}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  // If no data, show message
  if (!leagueData || !leagueData.standings || leagueData.standings.length === 0) {
    return (
      <div className={styles.leagueTable}>
        <div className={styles.noDataContainer}>
          <i className="bi bi-table"></i>
          <p>No league standings available.</p>
        </div>
      </div>
    );
  }

  // Determine if a team is Singida Black Stars
  const isSingidaTeam = (teamName) => {
    return teamName.toLowerCase().includes('singida') || teamName.toLowerCase().includes('black stars');
  };

  return (
    <div className={styles.leagueTable}>
      <div className={styles.leagueHeader}>
        <motion.img 
          src={leagueData.league.logo} 
          alt={leagueData.league.name} 
          className={styles.leagueLogo}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        />
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <h4 className={styles.leagueTitle}>{leagueData.league.name}</h4>
          <p className={styles.leagueSeason}>{leagueData.league.season}</p>
        </motion.div>
      </div>
      
      <motion.table 
        className={styles.table}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <thead>
          <tr>
            <th>#</th>
            <th>Team</th>
            <th>P</th>
            <th className={styles.hideMobile}>W</th>
            <th className={styles.hideMobile}>D</th>
            <th className={styles.hideMobile}>L</th>
            <th>GD</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {leagueData.standings.map((team) => (
            <motion.tr
              key={team.team_id}
              ref={isSingidaTeam(team.team_name) ? singidaRowRef : null}
              className={isSingidaTeam(team.team_name) ? styles.highlightRow : ''}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 * team.position, duration: 0.3 }}
              whileHover={{ backgroundColor: '#f5f5f5' }}
            >
              <td>{team.position}</td>
              <td className={styles.teamInfo}>
                <img src={team.team_logo} alt={team.team_name} className={styles.logo} />
                <span className={styles.teamName}>{team.team_name}</span>
              </td>
              <td>{team.played}</td>
              <td className={styles.hideMobile}>{team.won}</td>
              <td className={styles.hideMobile}>{team.drawn}</td>
              <td className={styles.hideMobile}>{team.lost}</td>
              <td>{team.goal_difference}</td>
              <td className={styles.points}>{team.points}</td>
            </motion.tr>
          ))}
        </tbody>
      </motion.table>
    </div>
  );
};

export default FullLeague;