"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { get } from '@/services/api';
import styles from '../../styles/allNews.module.scss';

// Format date helper
const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
};

// NewsCard Component
const NewsCard = ({ article, index }) => {
    return (
        <motion.div 
            className="col-lg-4 col-md-6 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ y: -8 }}
        >
            <Link href={`/news/${article.slug}`} className={styles.newsCard}>
                <div className={styles.imageContainer}>
                    <img 
                        src={`http://192.168.1.100/sbs/${article.imageSrc}`}
                        alt={article.title} 
                        className={styles.image} 
                    />
                    <div className={styles.categoryBadge}>{article.categoryName}</div>
                </div>
                <div className={styles.content}>
                    <h3 className={styles.title}>{article.title}</h3>
                    <p className={styles.date}>{formatDate(article.reportDate)}</p>
                </div>
            </Link>
        </motion.div>
    );
};

// Featured Article Component
const FeaturedArticle = ({ article }) => {
    if (!article) return null;
    
    return (
        <motion.div 
            className={styles.featuredArticle}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <div className={styles.imageContainer}>
                <img 
                    src={`http://192.168.1.100/sbs/${article.imageSrc}`} 
                    alt={article.title} 
                    className={styles.image} 
                />
            </div>
            <h2 className={styles.featuredTitle}>
                <Link href={`/news/${article.slug}`}>
                    {article.title}
                </Link>
            </h2>
            <p className={styles.featuredExcerpt}>{article.caption}</p>
            <div className={styles.featuredMeta}>
                <span className={styles.featuredCategory}>{article.categoryName}</span>
                <span className={styles.featuredDate}>{formatDate(article.reportDate)}</span>
            </div>
        </motion.div>
    );
};

// Loading Shimmer Components
const ShimmerCard = () => (
    <div className="col-lg-4 col-md-6 mb-4">
        <div className={styles.newsCard}>
            <div className={`${styles.imageContainer} ${styles.shimmer}`}></div>
            <div className={styles.content}>
                <div className={`${styles.shimmerTitle} ${styles.shimmer}`}></div>
                <div className={`${styles.shimmerDate} ${styles.shimmer}`}></div>
            </div>
        </div>
    </div>
);

const ShimmerFeatured = () => (
    <div className={styles.featuredArticle}>
        <div className={`${styles.imageContainer} ${styles.shimmer}`}></div>
        <div className={`${styles.shimmerTitle} ${styles.shimmer}`} style={{ height: '40px', marginTop: '1.5rem' }}></div>
        <div className={`${styles.shimmer}`} style={{ height: '100px', marginTop: '1rem' }}></div>
        <div className={`${styles.shimmer}`} style={{ height: '20px', width: '40%', marginTop: '1rem' }}></div>
    </div>
);

const AllNews = () => {
    const [newsData, setNewsData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categories, setCategories] = useState([]);
    const [featuredArticle, setFeaturedArticle] = useState(null);

    // Fetch news based on filters
    useEffect(() => {
        const fetchNews = async () => {
            try {
                setLoading(true);
                // Build query parameters
                const params = { page: currentPage, limit: 9 };
                if (selectedCategory) {
                    params.category = selectedCategory;
                }
                
                // Fetch news data
                const response = await get('/news/getAllNews.php', params);
                
                if (response && response.status === 'success') {
                    if (Array.isArray(response.data)) {
                        // If no featured article set yet and we're on page 1, use the first article as featured
                        if (currentPage === 1 && !selectedCategory && response.data.length > 0) {
                            setFeaturedArticle(response.data[0]);
                            setNewsData(response.data.slice(1)); // Skip the featured article
                        } else {
                            setNewsData(response.data);
                        }
                        setTotalPages(response.total_pages || 1);
                    } else {
                        setNewsData([]);
                    }
                } else {
                    setError('Failed to load news');
                    setNewsData([]);
                }
            } catch (error) {
                console.error("Failed to load news:", error);
                setError('Failed to load news. Please try again later.');
                setNewsData([]);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, [currentPage, selectedCategory]);

    // Fetch categories
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await get('/categories/getAllCategories.php');
                if (Array.isArray(response)) {
                    setCategories(response);
                }
            } catch (error) {
                console.error("Failed to load categories:", error);
            }
        };

        fetchCategories();
    }, []);

    // Handle category selection
    const handleCategoryChange = (categoryId) => {
        setSelectedCategory(categoryId === selectedCategory ? null : categoryId);
        setCurrentPage(1); // Reset to first page when changing category
        setFeaturedArticle(null); // Clear featured article when changing category
    };

    // Reset all filters
    const resetFilters = () => {
        setSelectedCategory(null);
        setCurrentPage(1);
    };

    return (
        <div className="container py-5">
            <motion.h1 
                className={styles.mainTitle}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Latest News & Updates
            </motion.h1>
            
            {/* Category Pills */}
            {!loading && categories.length > 0 && (
                <motion.div 
                    className={styles.categoryPills}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <motion.div 
                        className={`${styles.pill} ${selectedCategory === null ? styles.active : ''}`}
                        onClick={resetFilters}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        All News
                    </motion.div>
                    {categories.map((category) => (
                        <motion.div 
                            key={category.id}
                            className={`${styles.pill} ${selectedCategory === category.id ? styles.active : ''}`}
                            onClick={() => handleCategoryChange(category.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {category.name}
                        </motion.div>
                    ))}
                </motion.div>
            )}
            
            {/* Loading State */}
            {loading ? (
                <>
                    <ShimmerFeatured />
                    <div className="row mt-5">
                        {[1, 2, 3, 4, 5, 6].map(index => <ShimmerCard key={index} />)}
                    </div>
                </>
            ) : error ? (
                <div className={styles.errorContainer}>
                    <i className="bi bi-exclamation-triangle-fill"></i>
                    <p>{error}</p>
                    <button className="btn btn-primary mt-4" onClick={resetFilters}>
                        <i className="bi bi-arrow-counterclockwise me-2"></i>
                        Try Again
                    </button>
                </div>
            ) : (
                <>
                    {/* Featured Article (only on first page with no category filter) */}
                    {currentPage === 1 && !selectedCategory && featuredArticle && (
                        <FeaturedArticle article={featuredArticle} />
                    )}
                    
                    {/* Articles Grid */}
                    {newsData.length === 0 ? (
                        <div className={styles.noResults}>
                            <i className="bi bi-newspaper"></i>
                            <p>No news articles found for the selected category.</p>
                            <button 
                                className={styles.resetButton}
                                onClick={resetFilters}
                            >
                                View All News
                            </button>
                        </div>
                    ) : (
                        <div className="row">
                            <AnimatePresence>
                                {newsData.map((article, index) => (
                                    <NewsCard 
                                        key={article.id} 
                                        article={article} 
                                        index={index}
                                    />
                                ))}
                            </AnimatePresence>
                        </div>
                    )}
                    
                    {/* Pagination */}
                    {totalPages > 1 && (
                        <motion.div 
                            className={styles.pagination}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <div key={page} className={styles.pageItem}>
                                    <div 
                                        className={`${styles.pageLink} ${currentPage === page ? styles.active : ''}`}
                                        onClick={() => setCurrentPage(page)}
                                    >
                                        {page}
                                    </div>
                                </div>
                            ))}
                        </motion.div>
                    )}
                </>
            )}
        </div>
    );
};

export default AllNews;