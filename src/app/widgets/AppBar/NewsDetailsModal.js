import React from 'react';

const NewsDetailsModal = ({ newsItem, onClose }) => (
    <div className="modal" style={{ display: 'block' }}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">{newsItem.title}</h5>
                    <button type="button" className="btn-close" onClick={onClose}></button>
                </div>
                <div className="modal-body">
                    <img
                        src={newsItem.image}
                        alt={newsItem.title}
                        style={{ width: '100%', marginBottom: '1rem' }}
                    />
                    <p><strong>Category:</strong> {newsItem.categoryName}</p>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: newsItem.description,
                        }}
                    />
                </div>
            </div>
        </div>
    </div>
);

export default NewsDetailsModal;
