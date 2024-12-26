const pool = require('../config/database');

const todoController = {
    // Membuat todo baru
    async createTodo(req, res) {
        try {
            const { user_id, title } = req.body;
            if (!user_id) {
                return res.status(400).json({ message: 'User ID is required' });
            }
            
            const [result] = await pool.execute(
                'INSERT INTO waqtify_todos (user_id, title) VALUES (?, ?)',
                [user_id, title]
            );
            res.status(201).json({ id: result.insertId });
        } catch (error) {
            console.error('Todo creation error:', error);
            res.status(500).json({ message: error.message });
        }
    },

    // Mendapatkan semua todo user
    async getTodos(req, res) {
        try {
            const { userId } = req.query; // ubah user_id menjadi userId
            const [todos] = await pool.execute(
                'SELECT * FROM waqtify_todos WHERE user_id = ? ORDER BY created_at DESC',
                [userId]
            );
            
            res.json(todos);
        } catch (error) {
            console.error('Get todos error:', error);
            res.status(500).json({ message: 'Error getting todos' });
        }
    },

    // Update status todo
    async updateTodo(req, res) {
        try {
            const { id } = req.params;
            const { completed } = req.body;
            
            const [result] = await pool.execute(
                'UPDATE waqtify_todos SET completed = ? WHERE id = ?',
                [completed, id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            res.json({ message: 'Todo updated successfully' });
        } catch (error) {
            console.error('Update todo error:', error);
            res.status(500).json({ message: 'Error updating todo' });
        }
    },

    // Hapus todo
    async deleteTodo(req, res) {
        try {
            const { id } = req.params;
            
            const [result] = await pool.execute(
                'DELETE FROM waqtify_todos WHERE id = ?',
                [id]
            );

            if (result.affectedRows === 0) {
                return res.status(404).json({ message: 'Todo not found' });
            }

            res.json({ message: 'Todo deleted successfully' });
        } catch (error) {
            console.error('Delete todo error:', error);
            res.status(500).json({ message: 'Error deleting todo' });
        }
    }
};

module.exports = todoController;