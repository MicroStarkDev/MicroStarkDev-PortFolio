import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/GitHub.css';

const GitHub = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await fetch('https://api.github.com/users/MicroStarkDev/repos');
        const data = await res.json();

        if (!Array.isArray(data)) throw new Error('Unexpected response format');

        const topProjects = data
          .map(repo => ({
            name: repo.name,
            link: repo.html_url,
            description: repo.description || 'No description provided.',
            stars: repo.stargazers_count,
            forks: repo.forks_count,
            language: repo.language || 'N/A'
          }))
          .sort((a, b) => b.stars - a.stars)
          .slice(0, 6);

        setProjects(topProjects);
      } catch (err) {
        console.error('GitHub fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );

    const current = sectionRef.current;
    if (current) observer.observe(current);
    return () => current && observer.unobserve(current);
  }, []);

  return (
    <section
      id="github"
      ref={sectionRef}
      className={`github section ${isVisible ? 'visible' : ''}`}
      aria-labelledby="github-heading"
    >
      <div className="section-title">
        <h2 id="github-heading">GitHub Projects</h2>
      </div>

      <div className="github-container">
        <a
          href="https://github.com/MicroStarkDev"
          className="github-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View my GitHub profile"
        >
          <svg className="github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 0C5.37 0 0 5.37 0 12c0 5.3 3.44 9.8 8.21 11.39.6.11.79-.26.79-.58v-2.23c-3.34.72-4.03-1.42-4.03-1.42-.55-1.39-1.33-1.76-1.33-1.76-1.09-.74.08-.73.08-.73 1.21.08 1.84 1.24 1.84 1.24 1.07 1.83 2.81 1.3 3.49 1 .11-.78.42-1.31.76-1.6-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.13-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.23.96-.27 1.98-.4 3-.4s2.04.13 3 .4c2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.25 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.62-5.48 5.92.43.37.82 1.1.82 2.22v3.29c0 .32.19.69.8.58C20.56 21.8 24 17.3 24 12c0-6.63-5.37-12-12-12z" />
          </svg>
          View My GitHub
        </a>

        <div className="github-projects">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : projects.length === 0 ? (
            <p className="coming-soon">
              🚧 Projects coming soon...
            </p>
          ) : (
            projects.map((project, index) => {
              const animationClass = isVisible
                ? `animate__animated ${index % 2 === 0 ? 'animate__fadeInLeft' : 'animate__fadeInRight'}`
                : '';

              return (
                <div
                  key={index}
                  className={`project-card ${animationClass}`}
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="project-header">
                    <h3>{project.name}</h3>
                    <div className="project-stats">
                      <span className="stat">⭐ {project.stars}</span>
                      <span className="stat">🍴 {project.forks}</span>
                    </div>
                  </div>
                  <p className="project-description">{project.description}</p>
                  <div className="project-footer">
                    <span className="language-tag">
                      <span className="language-color" data-language={project.language}></span>
                      {project.language}
                    </span>
                    <a
                      href={project.link}
                      className="project-link"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`View ${project.name} repository`}
                    >
                      View Repository →
                    </a>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHub;
