import React from 'react';
import styles from '../../styles/appBar.module.scss';

const SearchSideBar = (toggleSearchSidebar) => (
    <div>
        <div className={styles.headerSearch}>
            <div className={styles.topperSearch}>
                <h5 className={styles.title}>Search</h5>
                <button type="button" className="btn-close btn-close-white" onClick={toggleSearchSidebar}></button>
            </div>
            <div>
                <form>
                    <div className="mb-3 pt-5">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search..."
                        />
                    </div>
                </form>
            </div>
        </div>
        <div className="offcanvas-body">
            <p>Search Content</p>
        </div>
    </div>
);

export default SearchSideBar;
