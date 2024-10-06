"use client"
import React, { useState } from 'react';
import styles from '../../../styles/homePageNews.module.scss';
import LatestNews from './LatestNews';
import PlayerNews from './PlayersNews';
import Commercial from './Commercial';


const HomePageNews = ({LatestNewsNo,PlayerNewsNo, CommercialNo}) => {
  const [activeTab, setActiveTab] = useState('LatestNews');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'LatestNews':
            return <LatestNews LatestNewsNo={LatestNewsNo} />;
      case 'PlayerNews':
        return <PlayerNews PlayerNewsNo={PlayerNewsNo}/>;
      case 'Commercial':
        return <Commercial CommercialNo={CommercialNo}/>;
      default:
        return <LatestNews />;
    }
  };

  return (
    <div className={styles.newsTabs}>
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'LatestNews' ? styles.active : ''}`}
          onClick={() => setActiveTab('LatestNews')}
        >
          Latest News
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'PlayerNews' ? styles.active : ''}`}
          onClick={() => setActiveTab('PlayerNews')}
        >
          Player News
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'Commercial' ? styles.active : ''}`}
          onClick={() => setActiveTab('Commercial')}
        >
          Commercial
        </button>
      </div>
      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

export default HomePageNews;
