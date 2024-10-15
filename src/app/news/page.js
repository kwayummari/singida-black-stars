import styles from "./../../styles/index.module.scss"
import CarouselWidget from "../widgets/carousel/carousel";
import Latest from "./LatestNews";
import AllNews from "../widgets/HomePageNews/AllNews";

export default function News() {
  return (
    <div className={styles.page}>
      <CarouselWidget />
      <Latest />
      <AllNews />
    </div>
  );
}
