import React, { useEffect, useState } from 'react';
import '../styles/stats.css';

const Stats = () => {
    const [stats, setStats] = useState({
        dailyFocus: 0,
        weeklyFocus: 0,
        completedSessions: 0,
        streak: 0
    });

    useEffect(() => {
        // Load stats from backend
        loadStats();
    }, []);

    return (
        <div className="stats-container">
            <h2>Your Progress</h2>
            <div className="stats-grid">
                <div className="stat-card">
                    <h3>Today's Focus</h3>
                    <p>{stats.dailyFocus} minutes</p>
                </div>
                <div className="stat-card">
                    <h3>Weekly Focus</h3>
                    <p>{stats.weeklyFocus} minutes</p>
                </div>
                <div className="stat-card">
                    <h3>Sessions Completed</h3>
                    <p>{stats.completedSessions}</p>
                </div>
                <div className="stat-card">
                    <h3>Current Streak</h3>
                    <p>{stats.streak} days</p>
                </div>
            </div>
        </div>
    );
};

export default Stats;