"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { get } from '@/services/api';
import styles from './article.module.scss';

// Helper function to format date
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

export default function ArticleDetail({ slug }) {
  const router = useRouter();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        setLoading(true);
        const response = await get(`/news/getArticleBySlug.php?slug=${slug}`);
        
        if (response.status === 'success') {
          setArticle(response.data);
          // Set page title
          document.title = `${response.data.title} | Singida Black Stars FC`;
        } else {
          setError('Failed to load article');
        }
      } catch (error) {
        console.error("Error fetching article:", error);
        setError('Article not found or network error');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  // Loading state
  if (loading) {
    return (
      <div className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.shimmerHeader}></div>
          <div className={styles.shimmerMeta}></div>
          <div className={styles.shimmerImage}></div>
          <div className={styles.shimmerContent}>
            <div className={styles.shimmerLine}></div>
            <div className={styles.shimmerLine}></div>
            <div className={styles.shimmerLine}></div>
            <div className={styles.shimmerLine}></div>
            <div className={styles.shimmerLine}></div>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className={styles.container}>
        <div className={styles.errorContainer}>
          <i className="bi bi-exclamation-triangle-fill"></i>
          <h2>Article Not Found</h2>
          <p>{error}</p>
          <button 
            className="btn btn-primary"
            onClick={() => router.push('/news')}
          >
            Back to News
          </button>
        </div>
      </div>
    );
  }

  // If no article is loaded yet
  if (!article) {
    return null;
  }

  return (
    <div className={styles.container}>
      <motion.div 
        className={styles.articleContainer}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumb navigation */}
        <div className={styles.breadcrumb}>
          <Link href="/">Home</Link> / 
          <Link href="/news">News</Link> / 
          <Link href={`/news/category/${article.categorySlug}`}>{article.categoryName}</Link> / 
          <span className={styles.current}>{article.title}</span>
        </div>
        
        {/* Article Header */}
        <motion.h1 
          className={styles.title}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {article.title}
        </motion.h1>
        
        {/* Article Meta */}
        <motion.div 
          className={styles.meta}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <div className={styles.category}>
            <span className={styles.label}>Category:</span>
            <Link href={`/news/category/${article.categorySlug}`}>
              {article.categoryName}
            </Link>
          </div>
          <div className={styles.date}>
            <span className={styles.label}>Published:</span>
            {formatDate(article.publishDate)}
          </div>
          <div className={styles.author}>
            <span className={styles.label}>By:</span>
            {article.author}
          </div>
          <div className={styles.views}>
            <i className="bi bi-eye me-1"></i>
            {article.views} views
          </div>
        </motion.div>
        
        {/* Featured Image */}
        <motion.div 
          className={styles.featuredImage}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 0.5 }}
        >
          <img 
            src={`http://192.168.1.100/sbs/${article.imageSrc}`}
            alt={article.title} 
            className={styles.mainImage}
          />
        </motion.div>
        
        {/* Caption */}
        <motion.div 
          className={styles.caption}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          {article.caption}
        </motion.div>
        
        {/* Article Content */}
        <motion.div 
          className={styles.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          dangerouslySetInnerHTML={{ __html: article.description }}
        />
        
        {/* Last Updated */}
        {article.lastUpdated && article.lastUpdated !== article.publishDate && (
          <div className={styles.updated}>
            Last updated: {formatDate(article.lastUpdated)}
          </div>
        )}
        
        {/* Share Buttons */}
        <div className={styles.shareButtons}>
          <h3>Share this article</h3>
          <div className={styles.socialButtons}>
            <button className={`${styles.socialButton} ${styles.facebook}`}>
              <i className="bi bi-facebook"></i>
            </button>
            <button className={`${styles.socialButton} ${styles.twitter}`}>
              <i className="bi bi-twitter"></i>
            </button>
            <button className={`${styles.socialButton} ${styles.whatsapp}`}>
              <i className="bi bi-whatsapp"></i>
            </button>
            <button className={`${styles.socialButton} ${styles.email}`}>
              <i className="bi bi-envelope"></i>
            </button>
          </div>
        </div>
        
        {/* Related Articles */}
        {article.relatedArticles && article.relatedArticles.length > 0 && (
          <div className={styles.relatedArticles}>
            <h3>Related Articles</h3>
            <div className={styles.articleGrid}>
              {article.relatedArticles.map((related, index) => (
                <motion.div 
                  key={related.id}
                  className={styles.relatedArticle}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 + (index * 0.1), duration: 0.5 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <Link href={`/news/${related.slug}`}>
                    <div className={styles.relatedImageContainer}>
                      <img 
                        src={related.imageSrc} 
                        alt={related.title} 
                        className={styles.relatedImage}
                      />
                    </div>
                    <h4 className={styles.relatedTitle}>{related.title}</h4>
                    <p className={styles.relatedDate}>{formatDate(related.publishDate)}</p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        )}
        
        {/* Back to News */}
        <div className={styles.backButton}>
          <Link href="/news" className="btn btn-primary">
            <i className="bi bi-arrow-left me-2"></i>
            Back to All News
          </Link>
        </div>
      </motion.div>
    </div>
  );
}