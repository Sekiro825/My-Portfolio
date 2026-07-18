import React, { useState, useEffect } from 'react';
import resume from '../assets/Saket.pdf';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <header className={isScrolled ? 'scrolled' : ''}>
      <h1>SAKET</h1>
      <a href={resume} download="Saket_Pokale_Resume.pdf">
        <button>Download Resume</button>
      </a>
    </header>
  );
};

export default Header;
