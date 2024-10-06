"use client"
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
      <CarouselWidget />
      <Neck />
      <HomePageNews LatestNewsNo='4' PlayerNewsNo='4' CommercialNo='4' />
      {isMobile ? <MainSponsorMobile /> : <MainSponsor />}
    </div>
  );
}
