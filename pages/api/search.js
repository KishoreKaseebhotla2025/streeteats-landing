// pages/api/search.js

import fetch from 'node-fetch';

export default async function handler(req, res) {
  console.log("🔔 /api/search endpoint hit");

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body || {};
  if (!query || typeof query !== 'string') {
    console.log("⛔ Invalid or missing query:", query);
    return res.status(400).json({ error: 'Invalid query input' });
  }

  const apiKey = process.env.OPENAI_API_KEY;
  console.log("🔐 OPENAI_API_KEY present:", !!apiKey);

  if (!apiKey) {
    return res.status(500).json({ error: 'Missing API key' });
  }

  try {
    console.log("📤 Sending request to OpenAI...");

    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Extract keywords for food, location, and cuisine from: "${query}". Respond ONLY with JSON like { "food": "", "location": "", "cuisine": "" }.`,
          },
        ],
      }),
    });

    console.log("📨 OpenAI response status:", openaiRes.status);
    const data = await openaiRes.json();
    console.log("🧠 OpenAI raw response:", data);

    if (!openaiRes.ok) {
      console.error("OpenAI API error:", data);
      // Return OpenAI's actual status code instead of 502
      return res.status(openaiRes.status).json({ 
        error: 'OpenAI API error', 
        details: data 
      });
    }

    const content = data.choices?.[0]?.message?.content || '';
    const jsonMatch = content.match(/{[\s\S]*}/);
    if (!jsonMatch) throw new Error('Could not extract JSON block from OpenAI response');

    const parsed = JSON.parse(jsonMatch[0]);
    console.log("✅ Parsed keywords:", parsed);

    return res.status(200).json({ keywords: parsed });
  } catch (err) {
    console.error("❌ Caught error:", err);
    return res.status(500).json({ error: 'Failed to process search', details: err.message });
  }
}
