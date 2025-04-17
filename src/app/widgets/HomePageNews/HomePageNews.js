"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "../../../styles/homePageNews.module.scss";
import LatestNews from "./LatestNews";
import { get } from "@/services/api";

const HomePageNews = () => {
  const [activeTab, setActiveTab] = useState(null);
  const [tabs, setTabs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const response = await get("/categories/getAllCategories.php");
        
        if (response && response.length > 0) {
          setTabs(response);
          setActiveTab(response[0].id);
        }
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setError("Failed to load news categories. Please try again later.");
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Tab animation variants
  const tabVariants = {
    inactive: { 
      color: "#b6b6b6",
      borderBottom: "2px solid transparent"
    },
    active: { 
      color: "#0b7a3f", 
      borderBottom: "2px solid #0b7a3f"
    },
    hover: { 
      color: "#000000",
      scale: 1.05
    }
  };

  // Container animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  if (isLoading) {
    return (
      <div className={styles.newsTabs}>
        <div className={styles.tabNavigationSkeleton}>
          {[1, 2, 3, 4].map((_, index) => (
            <div key={index} className={styles.tabSkeleton}></div>
          ))}
        </div>
        <div className={styles.tabContentSkeleton}>
          <div className={styles.newsGridSkeleton}>
            {[1, 2, 3, 4].map((_, index) => (
              <div key={index} className={styles.newsSkeleton}></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.newsTabs}>
        <div className={styles.errorContainer}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <p>{error}</p>
          <button 
            className="btn btn-outline-primary mt-3"
            onClick={() => window.location.reload()}
          >
            <i className="bi bi-arrow-clockwise me-2"></i>
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className={styles.newsTabs}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className={styles.tabNavigation}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {tabs && tabs.length > 0 ? (
          tabs.map((tab) => (
            <motion.button
              key={tab.id}
              className={`${styles.tabButton} ${activeTab === tab.id ? styles.active : ""}`}
              onClick={() => setActiveTab(tab.id)}
              variants={tabVariants}
              initial="inactive"
              animate={activeTab === tab.id ? "active" : "inactive"}
              whileHover="hover"
              whileTap={{ scale: 0.95 }}
            >
              {tab.name}
            </motion.button>
          ))
        ) : (
          <div>No categories available</div>
        )}
      </motion.div>
      
      <AnimatePresence mode="wait">
        <motion.div 
          key={activeTab}
          className={styles.tabContent}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
        >
          {activeTab && <LatestNews openPopup={true} categoryId={activeTab} />}
        </motion.div>
      </AnimatePresence>
    </motion.div>
  );
};

export default HomePageNews;