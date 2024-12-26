const express = require('express');
const router = express.Router();
const timerController = require('../controllers/timerController');
const authMiddleware = require('../middleware/authMiddleware');

// Rute khusus untuk operasi timer
router.post('/complete-session/:id', authMiddleware, timerController.completeSession);
router.post('/update-focus-time', authMiddleware, timerController.updateFocusTime);

module.exports = router;
