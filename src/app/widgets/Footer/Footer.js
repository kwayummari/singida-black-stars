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
                alt="Picture of the author"
              />
              <hr className={styles.lines} />
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
