import { useState, useEffect } from 'react';
import '../components/CSS/Header.css';
import ThemeToggle from './ThemeToggle';
import 'animate.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const contactSection = document.getElementById('contact');
      const stopAt = contactSection?.offsetTop || document.body.scrollHeight;

      // Animate only if user hasn't reached contact section
      if (scrollY < stopAt - 200) {
        setIsAnimating(true);
      } else {
        setIsAnimating(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    // Prevent background scroll when menu is open
    document.body.style.overflow = isMenuOpen ? 'hidden' : 'unset';
  }, [isMenuOpen]);

  return (
    <header className="site-header">
      <div className="header-container">
        <a
          href="#home"
          className={`logo`}>
         Welcome to My Portfolio
        </a>

        <button
          className={`menu-btn ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Toggle menu"
          aria-expanded={isMenuOpen}
        >
          <div className="menu-btn__burger"></div>
        </button>

        <nav className={`nav ${isMenuOpen ? 'show-nav' : ''}`}>
          <ul className="nav-links">
            {[
              { id: 'about', label: 'About' },
              { id: 'skills', label: 'Skills' },
              { id: 'experience', label: 'Experience' },
              { id: 'projects', label: 'Projects' },
              { id: 'github', label: 'GitHub' },
              { id: 'contact', label: 'Contact' }
            ].map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className="nav-link"
                  onClick={closeMenu}
                  aria-label={`Navigate to ${item.label} section`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  );
};

export default Header;
