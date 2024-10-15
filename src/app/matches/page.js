"use client"
import PageNeck from "../widgets/neck/pageNeck";
import styles from '../../styles/Matches.module.scss';
import FullLeague from "../widgets/League/FullLeague";

export default function News() {
  return (
    <div>
      <PageNeck title={'Matches'} />
      <div className={styles.subNeck}>
        <p className={styles.title}>First Team</p>
        <p className={styles.season}>Season <strong>2024/25 <i className="bi bi-arrow-down"></i></strong></p>
      </div>
      <div className={styles.tabs}>
        <p className={styles.tabHeader}>Fixtures</p>
        <p className={styles.tabHeader}>Results</p>
        <p className={styles.tabHeader}>Table</p>
      </div>
      <FullLeague />
    </div>
  );
}
