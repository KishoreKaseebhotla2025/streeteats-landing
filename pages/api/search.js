// pages/api/search.js

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body;

  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query input' });
  }

  try {
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: `Extract keywords for food, location, and cuisine from: "${query}". Always respond only with JSON like { "food": "", "location": "", "cuisine": "" }.`,
          },
        ],
      }),
    });

    const data = await openaiRes.json();
    const text = data.choices?.[0]?.message?.content || '';
    const jsonMatch = text.match(/{[\s\S]*}/);
    if (!jsonMatch) throw new Error('Failed to extract JSON from OpenAI response');

    const parsed = JSON.parse(jsonMatch[0]);
    return res.status(200).json({ keywords: parsed });
  } catch (err) {
    console.error('Search API error:', err);
    return res.status(500).json({ error: 'Failed to process search' });
  }
}
