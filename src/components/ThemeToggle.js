import React, { useState, useEffect, useCallback } from 'react';
import dayBg from '../assets/img/day-bg.jpg';
import nightBg from '../assets/img/night-bg.jpg';
import '../components/CSS/ThemeToggle.css';

const icons = {
  light: (
    <svg className="icon" viewBox="0 0 24 24"><path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 007.92 12.446a9 9 0 11-8.313-12.454z" /></svg>
  ),
  dark: (
    <svg className="icon" viewBox="0 0 24 24"><path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1z" /></svg>
  )
};

const backgrounds = {
  light: `linear-gradient(135deg, rgba(255,255,255,0.3), rgba(255,255,255,0.2)), url(${dayBg})`,
  dark: `linear-gradient(135deg, rgba(20,30,60,0.4), rgba(50,20,70,0.3)), url(${nightBg})`
};

const themeVariables = {
  light: {
    '--background-color': 'rgba(255, 255, 255, 0.2)',
    '--body-bg-image': backgrounds.light,
    '--text-color': '#1a1a2e',
    '--text-secondary': '#5c5c7a',
    '--primary-color': '#3578e5',
    '--primary-dark': '#2456a4',
    '--primary-light': '#dce9ff',
    '--accent-color': '#ff8c42',
    '--card-bg': 'rgba(255,255,255,0.96)',
    '--card-shadow': '0 6px 16px rgba(0,0,0,0.1)',
    '--header-bg': '#ffffffcc',
    '--header-text': '#1e1e2e',
    '--footer-bg': '#e7f0fd',
    '--footer-text': '#2f2f55',
    '--footer-accent': '#4178d0',
    '--timeline-line': '#dfe7f5',
    '--tag-bg': '#eef4ff',
    '--tag-text': '#2d5abf',
    '--filter-bg': '#f4f6fb',
    '--progress-bg': '#dae9fb',
    '--toggle-bg': '#d3dff0',
    '--toggle-thumb': '#ffffff',
    '--hero-gradient-1': '#dbeeff',
    '--hero-gradient-2': '#fff2e6',
    '--success-color': '#2e8b57',
    '--error-color': '#cc3a3a',
    '--warning-color': '#ffa700',
    '--border-radius': '12px',
    '--transition-speed': '0.25s',
    '--hero-text': '#1a1a2e',
    '--hero-text-shadow': '0 2px 4px rgba(0,0,0,0.2)',
  },
  dark: {
    '--background-color': 'rgba(17, 19, 29, 0.2)',
    '--body-bg-image': backgrounds.dark,
    '--text-color': '#e0e0f0',
    '--text-secondary': '#a6a6c3',
    '--primary-color': '#4fa3ff',
    '--primary-dark': '#2161a3',
    '--primary-light': '#8ccfff',
    '--accent-color': '#ffc94a',
    '--card-bg': 'rgba(22,24,36,0.98)',
    '--card-shadow': '0 6px 20px rgba(0,0,0,0.4)',
    '--header-bg': '#121222',
    '--header-text': '#f0f0ff',
    '--footer-bg': '#121222',
    '--footer-text': '#cccce5',
    '--footer-accent': '#70c2ff',
    '--timeline-line': '#2c2c48',
    '--tag-bg': '#28334e',
    '--tag-text': '#b0cfff',
    '--filter-bg': '#1e2230',
    '--progress-bg': '#334066',
    '--toggle-bg': '#2c334d',
    '--toggle-thumb': '#b0cfff',
    '--hero-gradient-1': '#1a263d',
    '--hero-gradient-2': '#3a1d52',
    '--success-color': '#4caf50',
    '--error-color': '#e74c3c',
    '--warning-color': '#ffb74d',
    '--border-radius': '12px',
    '--transition-speed': '0.3s',
    '--hero-text': '#e0e0f0',
    '--hero-text-shadow': '0 2px 4px rgba(0,0,0,0.5)',
  }
};


const ThemeToggle = () => {
  const [theme, setTheme] = useState(() =>
    localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
  );
  const [isAnimating, setIsAnimating] = useState(false);

  const applyTheme = useCallback((mode) => {
    const root = document.documentElement;
    const styles = themeVariables[mode];
    Object.entries(styles).forEach(([key, value]) => root.style.setProperty(key, value));
    Object.assign(document.body.style, {
      background: styles['--body-bg-image'],
      backgroundSize: 'cover',
      backgroundAttachment: 'fixed'
    });
  }, []);

  useEffect(() => {
    applyTheme(theme);
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      const newTheme = e.matches ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
    };
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme, applyTheme]);

  const toggleTheme = () => {
    setIsAnimating(true);
    document.body.classList.add('theme-transition');
    requestAnimationFrame(() => {
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      setTimeout(() => {
        document.body.classList.remove('theme-transition');
        setIsAnimating(false);
      }, 300);
    });
  };

  return (
    <button
      className={`theme-toggle ${theme} ${isAnimating ? 'animating' : ''}`}
      onClick={toggleTheme}
      aria-label={`Toggle ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <div className="toggle-track">
        <div className="toggle-thumb">{icons[theme]}</div>
      </div>
      <span className="toggle-label">
        {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
      </span>
    </button>
  );
};

export const ThemePreloader = () => (
  <>
    <link rel="preload" href={dayBg} as="image" />
    <link rel="preload" href={nightBg} as="image" />
  </>
);

export default ThemeToggle;
