import axios from 'axios';

const API_URL = 'http://localhost:5000/api/auth';

const authService = {
    async register(userData) {
        try {
            const response = await axios.post(`${API_URL}/register`, userData);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('token', response.data.token); // Simpan token secara terpisah
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    async login(credentials) {
        try {
            const response = await axios.post(`${API_URL}/login`, credentials);
            if (response.data.token) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('token', response.data.token); // Simpan token secara terpisah
            }
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    logout() {
        localStorage.removeItem('user');
        localStorage.removeItem('token'); // Hapus token saat logout
    },

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user) : null;
    },

    getToken() {
        return localStorage.getItem('token');
    }
};

export default authService;
