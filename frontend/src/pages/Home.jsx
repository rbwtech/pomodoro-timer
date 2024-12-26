import React from 'react';
import { Clock, Target, Music2, CheckCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import '../styles/home.css';

const Home = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Clock size={32} />,
      title: "Smart Timer",
      description: "Stay focused with our intelligent Pomodoro timer"
    },
    {
      icon: <Target size={32} />,
      title: "Goal Tracking",
      description: "Set and achieve your productivity goals"
    },
    {
      icon: <Music2 size={32} />,
      title: "Spotify Integration",
      description: "Enhance focus with your favorite music"
    },
    {
      icon: <CheckCircle size={32} />,
      title: "Task Management",
      description: "Organize and track your tasks efficiently"
    }
  ];

  const handleStartNow = () => {
    navigate('/timer');
  };

  return (
    <main className="home-container">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            Welcome to Waqtify
          </h1>
          <p className="hero-subtitle">
            Your intelligent time management companion. Boost productivity 
            with our advanced Pomodoro timer and task management system.
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="features-section">
        <div className="container">
          <h2 className="section-title">
            Features That Empower You
          </h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">
                  {feature.icon}
                </div>
                <h3 className="feature-title">
                  {feature.title}
                </h3>
                <p className="feature-description">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <div className="cta-content">
          <h2 className="section-title">
            Ready to Maximize Your Productivity?
          </h2>
          <p className="cta-description">
            Join thousands of users who have transformed their work habits with Waqtify.
          </p>
          <button 
            className="start-button"
            onClick={handleStartNow}
          >
            Start Now
          </button>
        </div>
      </section>
    </main>
  );
};

export default Home;