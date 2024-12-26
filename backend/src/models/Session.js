const pool = require('../config/database');

const Session = {
    async create({ userId, duration, type }) {
        const [result] = await pool.execute(
            'INSERT INTO waqtify_sessions (user_id, duration, type, start_time) VALUES (?, ?, ?, NOW())',
            [userId, duration, type]
        );
        return result.insertId;
    },

    async update(id, { completed }) {
        await pool.execute(
            'UPDATE waqtify_sessions SET completed = ? WHERE id = ?',
            [completed, id]
        );
    },

    async getStats(userId) {
        const [rows] = await pool.execute(
            'SELECT COUNT(*) as total, SUM(duration) as totalTime FROM waqtify_sessions WHERE user_id = ? AND completed = 1',
            [userId]
        );
        return rows[0];
    }
};

module.exports = Session;