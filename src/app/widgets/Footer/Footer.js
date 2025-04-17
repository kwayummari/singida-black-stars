import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styles from '../../../styles/footer.module.scss';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className={styles.footer}>
      {/* Main Footer Section */}
      <div className={styles.mainFooter}>
        <div className="container">
          <div className="row">
            {/* Club Logo and Info */}
            <div className="col-lg-4 col-md-6 mb-5 mb-lg-0">
              <div className={styles.footerBrand}>
                <Link href="/">
                  <img 
                    src="/images/logo.png" 
                    alt="Singida Black Stars FC" 
                    className={styles.footerLogo} 
                  />
                </Link>
                <h3 className={styles.footerClubName}>Singida Black Stars FC</h3>
                <p className={styles.footerTagline}>Pride of Singida - Est. 2019</p>
              </div>
              <div className={styles.footerContact}>
                <div className={styles.contactItem}>
                  <i className="bi bi-geo-alt-fill"></i>
                  <p>Singida Stadium, P.O. Box 45, Singida, Tanzania</p>
                </div>
                <div className={styles.contactItem}>
                  <i className="bi bi-telephone-fill"></i>
                  <p>+255 712 345 678</p>
                </div>
                <div className={styles.contactItem}>
                  <i className="bi bi-envelope-fill"></i>
                  <p>info@singidablackstars.com</p>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="col-lg-2 col-md-6 col-sm-6 mb-5 mb-lg-0">
              <h4 className={styles.footerTitle}>Club</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/history">History</Link></li>
                <li><Link href="/teams">Teams</Link></li>
                <li><Link href="/matches">Fixtures</Link></li>
                <li><Link href="/results">Results</Link></li>
                <li><Link href="/news">News</Link></li>
              </ul>
            </div>
            
            {/* More Links */}
            <div className="col-lg-2 col-md-6 col-sm-6 mb-5 mb-md-0">
              <h4 className={styles.footerTitle}>More</h4>
              <ul className={styles.footerLinks}>
                <li><Link href="/fans">Fans</Link></li>
                <li><Link href="/tickets">Tickets</Link></li>
                <li><Link href="/shop">Shop</Link></li>
                <li><Link href="/sponsorship">Sponsorship</Link></li>
                <li><Link href="/club-contacts">Contact Us</Link></li>
                <li><Link href="/careers">Careers</Link></li>
              </ul>
            </div>
            
            {/* Social and Newsletter */}
            <div className="col-lg-4 col-md-6">
              <h4 className={styles.footerTitle}>Connect With Us</h4>
              <div className={styles.socialLinks}>
                <a href="https://www.facebook.com/singidablackstarssc" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="https://www.x.com/singidablackstarssc" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
                  <i className="bi bi-twitter-x"></i>
                </a>
                <a href="https://www.instagram.com/singidablackstarssc" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="https://www.youtube.com/@BLACKSTARSTV24" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                  <i className="bi bi-youtube"></i>
                </a>
                <a href="https://www.tiktok.com/singidablackstarssc" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                  <i className="bi bi-tiktok"></i>
                </a>
              </div>
              
              <div className={styles.newsletter}>
                <h5>Subscribe to our newsletter</h5>
                <p>Stay updated with the latest news and match information</p>
                <form className={styles.subscribeForm}>
                  <input type="email" placeholder="Your email address" required />
                  <button type="submit">
                    <i className="bi bi-arrow-right"></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Sponsors Bar */}
      <div className={styles.sponsorsBar}>
        <div className="container">
          <div className={styles.sponsorsWrapper}>
            <div className={styles.sponsorItem}>
              <p>Principal Partner</p>
              <img src="/images/sponsors/airtel.png" alt="Principal Sponsor" />
            </div>
            <div className={styles.sponsorDivider}></div>
            <div className={styles.sponsorItem}>
              <p>Official Sponsors</p>
              <div className={styles.sponsorLogos}>
                <img src="/images/sponsors/azam.png" alt="Azam" />
                <img src="/images/sponsors/nbc.png" alt="NBC" />
                <img src="/images/sponsors/gsm.png" alt="GSM" />
                <img src="/images/sponsors/pmbet.png" alt="PM Bet" />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Footer */}
      <div className={styles.bottomFooter}>
        <div className="container">
          <div className={styles.bottomFooterContent}>
            <div className={styles.copyright}>
              <p>&copy; {currentYear} Singida Black Stars Football Club. All rights reserved.</p>
            </div>
            <div className={styles.bottomLinks}>
              <Link href="/privacy-policy">Privacy Policy</Link>
              <Link href="/terms-of-use">Terms of Use</Link>
              <Link href="/cookies">Cookies</Link>
              <Link href="/accessibility">Accessibility</Link>
            </div>
            <div className={styles.developer}>
              <p>Designed & Developed by 
                <a href="https://www.serengetibytes.com" target="_blank" rel="noopener noreferrer"> Serengeti Bytes</a>
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Back to top button */}
      {/* <button 
        className={styles.backToTop} 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        aria-label="Back to top"
      >
        <i className="bi bi-arrow-up"></i>
      </button> */}
    </footer>
  );
};

export default Footer;