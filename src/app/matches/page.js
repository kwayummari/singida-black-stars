import styles from "./../../styles/index.module.scss"
import PageNeck from "../widgets/neck/pageNeck";

export default function News() {
  return (
    <div className={styles.page}>
      <PageNeck title={'Matches'}/>
    </div>
  );
}
