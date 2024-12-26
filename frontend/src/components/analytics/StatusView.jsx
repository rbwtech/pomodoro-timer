// src/components/analytics/StatusView.jsx
import React, { useState, useEffect } from 'react';
import sessionService from '../../services/sessionService';
import AnalyticsChart from './AnalyticsChart';

const StatusView = () => {
    const [stats, setStats] = useState({
        weeklyData: [],
        achievements: [],
        topTasks: []
    });

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user?.user?.id) {
                const statsData = await sessionService.getStats(user.user.id);
                setStats(statsData);
            }
        } catch (error) {
            console.error('Error loading stats:', error);
        }
    };

    return (
        <div className="stats-container">
            <AnalyticsChart data={stats.weeklyData} />
        </div>
    );
};

export default StatusView;
