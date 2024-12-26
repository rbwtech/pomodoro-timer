const pool = require('../config/database');

const timerController = {
    // Membuat sesi timer baru
    async createSession(req, res) {
        try {
            const { user_id, duration, type } = req.body;

            const [result] = await pool.execute(
                'INSERT INTO waqtify_sessions (user_id, duration, type, start_time) VALUES (?, ?, ?, NOW())',
                [user_id, duration, type]
            );

            res.status(201).json({
                message: 'Session created successfully',
                sessionId: result.insertId,
            });
        } catch (error) {
            console.error('Create session error:', error);
            res.status(500).json({ message: 'Error creating session' });
        }
    },

    // Menandai sesi sebagai selesai
    async completeSession(req, res) {
        const { id } = req.params;
        try {
            const [result] = await pool.execute(
                'UPDATE waqtify_sessions SET completed = 1 WHERE id = ?',
                [id]
            );
            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Session not found' });
            }
            res.status(200).json({ message: 'Session completed successfully' });
        } catch (error) {
            console.error('Error completing session:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    },
    

    // Mendapatkan semua sesi timer user
    async getSessions(req, res) {
        try {
            const { user_id } = req.query;

            const [sessions] = await pool.execute(
                'SELECT * FROM waqtify_sessions WHERE user_id = ? ORDER BY start_time DESC',
                [user_id]
            );

            res.json(sessions);
        } catch (error) {
            console.error('Get sessions error:', error);
            res.status(500).json({ message: 'Error getting sessions' });
        }
    },

    // Mengupdate waktu fokus pengguna
    async updateFocusTime(req, res) {
        try {
            const { userId, focusTime } = req.body;

            if (!userId || !focusTime) {
                return res.status(400).json({ message: 'Missing required fields.' });
            }

            // Periksa apakah sudah ada data untuk hari ini
            const [existingStats] = await pool.execute(
                'SELECT * FROM waqtify_stats WHERE user_id = ? AND date = CURDATE()',
                [userId]
            );

            if (existingStats.length > 0) {
                // Perbarui data jika ada
                await pool.execute(
                    'UPDATE waqtify_stats SET total_focus_time = total_focus_time + ?, sessions_completed = sessions_completed + 1 WHERE id = ?',
                    [focusTime, existingStats[0].id]
                );
            } else {
                // Buat data baru jika belum ada
                await pool.execute(
                    'INSERT INTO waqtify_stats (user_id, date, total_focus_time, sessions_completed) VALUES (?, CURDATE(), ?, 1)',
                    [userId, focusTime]
                );
            }

            res.status(200).json({ message: 'Focus time updated successfully.' });
        } catch (error) {
            console.error('Error updating focus time:', error);
            res.status(500).json({ message: 'Internal server error.' });
        }
    },

    // Mendapatkan statistik user
    async getStats(req, res) {
        try {
            const { userId } = req.params;

            // Mendapatkan data sesi fokus dalam 7 hari terakhir
            const [weeklyData] = await pool.execute(
                `SELECT DATE_FORMAT(start_time, '%Y-%m-%d') as date, SUM(duration) as focusTime
                 FROM waqtify_sessions
                 WHERE user_id = ? AND start_time >= DATE_SUB(CURDATE(), INTERVAL 7 DAY) AND type = 'focus'
                 GROUP BY date
                 ORDER BY date ASC`,
                [userId]
            );

            // Mendapatkan goal mingguan dari pengaturan pengguna
            const [userSettings] = await pool.execute(
                'SELECT weekly_goal FROM waqtify_user_settings WHERE user_id = ?',
                [userId]
            );
            const weeklyGoal = userSettings[0]?.weekly_goal || 1; // Default jika tidak ada
            

            if (!userSettings.length) {
                return res.status(404).json({ message: 'User settings not found' });
            }

            // Hitung total waktu fokus dan jumlah sesi
            const totalFocusTime = weeklyData.reduce((sum, day) => sum + day.focusTime, 0);
            const totalSessions = weeklyData.length;

            res.json({
                totalFocusTime,
                totalSessions,
                weeklyGoal,
                weeklyProgress: Math.min((totalFocusTime / weeklyGoal) * 100, 100), // Hindari lebih dari 100%
                weeklyData,
            });
        } catch (error) {
            console.error('Get stats error:', error);
            res.status(500).json({ message: 'Error getting stats' });
        }
    },
};

module.exports = timerController;
