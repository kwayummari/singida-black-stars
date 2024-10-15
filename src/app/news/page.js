import styles from "./../../styles/index.module.scss"
import CarouselWidget from "../widgets/carousel/carousel";
import HomePageNews from "../widgets/HomePageNews/HomePageNews";
import Latest from "./LatestNews";

export default function News() {
  return (
    <div className={styles.page}>
      <CarouselWidget />
      <Latest />
    </div>
  );
}
