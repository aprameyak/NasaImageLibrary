'use client'
import React, { useState } from 'react';
import '../styles/landingpage.css'
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
    const [phrase, setPhrase] = useState('');
    const [startParam, setStartParam] = useState(0);
    const [endParam, setEndParam] = useState(0);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    async function submit(): Promise<void> {
        if (startParam < 1920 || startParam > 2025 || endParam < 1920 || endParam > 2025) {
            setError('Years must be between 1920 and 2025.');
            return;
        }
        if (endParam < startParam) {
            setError('End year must be greater than or equal to start year.');
            return;
        }
        const url = `https://images-api.nasa.gov/search?q=${phrase}&media_type=image&year_start=${startParam}&year_end=${endParam}`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                setError('No results found');
            }
            const json = await response.json();
            const items = json.collection?.items || [];
            if (items.length === 0) {
                setError('No results found');
            } else {
                setError(''); 
                navigate('/display', { state: { items } });
            }
        } catch (error) {
            setError('No results found');
        }
    }

    return (
        <div className='home'>
            <div className='header'>
                <h1>
                    NASA Image Search
                </h1>
            </div>
            <div className='phrasediv'>
                <input 
                    className='phrase'
                    type='text' 
                    placeholder='Enter in Phrase'
                    value={phrase}
                    onChange={(event) => setPhrase(event.target.value)}
                />
            </div>
            <div className='select'>
                Select Year Range:
                <div>
                    <input 
                        type='number'
                        value={startParam}
                        className='year'
                        onChange={(event) => setStartParam(Number(event.target.value))}
                    />
                    <input 
                        type='number'
                        value={endParam}
                        className='year'
                        onChange={(event) => setEndParam(Number(event.target.value))}
                    />    
                </div>
            </div>
            <div>
                <button
                    className='search'
                    onClick={submit}  
                >
                    Search!
                </button>
            </div>
            {error && (
                <div className='error'>
                    <p>{error}</p>
                </div>
            )}
        </div>
    );
};

export default LandingPage;
