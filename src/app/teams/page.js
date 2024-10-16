"use client"
import React from "react";
import PageNeck from "../widgets/neck/pageNeck";
import styles from '../../styles/Matches.module.scss';

export default function News() {
  return (
    <div>
      <PageNeck title={'Teams'} />
      <div className={styles.subNeck}>
        <p className={styles.title}>First Team</p>
        <p className={styles.season}>Season <strong>2024/25 <i className="bi bi-arrow-down"></i></strong></p>
      </div>

    </div>
  );
}
