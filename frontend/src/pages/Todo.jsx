import React, { useState, useEffect } from 'react';
import todoService from '../services/todoService';
import '../styles/todo.css';

const Todo = () => {
    const [todos, setTodos] = useState([]);
    const [newTodo, setNewTodo] = useState('');
    const [filter, setFilter] = useState('all');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadTodos();
    }, []);

    const loadTodos = async () => {
        try {
            setIsLoading(true);
            const user = JSON.parse(localStorage.getItem('user'));
            if (user?.user?.id) {
                const todosData = await todoService.getTodos(user.user.id);
                setTodos(todosData.map(todo => ({ ...todo, removing: false })));
            }
        } catch (error) {
            setError('Error loading todos');
        } finally {
            setIsLoading(false);
        }
    };

    const addTodo = async (e) => {
        e.preventDefault();
        if (!newTodo.trim()) return;

        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (!user?.user?.id) {
                throw new Error('User not authenticated');
            }

            await todoService.createTodo({
                user_id: user.user.id,
                title: newTodo
            });
            setNewTodo('');
            await loadTodos();
        } catch (error) {
            console.error('Error adding todo:', error);
            setError(error.message || 'Error adding todo');
        }
    };

    const toggleTodo = async (id) => {
        try {
            const todo = todos.find(t => t.id === id);
            await todoService.updateTodo(id, { completed: !todo.completed });
            await loadTodos();
        } catch (error) {
            setError('Error updating todo');
            console.error('Error updating todo:', error);
        }
    };

    const deleteTodo = async (id) => {
        try {
            // Tambahkan kelas 'removing' sebelum menghapus
            setTodos(prevTodos => prevTodos.map(todo => 
                todo.id === id ? { ...todo, removing: true } : todo
            ));
            // Tunggu animasi selesai sebelum menghapus
            setTimeout(async () => {
                await todoService.deleteTodo(id);
                await loadTodos();
            }, 300); // Sesuaikan durasi dengan animasi CSS
        } catch (error) {
            setError('Error deleting todo');
            console.error('Error deleting todo:', error);
        }
    };

    const filteredTodos = todos.filter(todo => {
        if (filter === 'active') return !todo.completed;
        if (filter === 'completed') return todo.completed;
        return true;
    });

    if (isLoading) return <div className="loading">Loading...</div>;
    if (error) return <div className="error">{error}</div>;

    return (
        <div className="todo-container">
            {/* Stats section */}
            <div className="todo-stats">
                <div className="stat-box">
                    <span className="stat-label">Total</span>
                    <span className="stat-value">{todos.length}</span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Completed</span>
                    <span className="stat-value">
                        {todos.filter(t => t.completed).length}
                    </span>
                </div>
                <div className="stat-box">
                    <span className="stat-label">Active</span>
                    <span className="stat-value">
                        {todos.filter(t => !t.completed).length}
                    </span>
                </div>
            </div>

            {/* Filter buttons */}
            <div className="todo-filters">
                {['all', 'active', 'completed'].map(f => (
                    <button
                        key={f}
                        className={`filter-btn ${filter === f ? 'active' : ''}`}
                        onClick={() => setFilter(f)}
                        aria-pressed={filter === f}
                    >
                        {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                ))}
            </div>

            {/* Add todo form */}
            <form onSubmit={addTodo} className="todo-form">
                <input
                    type="text"
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    placeholder="Add a new task..."
                    className="todo-input"
                    aria-label="New Todo"
                />
                <button type="submit" className="add-btn" aria-label="Add Todo">Add</button>
            </form>

            {/* Todo list */}
            <div className="todo-list">
                {filteredTodos.map(todo => (
                    <div 
                        key={todo.id} 
                        className={`todo-item ${todo.completed ? 'completed' : ''} ${todo.removing ? 'removing' : ''}`}
                    >
                        <span className="todo-title">{todo.title}</span>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleTodo(todo.id)}
                            aria-label={`Mark ${todo.title} as ${todo.completed ? 'incomplete' : 'complete'}`}
                        />
                        <button 
                            onClick={() => deleteTodo(todo.id)}
                            className="delete-btn"
                            aria-label={`Delete ${todo.title}`}
                        >
                            ×
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Todo;
