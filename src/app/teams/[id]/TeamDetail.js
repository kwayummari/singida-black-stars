"use client";
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from '@/services/api';
import styles from './teamDetails.module.scss';

// Format date of birth to show age
const formatAge = (dateString) => {
  const dob = new Date(dateString);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const monthDiff = today.getMonth() - dob.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--;
  }
  
  return age;
};

// Format height from meters to display format
const formatHeight = (height) => {
  if (!height) return '-';
  return `${height}m`;
};

// Format weight
const formatWeight = (weight) => {
  if (!weight) return '-';
  return `${weight}kg`;
};

export default function TeamDetailClient({ id }) {
  const router = useRouter();
  const [teamData, setTeamData] = useState(null);
  const [activePosition, setActivePosition] = useState('all');
  const [selectedPlayer, setSelectedPlayer] = useState(null);
  const [positions, setPositions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setIsLoading(true);
        const response = await get(`/teams/getTeamPlayers.php?team_id=${id}`);
        
        if (response.status === 'success') {
          setTeamData(response);
          
          // Get unique positions
          if (response.players && response.players.length > 0) {
            const uniquePositions = [...new Set(response.players.map(player => player.position))];
            setPositions(uniquePositions);
          }
        } else {
          setError('Failed to load team data');
        }
      } catch (error) {
        console.error("Error fetching team data:", error);
        setError('Could not load team. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    if (id) {
      fetchTeamData();
    }
  }, [id]);

  // Format category name
  const formatCategoryName = (category) => {
    if (!category) return 'Team';
    
    if (category === 'main') return 'Senior Team';
    if (category.toLowerCase().startsWith('u')) {
      return `Under-${category.substring(1)} Team`;
    }
    if (category === 'women') return 'Women\'s Team';
    
    return category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Get filtered players
  const filteredPlayers = !teamData?.players ? [] : 
    activePosition === 'all' 
      ? teamData.players 
      : teamData.players.filter(player => player.position === activePosition);

  // Animation variants
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

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  // Modal backdrop variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 }
  };

  // Modal content variants
  const modalVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      y: 50
    },
    visible: { 
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 25,
        stiffness: 300
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 50
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.shimmerTeamHeader}></div>
          <div className={styles.shimmerFilters}></div>
          <div className={styles.shimmerPlayersGrid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={styles.shimmerPlayerCard}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error || !teamData) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <h2>Team Not Found</h2>
          <p>{error || "This team could not be loaded."}</p>
          <button 
            className="btn btn-primary"
            onClick={() => router.push('/teams')}
          >
            Back to Teams
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {/* Team Header */}
      <motion.div 
        className={styles.teamHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.teamLogoContainer}>
          <img 
            src={`https://singidablackstars.co.tz/admin/${teamData.team.logo}`}
            height={100}
            alt={`${teamData.team.name} logo`} 
            className={styles.teamLogo}
          />
        </div>
        <div className={styles.teamInfo}>
          <h1>{teamData.team.name}</h1>
          <div className={styles.teamCategory}>
            {formatCategoryName(teamData.team.category)}
          </div>
          {teamData.team.description && (
            <div className={styles.teamDescription}>
              {teamData.team.description}
            </div>
          )}
          <div className={styles.teamStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{teamData.player_count}</span>
              <span className={styles.statLabel}>Players</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>{positions.length}</span>
              <span className={styles.statLabel}>Positions</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Position Filters */}
      <motion.div 
        className={styles.positionFilters}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <button 
          className={`${styles.positionButton} ${activePosition === 'all' ? styles.active : ''}`}
          onClick={() => setActivePosition('all')}
        >
          All Players
        </button>
        
        {positions.map((position, index) => (
          <button 
            key={index}
            className={`${styles.positionButton} ${activePosition === position ? styles.active : ''}`}
            onClick={() => setActivePosition(position)}
          >
            {position}
          </button>
        ))}
      </motion.div>

      {/* Players Grid */}
      {filteredPlayers.length === 0 ? (
        <div className={styles.noPlayersContainer}>
          <i className="bi bi-person-badge"></i>
          <p>No players found in this position.</p>
        </div>
      ) : (
        <motion.div 
          className={styles.playersGrid}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredPlayers.map((player) => (
            <motion.div 
              key={player.id}
              className={styles.playerCard}
              variants={itemVariants}
              whileHover={{ 
                y: -10,
                boxShadow: '0 10px 20px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => setSelectedPlayer(player)}
            >
              <div className={styles.playerNumber}>
                <span>{player.jersey_number}</span>
              </div>
              <div className={styles.playerImageContainer}>
                <img 
                  src={`https://singidablackstars.co.tz/admin/${player.image}`}
                  alt={`${player.first_name} ${player.last_name}`} 
                  className={styles.playerImage}
                />
              </div>
              <div className={styles.playerInfo}>
                <h3>{player.first_name} {player.last_name}</h3>
                <span className={styles.playerPosition}>{player.position}</span>
                <div className={styles.playerFlags}>
                  <span className={styles.playerFlag}>
                    {player.nationality}
                  </span>
                </div>
                <button className={styles.viewProfileButton}>
                  View Profile
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Player Modal */}
      <AnimatePresence>
        {selectedPlayer && (
          <motion.div 
            className={styles.modalBackdrop}
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={() => setSelectedPlayer(null)}
          >
            <motion.div 
              className={styles.modalContent}
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeModal}
                onClick={() => setSelectedPlayer(null)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
              
              <div className={styles.modalHeader}>
                <div className={styles.modalPlayerImage}>
                  <img 
                    src={`https://singidablackstars.co.tz/admin/${selectedPlayer.image}`}
                    alt={`${selectedPlayer.first_name} ${selectedPlayer.last_name}`} 
                  />
                  <div className={styles.modalPlayerNumber}>
                    {selectedPlayer.jersey_number}
                  </div>
                </div>
                <div className={styles.modalPlayerInfo}>
                  <h2>{selectedPlayer.first_name} {selectedPlayer.last_name}</h2>
                  <span className={styles.modalPlayerPosition}>{selectedPlayer.position}</span>
                  <div className={styles.nationalityTag}>
                    {selectedPlayer.nationality}
                  </div>
                </div>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.playerStatsGrid}>
                  <div className={styles.playerStat}>
                    <span className={styles.statLabel}>Age</span>
                    <span className={styles.statValue}>{formatAge(selectedPlayer.date_of_birth)} years</span>
                  </div>
                  <div className={styles.playerStat}>
                    <span className={styles.statLabel}>Height</span>
                    <span className={styles.statValue}>{formatHeight(selectedPlayer.height)}</span>
                  </div>
                  <div className={styles.playerStat}>
                    <span className={styles.statLabel}>Weight</span>
                    <span className={styles.statValue}>{formatWeight(selectedPlayer.weight)}</span>
                  </div>
                  <div className={styles.playerStat}>
                    <span className={styles.statLabel}>Position</span>
                    <span className={styles.statValue}>{selectedPlayer.position}</span>
                  </div>
                </div>
                
                {selectedPlayer.bio && (
                  <div className={styles.playerBio}>
                    <h3>Player Bio</h3>
                    <p>{selectedPlayer.bio}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button */}
      <div className={styles.backToTeams}>
        <Link href="/teams" className="btn btn-secondary">
          <i className="bi bi-arrow-left me-2"></i>
          Back to All Teams
        </Link>
      </div>
    </div>
  );
}