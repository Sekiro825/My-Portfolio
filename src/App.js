import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Education from './components/Education';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Certificates from './components/Certificates';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <About />
      <Education />
      <Projects />
      <Skills />
      <Certificates />
    </div>
  );
}

export default App;
