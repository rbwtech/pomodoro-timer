const express = require('express');
const router = express.Router();
const authRoutes = require('./auth.routes');
const todoRoutes = require('./todo.routes');
const sessionRoutes = require('./session.routes');

router.use('/auth', authRoutes);
router.use('/sessions', sessionRoutes);
router.use('/todos', todoRoutes);

module.exports = router;