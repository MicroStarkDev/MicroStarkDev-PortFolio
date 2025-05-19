import React, { useState, useEffect } from 'react';
import '../components/CSS/ThemeToggle.css';

const ThemeToggle = () => {
  const getInitialTheme = () => {
    if (typeof window !== 'undefined') {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) return savedTheme;
      
      return window.matchMedia('(prefers-color-scheme: dark)').matches 
        ? 'dark' 
        : 'light';
    }
    return 'light';
  };

  const [theme, setTheme] = useState(getInitialTheme());
  const [isAnimating, setIsAnimating] = useState(false);

  const applyTheme = (newTheme) => {
    const root = document.documentElement;
    const themeVariables = newTheme === 'dark' ? darkThemeVariables : lightThemeVariables;
    
    Object.entries(themeVariables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
  };

  const toggleTheme = () => {
    setIsAnimating(true);
    const newTheme = theme === 'light' ? 'dark' : 'light';
    
    document.body.classList.add('theme-transition');
    
    setTimeout(() => {
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
        setIsAnimating(false);
      }, 300);
    }, 10);
  };

  useEffect(() => {
    applyTheme(theme);
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleSystemThemeChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };
    
    mediaQuery.addEventListener('change', handleSystemThemeChange);
    
    return () => {
      mediaQuery.removeEventListener('change', handleSystemThemeChange);
    };
  }, [theme]);

  return (
    <button 
      className={`theme-toggle ${theme} ${isAnimating ? 'animating' : ''}`}
      onClick={toggleTheme}
      aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">
          {theme === 'light' ? (
            <MoonIcon />
          ) : (
            <SunIcon />
          )}
        </div>
      </div>
      <span className="toggle-label">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

// SVG Icons as separate components
const MoonIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446a9 9 0 11-8.313-12.454z" />
  </svg>
);

const SunIcon = () => (
  <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" />
  </svg>
);

// // Theme variables
// const lightThemeVariables = {
//   '--background-color': 'rgba(240, 245, 255, 1)',        // Nebula mist
//   '--text-color': 'rgba(25, 25, 40, 1)',                 // Dark cosmic ink
//   '--text-secondary': 'rgba(90, 90, 110, 1)',
//   '--primary-color': 'rgba(49, 57, 146, 0.82)',            // Soft galaxy purple
//   '--primary-dark': 'rgba(70, 60, 120, 1)',
//   '--primary-light': 'rgba(205, 200, 255, 1)',           // Pale violet light
//   '--accent-color': 'rgba(255, 193, 7, 1)',              // Sun flare yellow
//   '--card-bg': 'rgba(255, 255, 255, 1)',
//   '--header-bg': 'rgba(250, 250, 255, 0.95)',            // Light airy header
//   '--header-text': 'rgba(30, 30, 60, 1)',
//   '--footer-bg': 'rgba(225, 225, 245, 1)',
//   '--footer-text': 'rgba(30, 30, 60, 1)',
//   '--footer-accent': 'rgba(103, 80, 164, 1)',
//   '--timeline-line': 'rgba(200, 200, 230, 1)',
//   '--tag-bg': 'rgba(240, 240, 255, 1)',
//   '--tag-text': 'rgba(50, 50, 90, 1)',
//   '--filter-bg': 'rgba(240, 240, 255, 1)',
//   '--progress-bg': 'rgba(220, 220, 255, 1)',
//   '--toggle-bg': 'rgba(230, 230, 250, 1)',
//   '--toggle-thumb': 'rgba(255, 255, 255, 1)',
//   '--hero-gradient-1': 'rgba(190, 180, 255, 1)',
//   '--hero-gradient-2': 'rgba(255, 245, 255, 1)'
// };



// const darkThemeVariables = {
//   '--background-color': 'rgba(10, 10, 25, 1)',           // Deep space
//   '--text-color': 'rgba(255, 255, 255, 1)',              // Star-white text
//   '--text-secondary': 'rgba(180, 180, 200, 1)',          // Dimmer stars
//   '--primary-color': 'rgba(91, 192, 235, 1)',            // Star glow blue
//   '--primary-dark': 'rgba(40, 90, 160, 1)',              // Nightfall blue
//   '--primary-light': 'rgba(60, 120, 200, 1)',            // Twilight shimmer
//   '--accent-color': 'rgba(255, 215, 0, 1)',              // Star yellow
//   '--card-bg': 'rgba(25, 25, 50, 1)',                    // Galaxy panel
//   '--header-bg': 'rgba(15, 15, 35, 0.95)',               // Deep header
//   '--header-text': 'rgba(255, 255, 255, 1)',             // Bright text
//   '--footer-bg': 'rgba(20, 20, 40, 1)',                  // Footer night
//   '--footer-text': 'rgba(220, 220, 255, 1)',             // Footer stars
//   '--footer-accent': 'rgba(91, 192, 235, 1)',            // Highlighted accent
//   '--timeline-line': 'rgba(70, 70, 100, 1)',             // Space route
//   '--tag-bg': 'rgba(30, 30, 60, 1)',
//   '--tag-text': 'rgba(240, 240, 255, 1)',
//   '--filter-bg': 'rgba(30, 30, 60, 1)',
//   '--progress-bg': 'rgba(40, 40, 80, 1)',
//   '--toggle-bg': 'rgba(60, 60, 90, 1)',
//   '--toggle-thumb': 'rgba(255, 255, 255, 1)',
//   '--hero-gradient-1': 'rgba(15, 30, 60, 1)',
//   '--hero-gradient-2': 'rgba(40, 10, 75, 1)'
// };

