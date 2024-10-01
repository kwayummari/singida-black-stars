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
              src="/images/sponsor.png"
              className={`${styles.MainSponsor} mx-auto d-block`}
              alt="Picture of the sponsor"
            />
            <p className={`${styles.paragraph} m-0`}>Club Partners</p>
            <div className={`${styles.sponsors} col-md-2 col-sm-2 mx-auto d-flex`} >
              <img
                src="/images/cocacola.png"
                className={`${styles.sponsorLogo} mx-auto d-block`}
                alt="Picture of the sponsor"
              />
              <img
                src="/images/vodacom.png"
                className={`${styles.sponsorLogo} mx-auto d-block`}
                alt="Picture of the sponsor"
              />
              <img
                src="/images/gsm.png"
                className={`${styles.sponsorLogo} mx-auto d-block`}
                alt="Picture of the sponsor"
              />
              <img
                src="/images/sportpesa.png"
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

          </div>
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
