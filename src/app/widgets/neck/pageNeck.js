"use client"
import React from 'react';
import styles from '../../../styles/pageNeck.module.scss';

const PageNeck = ({title}) => (
    <div className={styles.neckContainer}>
        <p className={styles.title}>{title}</p>
    </div>
);

export default PageNeck;
