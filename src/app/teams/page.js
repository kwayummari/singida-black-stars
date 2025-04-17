"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from '@/services/api';
import styles from '../../styles/team.module.scss';

export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teams data
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setLoading(true);
        const teamsData = await get('/teams/getAllTeams.php');
        
        if (Array.isArray(teamsData)) {
          setTeams(teamsData);
        } else {
          setError('Failed to load teams data');
        }
      } catch (error) {
        console.error("Failed to load teams:", error);
        setError('Failed to load teams. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Individual card animation variants
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -10,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2)",
      transition: { duration: 0.3 }
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="container py-5">
        <div className={styles.pageHeader}>
          <div className={styles.titleShimmer}></div>
          <div className={styles.subtitleShimmer}></div>
        </div>
        <div className="row">
          {[1, 2, 3, 4, 5, 6].map(i => (
            <div key={i} className="col-md-4 col-sm-6 mb-4">
              <div className={styles.teamCardShimmer}>
                <div className={styles.logoShimmer}></div>
                <div className={styles.nameShimmer}></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="container py-5">
        <div className={styles.errorContainer}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <h2>Unable to Load Teams</h2>
          <p>{error}</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-5">
      <motion.div 
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className={styles.pageTitle}>Teams</h1>
        <p className={styles.pageSubtitle}>
          Explore the teams competing alongside Singida Black Stars in different competitions
        </p>
      </motion.div>

      <motion.div 
        className="row"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {teams.map((team) => (
          <div key={team.id} className="col-md-4 col-sm-6 mb-4">
            <motion.div 
              className={styles.teamCard}
              variants={cardVariants}
              whileHover="hover"
            >
              <Link href={`/teams/${team.id}`} className={styles.teamLink}>
                <div className={styles.teamLogo}>
                  <img src={team.logo} alt={team.name} />
                </div>
                <h2 className={styles.teamName}>
                  {team.name}
                  <span className={styles.shortName}>{team.short_name}</span>
                </h2>
                <div className={styles.viewTeam}>
                  <span>View Team</span>
                  <i className="bi bi-arrow-right-circle"></i>
                </div>
              </Link>
            </motion.div>
          </div>
        ))}
      </motion.div>
    </div>
  );
}