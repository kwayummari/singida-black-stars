"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from '@/services/api';
import styles from './teamDetails.module.scss';

// Helper function to calculate age from date of birth
const calculateAge = (dateOfBirth) => {
  const birthDate = new Date(dateOfBirth);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  
  return age;
};

// Player Card Component
const PlayerCard = ({ player, index }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  return (
    <motion.div 
      className={`col-lg-4 col-md-6 mb-4`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.4 }}
    >
      <motion.div 
        className={styles.playerCard}
        whileHover={{ y: -5, transition: { duration: 0.2 } }}
        onClick={() => setShowDetails(true)}
      >
        <div className={styles.jerseyNumber}>{player.jersey_number}</div>
        <div className={styles.playerImage}>
          <img src={player.image} alt={`${player.first_name} ${player.last_name}`} />
        </div>
        <div className={styles.playerInfo}>
          <h3 className={styles.playerName}>
            {player.first_name} <strong>{player.last_name}</strong>
          </h3>
          <div className={styles.playerMeta}>
            <span className={styles.nationality}>{player.nationality}</span>
            <span className={styles.age}>{calculateAge(player.date_of_birth)} years</span>
          </div>
        </div>
      </motion.div>
      
      {/* Player Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <motion.div 
            className={styles.modalBackdrop}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowDetails(false)}
          >
            <motion.div 
              className={styles.modalContent}
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className={styles.closeButton} 
                onClick={() => setShowDetails(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
              
              <div className={styles.modalBody}>
                <div className={styles.modalHeader}>
                  <div className={styles.modalPlayerImage}>
                    <img src={player.image} alt={`${player.first_name} ${player.last_name}`} />
                  </div>
                  <div className={styles.modalPlayerInfo}>
                    <div className={styles.modalJerseyNumber}>{player.jersey_number}</div>
                    <h2 className={styles.modalPlayerName}>
                      {player.first_name} <strong>{player.last_name}</strong>
                    </h2>
                    <p className={styles.modalPlayerPosition}>
                      <i className="bi bi-dribbble"></i> Position: {player.position_name}
                    </p>
                  </div>
                </div>
                
                <div className={styles.playerStats}>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Nationality</span>
                    <span className={styles.statValue}>{player.nationality}</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Age</span>
                    <span className={styles.statValue}>{calculateAge(player.date_of_birth)} years</span>
                  </div>
                  <div className={styles.statItem}>
                    <span className={styles.statLabel}>Date of Birth</span>
                    <span className={styles.statValue}>
                      {new Date(player.date_of_birth).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  </div>
                  {player.height && (
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Height</span>
                      <span className={styles.statValue}>{player.height} m</span>
                    </div>
                  )}
                  {player.weight && (
                    <div className={styles.statItem}>
                      <span className={styles.statLabel}>Weight</span>
                      <span className={styles.statValue}>{player.weight} kg</span>
                    </div>
                  )}
                </div>
                
                {player.bio && (
                  <div className={styles.playerBio}>
                    <h3>Biography</h3>
                    <p>{player.bio}</p>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

// Position Section Component
const PositionSection = ({ position }) => {
  return (
    <div className={styles.positionSection}>
      <h2 className={styles.positionTitle}>{position.position_name}</h2>
      <div className="row">
        {position.players.map((player, index) => (
          <PlayerCard 
            key={player.id} 
            player={{...player, position_name: position.position_name}} 
            index={index}
          />
        ))}
      </div>
    </div>
  );
};

export default function TeamDetailsPage() {
  const { id } = useParams();
  const [teamData, setTeamData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch team data
  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        setLoading(true);
        
        if (!id) {
          setError('Team ID is required');
          return;
        }
        
        const data = await get(`/teams/getTeamPlayers.php?team_id=${id}`);
        
        if (data && data.team) {
          setTeamData(data);
        } else {
          setError('Failed to load team data');
        }
      } catch (error) {
        console.error("Failed to load team details:", error);
        setError('Failed to load team details. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamData();
  }, [id]);

  // Loading state
  if (loading) {
    return (
      <div className="container py-5">
        <div className={styles.teamHeaderShimmer}></div>
        <div className={styles.positionSectionShimmer}>
          <div className={styles.positionTitleShimmer}></div>
          <div className="row">
            {[1, 2, 3].map(i => (
              <div key={i} className="col-lg-4 col-md-6 mb-4">
                <div className={styles.playerCardShimmer}></div>
              </div>
            ))}
          </div>
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
          <h2>Unable to Load Team</h2>
          <p>{error}</p>
          <Link href="/teams" className="btn btn-primary mt-3">
            <i className="bi bi-arrow-left me-2"></i>
            Back to Teams
          </Link>
        </div>
      </div>
    );
  }

  // If no team data yet
  if (!teamData) {
    return null;
  }

  const { team, positions } = teamData;

  return (
    <div className="container py-5">
      <motion.div 
        className={styles.teamHeader}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Link href="/teams" className={styles.backButton}>
          <i className="bi bi-arrow-left"></i>
          <span>Back to Teams</span>
        </Link>
        
        <div className={styles.teamInfo}>
          <motion.div 
            className={styles.teamLogo}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img src={team.logo} alt={team.name} />
          </motion.div>
          
          <div>
            <motion.h1 
              className={styles.teamName}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {team.name}
            </motion.h1>
            <motion.div 
              className={styles.teamMeta}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              <span className={styles.teamShortName}>{team.short_name}</span>
              <span className={styles.divider}></span>
              <span className={styles.squadSize}>{positions.reduce((total, pos) => total + pos.players.length, 0)} Players</span>
            </motion.div>
          </div>
        </div>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
      >
        {positions.length === 0 ? (
          <div className={styles.noPlayersMessage}>
            <i className="bi bi-people"></i>
            <p>No players found for this team.</p>
          </div>
        ) : (
          positions.map((position) => (
            <PositionSection key={position.position_id} position={position} />
          ))
        )}
      </motion.div>
    </div>
  );
}