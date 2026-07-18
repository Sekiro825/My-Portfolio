import React from 'react';
import resume from '../assets/Saket.pdf';

const Hero = () => {
  return (
    <div className="hero">
      <h1>Saket Pokale</h1>
      <p>Electronics and Computer Science Engineering Student. Passionate about AI, Web Development, and turning ideas into reality.</p>
      <div className="hero-buttons">
        <a href={resume} download="Saket_Pokale_Resume.pdf" className="btn-play">
           ▶ Download Resume
        </a>
        <a href="mailto:saket82005@gmail.com" className="btn-more-info">
           ⓘ Contact Me
        </a>
      </div>
    </div>
  );
};

export default Hero;
