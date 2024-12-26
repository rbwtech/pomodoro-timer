const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');
const authMiddleware = require('../middleware/authMiddleware');

// Endpoint untuk menyelesaikan sesi
router.post('/complete-session/:id', authMiddleware, timerController.completeSession);

// Endpoint untuk memperbarui waktu fokus
router.post('/update-focus-time', authMiddleware, async (req, res) => {
    const { userId, focusTime } = req.body;

    // Validasi input
    if (!userId || focusTime === undefined || focusTime < 0) {
        return res.status(400).json({ message: 'Missing or invalid required fields.' });
    }

    try {
        res.status(200).json({ message: 'Focus time updated successfully.' });
    } catch (error) {
        console.error('Error updating focus time:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

module.exports = router;
