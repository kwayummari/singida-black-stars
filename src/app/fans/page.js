"use client"
import React from "react";
import styles from '../../styles/Fans.module.scss';

export default function Teams() {
    return (
        <div>
            <div className={styles.subNeck}>
                <p className={styles.title}><strong>Club History</strong></p>
            </div>
            <p className={styles.titleHistory}>
            <a href="/pdf/fan.pdf" class="btn btn-success btn-lg btn-block w-100" target="_blank"><strong>CLICK HERE TO DOWNLOAD FAN ENGAGEMENT PLAN</strong></a>
            </p>
        </div>
    );
}
