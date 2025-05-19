import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/Skills.css';
import { skills } from '../constants';

const Skills = () => {
  const sectionRef = useRef(null);
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [...new Set(skills.map(skill => skill.category))];

  useEffect(() => {
    const currentSection = sectionRef.current;

    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const skillObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const skillName = entry.target.getAttribute('data-skill-name');
          if (entry.isIntersecting && skillName) {
            setVisibleSkills(prev => {
              if (!prev.includes(skillName)) {
                return [...prev, skillName];
              }
              return prev;
            });
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    if (currentSection) {
      sectionObserver.observe(currentSection);
      const cards = currentSection.querySelectorAll('.skill-card');
      cards.forEach(card => skillObserver.observe(card));
    }

    return () => {
      if (currentSection) {
        sectionObserver.disconnect();
        const cards = currentSection.querySelectorAll('.skill-card');
        cards.forEach(card => skillObserver.unobserve(card));
      }
    };
  }, []);

  const filteredSkills =
    activeCategory === 'All'
      ? skills
      : skills.filter(skill => skill.category === activeCategory);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className={`skills section ${isSectionVisible ? 'visible' : ''}`}
      aria-labelledby="skills-heading"
    >
      <div className="section-title">
        <h2 id="skills-heading">Skills</h2>
      </div>

      <div className="skills-filter">
        {['All', ...categories].map(category => (
          <button
            key={category}
            className={`filter-btn ${activeCategory === category ? 'active' : ''}`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="skills-container">
        {filteredSkills.map((skill, index) => {
          const isVisible = visibleSkills.includes(skill.name);
          return (
            <div
              key={skill.name}
              data-skill-name={skill.name}
              className={`skill-card ${isVisible ? 'visible' : ''}`}
              style={{ transitionDelay: `${index * 0.05}s` }}
            >
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-level">{skill.level}%</span>
              </div>
              <div className="skill-progress">
                <div
                  className="progress-bar"
                  style={{ width: isVisible ? `${skill.level}%` : '0%' }}
                  aria-valuenow={skill.level}
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
              <span className="skill-category">{skill.category}</span>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default Skills;
