import styles from "./../styles/index.module.scss"
import CarouselWidget from "./widgets/carousel/carousel";
import HomePageNews from "./widgets/HomePageNews/HomePageNews";
import MainSponsor from "./widgets/MainSponsor/MainSponsor";
import Neck from "./widgets/neck/neck";

export default function Home() {
  return (
    <div className={styles.page}>
      <CarouselWidget />
      <Neck />
      <HomePageNews />
      <MainSponsor />
    </div>
  );
}
