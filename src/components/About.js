import React, { useEffect, useRef, useState } from 'react';
import '../components/CSS/About.css';
import { TOTAL_YEARS_EXP } from '../constants';
import 'animate.css'; 
const About = () => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [showDownloadOptions, setShowDownloadOptions] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting !== isVisible) {
          setIsVisible(entry.isIntersecting);
        }
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -50px 0px'
      }
    );

    const currentRef = sectionRef.current;
    if (currentRef) observer.observe(currentRef);

    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, [isVisible]);

  const handleDownloadClick = () => {
    setShowDownloadOptions(true);
  };

  const downloadFile = (type) => {
    const fileName =
      type === 'pdf'
        ? 'Sandeep_Kumar_Samal_Resume.pdf'
        : 'Sandeep_Kumar_Samal_Resume.docx';
    const filePath =
      type === 'pdf'
        ? '../assets/Sandeep_Kumar_Samal_Resume.pdf'
        : '../assets/Sandeep_Kumar_Samal_Resume.docx';

    const link = document.createElement('a');
    link.href = filePath;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setShowDownloadOptions(false);
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
      <div className={`about-info section-title hero-content animate__animated ${
        isVisible ? 'animate__backInDown' : ''
        }`}>
       
        <p>
          I'm a results-driven <strong>Software Engineer</strong> with{' '}
          <strong>{TOTAL_YEARS_EXP} years</strong> of hands-on experience in
          designing, building, and optimizing{' '}
          <strong>scalable applications</strong> using cutting-edge technologies
          like <strong>Java, Spring Boot, and Hibernate</strong>.
        </p>
        <p>
          My expertise spans across <strong>Microservices Architecture</strong>,{' '}
          <strong>RESTful APIs</strong>, and relational databases such as{' '}
          <strong>PostgreSQL</strong>. I specialize in creating robust,
          high-performance systems that deliver seamless user experiences.
        </p>
        <p>
          I’m deeply passionate about{' '}
          <strong>system performance optimization</strong>, implementing{' '}
          <strong>secure coding practices</strong>, and driving continuous
          improvement through <strong>DevOps tools</strong> such as{' '}
          <strong>Docker</strong> and <strong>Jenkins</strong>. I thrive in
          dynamic environments, constantly evolving to meet new challenges and
          exceed expectations.
        </p>
      {/* 💼 Resume Download Section */}
      <div className={`resume-download ${isVisible ? 'slide-up' : ''}`}>
        <button className="resume-button" onClick={handleDownloadClick}>
          📄 Download Resume
        </button>
      </div>
      </div>

      {/* Download Options Popup */}
      {showDownloadOptions && (
        <div className="download-modal">
          <div className="modal-content">
            <h4>Select Resume Format</h4>
            <div className="modal-buttons">
              <button onClick={() => downloadFile('pdf')}>📄 PDF</button>
              <button onClick={() => downloadFile('word')}>📝 Word</button>
            </div>
            <button className="close-modal" onClick={() => setShowDownloadOptions(false)}>
              ✖ Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default About;
