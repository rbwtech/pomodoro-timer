// src/pages/Timer.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import timerService from '../services/timerService';
import todoService from '../services/todoService';
import sessionService from '../services/sessionService';
import SpotifyPlayer from '../components/spotify/SpotifyPlayer';
import '../styles/timer.css';

// Memisahkan PresetButtons ke komponen terpisah
const PresetButtons = ({ PRESETS, setMinutes, setSeconds }) => (
    <div className="preset-buttons">
        {PRESETS.map(preset => (
            <button 
                key={preset.name}
                onClick={() => {
                    setMinutes(preset.duration);
                    setSeconds(0);
                }}
                className="preset-btn"
            >
                {preset.name} ({preset.duration}m)
            </button>
        ))}
    </div>
);

const TaskInput = React.memo(({ setCurrentTask }) => { 
    const [todos, setTodos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [showDropdown, setShowDropdown] = useState(false);

    useEffect(() => {
        const loadTodoList = async () => {
            try {
                const user = JSON.parse(localStorage.getItem('user'));
                if (user?.user?.id) {
                    const todosData = await todoService.getTodos(user.user.id);
                    setTodos(todosData);
                }
            } catch (error) {
                console.error('Error loading todos:', error);
            }
        };
        loadTodoList();
    }, []);

    return (
        <div className="task-input-container">
            <div className="task-input-wrapper">
                <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowDropdown(true);
                    }}
                    onFocus={() => setShowDropdown(true)}
                    onBlur={() => setTimeout(() => setShowDropdown(false), 200)}
                    placeholder="Search or select task..."
                    className="task-search"
                />
                {showDropdown && todos.length > 0 && (
                    <div className="task-dropdown">
                        {todos
                            .filter(todo => 
                                todo.title.toLowerCase().includes(searchTerm.toLowerCase())
                            )
                            .map(todo => (
                                <div
                                    key={todo.id}
                                    className="task-option"
                                    onClick={() => {
                                        setCurrentTask(todo.title); 
                                        setSearchTerm(todo.title);
                                        setShowDropdown(false);
                                    }}
                                >
                                    {todo.title}
                                </div>
                            ))
                        }
                    </div>
                )}
            </div>
        </div>
    );
});

// Memisahkan WeeklyProgress ke komponen terpisah
const WeeklyProgress = ({ weeklyGoal, weeklyProgress }) => (
    <div className="weekly-progress">
        <h3>Weekly Goal: {weeklyGoal / 60} hours</h3>
        <div className="progress-bar">
            <div 
                className="progress-fill"
                style={{width: `${(weeklyProgress / weeklyGoal) * 100}%`}}
            />
        </div>
        <span>{Math.round((weeklyProgress / weeklyGoal) * 100)}% completed</span>
    </div>
);

const motivationalQuotes = [
    "Stay focused and never give up!",
    "Every minute counts!",
    "You can do this!",
    "Small steps lead to big achievements.",
    "Focus is the key to success!",
    "Great things take time.",
    "Keep pushing forward!",
    "Believe in yourself and stay on track.",
    "Discipline equals freedom.",
    "You're closer to your goal than you think."
];

// Function to get a random motivational quote
const getRandomMotivation = () => {
    return motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)];
};

