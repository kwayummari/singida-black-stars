import styles from "./../styles/index.module.scss"
import CarouselWidget from "./widgets/carousel/carousel";

export default function Home() {
  return (
    <div className={styles.page}>
      <CarouselWidget />
    </div>
  );
}
