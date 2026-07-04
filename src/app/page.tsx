'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const SKILLS = [
  'AutoCAD & Drafting',
  'Structural Engineering',
  'Civil Infrastructure',
  'Project Management',
  'Sustainable Design',
  'Problem Solving'
];

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [sliderIndex, setSliderIndex] = useState(0);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  // Auto scroll for skills slider
  useEffect(() => {
    const timer = setInterval(() => {
      setSliderIndex((prev) => (prev + 1) % SKILLS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const handleNextSkill = () => {
    setSliderIndex((prev) => (prev + 1) % SKILLS.length);
  };

  const handlePrevSkill = () => {
    setSliderIndex((prev) => (prev - 1 + SKILLS.length) % SKILLS.length);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitError('');
    try {
      const response = await fetch('/api/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const resData = await response.json();
      if (resData.success) {
        setIsSubmitted(true);
        setTimeout(() => {
          setIsSubmitted(false);
          setIsModalOpen(false);
          setFormData({ name: '', email: '', message: '' });
        }, 3000);
      } else {
        setSubmitError(resData.error || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setSubmitError('Failed to connect to the server. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      {/* Header */}
      <header className="header animate-fade-in">
        <div className="logo">
          <svg viewBox="0 0 24 24">
            <polygon points="12,2 22,8.5 22,15.5 12,22 2,15.5 2,8.5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            <polygon points="12,6.5 18.5,10.7 18.5,14.8 12,19 5.5,14.8 5.5,10.7" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
          </svg>
          <span>Suresh Pal</span>
        </div>
        
        <nav>
          <ul className="nav-links">
            <li className="nav-item active"><a href="#home">Home</a></li>
            <li className="nav-item"><a href="#about">About</a></li>
            <li className="nav-item"><a href="#contact" onClick={(e) => { e.preventDefault(); setIsModalOpen(true); }}>Contact</a></li>
          </ul>
        </nav>

        <div className="header-actions">
          <button className="btn-outline" onClick={() => setIsModalOpen(true)}>
            Call
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
            </svg>
          </button>
          <button className="btn-primary" onClick={() => setIsModalOpen(true)}>Get in Touch</button>
        </div>
      </header>

      {/* Main Wrapper */}
      <main className="main-wrapper animate-fade-in" id="home">
        
        {/* Hero Grid Section */}
        <section className="portfolio-grid">
          
          {/* Left Panel */}
          <div className="left-panel">
            <div className="hero-text-container">
              <h1 className="hero-heading">
                AS AN ENGINEER, I
                BELIEVE <img src="/title_icon_house.png" className="inline-heading-img" alt="Design detail 1" />
                THAT ENGINEERING
                SHAPES THE FUTURE
                OF COMMUNITIES <img src="/title_icon_arch.png" className="inline-heading-img" alt="Design detail 2" />
                & INNOVATION.
              </h1>
              
              <p className="hero-subtext">
                Welcome to my engineering portfolio. Dedicated to structural accuracy, community advancement, and bringing durable visions to life.
              </p>
            </div>

            <div className="hero-actions">
              <button className="btn-contract" onClick={() => setIsModalOpen(true)}>
                Contact me
              </button>
              <div className="btn-contract-arrow" onClick={() => setIsModalOpen(true)}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </div>
            </div>

            {/* Carousel slider matching brand slider in mockup */}
            <div className="skills-slider-container">
              <button className="slider-nav" onClick={handlePrevSkill}>&lsaquo;</button>
              <div className="slider-content-wrapper">
                <div 
                  className="slider-track" 
                  style={{ transform: `translateX(-${sliderIndex * 100}%)` }}
                >
                  {SKILLS.map((skill, idx) => (
                    <div className="slider-item" key={idx}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
              <button className="slider-nav" onClick={handleNextSkill}>&rsaquo;</button>
            </div>
          </div>

          {/* Right Panel Grid */}
          <div className="right-panel-grid" id="projects">
            
            {/* Top Left Card - Image */}
            <div className="grid-card card-top-left">
              <img 
                src="/engineering_hero_1.png" 
                className="grid-card-img" 
                alt="Modern Architecture Curved Lines"
              />
            </div>

            {/* Stats Card */}
            <div className="grid-card card-stats">
              <div className="stat-box">
                <span className="stat-label">Reach</span>
                <span className="stat-value">1.6K+</span>
                <span className="stat-desc">Followers</span>
              </div>
              <div className="stat-box">
                <span className="stat-label">Studies</span>
                <span className="stat-value">Eng.</span>
                <span className="stat-desc">Student</span>
              </div>
            </div>

            {/* Bottom Left Card - Image */}
            <div className="grid-card card-bottom-left">
              <img 
                src="/engineering_hero_2.png" 
                className="grid-card-img" 
                alt="Precision Engineering Spiral Structure"
              />
            </div>

            {/* Right Tall Card - Image */}
            <div className="grid-card card-right-tall">
              <img 
                src="/engineering_hero_3.png" 
                className="grid-card-img" 
                alt="Tall Blue Skyscraper Reflecting Sky"
              />
            </div>

            {/* Right Bottom Card - Image */}
            <div className="grid-card card-right-bottom">
              <img 
                src="/engineering_hero_4.png" 
                className="grid-card-img" 
                alt="Minimalist Concrete Structural Arch"
              />
            </div>

          </div>
        </section>

        {/* About & Bio Details Section */}
        <section className="bio-section" id="about">
          
          {/* Highlight Quote Banner */}
          <div className="quote-banner">
            <h2 className="quote-nepali">जिम्मेवारी छ, रहर छ, सपना छ र संघर्ष छ। ❣️</h2>
            <p className="quote-english">
              &ldquo;With dreams to achieve, responsibilities to shoulder, desire to grow, and struggles to overcome.&rdquo;
            </p>
          </div>

          <div className="bio-content-grid">
            
            {/* Column 1: Background & Education */}
            <div>
              <h3 className="bio-col-title">Personal Profile</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                I am an aspiring Engineering Student with a deep passion for understanding how things work, designing sustainable structures, and solving complex problems. Born and raised in the beautiful district of Dadeldhura, Nepal, I strive to merge technical precision with aesthetic excellence to build tomorrow&apos;s infrastructure.
              </p>
              
              <ul className="info-list">
                <li className="info-item">
                  <span className="info-icon">&rarr;</span>
                  <div className="info-text">
                    <strong>Primary Education:</strong> Shree Purna Secondary School, Kanchanpur
                  </div>
                </li>
                <li className="info-item">
                  <span className="info-icon">&rarr;</span>
                  <div className="info-text">
                    <strong>Current Path:</strong> Pursuing Engineering Studies with a specialized focus on modern construction technologies and computational drawing.
                  </div>
                </li>
                <li className="info-item">
                  <span className="info-icon">&rarr;</span>
                  <div className="info-text">
                    <strong>Belief:</strong> &ldquo;सेवा नै धर्म हो&rdquo; (Service is Duty) — dedicated to using my engineering skills to serve people, elevate safety standards, and develop infrastructure.
                  </div>
                </li>
              </ul>
            </div>

            {/* Column 2: Key Values & Focus */}
            <div>
              <h3 className="bio-col-title">Engineering Philosophy</h3>
              <p style={{ marginBottom: '1.5rem' }}>
                Engineering is more than just math and calculations; it is the art of crafting spaces that elevate humanity. My work emphasizes safety, precision, aesthetics, and longevity.
              </p>
              
              <ul className="info-list">
                <li className="info-item">
                  <span className="info-icon">&#9638;</span>
                  <div className="info-text">
                    <strong>Aesthetic Precision:</strong> Learning from natural structures to design human architectures that feel organic, premium, and durable.
                  </div>
                </li>
                <li className="info-item">
                  <span className="info-icon">&#9638;</span>
                  <div className="info-text">
                    <strong>Resilience & Adaptation:</strong> Designing with modern constraints in mind, including seismic stability for mountainous terrains like Nepal.
                  </div>
                </li>
                <li className="info-item">
                  <span className="info-icon">&#9638;</span>
                  <div className="info-text">
                    <strong>Constant Improvement:</strong> Actively learning AutoCAD, structural estimation, and modern building materials to stay at the cutting edge of engineering science.
                  </div>
                </li>
              </ul>
            </div>

          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="footer">
        <p>
          &copy; {new Date().getFullYear()} Suresh Pal. Designed with precision. All rights reserved. | Powered by{" "}
          <a href="https://techsangi.com.np" target="_blank" rel="noopener noreferrer" style={{ fontWeight: 600, textDecoration: 'underline' }}>
            Tech Sangi
          </a>
        </p>
      </footer>

      {/* Contact Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} onClick={() => setIsModalOpen(false)}>
        <div className="modal-container" onClick={(e) => e.stopPropagation()}>
          <div className="modal-header">
            <h3>Send Message</h3>
            <button className="btn-close" onClick={() => setIsModalOpen(false)}>&times;</button>
          </div>
          
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '2rem 0' }}>
              <h4 style={{ color: 'var(--accent)', marginBottom: '0.5rem' }}>Thank You!</h4>
              <p>Your message has been sent successfully. Suresh will get back to you soon.</p>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {submitError && (
                <div style={{ color: '#D9383A', fontSize: '0.85rem', background: '#FDF2F2', padding: '0.8rem', borderRadius: '10px', border: '1px solid #F8D7DA' }}>
                  {submitError}
                </div>
              )}
              
              <div className="form-group">
                <label className="form-label" htmlFor="name">Name</label>
                <input 
                  type="text" 
                  id="name" 
                  name="name" 
                  className="form-input" 
                  value={formData.name} 
                  onChange={handleInputChange} 
                  required 
                  disabled={isSubmitting}
                  placeholder="Your Name"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="email">Email</label>
                <input 
                  type="email" 
                  id="email" 
                  name="email" 
                  className="form-input" 
                  value={formData.email} 
                  onChange={handleInputChange} 
                  required 
                  disabled={isSubmitting}
                  placeholder="your.email@example.com"
                />
              </div>

              <div className="form-group">
                <label className="form-label" htmlFor="message">Message</label>
                <textarea 
                  id="message" 
                  name="message" 
                  rows={4} 
                  className="form-input" 
                  value={formData.message} 
                  onChange={handleInputChange} 
                  required
                  disabled={isSubmitting}
                  placeholder="Tell me about your project or inquiry..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary" 
                style={{ marginTop: '0.5rem', width: '100%' }}
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
