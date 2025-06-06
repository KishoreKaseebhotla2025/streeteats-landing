// pages/search-test.js
import { useState } from 'react';

export default function SearchTest() {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    setError(null);
    setResult(null);
    try {
      const res = await fetch('/api/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Unknown error');
      setResult(data);
      } catch (err) {
        console.error("❌ Search API error:", err);
        return res.status(500).json({ error: 'Failed to process search', details: err.message });
      }  

  };

  return (
    <div style={{ padding: '2rem', maxWidth: 600, margin: '0 auto' }}>
      <h1>🔍 Search API Test</h1>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Try 'biryani Hyderabad'..."
        style={{ padding: '0.5rem', width: '100%', marginBottom: '1rem', fontSize: '1rem' }}
      />
      <button
        onClick={handleSearch}
        style={{ padding: '0.5rem 1rem', background: '#ff7a00', color: 'white', border: 'none', borderRadius: 5 }}
      >
        Send to /api/search
      </button>

      {result && (
        <pre style={{ background: '#eee', padding: '1rem', marginTop: '1rem' }}>
          {JSON.stringify(result, null, 2)}
        </pre>
      )}

      {error && (
        <div style={{ marginTop: '1rem', color: 'red' }}>❌ {error}</div>
      )}
    </div>
  );
}
