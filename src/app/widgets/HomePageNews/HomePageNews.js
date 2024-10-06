"use client"
import React, { useState } from 'react';
import styles from '../../../styles/homePageNews.module.scss';

const LatestNews = () => (
  <div className="container">
    <h2>Latest News Content</h2>
    <p>This is the Latest News section.</p>
  </div>
);

const PlayerNews = () => (
  <div className="container">
    <h2>Player News Content</h2>
    <p>This is the Player News section.</p>
  </div>
);

const Commercial = () => (
  <div className="container">
    <h2>Commercial Content</h2>
    <p>This is the Commercial section.</p>
  </div>
);

const HomePageNews = () => {
  const [activeTab, setActiveTab] = useState('LatestNews');

  const renderTabContent = () => {
    switch (activeTab) {
      case 'LatestNews':
        return <LatestNews />;
      case 'PlayerNews':
        return <PlayerNews />;
      case 'Commercial':
        return <Commercial />;
      default:
        return <LatestNews />;
    }
  };

  return (
    <div className={styles.newsTabs}>
      <div className={styles.tabNavigation}>
        <button
          className={`${styles.tabButton} ${activeTab === 'LatestNews' ? 'active' : ''}`}
          onClick={() => setActiveTab('LatestNews')}
        >
          Latest News
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'PlayerNews' ? 'active' : ''}`}
          onClick={() => setActiveTab('PlayerNews')}
        >
          Player News
        </button>
        <button
          className={`${styles.tabButton} ${activeTab === 'Commercial' ? 'active' : ''}`}
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
