'use client';
import { useState } from 'react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt }),
    });
    const data = await res.json();
    setResponse(data.reply || 'No response received.');
  };

  return (
    <main style={{ maxWidth: 600, margin: 'auto', padding: 20 }}>
      <h1>Bk Saudi - Burn Assistant</h1>
      <p>Enter your meal and weight (optional):</p>
      <textarea
        rows={4}
        style={{ width: '100%', padding: 10 }}
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button
        onClick={handleSubmit}
        style={{ width: '100%', padding: 10, marginTop: 10 }}
      >
        Submit
      </button>
      <div
        style={{
          whiteSpace: 'pre-wrap',
          marginTop: 20,
          padding: 10,
          background: '#f0f0f0',
          borderRadius: 5,
        }}
      >
        {response}
      </div>
    </main>
  );
}
