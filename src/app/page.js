import styles from "./../styles/index.module.scss"
import CarouselWidget from "./widgets/carousel/carousel";
import Neck from "./widgets/neck/neck";

export default function Home() {
  return (
    <div className={styles.page}>
      <CarouselWidget />
      <Neck />
    </div>
  );
}
