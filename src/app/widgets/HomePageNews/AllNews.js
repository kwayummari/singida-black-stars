"use client";
import React from "react";
import styles from "../../../styles/allNews.module.scss";

const newsData = [
    {
        id: 1,
        image: "/images/nyerere.png",
        title: "Tutakuenzi Daima Baba wa Taifa, Mwl. Julius Kambarage Nyerere 🇹🇿",
        description: "Kumbukizi ya baba wa taifa",
    },
    {
        id: 2,
        image: "/images/Taifa.png",
        title: "Tunaitakia Timu ya Taifa @taifastars_🇹🇿 kila la kheri kwenye mchezo wa leo ugenini dhidi ya Congo DR.",
        description: "@taifastars_🇹🇿",
    },
    {
        id: 3,
        image: "/images/jkt.png",
        title: "Report | SINGIDA BIG STARS 1-1 JKT",
        description: "Match Reports | 2 days ago",
    },
    {
        id: 4,
        image: "/images/jkt.png",
        title: "Report | SINGIDA BIG STARS 1-1 JKT",
        description: "Match Reports | 2 days ago",
    },
];

const NewsCard = ({ image, title, description }) => (
    <div className="col-12 col-md-3 mb-4">
        <div className={`${styles.imageContainer} card`}>
            <div className={styles.imageOverlay}></div>
            <img src={image} alt="News logo" className={styles.carouselImage} />
            <div className={styles.imageText}>
                <p>{title}</p>
            </div>
            <div className={styles.imageTextBelow}>
                <p>{description}</p>
            </div>
        </div>
    </div>
);

const AllNews = () => (
    <div className="container">
        <p className={styles.header}>All News</p>
        <div className="row">
            {newsData.map((news) => (
                <NewsCard 
                    key={news.id}
                    image={news.image}
                    title={news.title}
                    description={news.description}
                />
            ))}
        </div>
    </div>
);

export default AllNews;