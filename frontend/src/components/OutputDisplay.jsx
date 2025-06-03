import React from 'react';
import { jsPDF } from 'jspdf';

function OutputDisplay({ output }) {
  const copy = () => {
    navigator.clipboard.writeText(output);
    alert("Copied!");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    const safeOutput = output ? String(output) : "";
    const lines = doc.splitTextToSize(safeOutput, 180);
    doc.text(lines, 10, 10);
    doc.save("output.pdf");
  };

  const downloadText = () => {
    const blob = new Blob([output], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'output.txt';
    link.click();
  };

  return (
    <div style={{
      maxWidth: '800px',
      margin: '40px auto 0 auto',
      padding: '32px',
      background: 'rgba(30,40,60,0.95)',
      borderRadius: '12px',
      boxShadow: '0 4px 24px rgba(0,0,0,0.2)'
    }}>
      <pre style={{
        whiteSpace: 'pre-wrap',
        wordBreak: 'break-word',
        fontSize: '1.1rem',
        lineHeight: '1.6',
        color: '#bdefff',
        background: 'transparent',
        marginBottom: '24px',
        fontFamily: 'Fira Mono, monospace'
      }}>
        {output ? output : "No output to display."}
      </pre>
      <div style={{ display: 'flex', gap: '12px' }}>
        <button onClick={copy}>Copy</button>
        <button onClick={downloadPDF}>Save as PDF</button>
        <button onClick={downloadText}>Save as Text</button>
      </div>
    </div>
  );
}

export default OutputDisplay;

// Usage example
// <OutputDisplay output={llmResponse} />

