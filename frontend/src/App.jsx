import React, { useState, useEffect } from 'react';
import './App.css';
import GeneratorForm from './components/GeneratorForm';
import OutputDisplay from './components/OutputDisplay';
import ThemeToggle from './components/ThemeToggle';

function App() {
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('light');

  // Load saved theme on app start
  useEffect(() => {
    const saved = localStorage.getItem('theme') || 'light';
    setTheme(saved);
    document.body.setAttribute('data-theme', saved);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  return (
    <div className="App">
      <h1>AI Generator</h1>
      <ThemeToggle toggleTheme={toggleTheme} theme={theme} />
      <GeneratorForm setOutput={setOutput} />
      <OutputDisplay output={output} />
    </div>
  );
}

export default App;
