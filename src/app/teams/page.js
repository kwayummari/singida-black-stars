"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { get } from '@/services/api';
import styles from '../../styles/team.module.scss';

// Teams page component
export default function TeamsPage() {
  const [teams, setTeams] = useState([]);
  const [activeCategory, setActiveCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch teams data
  useEffect(() => {
    const fetchTeams = async () => {
      try {
        setIsLoading(true);
        const response = await get('/teams/getAllTeams.php');
        
        if (response.status === 'success') {
          // Filter only Singida Black Stars teams
          const singidaTeams = response.data.filter(team => 
            team.name.toLowerCase().includes('singida') || 
            team.name.toLowerCase().includes('black stars')
          );
          
          setTeams(singidaTeams);
          
          // Extract unique categories from Singida teams only
          const uniqueCategories = [...new Set(singidaTeams.map(team => team.category))];
          setCategories(uniqueCategories);
        } else {
          setError('Failed to load teams data');
        }
      } catch (error) {
        console.error("Error fetching teams:", error);
        setError('Could not load teams. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchTeams();
  }, []);

  // Get filtered teams based on active category
  const filteredTeams = activeCategory === 'all' 
    ? teams 
    : teams.filter(team => team.category === activeCategory);

  // Format category name for display
  const formatCategoryName = (category) => {
    if (!category) return 'Uncategorized';
    
    if (category === 'main') return 'Senior Team';
    if (category.toLowerCase().startsWith('u')) {
      return `Under-${category.substring(1)} Team`;
    }
    if (category === 'women') return 'Women\'s Team';
    
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  // Item animation variants
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className={styles.teamsPage}>
      <motion.div 
        className={styles.pageHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1>Our Teams</h1>
        <p>Singida Black Stars Football Club is proud to feature several teams across different age groups and categories.</p>
      </motion.div>

      {/* Category filters */}
      <motion.div 
        className={styles.categoryFilters}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button 
          className={`${styles.categoryButton} ${activeCategory === 'all' ? styles.active : ''}`}
          onClick={() => setActiveCategory('all')}
        >
          All Teams
        </button>
        
        {categories.map((category, index) => (
          <button 
            key={index}
            className={`${styles.categoryButton} ${activeCategory === category ? styles.active : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {formatCategoryName(category)}
          </button>
        ))}
      </motion.div>

      {/* Loading state */}
      {isLoading && (
        <div className={styles.loadingContainer}>
          <div className={styles.shimmerCard}></div>
          <div className={styles.shimmerCard}></div>
          <div className={styles.shimmerCard}></div>
        </div>
      )}

      {/* Error state */}
      {!isLoading && error && (
        <div className={styles.errorContainer}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <p>{error}</p>
          <button 
            className="btn btn-primary mt-3"
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Retry
          </button>
        </div>
      )}

      {/* Empty state */}
      {!isLoading && !error && filteredTeams.length === 0 && (
        <div className={styles.emptyContainer}>
          <i className="bi bi-people"></i>
          <p>No teams found in this category.</p>
        </div>
      )}

      {/* Teams grid */}
      {!isLoading && !error && filteredTeams.length > 0 && (
        <motion.div 
          className={styles.teamsGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredTeams.map((team) => (
            <motion.div 
              key={team.id}
              className={styles.teamCard}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)'
              }}
            >
              <Link href={`/teams/${team.id}`}>
                <div className={styles.teamLogo}>
                  <img src={`https://singidablackstars.co.tz/admin/${team.logo}`} alt={`${team.name} logo`} />
                </div>
                <div className={styles.teamInfo}>
                  <h3>{team.name}</h3>
                  <span className={styles.teamCategory}>
                    {formatCategoryName(team.category)}
                  </span>
                  <div className={styles.teamMeta}>
                    <span><i className="bi bi-people-fill"></i> {team.player_count} Players</span>
                  </div>
                  <div className={styles.viewTeam}>
                    View Squad <i className="bi bi-arrow-right"></i>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Academy information */}
      <motion.div 
        className={styles.academySection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
      >
        <div className={styles.academyContent}>
          <h2>Singida Black Stars Academy</h2>
          <p>
            Our club is committed to developing young talent through our comprehensive academy system. 
            From Under-16 to Under-23, we provide professional coaching and development pathways
            for young players to progress to our senior team.
          </p>
          <Link href="/academy" className={styles.academyButton}>
            Learn More About Our Academy
          </Link>
        </div>
        <div className={styles.academyImage}>
        <img src="/images/warmup.png" alt="Academy training" />
        </div>
      </motion.div>
    </div>
  );
}