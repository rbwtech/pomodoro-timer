const pool = require('../config/database');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
    async register(req, res) {
        try {
            const { username, email, password } = req.body;
            
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            
            // Insert user
            const [result] = await pool.execute(
                'INSERT INTO waqtify_users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );
            
            res.status(201).json({
                message: 'User registered successfully',
                userId: result.insertId
            });
        } catch (error) {
            console.error('Register error:', error);
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Username or email already exists' });
            }
            res.status(500).json({ message: 'Error registering user' });
        }
    },

    async login(req, res) {
        try {
            const { email, password } = req.body;
            
            // Get user
            const [users] = await pool.execute(
                'SELECT * FROM waqtify_users WHERE email = ?',
                [email]
            );

            if (users.length === 0) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            const user = users[0];
            
            // Check password
            const validPassword = await bcrypt.compare(password, user.password);
            if (!validPassword) {
                return res.status(401).json({ message: 'Invalid credentials' });
            }

            // Generate JWT
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            res.json({
                token,
                user: {
                    id: user.id,
                    username: user.username,
                    email: user.email
                }
            });
        } catch (error) {
            console.error('Login error:', error);
            res.status(500).json({ message: 'Error logging in' });
        }
    }
};

module.exports = userController;