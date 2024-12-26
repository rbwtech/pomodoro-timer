const express = require('express');
const router = express.Router();
const sessionController = require('../controllers/sessionController');
const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware);
router.post('/', sessionController.startSession);
router.put('/:id/complete', sessionController.completeSession);
router.get('/stats/:userId', sessionController.getStats);

module.exports = router;
