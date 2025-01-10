'use client'
import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import GalleryCard from './GalleryCard';
import '../styles/displaypage.css';

const DisplayPage: React.FC = () => {
    const { state } = useLocation();
    const items = state?.items || [];
    const [position, setPosition] = useState(0);
    const navigate = useNavigate();
    const currentItem = items[position] || {};
    const title = currentItem?.data?.[0]?.title;
    const description = currentItem?.data?.[0]?.description;
    const imageUrl = currentItem?.links?.[0]?.href;
    const date_created = currentItem?.data?.[0]?.date_created;

    const nav = () => {
        navigate('/');
    };
    const left = () => {
        if (position > 0) {
            setPosition(position - 1);
        }
    };
    const right = () => {
        if (position < items.length - 1) {
            setPosition(position + 1);
        }
    };

    return (
        <div className="home">
            <button className="back" onClick={nav}>
                Back
            </button>
            <div className="carousel">
                <button 
                    onClick={left} 
                    disabled={position === 0}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                    }}
                >
                    <svg width="50" height="50">
                        <polygon points="45,5 5,25 45,45" fill="rgb(248, 236, 252)" />
                    </svg>
                </button>
                <div className="gallery-container">
                    <GalleryCard 
                        title={title} 
                        description={description} 
                        imageUrl={imageUrl} 
                        date_created={date_created} 
                    />
                </div> 
                <button 
                    onClick={right} 
                    disabled={position === items.length - 1}
                    style={{
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                    }}
                >
                    <svg width="50" height="50">
                        <polygon points="5,5 45,25 5,45" fill="rgb(248, 236, 252)" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default DisplayPage;
