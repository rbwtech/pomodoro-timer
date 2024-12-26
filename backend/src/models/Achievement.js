const pool = require('../config/database');

const Achievement = {
    async unlock(userId, achievementId) {
        await pool.execute(
            'INSERT INTO user_achievements (user_id, achievement_id, unlocked_at) VALUES (?, ?, NOW())',
            [userId, achievementId]
        );
    },

    async getUserAchievements(userId) {
        const [rows] = await pool.execute(
            'SELECT * FROM user_achievements WHERE user_id = ?',
            [userId]
        );
        return rows;
    }
};

module.exports = Achievement;