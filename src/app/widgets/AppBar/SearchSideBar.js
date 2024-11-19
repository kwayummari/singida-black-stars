import React, { useState, useEffect } from 'react';
import styles from '../../../styles/appBar.module.scss';

const SearchSideBar = ({ toggleSearchSidebar }) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);

    // Fetch search results after 3+ characters
    useEffect(() => {
        if (query.length >= 3) {
            fetch(`https://singidablackstars.co.tz/admin/news/search.php?query=${query}`)
                .then((response) => response.json())
                .then((data) => setResults(data))
                .catch((error) => console.error('Error:', error));
        } else {
            setResults([]); // Clear results for less than 3 characters
        }
    }, [query]);

    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };

    const handleResultClick = (newsItem) => {
        alert(`
            Title: ${newsItem.title}
            Category: ${newsItem.categoryName}
            Description: ${newsItem.description}
        `);
    };

    return (
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
                                value={query}
                                onChange={handleInputChange}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="offcanvas-body">
                {results.length > 0 ? (
                    results.map((news) => (
                        <div
                            key={news.id}
                            className="mb-3 p-3 border-bottom"
                            onClick={() => handleResultClick(news)}
                            style={{ cursor: 'pointer' }}
                        >
                            <h6>{news.title}</h6>
                            <p>{news.caption}</p>
                        </div>
                    ))
                ) : (
                    <p>No results found</p>
                )}
            </div>
        </div>
    );
};

export default SearchSideBar;
