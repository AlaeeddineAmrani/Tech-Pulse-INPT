import React from 'react';
import '../assets/styles/HeroSection.css'; // Ajuste le chemin selon ton dossier

function HeroSection() {
    return (
        <div className="hero-container">
            <div className="hero-left">
                <h1 className="hero-title">
                    <span className="gradient-text">Open Source</span> <br />
                    <span className='activity'>Activity</span>
                </h1>
                <p className="hero-description">
                    Track, analyze, and compare GitHub repositories with real-time metrics, contributor insights, and trend detection — all in one place for Tech Pulse INPT.
                </p>
                
                <div className="hero-stats">
                    <div className="stat-box">
                        <h3 className="stat-number text-yellow">50K+</h3>
                        <p className="stat-label">Repositories Tracked</p>
                    </div>
                    <div className="stat-box">
                        <h3 className="stat-number text-blue">2.4M</h3>
                        <p className="stat-label">Commits Analyzed</p>
                    </div>
                    <div className="stat-box">
                        <h3 className="stat-number text-green">180+</h3>
                        <p className="stat-label">Countries</p>
                    </div>
                </div>
            </div>

            <div className="hero-right">
                <img src="../assets/icons/" alt="" />
            </div>
        </div>
    );
}

export default HeroSection;