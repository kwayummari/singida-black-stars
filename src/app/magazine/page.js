"use client"
import React from "react";
import styles from '../../styles/magazine.module.scss';

export default function Teams() {
    return (
        <div>
            <div className={styles.subNeck}>
                <p className={styles.title}><strong>BlackStars Magazine</strong></p>
            </div>
            <div className={styles.magazine}>
                <img src='/images/magazine.webp' alt="Magazine Image" className={styles.magazineImage} />
            </div>
            <p className={styles.fullHistory}>
                <strong>We are excited to announce the launch of ‘BlackStars’ – our new monthly magazine!</strong>
            </p>
            <p className={styles.fullHistory}>
                From exclusive columns by the BlackStars boss and Vice-Chairman Ben Levin,
                to news from the Singida Town Community Foundation and even a Junior BlackStars
                page, we have something for everybody!<br /><br />

                These copies will be available around the ground tomorrow in popular
                areas. Fan Zone, Redz Bar, Ticket Office, select tea bars & online.<br /><br />

                We are currently working on a monthly subscription service, but in the
                meantime, copies can be purchased online now!
            </p>
            <p className={styles.fullHistory}>
                <strong>Sponsorship & Advertisement Opportunities</strong>
            </p>
            <p className={styles.fullHistory}>
                We have a range of exciting sponsorship and advertisement opportunities
                for BLACKSTARS starting at just Tsh.10,000/=<br /><br />

                These copies will be available around the ground tomorrow in popular
                areas. Fan Zone, BlackStars Bar, Ticket Office, select tea bars & online.<br /><br />

                If you are interested in advertising with us, or wish to find out more
                about are available opportunities, please email commercial@singidablackstars.com
            </p>
        </div>
    );
}
