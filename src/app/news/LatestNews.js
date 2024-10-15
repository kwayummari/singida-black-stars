"use client";
import React from 'react';
import styles from '../../styles/Latest.module.scss';
import ImageCard from '../widgets/ImageCardContainer/ImageCardContainer';

const data = [
    {
        imageSrc: "/images/exclusive1.png",
        altText: "Exclusive Image 1",
        description: "Baada ya kazi nzuri ya kuongoza Ligi bila kupoteza mchezo wowote tunaenda mapumziko mafupi mpaka tarehe 10/10/2024 🐆🐆T",
        reportDate: "Match Reports | 2 days ago"
    },
    {
        imageSrc: "/images/exclusive2.png",
        altText: "Exclusive Image 2",
        description: "RASMI: Programu ya mazoezi kwa timu zetu za vijana itaanza Alhamisi tarehe 10/10/2024.",
        reportDate: "Match Reports | 2 days ago"
    },
    {
        imageSrc: "/images/jkt.png",
        altText: "JKT Match",
        description: "Report | SINGIDA BIG STARS 1-1 JKT",
        reportDate: "Match Reports | 2 days ago"
    }
];

const Latest = () => (
    <div className="container">
        <p className={styles.header}>Latest News</p>
        <div className={`${styles.scrollableRow} row`}>
            {data.map((item, index) => (
                <ImageCard
                    key={index}
                    imageSrc={item.imageSrc}
                    altText={item.altText}
                    description={item.description}
                    reportDate={item.reportDate}
                />
            ))}
        </div>
    </div>
);

export default Latest;
