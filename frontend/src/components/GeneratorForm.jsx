import React, { useState } from 'react';

function GeneratorForm({ setOutput }) {
  const [prompt, setPrompt] = useState('');
  const [mode, setMode] = useState('Story');

  const handleSubmit = async () => {
    setOutput('Generating...');
    try {
      const res = await fetch('http://localhost:5000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, mode })
      });
      const data = await res.json();
      if (data.error) setOutput(`Error: ${data.error}`);
      else setOutput(data.output);
    } catch (err) {
      setOutput(`Network error: ${err.message}`);
    }
  };

  return (
    <div style={{
      maxWidth: '600px',
      margin: '40px auto 0 auto',
      padding: '24px',
      background: 'rgba(30,40,60,0.95)',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      gap: '16px'
    }}>
      <textarea
        placeholder="Enter your topic..."
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        rows={4}
        style={{
          resize: 'vertical',
          fontSize: '1rem',
          padding: '10px',
          borderRadius: '6px',
          border: '1px solid #444',
          background: '#181f2a',
          color: '#bdefff'
        }}
      />
      <select
        value={mode}
        onChange={(e) => setMode(e.target.value)}
        style={{
          fontSize: '1rem',
          padding: '8px',
          borderRadius: '6px',
          border: '1px solid #444',
          background: '#181f2a',
          color: '#bdefff'
        }}
      >
        <option>Story</option>
        <option>Song</option>
        <option>Essay</option>
      </select>
      <button
        onClick={handleSubmit}
        style={{
          fontSize: '1.1rem',
          padding: '10px 0',
          borderRadius: '6px',
          background: 'linear-gradient(90deg, #1e90ff 60%, #38b6ff 100%)',
          color: '#bdefff',
          border: 'none',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}
      >
        Generate
      </button>
    </div>
  );
}

export default GeneratorForm;