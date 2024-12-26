import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const todoService = {
    async getTodos(userId) {
        try {
            const response = await axios.get(`${API_URL}/todos`, {
                params: { userId },
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error fetching todos:', error);
            throw error.response?.data || error;
        }
    },

    async createTodo(data) {
        try {
            const response = await axios.post(`${API_URL}/todos`, data, {
                headers: {
                    'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw error.response?.data || error;
        }
    },

    async updateTodo(id, data) {
        return fetch(`${API_URL}/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: JSON.stringify(data)
        }).then(res => res.json());
    },

    async deleteTodo(id) {
        return fetch(`${API_URL}/todos/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }).then(res => res.json());
    }
};

export default todoService;