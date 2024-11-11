import React from 'react';
import resume from '../assets/Saket.pdf';

const Header = () => {
  return (
    <header>
      <h1>Saket Pokale</h1>
      <a href={resume} download="Saket_Pokale_Resume.pdf">
        <button>Download Resume</button>
      </a>
    </header>
  );
};

export default Header;
