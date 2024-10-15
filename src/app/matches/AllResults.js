"use client";
import React from 'react';
import styles from "../../styles/AllResults.module.scss";

const AllResults = () => {
    return (
        <div className="container">
            <div className={`row ${styles.card}`}>
                <div className={`col-3 ${styles.part1}`}>
                <img src="/images/nbc.png" alt="NBC Premier League" className={styles.leagueLogo} />
                    <p>Tue 22 Oct <br /><strong>9:45 PM</strong></p>
                </div>
                <div className={`col-9 ${styles.part2}`}>
                </div>
            </div>
        </div>
    );
}

export default AllResults;