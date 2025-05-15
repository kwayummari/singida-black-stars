"use client";
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from '@/services/api';
import styles from "./../styles/homepage.module.scss";

export default function EnhancedHome() {
  // State management
  const [isLoading, setIsLoading] = useState(true);
  const [bannerNews, setBannerNews] = useState([]);
  const [nextMatch, setNextMatch] = useState(null);
  const [latestResults, setLatestResults] = useState(null);
  const [leagueTable, setLeagueTable] = useState(null);
  const [newsCategories, setNewsCategories] = useState([]);
  const [activeNewsCategory, setActiveNewsCategory] = useState(null);
  const [newsByCategory, setNewsByCategory] = useState([]);
  const [sponsors, setSponsors] = useState({
    main: { name: "Airtel", image: "/images/sponsors/airtel.png" },
    others: [
      { name: "Azam", image: "/images/sponsors/azam.png" },
      { name: "GSM", image: "/images/sponsors/gsm.png" },
      { name: "NBC", image: "/images/sponsors/nbc.png" },
      { name: "PM Bet", image: "/images/sponsors/pmbet.png" },
      { name: "Lodhia", image: "/images/sponsors/lodhia.png" },
      { name: "Wakazi", image: "/images/sponsors/wakazi.png" }
    ]
  });
  
  // Banner slider controls
  const [currentBannerIndex, setCurrentBannerIndex] = useState(0);
  const bannerInterval = useRef(null);

  // Fetch data on component mount
  useEffect(() => {
    const fetchAllData = async () => {
      try {
        // Fetch banner news
        const bannerData = await get('/news/banner.php');
        setBannerNews(bannerData || []);
        
        // Fetch next match
        const matchesData = await get('/matches/upcomingMatches.php?limit=1');
        setNextMatch(matchesData?.[0] || null);
        
        // Fetch latest result
        const resultsData = await get('/results/getAllResults.php?limit=1');
        setLatestResults(resultsData?.data?.[0] || null);
        
        // Fetch league standings
        const standingsData = await get('/leagues/getStandings.php');
        setLeagueTable(standingsData || null);
        
        // Fetch news categories
        const categoriesData = await get('/categories/getAllCategories.php');
        setNewsCategories(categoriesData || []);
        
        // Set active category to first one
        if (categoriesData && categoriesData.length > 0) {
          setActiveNewsCategory(categoriesData[0].id);
          
          // Fetch news for first category
          const newsData = await get(`/news/newsByCategory.php`, {
            id: categoriesData[0].id,
            limit: 6
          });
          setNewsByCategory(newsData || []);
        }
      } catch (error) {
        console.error("Error fetching homepage data:", error);
      } finally {
        // Finish loading
        setIsLoading(false);
      }
    };
    
    fetchAllData();
    
    // Clean up
    return () => {
      if (bannerInterval.current) {
        clearInterval(bannerInterval.current);
      }
    };
  }, []);
  
  // Set up banner auto rotation
  useEffect(() => {
    if (bannerNews.length > 1) {
      bannerInterval.current = setInterval(() => {
        setCurrentBannerIndex(prev => 
          prev === bannerNews.length - 1 ? 0 : prev + 1
        );
      }, 6000);
      
      return () => clearInterval(bannerInterval.current);
    }
  }, [bannerNews]);
  
  // Change news category handler
  const handleCategoryChange = async (categoryId) => {
    setActiveNewsCategory(categoryId);
    
    try {
      const newsData = await get(`/news/newsByCategory.php`, {
        id: categoryId,
        limit: 6
      });
      setNewsByCategory(newsData || []);
    } catch (error) {
      console.error("Error fetching category news:", error);
    }
  };
  
  // Format date function
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-GB', { 
      weekday: 'short', 
      day: 'numeric', 
      month: 'short'
    });
  };
  
  // Loading screen
  if (isLoading) {
    return (
      <div className={styles.loaderContainer}>
        <div className={styles.loaderContent}>
          <img 
            src="/images/logo.png" 
            alt="Singida Black Stars Logo" 
            className={styles.loadingLogo} 
          />
          <div className={styles.loadingText}>SINGIDA BLACK STARS FC</div>
          <div className={styles.loadingBar}>
            <div className={styles.loadingProgress}></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      {/* Hero Banner Section */}
      <section className={styles.heroSection}>
        <div className={styles.bannerContainer}>
          <AnimatePresence mode="wait">
            {bannerNews.length > 0 && (
              <motion.div 
                key={`banner-${currentBannerIndex}`}
                className={styles.bannerSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className={styles.bannerImage}>
                  <img src={`https://singidablackstars.co.tz/admin/${bannerNews[currentBannerIndex].imageSrc}`} alt={bannerNews[currentBannerIndex].title} />
                  <div className={styles.gradient}></div>
                </div>
                <div className={styles.bannerContent}>
                  <div className={styles.container}>
                    <motion.span 
                      className={styles.bannerCategory}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {bannerNews[currentBannerIndex].categoryName}
                    </motion.span>
                    <motion.h1 
                      className={styles.bannerTitle}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                    >
                      {bannerNews[currentBannerIndex].title}
                    </motion.h1>
                    <motion.p 
                      className={styles.bannerCaption}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                    >
                      {bannerNews[currentBannerIndex].caption}
                    </motion.p>
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                    >
                      <Link href={`/news/${bannerNews[currentBannerIndex].slug}`} className={styles.bannerButton}>
                        READ MORE
                        <i className="bi bi-arrow-right-short"></i>
                      </Link>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Banner Navigation Dots */}
          {bannerNews.length > 1 && (
            <div className={styles.bannerDots}>
              {bannerNews.map((_, index) => (
                <button 
                  key={index} 
                  className={`${styles.dot} ${index === currentBannerIndex ? styles.activeDot : ''}`}
                  onClick={() => setCurrentBannerIndex(index)}
                ></button>
              ))}
            </div>
          )}
        </div>
      </section>
      
      {/* Match Center Section */}
      <section className={styles.matchCenterSection}>
        <div className={styles.container}>
          <div className={styles.matchCenterGrid}>
            {/* Next Match */}
            <div className={styles.nextMatchCard}>
              {nextMatch ? (
                <>
                  <div className={styles.matchHeader}>
                    <h2>NEXT MATCH</h2>
                    <span className={styles.matchCompetition}>{nextMatch.competition}</span>
                  </div>
                  <div className={styles.matchContent}>
                    <div className={styles.matchInfo}>
                      <div className={styles.dateTimeVenue}>
                        <div className={styles.matchDate}>
                          <i className="bi bi-calendar"></i> {nextMatch.date}
                        </div>
                        <div className={styles.matchTime}>
                          <i className="bi bi-clock"></i> {nextMatch.time}
                        </div>
                        <div className={styles.matchVenue}>
                          <i className="bi bi-geo-alt"></i> {nextMatch.stadium}
                        </div>
                      </div>
                    </div>
                    <div className={styles.matchTeams}>
                      <div className={styles.teamInfo}>
                        <img 
                          src={nextMatch.homeTeamLogo} 
                          alt={nextMatch.homeTeam} 
                          className={styles.teamLogo}
                        />
                        <span className={styles.teamName}>{nextMatch.homeTeam}</span>
                      </div>
                      <div className={styles.vsContainer}>
                        <span className={styles.vs}>VS</span>
                      </div>
                      <div className={styles.teamInfo}>
                        <img 
                          src={nextMatch.awayTeamLogo} 
                          alt={nextMatch.awayTeam} 
                          className={styles.teamLogo}
                        />
                        <span className={styles.teamName}>{nextMatch.awayTeam}</span>
                      </div>
                    </div>
                    <Link href="/matches" className={styles.matchButton}>
                      MATCH DETAILS
                    </Link>
                  </div>
                </>
              ) : (
                <div className={styles.noMatchInfo}>
                  <i className="bi bi-calendar-x"></i>
                  <p>No upcoming matches scheduled</p>
                </div>
              )}
            </div>
            
            {/* Last Result */}
            <div className={styles.lastResultCard}>
              {latestResults ? (
                <>
                  <div className={styles.resultHeader}>
                    <h2>LATEST RESULT</h2>
                    <span className={styles.resultCompetition}>{latestResults.competition}</span>
                  </div>
                  <div className={styles.resultContent}>
                    <div className={styles.resultInfo}>
                      <div className={styles.resultDate}>
                        <i className="bi bi-calendar-check"></i> {latestResults.date}
                      </div>
                    </div>
                    <div className={styles.resultTeams}>
                      <div className={styles.teamResult}>
                        <img 
                          src={latestResults.homeTeamLogo} 
                          alt={latestResults.homeTeamName} 
                          className={styles.teamLogo}
                        />
                        <span className={styles.teamName}>{latestResults.homeTeamName}</span>
                        <span className={styles.score}>{latestResults.homeTeamScoreFt}</span>
                      </div>
                      <div className={styles.teamResult}>
                        <img 
                          src={latestResults.awayTeamLogo} 
                          alt={latestResults.awayTeamName} 
                          className={styles.teamLogo}
                        />
                        <span className={styles.teamName}>{latestResults.awayTeamName}</span>
                        <span className={styles.score}>{latestResults.awayTeamScoreFt}</span>
                      </div>
                    </div>
                    <div className={styles.halfTimeScore}>
                      Half-time: {latestResults.homeTeamScoreHt} - {latestResults.awayTeamScoreHt}
                    </div>
                    <Link href="/results" className={styles.resultButton}>
                      MATCH REPORT
                    </Link>
                  </div>
                </>
              ) : (
                <div className={styles.noResultInfo}>
                  <i className="bi bi-trophy"></i>
                  <p>No recent match results</p>
                </div>
              )}
            </div>
            
            {/* League Table */}
            <div className={styles.leagueTableCard}>
              {leagueTable && leagueTable.standings ? (
                <>
                  <div className={styles.tableHeader}>
                    <div className={styles.leagueInfo}>
                      <img 
                        src={leagueTable.league.logo} 
                        alt={leagueTable.league.name} 
                        className={styles.leagueLogo}
                      />
                      <div>
                        <h2>{leagueTable.league.name}</h2>
                        <span className={styles.season}>{leagueTable.league.season}</span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.tableContent}>
                    <table className={styles.standingsTable}>
                      <thead>
                        <tr>
                          <th className={styles.posColumn}>Pos</th>
                          <th className={styles.teamColumn}>Team</th>
                          <th className={styles.statColumn}>P</th>
                          <th className={styles.statColumn}>GD</th>
                          <th className={styles.statColumn}>Pts</th>
                        </tr>
                      </thead>
                      <tbody>
                        {leagueTable.standings.slice(0, 5).map((team) => {
                          const isOurTeam = team.team_name.includes('Singida') || team.team_name.includes('Black Stars');
                          return (
                            <tr key={team.team_id} className={isOurTeam ? styles.highlightedTeam : ''}>
                              <td className={styles.posColumn}>{team.position}</td>
                              <td className={styles.teamColumn}>
                                <div className={styles.teamInfo}>
                                  <img 
                                    src={team.team_logo} 
                                    alt={team.team_name} 
                                    className={styles.miniTeamLogo}
                                  />
                                  <span>{team.team_name}</span>
                                </div>
                              </td>
                              <td className={styles.statColumn}>{team.played}</td>
                              <td className={styles.statColumn}>{team.goal_difference}</td>
                              <td className={styles.statColumn}><strong>{team.points}</strong></td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                    <Link href="/league" className={styles.tableButton}>
                      FULL TABLE
                    </Link>
                  </div>
                </>
              ) : (
                <div className={styles.noTableInfo}>
                  <i className="bi bi-table"></i>
                  <p>League table currently unavailable</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      
      {/* News Section */}
      <section className={styles.newsSection}>
        <div className={styles.container}>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>LATEST NEWS</h2>
            <div className={styles.categoryTabs}>
              {newsCategories.map((category) => (
                <button
                  key={category.id}
                  className={`${styles.categoryTab} ${activeNewsCategory === category.id ? styles.activeTab : ''}`}
                  onClick={() => handleCategoryChange(category.id)}
                >
                  {category.name}
                </button>
              ))}
            </div>
            <Link href="/news" className={styles.viewAllLink}>
              VIEW ALL NEWS <i className="bi bi-arrow-right"></i>
            </Link>
          </div>
          
          <div className={styles.newsGrid}>
            {newsByCategory.length > 0 ? (
              newsByCategory.map((article, index) => (
                <motion.div 
                  key={article.id}
                  className={index === 0 ? styles.featuredNewsCard : styles.newsCard}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                >
                  <Link href={`/news/${article.slug}`}>
                    <div className={styles.newsImageContainer}>
                      <img 
                        src={article.imageSrc} 
                        alt={article.title} 
                        className={styles.newsImage}
                      />
                      <div className={styles.newsCategory}>{article.categoryName}</div>
                    </div>
                    <div className={styles.newsContent}>
                      <h3 className={styles.newsTitle}>{article.title}</h3>
                      {index === 0 && <p className={styles.newsCaption}>{article.caption}</p>}
                      <div className={styles.newsDate}>
                        <i className="bi bi-calendar2"></i> {formatDate(article.reportDate)}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              ))
            ) : (
              <div className={styles.noNewsInfo}>
                <i className="bi bi-newspaper"></i>
                <p>No news articles available</p>
              </div>
            )}
          </div>
        </div>
      </section>
      
      {/* Sponsors Section */}
      <section className={styles.sponsorsSection}>
        <div className={styles.container}>
          <div className={styles.mainSponsor}>
            <h2 className={styles.sponsorTitle}>PRINCIPAL PARTNER</h2>
            <img src={sponsors.main.image} alt={sponsors.main.name} className={styles.mainSponsorLogo} />
          </div>
          
          <div className={styles.otherSponsors}>
            <h3 className={styles.sponsorSubtitle}>OFFICIAL PARTNERS</h3>
            <div className={styles.sponsorGrid}>
              {sponsors.others.map((sponsor, index) => (
                <motion.div 
                  key={index}
                  className={styles.sponsorItem}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1, duration: 0.3 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <img src={sponsor.image} alt={sponsor.name} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* Fan Engagement Section */}
      <section className={styles.fanSection}>
        <div className={styles.container}>
          <div className={styles.fanContent}>
            <motion.div
              className={styles.fanTextContent}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h2>JOIN THE SINGIDA BLACK STARS FAMILY</h2>
              <p>Get exclusive content, ticket priority, special offers and much more. Sign up for our newsletter today!</p>
              <form className={styles.subscribeForm}>
                <input type="email" placeholder="Your email address" required />
                <button type="submit" className={styles.subscribeButton}>
                  SUBSCRIBE
                </button>
              </form>
              <div className={styles.socialIcons}>
                <a href="#" className={styles.socialIcon}><i className="bi bi-facebook"></i></a>
                <a href="#" className={styles.socialIcon}><i className="bi bi-twitter"></i></a>
                <a href="#" className={styles.socialIcon}><i className="bi bi-instagram"></i></a>
                <a href="#" className={styles.socialIcon}><i className="bi bi-youtube"></i></a>
                <a href="#" className={styles.socialIcon}><i className="bi bi-tiktok"></i></a>
              </div>
            </motion.div>
            <motion.div
              className={styles.fanImageContent}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img src="/images/fans.jpg" alt="Fans celebrating" />
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}