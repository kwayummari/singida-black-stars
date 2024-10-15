"use client"
import React, { useState } from "react";
import PageNeck from "../widgets/neck/pageNeck";
import styles from '../../styles/Matches.module.scss';
import FullLeague from "../widgets/League/FullLeague";
import AllMatches from "./AllMatches";
import AllResults from "./AllResults";

export default function News() {
  const [activeTab, setActiveTab] = useState("fixtures");

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <PageNeck title={'Matches'} />
      <div className={styles.subNeck}>
        <p className={styles.title}>First Team</p>
        <p className={styles.season}>Season <strong>2024/25 <i className="bi bi-arrow-down"></i></strong></p>
      </div>

      <div className={styles.tabs}>
        <p 
          onClick={() => handleTabClick("fixtures")}
          className={`${styles.tabHeader} ${activeTab === "fixtures" ? styles.activeTab : ""}`}
        >
          Fixtures
        </p>
        <p 
          onClick={() => handleTabClick("results")}
          className={`${styles.tabHeader} ${activeTab === "results" ? styles.activeTab : ""}`}
        >
          Results
        </p>
        <p 
          onClick={() => handleTabClick("table")}
          className={`${styles.tabHeader} ${activeTab === "table" ? styles.activeTab : ""}`}
        >
          Table
        </p>
      </div>


      {activeTab === "fixtures" && <AllMatches />}
      {activeTab === "results" && <AllResults />}
      {activeTab === "table" && <FullLeague />}
    </div>
  );
}
