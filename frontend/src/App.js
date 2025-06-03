import React, { useState, useEffect } from 'react';
import GeneratorForm from './components/GeneratorForm';
import OutputDisplay from './components/OutputDisplay';
import './App.css';

function App() {
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('dark');

  useEffect(() => {
    document.body.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="App">
      <h1>AI Generator</h1>
      <button onClick={toggleTheme} style={{ marginBottom: '24px' }}>
        Switch to {theme === 'dark' ? 'Light' : 'Dark'} Mode
      </button>
      <GeneratorForm setOutput={setOutput} />
      <OutputDisplay output={output} />
    </div>
  );
}

export default App;