import styles from "./../../styles/index.module.scss"
import CarouselWidget from "../widgets/carousel/carousel";
import HomePageNews from "../widgets/HomePageNews/HomePageNews";

export default function News() {
  return (
    <div className={styles.page}>
      <CarouselWidget />
      <HomePageNews />
    </div>
  );
}
