import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/Hero.css';
import 'animate.css'; // Import Animate.css

const WORDS = ["Innovative", "Creative", "Passionate"];
const PROFESSION = "Software Engineer";

const Hero = () => {
  const [animated, setAnimated] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);
  const heroRef = useRef(null);
  const textRef = useRef(null);
  const wordIndex = useRef(0);
  const isDeleting = useRef(false);
  const currentText = useRef('');
  const animationFrameId = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && setAnimated(true),
      { threshold: 0.1, rootMargin: '0px 0px -100px 0px' }
    );

    const currentHeroRef = heroRef.current;
    if (currentHeroRef) observer.observe(currentHeroRef);

    return () => {
      if (currentHeroRef) observer.unobserve(currentHeroRef);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!animated) return;

    const type = () => {
      const word = WORDS[wordIndex.current];

      currentText.current = isDeleting.current
        ? word.substring(0, currentText.current.length - 1)
        : word.substring(0, currentText.current.length + 1);

      if (textRef.current) {
        textRef.current.textContent = currentText.current;
      }

      let delay = isDeleting.current ? 50 : Math.random() * 50 + 100;

      if (!isDeleting.current && currentText.current === word) {
        delay = 2000;
        isDeleting.current = true;
      } else if (isDeleting.current && currentText.current === '') {
        isDeleting.current = false;
        wordIndex.current = (wordIndex.current + 1) % WORDS.length;
        delay = 500;
      }

      animationFrameId.current = setTimeout(() => {
        requestAnimationFrame(type);
      }, delay);
    };

    animationFrameId.current = requestAnimationFrame(type);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [animated]);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setCursorVisible(prev => !prev);
    }, 600);

    return () => clearInterval(cursorInterval);
  }, []);

  return (
    <section
      id="home"
      ref={heroRef}
      className={`hero ${animated ? 'animated' : ''}`}
      aria-label="Introduction section"
    >
      <div
        className={`hero-content animate__animated ${
          animated ? 'animate__slideInLeft animate__delay-1s animate__slower' : ''
        }`}
      >
        <div className="text-container">
          <h1 className="typing-text" aria-live="polite">
            <span ref={textRef} className="rotating-word" aria-hidden="true"></span>
            <span> </span>
            <span className="profession ">{PROFESSION}</span>
            <span className={`cursor ${cursorVisible ? 'visible' : ''}`}>|</span>
          </h1>

          <p className="hero-subtitle">
            Passionate about building scalable applications with Java, Spring Boot, and cutting-edge technologies
          </p>
        </div>

        <div className="hero-cta">
          <a href="#contact" className="cta-btn primary" aria-label="Contact me">
            <span>Get In Touch</span>
            <svg className="cta-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M4 12h16m-7-7l7 7-7 7" />
            </svg>
          </a>
          <a href="#about" className="cta-btn secondary" aria-label="Learn more about me">
            <span>Learn More</span>
            <svg className="cta-icon" viewBox="0 0 24 24" aria-hidden="true">
              <path d="M19 13l-7 7-7-7m14-8l-7 7-7-7" />
            </svg>
          </a>
        </div>
      </div>

      <div className="scroll-indicator" aria-hidden="true">
        <span className="scroll-text">Scroll Down</span>
        <div className="scroll-arrow"></div>
      </div>

      <div className="hero-pattern" aria-hidden="true"></div>
    </section>
  );
};

export default Hero;
