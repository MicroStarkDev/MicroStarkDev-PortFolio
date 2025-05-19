import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/Projects.css';
import { projects } from '../constants';
import 'animate.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const [sectionVisible, setSectionVisible] = useState(false);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
    // Observe the whole section for visibility
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setSectionVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!sectionVisible) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const index = Array.from(sectionRef.current.querySelectorAll('.project-card'))
            .indexOf(entry.target);

          if (entry.isIntersecting) {
            setVisibleCards(prev => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
      }
    );

    const cards = sectionRef.current.querySelectorAll('.project-card');
    cards.forEach(card => observer.observe(card));

    return () => {
      cards.forEach(card => observer.unobserve(card));
    };
  }, [sectionVisible]);

  return (
    <section
      id="projects"
      ref={sectionRef}
      className="projects section"
      aria-labelledby="projects-heading"
    >
      <div className="section-title">
        <h2 id="projects-heading">Projects</h2>
        <p className="section-subtitle">
          Here are some of the <strong>most recent and active projects</strong> I've been working on,
          showcasing my experience with Java, Spring Boot, Microservices, and React.
        </p>
      </div>

      <div className="projects-container">
        {projects.map((project, index) => {
          const isVisible = visibleCards.includes(index);
          const animationClass = isVisible
            ? `animate__animated ${index % 2 === 0 ? 'animate__bounceInRight' : 'animate__bounceInLeft'}`
            : '';

          return (
            <div
              key={index}
              className={`project-card ${isVisible ? 'visible' : ''} ${animationClass}`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <div className="project-header">
                <h3>{project.title}</h3>
                <div className="project-meta">
                  <span className="project-duration">{project.duration}</span>
                  {project.domain && (
                    <span className="project-domain">{project.domain}</span>
                  )}
                </div>
              </div>

              <div className="project-tech">
                <strong>Tech Stack:</strong>
                <div className="tech-tags">
                  {project.techStack.map((tech, i) => (
                    <span key={i} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>

              <ul className="project-highlights">
                {project.highlights.map((highlight, i) => (
                  <li key={i}>{highlight}</li>
                ))}
              </ul>

              <div className="project-tags">
                {project.tags.map((tag, i) => (
                  <span key={i} className="project-tag">{tag}</span>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
