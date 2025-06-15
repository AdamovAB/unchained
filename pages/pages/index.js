import { useState } from 'react';

export default function Home() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    setLoading(true);
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: message }),
    });
    const data = await res.json();
    setResponse(data.result);
    setLoading(false);
  };

  return (
    <div style={{ padding: 30, fontFamily: 'Arial' }}>
      <h1>🔓 UnchainedBot</h1>
      <textarea
        rows={4}
        style={{ width: '100%', padding: 10 }}
        placeholder="Ask anything..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={sendMessage} style={{ marginTop: 10 }}>
        {loading ? 'Thinking...' : 'Send'}
      </button>
      {response && (
        <div style={{ marginTop: 20, whiteSpace: 'pre-wrap' }}>{response}</div>
      )}
    </div>
  );
}
