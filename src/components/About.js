import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/About.css';
import { TOTAL_YEARS_EXP } from '../constants';
import 'animate.css';

const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showOptions, setShowOptions] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );
    const ref = sectionRef.current;
    ref && observer.observe(ref);
    return () => ref && observer.unobserve(ref);
  }, []);

  const handleDownload = (type) => {
    const ext = type === 'pdf' ? 'pdf' : 'docx';
    const fileName = `Sandeep_Kumar_Samal_Resume.${ext}`;
    const filePath = `/Documents/${fileName}`;
    const link = Object.assign(document.createElement('a'), {
      href: filePath,
      download: fileName,
    });
    document.body.append(link);
    link.click();
    link.remove();
    setShowOptions(false);
  };

  return (
    <section
      ref={sectionRef}
      id="about"
      className={`about section ${isVisible ? 'visible' : ''}`}
      aria-labelledby="about-heading"
    >
      <div className="section-title">
        <h2 id="about-heading">About Me</h2>
      </div>

      <div className={`about-info section-title hero-content animate__animated ${isVisible ? 'animate__backInDown' : ''}`}>
        <p>
          I'm a results-driven <strong>Software Engineer</strong> with{' '}
          <strong>{TOTAL_YEARS_EXP} years</strong> of experience in building{' '}
          <strong>scalable applications</strong> using <strong>Java, Spring Boot, Hibernate</strong>.
        </p>
        <p>
          I work with <strong>Microservices Architecture</strong>,{' '}
          <strong>RESTful APIs</strong>, and databases like <strong>PostgreSQL</strong>, crafting robust and performant systems.
        </p>
        <p>
          Passionate about <strong>system performance</strong>, <strong>secure coding</strong>, and leveraging{' '}
          <strong>DevOps tools</strong> like <strong>Docker</strong> and <strong>Jenkins</strong> to streamline delivery.
        </p>

        <div className={`resume-download ${isVisible ? 'slide-up' : ''}`}>
          <button className="resume-button" onClick={() => setShowOptions(true)}>
            📄 Download Resume
          </button>
        </div>
      </div>

      {showOptions && (
        <div className="download-modal">
          <div className="modal-content">
            <h4>Select Resume Format</h4>
            <div className="modal-buttons">
              <button onClick={() => handleDownload('pdf')}>📄 PDF</button>
              <button onClick={() => handleDownload('word')}>📝 Word</button>
            </div>
            <button className="close-modal" onClick={() => setShowOptions(false)}>✖ Close</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
