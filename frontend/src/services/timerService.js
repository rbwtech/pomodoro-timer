import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const timerService = {
    async startSession(sessionData) {  
        try {
            const response = await axios.post(`${API_URL}/sessions`, sessionData, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    async getSessions(userId) {
        try {
            const response = await axios.get(`${API_URL}/sessions`, {
                params: { user_id: userId }
            });
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    async updateSession(sessionId, data) {
        try {
            const response = await axios.put(`${API_URL}/sessions/${sessionId}`, data);
            return response.data;
        } catch (error) {
            throw error.response.data;
        }
    },

    async updateFocusTime(userId, focusTime) {
        const response = await fetch(`http://localhost:5000/api/timer/update-focus-time`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            body: JSON.stringify({ userId, focusTime })
        });
        return response.json();
    }, 
    
    async completeSession(sessionId) {
        const token = localStorage.getItem('token');
        if (!token) {
            throw new Error('Token not found');
        }

        const response = await fetch(`http://localhost:5000/api/timer/complete-session/${sessionId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`
            }
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Failed to complete session');
        }

        return await response.json();
    },
};

export default timerService;