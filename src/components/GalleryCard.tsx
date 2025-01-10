'use client'
import React from 'react';
import '../styles/gallerycard.css';

interface GalleryCardProps {
    title: string;
    description: string;
    imageUrl: string;
    date_created: string;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ title, description, imageUrl, date_created }) => {
    const formattedDate = new Date(date_created).toLocaleDateString('en-US', {
        month: 'long', 
        day: 'numeric', 
        year: 'numeric' 
    });

    return (
        <div className="card">
            <div className="left">
                <h3 className='title'>{title}</h3>
                <img src={imageUrl} alt={title} className="image" />
                <p className="date">{formattedDate}</p> 
            </div>
            <div className="separator"></div>
            <div className="right">
                <p className='description'>{description}</p>
            </div>
        </div>
    );
};

export default GalleryCard;
