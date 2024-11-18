"use client";
import React, { useState, useEffect } from "react";
import styles from "../../../styles/homePageNews.module.scss";
import LatestNews from "./LatestNews";
import { get } from "@/services/api";

const HomePageNews = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [tabs, setTabs] = useState([]);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        const response = await get("/categories/getAllCategories.php");
        if (response && response.length > 0) {
          setActiveTab(response[0].id);
          setTabs(response);
        }
      } catch (error) {
        console.error("Error fetching tabs:", error);
      }
    };

    fetchTabs();
  }, []);

  const renderTabContent = () => {
    return <LatestNews openPopup={true} categoryId={activeTab} />;
  };

  return (
    <div className={styles.newsTabs}>
      <div className={styles.tabNavigation}>
        {tabs && tabs.length > 0 ? (
          tabs.map((tab) => (
            <button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => {  setActiveTab(tab.id) }}
            >
              {tab.name}
            </button>
          ))
        ) : (
          <div>Loading tabs...</div>
        )}
      </div>
      <div className={styles.tabContent}>
        {activeTab && renderTabContent()}
      </div>
    </div>
  );
};

export default HomePageNews;
