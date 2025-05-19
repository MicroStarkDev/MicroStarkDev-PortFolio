import React, { useEffect, useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import '../components/CSS/Contact.css';
import { showAlert } from '../constants';

const Contact = () => {
  const sectionRef = useRef(null);
  const formRef = useRef(null);

  const [isVisible, setIsVisible] = useState(false);
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    message: '' 
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(false);

  // Section fade-in animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.3, rootMargin: '0px 0px -50px 0px' }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => sectionRef.current && observer.unobserve(sectionRef.current);
  }, []);

  // Field validation
  const validateField = (name, value) => {
    if (!value.trim()) return 'This field is required';
    if (name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) 
      return 'Please enter a valid email';
    if (name === 'message' && value.length < 10) 
      return 'Message must be at least 10 characters';
    return '';
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    let isValid = true;

    Object.entries(formData).forEach(([name, value]) => {
      const error = validateField(name, value);
      if (error) isValid = false;
      newErrors[name] = error;
    });

    setErrors(newErrors);
    setTouched({ name: true, email: true, message: true });
    return isValid;
  };

  // Input change handler
  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  // Blur handler
  const handleBlur = ({ target: { name, value } }) => {
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent multiple submissions
    if (isSubmitting || isButtonDisabled) return;
    
    // Disable button immediately
    setIsButtonDisabled(true);
    
    // Validate form
    if (!validateForm()) {
      setIsButtonDisabled(false);
      return;
    }

    setIsSubmitting(true);
    const currentTime = new Date().toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });

    try {
      const response = await emailjs.send(
        'service_x6y1ieo',
        'template_96z2zkd',
        { ...formData, time: currentTime },
        'OFKKIcBP6cJBLJ4x6'
      );

      if (response.status === 200) {
        showAlert('success', 'Thank you! Your message has been sent successfully!');
        setFormData({ name: '', email: '', message: '' });
        setTouched({});
        setErrors({});
        formRef.current.reset();
      } else {
        showAlert('error', 'Oops! Something went wrong. Please try again.');
      }
    } catch (error) {
      console.error('Email error:', error);
      showAlert('error', 'An error occurred while sending the message.');
    } finally {
      setIsSubmitting(false);
      setIsButtonDisabled(false);
    }
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className={`contact section ${isVisible ? 'visible' : ''}`}
      aria-labelledby="contact-heading"
    >
      <div className="section-title">
        <h2 id="contact-heading">Contact Me</h2>
      </div>

      <form
        ref={formRef}
        className="contact-form"
        onSubmit={handleSubmit}
        autoComplete="off"
        noValidate
      >
        {['name', 'email', 'message'].map((field) => {
          const isTextArea = field === 'message';
          const inputProps = {
            id: field,
            name: field,
            placeholder: `Your ${field.charAt(0).toUpperCase() + field.slice(1)}`,
            value: formData[field],
            onChange: handleChange,
            onBlur: handleBlur,
            className: touched[field] && errors[field] ? 'error' : '',
            autoComplete: 'off',
            ...(field === 'email' ? { type: 'email' } : {}),
            ...(field === 'name' ? { type: 'text' } : {})
          };

          return (
            <div className="form-group" key={field}>
              <label htmlFor={field} className="sr-only">
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </label>
              {isTextArea ? (
                <textarea {...inputProps} rows="5" />
              ) : (
                <input {...inputProps} />
              )}
              {touched[field] && errors[field] && (
                <span className="error-message" style={{ color: 'red' }}>
                  {errors[field]}
                </span>
              )}
            </div>
          );
        })}

        <button
          type="submit"
          className={`contact-btn ${isButtonDisabled ? 'disabled' : ''}`}
          disabled={isSubmitting || isButtonDisabled}
          aria-disabled={isSubmitting || isButtonDisabled}
        >
          <span className="btn-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
              <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
            </svg>
          </span>
          <span className="btn-text">
            {isSubmitting ? (
              <>
                <span className="spinner"></span> Sending...
              </>
            ) : (
              'Send Message'
            )}
          </span>
        </button>
      </form>
    </section>
  );
};

export default Contact;