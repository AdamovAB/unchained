import { useState } from 'react';

export default function Chat() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setLoading(true);
    const userMessage = { role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: newMessages }),
    });

    const data = await res.json();
    setMessages([...newMessages, { role: 'assistant', content: data.response }]);
    setLoading(false);
  };

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h2>UnchainedBot</h2>
      <div style={{ minHeight: 300, border: '1px solid #ccc', padding: 10, marginBottom: 10 }}>
        {messages.map((msg, i) => (
          <div key={i}><strong>{msg.role}:</strong> {msg.content}</div>
        ))}
      </div>
      <input
        style={{ width: '80%', padding: 8 }}
        value={input}
        onChange={e => setInput(e.target.value)}
        onKeyDown={e => e.key === 'Enter' && sendMessage()}
        disabled={loading}
      />
      <button onClick={sendMessage} disabled={loading}>Send</button>
    </div>
  );
}
