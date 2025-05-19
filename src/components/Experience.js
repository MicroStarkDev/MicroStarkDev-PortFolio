import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/Experience.css';
import { experienceData } from '../constants'; // Importing experience data
const Experience = () => {
  const itemsRef = useRef([]);
  const sectionRef = useRef(null);
  const [visibleItems, setVisibleItems] = useState([]);
  const [isSectionVisible, setIsSectionVisible] = useState(false);

  useEffect(() => {
    const sectionObserver = new IntersectionObserver(
      ([entry]) => {
        setIsSectionVisible(entry.isIntersecting);
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      sectionObserver.observe(sectionRef.current);
    }

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = itemsRef.current.indexOf(entry.target);
          if (entry.isIntersecting) {
            setVisibleItems((prev) => [...new Set([...prev, index])]);
          }
        });
      },
      { 
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    itemsRef.current.forEach((el) => el && itemObserver.observe(el));

    return () => {
      sectionRef.current && sectionObserver.unobserve(sectionRef.current);
      itemsRef.current.forEach((el) => el && itemObserver.unobserve(el));
    };
  }, []);

  

  return (
    <section 
      id="experience" 
      ref={sectionRef}
      className={`experience section ${isSectionVisible ? 'visible' : ''}`}
      aria-labelledby="experience-heading"
    >
      <div className="section-title">
        <h2 id="experience-heading">Experience</h2>
      </div>
      <div className="timeline">
        {experienceData.map((item, index) => (
          <div
            key={index}
           className={`timeline-item 
  ${visibleItems.includes(index) ? 'visible' : ''} 
  ${visibleItems.includes(index) && isSectionVisible ? (index % 2 === 0 ? 'animate__animated animate__flipInX' : 'animate__animated animate__flipInY') : ''} 
  animate__delay-${index}s`}

            ref={(el) => (itemsRef.current[index] = el)}
            aria-labelledby={`experience-${index}`}
          >
            <div className="timeline-content">
              <h3 id={`experience-${index}`}>{item.title}</h3>
              <p className="timeline-period">{item.period}</p>
              <ul className="timeline-bullets">
                {item.bullets.map((point, i) => (
                  <li key={i}>{point}</li>
                ))}
              </ul>
              {item.skills && (
                <div className="experience-skills">
                  {item.skills.map((skill, i) => (
                    <span key={i} className="skill-tag">{skill}</span>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Experience;