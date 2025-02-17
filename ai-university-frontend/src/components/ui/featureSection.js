// src/components/common/FeaturesSection.js

import React from 'react';
import './featureSection.css';

function FeaturesSection({ features }) {
    return (
        <section className="features-section">
            <h2 className="features-title">Why Choose Us?</h2>
            <div className="features-container">
                {features.map((feature, index) => (
                    <div key={index} className="feature-card">
                        <div className={`feature-icon ${feature.iconClass}`}></div>
                        <h3 className="feature-title">{feature.title}</h3>
                        <p className="feature-description">{feature.description}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default FeaturesSection;