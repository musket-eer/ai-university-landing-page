// src/components/common/HeroSection.js
import React from 'react';
import { Link } from 'react-router-dom';
import './heroSection.css';

function HeroSection({ tagline, description, primaryButton, secondaryButton }) {
    return (
        <section className="hero-section">
            <div className="hero-content">
                <h1 className="hero-tagline">{tagline}</h1>
                <p className="hero-description">{description}</p>
                <div className="hero-buttons">
                    {primaryButton && (
                        <Link to={primaryButton.link} className="button primary">
                            {primaryButton.text}
                        </Link>
                    )}
                    {secondaryButton && (
                        <Link to={secondaryButton.link} className="button secondary">
                            {secondaryButton.text}
                        </Link>
                    )}
                </div>
            </div>
        </section>
    );
}

export default HeroSection;