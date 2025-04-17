"use client";
import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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

export default function TeamDetailPage() {
  const { id } = useParams();
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
          <div className={styles.shimmerHeader}></div>
          <div className={styles.shimmerTabs}></div>
          <div className={styles.shimmerGrid}>
            <div className={styles.shimmerCard}></div>
            <div className={styles.shimmerCard}></div>
            <div className={styles.shimmerCard}></div>
            <div className={styles.shimmerCard}></div>
            <div className={styles.shimmerCard}></div>
            <div className={styles.shimmerCard}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <h2>Team Not Found</h2>
          <p>{error}</p>
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

  // If no team data is loaded yet
  if (!teamData || !teamData.team) {
    return null;
  }

  const team = teamData.team;

  return (
    <div className={styles.container}>
      {/* Team Header */}
      <motion.div 
        className={styles.teamHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className={styles.teamLogo}>
          <img src={team.logo} alt={`${team.name} logo`} />
        </div>
        <div className={styles.teamInfo}>
          <h1>{team.name}</h1>
          <span className={styles.teamCategory}>{formatCategoryName(team.category)}</span>
          {team.description && <p className={styles.teamDescription}>{team.description}</p>}
        </div>
      </motion.div>

      {/* Breadcrumb */}
      <motion.div 
        className={styles.breadcrumb}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Link href="/">Home</Link> / 
        <Link href="/teams">Teams</Link> / 
        <span className={styles.current}>{team.name}</span>
      </motion.div>

      {/* Position Filters */}
      <motion.div 
        className={styles.positionFilters}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
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

      {/* Players count */}
      <motion.div 
        className={styles.playersCount}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <i className="bi bi-people-fill me-2"></i>
        {filteredPlayers.length} Player{filteredPlayers.length !== 1 ? 's' : ''}
      </motion.div>

      {/* Empty state */}
      {filteredPlayers.length === 0 && (
        <div className={styles.emptyContainer}>
          <i className="bi bi-person-badge"></i>
          <p>No players found in this position.</p>
          <button 
            className="btn btn-outline-primary mt-3"
            onClick={() => setActivePosition('all')}
          >
            View All Players
          </button>
        </div>
      )}

      {/* Players Grid */}
      {filteredPlayers.length > 0 && (
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
                y: -5,
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.1)'
              }}
              onClick={() => setSelectedPlayer(player)}
            >
              <div className={styles.playerNumber}>{player.jersey_number}</div>
              <div className={styles.playerImage}>
                <img src={player.image} alt={`${player.first_name} ${player.last_name}`} />
              </div>
              <div className={styles.playerInfo}>
                <h3>{player.first_name} {player.last_name}</h3>
                <span className={styles.playerPosition}>{player.position}</span>
                <div className={styles.playerMeta}>
                  <span><i className="bi bi-flag"></i> {player.nationality}</span>
                  <span><i className="bi bi-calendar"></i> {formatAge(player.date_of_birth)} yrs</span>
                </div>
                <div className={styles.viewPlayer}>
                  View Profile
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Team Staff Section */}
      <motion.div 
        className={styles.teamStaffSection}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <h2>Team Staff</h2>
        <div className={styles.staffGrid}>
          <div className={styles.staffCard}>
            <div className={styles.staffImage}>
              <img src="/images/coach.jpg" alt="Head Coach" />
            </div>
            <div className={styles.staffInfo}>
              <h3>James Thompson</h3>
              <span className={styles.staffRole}>Head Coach</span>
            </div>
          </div>
          <div className={styles.staffCard}>
            <div className={styles.staffImage}>
              <img src="/images/assistant-coach.jpg" alt="Assistant Coach" />
            </div>
            <div className={styles.staffInfo}>
              <h3>Michael Johnson</h3>
              <span className={styles.staffRole}>Assistant Coach</span>
            </div>
          </div>
          <div className={styles.staffCard}>
            <div className={styles.staffImage}>
              <img src="/images/fitness-coach.jpg" alt="Fitness Coach" />
            </div>
            <div className={styles.staffInfo}>
              <h3>Robert Davis</h3>
              <span className={styles.staffRole}>Fitness Coach</span>
            </div>
          </div>
          <div className={styles.staffCard}>
            <div className={styles.staffImage}>
              <img src="/images/physiotherapist.jpg" alt="Physiotherapist" />
            </div>
            <div className={styles.staffInfo}>
              <h3>Sarah Wilson</h3>
              <span className={styles.staffRole}>Physiotherapist</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Player Detail Modal */}
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
                  <img src={selectedPlayer.image} alt={`${selectedPlayer.first_name} ${selectedPlayer.last_name}`} />
                  <div className={styles.modalPlayerNumber}>{selectedPlayer.jersey_number}</div>
                </div>
                <div className={styles.modalPlayerInfo}>
                  <h2>{selectedPlayer.first_name} {selectedPlayer.last_name}</h2>
                  <span className={styles.modalPlayerPosition}>{selectedPlayer.position}</span>
                </div>
              </div>
              
              <div className={styles.modalBody}>
                <div className={styles.playerStats}>
                  <div className={styles.statItem}>
                    <div className={styles.statLabel}>Nationality</div>
                    <div className={styles.statValue}>{selectedPlayer.nationality}</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statLabel}>Age</div>
                    <div className={styles.statValue}>{formatAge(selectedPlayer.date_of_birth)} years</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statLabel}>Height</div>
                    <div className={styles.statValue}>{formatHeight(selectedPlayer.height)}</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statLabel}>Weight</div>
                    <div className={styles.statValue}>{formatWeight(selectedPlayer.weight)}</div>
                  </div>
                  <div className={styles.statItem}>
                    <div className={styles.statLabel}>Birth Date</div>
                    <div className={styles.statValue}>{new Date(selectedPlayer.date_of_birth).toLocaleDateString()}</div>
                  </div>
                </div>
                
                {selectedPlayer.bio && (
                  <div className={styles.playerBio}>
                    <h3>Biography</h3>
                    <p>{selectedPlayer.bio}</p>
                  </div>
                )}
                
                {!selectedPlayer.bio && (
                  <div className={styles.playerBio}>
                    <h3>Biography</h3>
                    <p>{selectedPlayer.first_name} {selectedPlayer.last_name} is a professional footballer who plays as a {selectedPlayer.position.toLowerCase()} for {team.name}.</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}