import React from 'react';
import styles from '../../../styles/bottomSheet.module.scss';
import Link from 'next/link';

const BottomSheetBar = () => (
    <div className={`${styles.BottomSheetBar} container mt-4`} >
        <div className="row">
            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <Link href="/news" passHref>
                            <h5 className={`${styles.headings} card-title`}>News</h5>
                        </Link>
                        <Link href="/matches" passHref>
                            <h5 className={`${styles.headings} card-title`}>Matches</h5>
                        </Link>
                        <Link href="/teams" passHref>
                            <h5 className={`${styles.headings} card-title`}>Teams</h5>
                        </Link>
                        <h5 className={`${styles.headings} card-title`}>IFollow</h5>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className={`${styles.headings} card-title`}>Club</h5>
                        <p className="card-text"> <a href="/pdf/data.pdf" target="_blank">Club Charter </a></p>
                        <p className="card-text"><Link href="/history" passHref>Club History</Link></p>
                        <p className="card-text">Fan Engagement Plan</p>
                        <p className="card-text">Club Information Contacts</p>
                        <p className="card-text">Ownership Statement</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className={`${styles.headings} card-title`}>Commercial</h5>
                        <p className="card-text">Match Sponsorship</p>
                        <p className="card-text">Commercial Partners</p>
                        <p className="card-text">BlackStars Magazines</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className={`${styles.headings} card-title`}>Community</h5>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className={`${styles.headings} card-title`}>Tickets</h5>
                        <p className="card-text">Home Tickets</p>
                        <p className="card-text">Visitors Guide</p>
                        <p className="card-text">Junior Team Experiences Mascots</p>
                        <p className="card-text">Season Tickets</p>
                        <p className="card-text">Stadium Map</p>
                        <p className="card-text">Family Stand</p>
                        <p className="card-text">Hospitality Tickets</p>
                        <p className="card-text">Away Tickets</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default BottomSheetBar;
