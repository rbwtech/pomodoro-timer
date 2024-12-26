const pool = require('../config/database');

const sessionController = {
    // Create a new session
    async startSession(req, res) {
        try {
            const { userId, duration, type } = req.body;

            if (!userId || !duration || !type) {
                return res.status(400).json({ message: 'User ID, duration, and type are required' });
            }

            const [result] = await pool.execute(
                'INSERT INTO waqtify_sessions (user_id, duration, type, start_time) VALUES (?, ?, ?, NOW())',
                [userId, duration, type]
            );

            res.status(201).json({ sessionId: result.insertId });
        } catch (error) {
            console.error('Error creating session:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Mark a session as completed
    async completeSession(req, res) {
        try {
            const { id } = req.params;

            const [result] = await pool.execute(
                'UPDATE waqtify_sessions SET completed = TRUE WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Session not found' });
            }

            res.json({ message: 'Session completed successfully' });
        } catch (error) {
            console.error('Error completing session:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Get weekly stats and progress
    async getStats(req, res) {
        const { userId } = req.params;

        try {
            // Fetch user's weekly goal
            const [userSettings] = await pool.execute(
                'SELECT weekly_goal FROM waqtify_user_settings WHERE user_id = ?',
                [userId]
            );

            if (!userSettings.length) {
                return res.status(404).json({ message: 'User settings not found' });
            }

            const weeklyGoal = userSettings[0].weekly_goal || 1200; // Default to 1200 (20 hours)

            // Fetch sessions within the last 7 days
            const [sessions] = await pool.execute(
                `SELECT * FROM waqtify_sessions 
                 WHERE user_id = ? 
                 AND type = 'focus' 
                 AND start_time >= DATE_SUB(NOW(), INTERVAL 7 DAY)`,
                [userId]
            );

            // Calculate total focus time and completed sessions
            const totalFocusTime = sessions.reduce((sum, session) => sum + session.duration, 0);
            const totalSessions = sessions.length;

            res.json({
                totalFocusTime,
                totalSessions,
                weeklyGoal,
                weeklyProgress: Math.min((totalFocusTime / weeklyGoal) * 100, 100), // Ensure progress doesn't exceed 100%
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },

    // Fetch all sessions for the user
    async getAllSessions(req, res) {
        const { userId } = req.query;

        try {
            if (!userId) {
                return res.status(400).json({ message: 'User ID is required' });
            }

            const [sessions] = await pool.execute(
                'SELECT * FROM waqtify_sessions WHERE user_id = ? ORDER BY start_time DESC',
                [userId]
            );

            res.json(sessions);
        } catch (error) {
            console.error('Error fetching sessions:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
};

module.exports = sessionController;
