import React from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

const AnalyticsChart = ({ data }) => (
    <div className="analytics-chart">
        <h3>Weekly Focus Time</h3>
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="focusTime" stroke="#D4AF37" />
            </LineChart>
        </ResponsiveContainer>
    </div>
);

export default AnalyticsChart;
