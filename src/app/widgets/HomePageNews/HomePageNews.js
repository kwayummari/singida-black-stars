"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/homePageNews.module.scss";
import LatestNews from "./LatestNews";
import PlayerNews from "./PlayersNews";
import Commercial from "./Commercial";
import axios from "axios";

const HomePageNews = ({ LatestNewsNo, PlayerNewsNo, CommercialNo }) => {
  const [activeTab, setActiveTab] = useState("LatestNews");
  const [tabs, setTabs] = useState([]); // Store the tabs from the API

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await axios.post("/your-api-endpoint", { id: 1 });
        // Assuming the response data has an array of tabs
        setTabs(response.data); 
      } catch (error) {
        console.error("Error fetching tabs:", error);
      }
    };

    fetchTabs();
  }, []);

  // Dynamic tab rendering
  const renderTabContent = () => {
    switch (activeTab) {
      case "LatestNews":
        return <LatestNews openPopup={true} LatestNewsNo={LatestNewsNo} />;
      case "PlayerNews":
        return <PlayerNews openPopup={true} PlayerNewsNo={PlayerNewsNo} />;
      case "Commercial":
        return <Commercial openPopup={true} CommercialNo={CommercialNo} />;
      default:
        return <LatestNews />;
    }
  };

  return (
    <div className={styles.newsTabs}>
      <div className={styles.tabNavigation}>
        {tabs.length > 0 ? (
          tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${
                activeTab === tab.name ? styles.active : ""
              }`}
              onClick={() => setActiveTab(tab.name)}
            >
              {tab.name}
            </button>
          ))
        ) : (
          // Show a loading or placeholder if tabs are not yet loaded
          <div>Loading tabs...</div>
        )}
      </div>
      <div className={styles.tabContent}>{renderTabContent()}</div>
    </div>
  );
};

export default HomePageNews;
