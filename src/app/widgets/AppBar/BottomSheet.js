import React from 'react';
import styles from '../../../styles/bottomSheet.module.scss';
import Link from 'next/link';

const BottomSheetBar = ({toggleBottomSheet}) => (
    <div className={`${styles.BottomSheetBar} container mt-4`} >
        <div className="row">
            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <Link href="/news" passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>
                            <h5 onClick={toggleBottomSheet} className={`${styles.headings} card-title`}>News</h5>
                        </Link>
                        <Link href="/matches" passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>
                            <h5 onClick={toggleBottomSheet} className={`${styles.headings} card-title`}>Matches</h5>
                        </Link>
                        <Link href="/teams" passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>
                            <h5 onClick={toggleBottomSheet} className={`${styles.headings} card-title`}>Teams</h5>
                        </Link>
                        <h5 onClick={toggleBottomSheet} className={`${styles.headings} card-title`}>IFollow</h5>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className={`${styles.headings} card-title`}>Club</h5>
                        <p className="card-text"> <a href="/pdf/data.pdf" onClick={toggleBottomSheet} target="_blank" style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>Club Charter </a></p>
                        <p className="card-text"><Link href="/history" onClick={toggleBottomSheet} passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>Club History</Link></p>
                        <p className="card-text"><Link href="/fans" onClick={toggleBottomSheet} passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>Fan Engagement Plan</Link></p>
                        <p className="card-text"><Link href="/club-contacts" onClick={toggleBottomSheet} passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>Club Information Contacts</Link></p>
                        <p className="card-text"><Link href="/ownership" onClick={toggleBottomSheet} passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>Ownership Statement</Link></p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className={`${styles.headings} card-title`}>Commercial</h5>
                        <p className="card-text"><Link href="/sponsorship" onClick={toggleBottomSheet} passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>Match Sponsorship</Link></p>
                        <p className="card-text"><Link href="/partnership" onClick={toggleBottomSheet} passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>Commercial Partners</Link></p>
                        <p className="card-text"><Link href="/magazine" onClick={toggleBottomSheet} passHref style={{ cursor: "pointer", color:  'black', textDecoration: 'none' }}>BlackStars Magazines</Link></p>
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
                        <p onClick={toggleBottomSheet} className="card-text">Home Tickets</p>
                        <p onClick={toggleBottomSheet} className="card-text">Visitors Guide</p>
                        <p onClick={toggleBottomSheet} className="card-text">Junior Team Experiences Mascots</p>
                        <p onClick={toggleBottomSheet} className="card-text">Season Tickets</p>
                        <p onClick={toggleBottomSheet} className="card-text">Stadium Map</p>
                        <p onClick={toggleBottomSheet} className="card-text">Family Stand</p>
                        <p onClick={toggleBottomSheet} className="card-text">Hospitality Tickets</p>
                        <p onClick={toggleBottomSheet} className="card-text">Away Tickets</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default BottomSheetBar;