// Morning Theme (Light)
const lightThemeVariables = {
  '--background-color': 'rgba(248, 248, 252, 1)',        // Fresh morning mist
  '--text-color': 'rgba(20, 20, 35, 1)',                // Deep morning shadow
  '--text-secondary': 'rgba(100, 100, 120, 1)',         // Soft morning gray
  '--primary-color': 'rgba(65, 105, 225, 0.9)',         // Morning sky blue
  '--primary-dark': 'rgba(50, 80, 180, 1)',             // Dawn blue
  '--primary-light': 'rgba(210, 225, 255, 1)',          // Morning light
  '--accent-color': 'rgba(255, 165, 0, 1)',             // Sunrise orange
  '--card-bg': 'rgba(255, 255, 255, 0.98)',             // Pure morning light
  '--card-shadow': '0 4px 12px rgba(0, 0, 0, 0.08)',
  '--header-bg': 'rgba(255, 255, 255, 0.97)',           // Crisp morning air
  '--header-text': 'rgba(30, 30, 60, 1)',
  '--footer-bg': 'rgba(235, 240, 255, 1)',              // Morning dew
  '--footer-text': 'rgba(40, 40, 80, 1)',
  '--footer-accent': 'rgba(75, 110, 200, 1)',           // Morning accent
  '--timeline-line': 'rgba(220, 225, 240, 1)',          // Morning horizon
  '--tag-bg': 'rgba(230, 235, 255, 1)',                // Soft morning tag
  '--tag-text': 'rgba(60, 80, 150, 1)',
  '--filter-bg': 'rgba(240, 242, 255, 1)',
  '--progress-bg': 'rgba(225, 230, 245, 1)',
  '--toggle-bg': 'rgba(220, 225, 240, 1)',
  '--toggle-thumb': 'rgba(255, 255, 255, 1)',
  '--hero-gradient-1': 'rgba(200, 220, 255, 1)',        // Morning sky start
  '--hero-gradient-2': 'rgba(255, 240, 230, 1)',        // Sunrise glow
  '--success-color': 'rgba(46, 125, 50, 1)',           // Fresh grass
  '--error-color': 'rgba(200, 50, 50, 1)',             // Morning berry
  '--warning-color': 'rgba(255, 160, 0, 1)',           // Warning sun
  '--border-radius': '12px',
  '--transition-speed': '0.25s'
};

// Night Theme (Dark)
const darkThemeVariables = {
  '--background-color': 'rgba(12, 12, 24, 1)',          // Midnight sky
  '--text-color': 'rgba(240, 240, 250, 1)',            // Moonlight text
  '--text-secondary': 'rgba(170, 170, 190, 1)',        // Distant stars
  '--primary-color': 'rgba(100, 180, 255, 1)',         // Bright star blue
  '--primary-dark': 'rgba(40, 100, 180, 1)',           // Deep space blue
  '--primary-light': 'rgba(140, 180, 255, 1)',         // Starlight
  '--accent-color': 'rgba(255, 200, 50, 1)',           // Golden moon
  '--card-bg': 'rgba(20, 20, 40, 1)',                  // Night sky panel
  '--card-shadow': '0 4px 16px rgba(0, 0, 0, 0.3)',
  '--header-bg': 'rgba(18, 18, 36, 0.98)',             // Dark night header
  '--header-text': 'rgba(240, 240, 250, 1)',
  '--footer-bg': 'rgba(15, 15, 30, 1)',                // Night horizon
  '--footer-text': 'rgba(200, 200, 220, 1)',
  '--footer-accent': 'rgba(100, 180, 255, 1)',         // Footer star
  '--timeline-line': 'rgba(50, 50, 80, 1)',            // Constellation line
  '--tag-bg': 'rgba(30, 40, 70, 1)',                   // Night tag
  '--tag-text': 'rgba(180, 200, 255, 1)',
  '--filter-bg': 'rgba(25, 30, 50, 1)',
  '--progress-bg': 'rgba(40, 50, 80, 1)',
  '--toggle-bg': 'rgba(50, 60, 90, 1)',
  '--toggle-thumb': 'rgba(180, 200, 255, 1)',
  '--hero-gradient-1': 'rgba(15, 30, 60, 1)',          // Deep space
  '--hero-gradient-2': 'rgba(60, 20, 80, 1)',          // Cosmic purple
  '--success-color': 'rgba(70, 180, 110, 1)',          // Aurora green
  '--error-color': 'rgba(220, 80, 80, 1)',             // Red giant
  '--warning-color': 'rgba(255, 180, 0, 1)',           // Warning star
  '--border-radius': '12px',
  '--transition-speed': '0.3s'
};

export default ThemeToggle;