import React from 'react';
import styles from '../../../styles/nextMatch.module.scss';

const NextMatch = () => (
    <div className={styles.nextMatchCard}>
        <div className={styles.header}>
            <img src="/images/nbc.png" alt="NBC Premier League" className={styles.leagueLogo} />
            <div className={styles.matchDetails}>
                <p>Next Match</p>
                <p>Sat 5 Oct <strong>5:00 PM</strong></p>
            </div>
            <div className={styles.awayIndicator}>A</div>
        </div>
        <div className={styles.teamDetails}>
            <img src="/images/yanga.png" alt="Yanga" className={styles.teamLogo} />
            <div>
                <p className={styles.teamName}>Yanga</p>
                <p className={styles.stadium}>Benjamin Mkapa stadium</p>
            </div>
        </div>
    </div>
);

export default NextMatch;
