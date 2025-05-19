import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/Projects.css';
import { projects } from '../constants';

const Projects = () => {
  const sectionRef = useRef(null);
  const [visibleCards, setVisibleCards] = useState([]);

  useEffect(() => {
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
  }, []);

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
        {projects.map((project, index) => (
          <div 
            key={index}
            className={`project-card ${visibleCards.includes(index) ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.1}s` }}
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
        ))}
      </div>
    </section>
  );
};

export default Projects;
