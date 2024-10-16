"use client"
import React from "react";
import styles from '../../styles/History.module.scss';

export default function Teams() {
    return (
        <div>
            <div className={styles.subNeck}>
                <p className={styles.title}><strong>Club History</strong></p>
            </div>
            <p className={styles.titleHistory}>
            <button type="button" class="btn btn-success btn-lg btn-block w-100"><i className="bi bi-person-circle"></i> Login</button>
                <strong>
                    Singida Black Stars was formed in 1896 and played their formative
                    years in the West Sussex and Mid Sussex Leagues at a variety
                    of grounds in and around the town.
                </strong>
            </p>
        </div>
    );
}
