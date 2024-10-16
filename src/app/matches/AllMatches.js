"use client";
import React from 'react';
import styles from "../../styles/AllMatches.module.scss";

const AllMatches = () => {
    return (
        <div className="container">
            <div className={`row ${styles.card}`}>
                <div className={`col-3 ${styles.part1}`}>
                    <div className={styles.paragraphs}>
                        <img src="/images/nbc2.png" alt="NBC Premier League" className={styles.leagueLogo} />
                        <p>Tue 22 Oct <br /><strong>9:45 PM</strong></p>
                    </div>
                    <p className={styles.location}>H</p>
                </div>
                <div className={`col-9 ${styles.part2}`}>
                    <div className={styles.opponent}>
                        <img src="/images/yanga.png" alt="Yanga" className={styles.opponentLogo} />
                        <p><strong>Yanga</strong> <br />Benjamin Mkapa Stadium</p>
                    </div>
                    <button type="button" class={`btn btn-success btn-sm btn-block ${styles.button}`}><i className="bi bi-dribbble"></i> <b>Match Center</b></button>
                </div>
            </div>
        </div>
    );
}

export default AllMatches;