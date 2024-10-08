import React, { useState } from 'react';

function App() {
  const [text, setText] = useState('');
  const [result, setResult] = useState('');

  const handleSubmit = async () => {
    const response = await fetch('http://127.0.0.1:5000/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    });
    const data = await response.json();
    setResult(data.label === 1 ? 'Bullying detected' : 'No bullying detected');
  };

  return (
    <center className="App">
      <h1>Cyber Bullying Detection</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter text here"
      />
      <button onClick={handleSubmit}>Check</button>
      {result && <p>{result}</p>}
    </center>
  );
}

export default App;
