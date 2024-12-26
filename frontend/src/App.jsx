// src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import Stats from './pages/Stats';
import Timer from './pages/Timer';
import Todo from './pages/Todo';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import ProtectedRoute from './components/auth/ProtectedRoute';
import SpotifyCallback from './components/spotify/SpotifyCallback';
import './styles/timer.css';
import './styles/global.css';
import './styles/auth.css';
import './styles/spotifyPlayer.css';

function App() {
  // Global state for volume and soundEnabled
  const [volume, setVolume] = useState(0.5);
  const [soundEnabled, setSoundEnabled] = useState(true);

  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/callback" element={<SpotifyCallback />} />

            {/* Protected Routes */}
            <Route
              path="/stats"
              element={
                <ProtectedRoute>
                  <Stats />
                </ProtectedRoute>
              }
            />
            <Route
              path="/timer"
              element={
                <ProtectedRoute>
                  <Timer
                    volume={volume}
                    setVolume={setVolume}
                    soundEnabled={soundEnabled}
                    setSoundEnabled={setSoundEnabled}
                  />
                </ProtectedRoute>
              }
            />
            <Route
              path="/todo"
              element={
                <ProtectedRoute>
                  <Todo />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;