// Component Timer utama
const Timer = () => {
    // State declarations...
    const [minutes, setMinutes] = useState(25);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [type, setType] = useState('focus');
    const [customMinutes, setCustomMinutes] = useState('');
    const [soundEnabled, setSoundEnabled] = useState(true);
    const [currentTask, setCurrentTask] = useState('');
    const [weeklyGoal, setWeeklyGoal] = useState(1200); // Default weekly goal
    const [weeklyProgress, setWeeklyProgress] = useState(0);
    const [totalFocusTime, setTotalFocusTime] = useState(0);
    const [cycles, setCycles] = useState(0);
    const [volume, setVolume] = useState(0.5);
    const [sessionId, setSessionId] = useState(null);
    const [lastCompleted, setLastCompleted] = useState(null);
    const [motivation, setMotivation] = useState(getRandomMotivation());
    const [analyticsData, setAnalyticsData] = useState({
        weeklyData: [],
    });

    const PRESETS = [
        { name: 'Short Focus', duration: 15 },
        { name: 'Standard', duration: 25 },
        { name: 'Long Focus', duration: 45 }
    ];

    const loadAnalytics = useCallback(async () => {
        try {
            const user = JSON.parse(localStorage.getItem('user'));
            if (user?.user?.id) {
                const statsData = await sessionService.getStats(user.user.id);
    
                setWeeklyGoal(statsData.weeklyGoal || 1200);
                setWeeklyProgress(statsData.totalFocusTime || 0);
                setTotalFocusTime(statsData.totalFocusTime || 0);
                setCycles(statsData.totalSessions || 0);
            }
        } catch (error) {
            console.error('Error loading analytics:', error);
        }
    }, []);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            console.error('Token not found! Redirecting to login.');
            window.location.href = '/login';
            return;
        }
    
        loadAnalytics();
    }, [loadAnalytics]);
    
    // Timer functions
    const startTimer = async () => {
        try {
            const { user } = JSON.parse(localStorage.getItem('user'));
            const response = await timerService.startSession({
                userId: user.id,
                duration: minutes,
                type,
                currentTask
            });
            setSessionId(response.sessionId);
            setMotivation(getRandomMotivation()); // Update motivasi
            setIsActive(true);
        } catch (error) {
            console.error('Failed to start session:', error);
        }
    };

    const pauseTimer = () => setIsActive(false);
    
    const resetTimer = () => {
        setIsActive(false);
        setMotivation(getRandomMotivation()); // Update motivasi
        setMinutes(type === 'focus' ? 25 : 5);
        setSeconds(0);
    };

    const switchType = (newType) => {
        setType(newType);
        setIsActive(false);
        setMinutes(newType === 'focus' ? 25 : 5);
        setSeconds(0);
    };

    

    const handleVolumeChange = (e) => {
        const newVolume = Number(e.target.value);
        setVolume(newVolume);

        // Jika Anda memiliki elemen audio lokal, Anda dapat menyinkronkan volume di sini
        const audioElement = document.getElementById('notification-audio');
        if (audioElement) {
            audioElement.volume = newVolume;
        }
    };

    const handleTimerComplete = useCallback(async () => {
        try {
            if (sessionId) {
                await timerService.completeSession(sessionId);
    
                // Update focus time in the backend
                const user = JSON.parse(localStorage.getItem('user'));
                if (user && user.user.id) {
                    const response = await fetch('http://localhost:5000/api/timer/update-focus-time', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${localStorage.getItem('token')}`,
                        },
                        body: JSON.stringify({
                            userId: user.user.id,
                            focusTime: minutes,
                        }),
                    });
    
                    if (!response.ok) {
                        const errorData = await response.json();
                        throw new Error(errorData.message || 'Failed to update focus time');
                    }
                }
    
                await loadAnalytics();
    
                if (soundEnabled) {
                    const audio = new Audio('/sounds/notification.mp3');
                    audio.volume = volume;
                    await audio.play().catch((err) => console.error('Failed to play sound:', err));
                }
                
    
                if (type === 'focus') {
                    setWeeklyProgress((prev) => prev + minutes);
                    setCycles((prev) => prev + 1);
                    setTotalFocusTime((prev) => prev + minutes);
    
                    const today = new Date().toDateString();
                    if (lastCompleted !== today) {
                        setStreak((prev) => prev + 1);
                        setLastCompleted(today);
                    }
                }
            }
        } catch (error) {
            console.error('Failed to complete session or update focus time:', error);
        }
    
        switchType(type === 'focus' ? 'break' : 'focus');
    }, [sessionId, soundEnabled, volume, type, minutes, loadAnalytics, lastCompleted]);
    

    // Timer effect
    useEffect(() => {
        let interval;
        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        handleTimerComplete();
                        clearInterval(interval);
                        return;
                    }
                    setMinutes(prev => prev - 1);
                    setSeconds(59);
                } else {
                    setSeconds(prev => prev - 1);
                }
            }, 1000);
        }
        return () => clearInterval(interval);
    }, [isActive, minutes, seconds, handleTimerComplete]);



    const handleCustomDuration = (e) => {
        e.preventDefault();
        if (customMinutes && Number(customMinutes) > 0) {
            setMinutes(Number(customMinutes));
            setSeconds(0);
            setCustomMinutes(''); // Reset input setelah diset
        }
    };

    return (
        <div className="app-container">
            <div className="timer-container">
                <div className="timer-content">
                    {/* Main Timer Section */}
                    <div className="timer-main-section">
                        <div className="timer-type-switcher">
                            <button 
                                className={`type-btn ${type === 'focus' ? 'active' : ''}`}
                                onClick={() => switchType('focus')}
                            >
                                Focus
                            </button>
                            <button 
                                className={`type-btn ${type === 'break' ? 'active' : ''}`}
                                onClick={() => switchType('break')}
                            >
                                Break
                            </button>
                        </div>

                        <div className="current-task-display">
                            {currentTask ? `Working on: ${currentTask}` : (
                                <>
                                    <span>No task selected</span>
                                    <p className="motivational-quote">{motivation}</p>
                                </>
                            )}
                        </div>


                        <div className="timer-display">
                            {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
                        </div>

                        <div className="timer-controls">
                            {!isActive ? (
                                <button className="control-btn start" onClick={startTimer}>Start</button>
                            ) : (
                                <button className="control-btn pause" onClick={pauseTimer}>Pause</button>
                            )}
                            <button className="control-btn reset" onClick={resetTimer}>Reset</button>
                        </div>

                        <div className="timer-presets-section">
                            <PresetButtons PRESETS={PRESETS} setMinutes={setMinutes} setSeconds={setSeconds} />
                            
                            <form onSubmit={handleCustomDuration} className="custom-duration">
                                <div className="custom-duration-wrapper">
                                    <input
                                        type="number"
                                        value={customMinutes}
                                        onChange={(e) => setCustomMinutes(e.target.value)}
                                        placeholder="Custom minutes"
                                        min="1"
                                        max="60"
                                    />
                                    <button type="submit">Set Custom Time</button>
                                </div>
                            </form>
                        </div>

                        <div className="task-section">
                            <h3>Select Task</h3>
                            <TaskInput setCurrentTask={setCurrentTask} />
                        </div>
    
                    </div>

                    {/* Side Sections */}
                    <div className="side-sections">
                        {/* Stats Section */}
                        <div className="stats-section">
                            <WeeklyProgress 
                            weeklyGoal={weeklyGoal || 1} // Default 1 untuk menghindari NaN
                            weeklyProgress={totalFocusTime > 0 ? (totalFocusTime / weeklyGoal) * 100 : 0} // Hitung persentase dengan aman
                            />
                            <div className="stats-grid">
                                <div className="stat-item">
                                    <span className="stat-label">Sessions</span>
                                    <span className="stat-value">{cycles || 0}</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-label">Total Focus</span>
                                    <span className="stat-value">{totalFocusTime || 0} min</span>
                                </div>
                            </div>
                            {analyticsData?.weeklyData && analyticsData.weeklyData.length > 0 && (
                                <div className="analytics-chart">
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={analyticsData.weeklyData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line 
                                                type="monotone" 
                                                dataKey="focusTime" 
                                                stroke="#D4AF37" 
                                                strokeWidth={2}
                                            />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            )}
                        </div>
                        <div className="settings-section">
                            <h3>Settings</h3>
                            <div className="sound-settings">
                            <div className="volume-control">
                                <span>Volume:</span>
                                <input
                                    type="range"
                                    min="0"
                                    max="1"
                                    step="0.1"
                                    value={volume}
                                    onChange={handleVolumeChange}
                                />
                            </div>
                        </div>
                            <SpotifyPlayer volume={volume} soundEnabled={soundEnabled} />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Timer;