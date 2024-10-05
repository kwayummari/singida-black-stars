import React, { useEffect, useRef } from 'react';
import styles from '../../../styles/league.module.scss';

const teamsData = [
  { logo: '/images/yanga.png', name: 'Yanga', p: 5, gd: 8, pts: 12 },
  { logo: '/images/simba.png', name: 'Simba', p: 5, gd: 6, pts: 10 },
  { logo: '/images/azam.webp', name: 'Azam', p: 5, gd: 5, pts: 9 },
  { logo: '/images/coastal.png', name: 'Coastal Union', p: 5, gd: 4, pts: 8 },
  { logo: '/images/logo.png', name: 'Singida Black Stars', p: 5, gd: 7, pts: 11 }, // Special row
  { logo: '/images/fountain.jpg', name: 'Fountain Gates', p: 5, gd: 3, pts: 7 },
  { logo: '/images/pamba.png', name: 'Pamba Jiji', p: 5, gd: 2, pts: 6 }
];

const League = () => {
  const singidaRowRef = useRef(null);

  useEffect(() => {
    // Scroll to Singida Black Stars row when the component mounts
    if (singidaRowRef.current) {
      singidaRowRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, []);

  return (
    <div className={styles.leagueTable}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>#</th>
            <th>Teams</th>
            <th>P</th>
            <th>Gd</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.map((team, index) => (
            <tr
              key={index}
              ref={team.name === 'Singida Black Stars' ? singidaRowRef : null}
              className={team.name === 'Singida Black Stars' ? styles.highlightRow : ''}
            >
              <td>{index + 1}</td>
              <td className={styles.teamInfo}>
                <img src={team.logo} alt={team.name} className={styles.logo} />
                {team.name}
              </td>
              <td>{team.p}</td>
              <td>{team.gd}</td>
              <td>{team.pts}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default League;
