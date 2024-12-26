import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Menu } from 'lucide-react';
import '../../styles/layout.css';

const Layout = ({ children }) => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
        setIsMenuOpen(false);
    };

    const isActiveRoute = (path) => location.pathname === path;

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    return (
        <div className="app-container">
            <nav className="navbar">
                <div className="navbar-wrapper">
                    <div className="navbar-top">
                        <Link to="/" className="nav-brand">
                            Waqtify
                        </Link>
                        <button
                            className="menu-toggle"
                            onClick={toggleMenu}
                            aria-label="Toggle navigation menu"
                        >
                            <Menu size={24} />
                        </button>
                    </div>

                    <div className={`nav-content ${isMenuOpen ? 'show' : ''}`}>
                        <div className="nav-links">
                            {user ? (
                                <>
                                    <Link
                                        to="/"
                                        className={isActiveRoute('/') ? 'active' : ''}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Home
                                    </Link>
                                    <Link
                                        to="/timer"
                                        className={isActiveRoute('/timer') ? 'active' : ''}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Timer
                                    </Link>
                                    <Link
                                        to="/todo"
                                        className={isActiveRoute('/todo') ? 'active' : ''}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Todo
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        className={isActiveRoute('/login') ? 'active' : ''}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        className={isActiveRoute('/register') ? 'active' : ''}
                                        onClick={() => setIsMenuOpen(false)}
                                    >
                                        Register
                                    </Link>
                                </>
                            )}
                        </div>

                        {user && (
                            <div className="nav-user-section">
                                <span className="user-name">Hello, {user.user.username}</span>
                                <button
                                    onClick={handleLogout}
                                    className="btn-logout"
                                    aria-label="Logout"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <main className="main-content">{children}</main>
        </div>
    );
};

export default Layout;
