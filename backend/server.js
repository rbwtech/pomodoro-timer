const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const sessionRoutes = require('./src/routes/session.routes');
const timerRoutes = require('./src/routes/timer.route');
const routes = require('./src/routes'); // Jika ada route utama lainnya

dotenv.config(); // Load environment variables

const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:5173', // Ganti dengan origin frontend Anda
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, 
}));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/session', sessionRoutes);
app.use('/api/timer', timerRoutes);
app.use('/api', routes); // Rute lainnya jika ada

// Handle 404 - Not Found
app.use((req, res, next) => {
    res.status(404).json({
        message: 'Resource not found',
    });
});

// Global Error Handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        message: err.message || 'Internal Server Error',
    });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
