// sessionService.js
const BASE_URL = 'http://localhost:5000/api';

const sessionService = {
    async startSession(data) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found! Redirecting to login.');
            window.location.href = '/login';
            return;
        }

        const response = await fetch(`${BASE_URL}/sessions`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (response.status === 401) {
            console.error('Unauthorized! Redirecting to login.');
            window.location.href = '/login';
            return;
        }

        return response.json();
    },

    async completeSession(sessionId) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found! Redirecting to login.');
            window.location.href = '/login';
            return;
        }

        const response = await fetch(`${BASE_URL}/sessions/${sessionId}/complete`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (response.status === 401) {
            console.error('Unauthorized! Redirecting to login.');
            window.location.href = '/login';
            return;
        }

        return response.json();
    },

    async getStats(userId) {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found! Redirecting to login.');
            window.location.href = '/login';
            return;
        }

        try {
            const response = await fetch(`${BASE_URL}/sessions/stats/${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            if (!response.ok) {
                if (response.status === 401) {
                    console.error('Unauthorized! Redirecting to login.');
                    window.location.href = '/login';
                    return;
                }
                const errorData = await response.json();
                throw new Error(errorData.message || 'Failed to fetch stats');
            }

            const statsData = await response.json();
            return statsData;
        } catch (error) {
            console.error('Error fetching stats:', error);
            throw error;
        }
    }
};

export default sessionService;
