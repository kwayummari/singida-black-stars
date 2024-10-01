import React from 'react';
import styles from '../../../styles/bottomSheet.module.scss';

const BottomSheetBar = () => (
    <div className={`${styles.BottomSheetBar} container mt-4`} >
        <div className="row">
            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className={`${styles.paragraph} card-title`}>News</h5>
                        <p className="card-text">This is a description for item 1.</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Club</h5>
                        <p className="card-text">This is a description for item 2.</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Commercial</h5>
                        <p className="card-text">This is a description for item 3.</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Community</h5>
                        <p className="card-text">This is a description for item 4.</p>
                    </div>
                </div>
            </div>

            <div className="col-md-3 col-sm-6 col-12 mb-3">
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Tickets</h5>
                        <p className="card-text">This is a description for item 4.</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default BottomSheetBar;
