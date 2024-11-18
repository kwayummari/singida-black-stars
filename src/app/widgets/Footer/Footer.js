import React from 'react';
import styles from '../../../styles/footer.module.scss';

const Footer = () => (
  <footer className="footer">
    <div className="column">
      <div className={`${styles.topFooter} row-md-6 row-sm-6`}>
        <div className={`${styles.topFooter} card`}>
          <div className="card-body d-flex">
            <hr className={styles.lines} />
            <img
              src="/images/logo.png"
              className={styles.logo}
              alt="Picture of the logo"
            />
            <hr className={styles.lines} />
          </div>
          <div className="card-body">
            <p className={`${styles.paragraph} m-0`}>Principal Partner</p>
            <img
              src="/images/sponsors/airtel.png"
              className={`${styles.MainSponsor} mx-auto d-block`}
              alt="Picture of the sponsor"
            />
            <p className={`${styles.paragraph} m-0`}>Club Partners</p>
            <div className={`${styles.sponsors} col-md-2 col-sm-2 mx-auto d-flex`} >
              <img
                src="/images/sponsors/azam.png"
                className={`${styles.sponsorLogo} mx-auto d-block`}
                alt="Picture of the sponsor"
              />
              <img
                src="/images/sponsors/gsm.png"
                className={`${styles.sponsorLogo} mx-auto d-block`}
                alt="Picture of the sponsor"
              />
              <img
                src="/images/sponsors/nbc.png"
                className={`${styles.sponsorLogo} mx-auto d-block`}
                alt="Picture of the sponsor"
              />
              <img
                src="/images/pmbet3.png"
                className={`${styles.sponsorLogo} mx-auto d-block`}
                alt="Picture of the sponsor"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${styles.bottomFooter} row-md-6 row-sm-6`}>
        <div className={`${styles.bottomFooter} card`}>
          <div className="card-body">
            <div className={`${styles.sponsors} col-md-2 col-sm-2 mx-auto d-flex justify-content-center`}>
              <a href="https://www.facebook.com/singidablackstarssc" target="_blank"><i className="bi bi-facebook p-3 text-white fs-2"></i></a>
              <a href="https://www.x.com/singidablackstarssc" target="_blank"><i className="bi bi-twitter p-3 text-white fs-2"></i></a>
              <a href="https://www.youtube.com/@BLACKSTARSTV24" target="_blank"><i className="bi bi-youtube p-3 text-white fs-2"></i></a>
              <a href="https://www.x.com/singidablackstarssc" target="_blank"><i className="bi bi-instagram p-3 text-white fs-2"></i></a>
              <a href="https://www.linkedin.com/singidablackstarssc" target="_blank"><i className="bi bi-linkedin p-3 text-white fs-2"></i></a>
              <a href="https://www.tiktok.com/singidablackstarssc" target="_blank"><i className="bi bi-tiktok p-3 text-white fs-2"></i></a>
            </div>
            <div className={`${styles.terms} d-flex flex-wrap justify-content-center`}>
              <p className={`${styles.termsParagraph} m-2`}>Terms of Use</p>
              <p className={`${styles.termsParagraph} m-2`}>Privacy Policy</p>
              <p className={`${styles.termsParagraph} m-2`}>Accessibility</p>
              <p className={`${styles.termsParagraph} m-2`}>Company Details</p>
              <p className={`${styles.termsParagraph} m-2`}>Contact Us</p>
            </div>
            <hr className={styles.hr}></hr>
            <div className={`${styles.bottom} col-md-2 col-sm-2 mx-auto justify-content-center`}>
            <p className={`${styles.termsParagraph} m-0`}>© SINGIDA BLACK STARS 2024</p>
              <p className={`${styles.termsParagraph} m-0`}>DESIGNED AND MAINTAINED BY
                <a href='https://www.serengetibytes.com' target="_blank" className={styles.creator}> SERENGETI BYTES</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;