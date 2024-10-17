"use client"
import Head from 'next/head';
import { useState, useEffect } from 'react';
import styles from "./../styles/index.module.scss"
import CarouselWidget from "./widgets/carousel/carousel";
import HomePageNews from "./widgets/HomePageNews/HomePageNews";
import MainSponsor from "./widgets/MainSponsor/MainSponsor";
import MainSponsorMobile from "./widgets/MainSponsor/MainSponsorMobile";
import Neck from "./widgets/neck/neck";

export default function Home() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  return (
    <div className={styles.page}>
      <Head>
        <title>Singida Black Stars | Official Team Website</title>
        <meta name="description" content="Welcome to the official website of Singida Black Stars football team. Stay updated on news, match results, and player profiles." />
        <meta name="keywords" content="Singida Black Stars, football team, Singida, Tanzania, match results, player profiles" />
        <meta property="og:title" content="Singida Black Stars | Official Team Website" />
        <meta property="og:description" content="Follow the latest news, match results, and updates of Singida Black Stars." />
        <meta property="og:image" content="/images/logo.png" />
        <meta property="og:url" content="https://singidablackstars.com" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://singidablackstars.com" />
      </Head>
      <CarouselWidget openPopup={false} />
      <Neck openPopup={true} />
      <HomePageNews LatestNewsNo='4' PlayerNewsNo='4' CommercialNo='4' />
      {isMobile ? <MainSponsorMobile /> : <MainSponsor />}
    </div>
  );
}
