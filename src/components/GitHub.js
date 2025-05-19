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
        const username = 'MicroStarkDev'; 
        const response = await fetch(`https://api.github.com/users/${username}/repos`);
        const data = await response.json();

        if (!Array.isArray(data)) throw new Error("Unexpected response format");

        // Format the data to match your mock structure
        const formattedProjects = data.map(repo => ({
          name: repo.name,
          link: repo.html_url,
          description: repo.description || 'No description provided.',
          stars: repo.stargazers_count,
          forks: repo.forks_count,
          language: repo.language || 'N/A'
        }));

        // Sort and limit to top 6 projects
        const topProjects = formattedProjects
          .sort((a, b) => b.stars - a.stars)
          .slice(0, 6);

        setProjects(topProjects);
      } catch (error) {
        console.error("Error fetching GitHub projects:", error);
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

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => currentRef && observer.unobserve(currentRef);
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
          href="https://github.com/GitHackerRRR"
          className="github-btn"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="View my GitHub profile"
        >
          <svg className="github-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 
              11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-
              1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 
              1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-
              1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 
              1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 
              3.301 1.23.957-.266 1.983-.399 3.003-.404 
              1.02.005 2.047.138 3.006.404 2.291-1.552 
              3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 
              3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-
              2.807 5.624-5.479 5.921.43.372.823 1.102.823 
              2.222v3.293c0 .319.192.694.801.576 
              4.765-1.589 8.199-6.086 8.199-11.386 
              0-6.627-5.373-12-12-12z"/>
          </svg>
          View My GitHub
        </a>

        <div className="github-projects">
          {isLoading ? (
            <div className="loading-spinner"></div>
          ) : projects.length === 0 ? (
            <p className="coming-soon">
              <span role="img" aria-label="construction">🚧</span> Projects coming soon...
            </p>
          ) : (
            projects.map((project, index) => (
              <div
                key={index}
                className="project-card"
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="project-header">
                  <h3>{project.name}</h3>
                  <div className="project-stats">
                    <span className="stat">
                      ⭐ {project.stars}
                    </span>
                    <span className="stat">
                      🍴 {project.forks}
                    </span>
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
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default GitHub;
