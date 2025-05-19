import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/Skills.css';
import {skills} from '../constants'; // Importing skills data
const Skills = () => {
  const sectionRef = useRef(null);
  const [visibleSkills, setVisibleSkills] = useState([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);



  const categories = [...new Set(skills.map(skill => skill.category))];
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    const skillObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          const index = Array.from(sectionRef.current.querySelectorAll('.skill-card'))
            .indexOf(entry.target);
          
          if (entry.isIntersecting) {
            setVisibleSkills(prev => [...new Set([...prev, index])]);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
      const cards = sectionRef.current.querySelectorAll('.skill-card');
      cards.forEach(card => skillObserver.observe(card));
    }

    return () => {
      if (sectionRef.current) {
        sectionObserver.unobserve(sectionRef.current);
        const cards = sectionRef.current.querySelectorAll('.skill-card');
        cards.forEach(card => skillObserver.unobserve(card));
      }
    };
  }, []);

  const filteredSkills = activeCategory === 'All' 
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
        <button 
          className={`filter-btn ${activeCategory === 'All' ? 'active' : ''}`}
          onClick={() => setActiveCategory('All')}
        >
          All
        </button>
        {categories.map(category => (
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
        {filteredSkills.map((skill, index) => (
          <div 
            key={index}
            className={`skill-card ${visibleSkills.includes(index) ? 'visible' : ''}`}
            style={{ transitionDelay: `${index * 0.05}s` }}
          >
            <div className="skill-info">
              <span className="skill-name">{skill.name}</span>
              <span className="skill-level">{skill.level}%</span>
            </div>
            <div className="skill-progress">
              <div 
                className="progress-bar" 
                style={{ width: `${visibleSkills.includes(index) ? skill.level : 0}%` }}
                aria-valuenow={skill.level}
                aria-valuemin="0"
                aria-valuemax="100"
              ></div>
            </div>
            <span className="skill-category">{skill.category}</span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;