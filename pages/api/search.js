// pages/api/search.js
import { extractFoodKeywords } from '../../lib/food_variations';

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

  try {
    // First try dictionary-based extraction (fast and reliable)
    console.log("📚 Trying dictionary-based extraction...");
    const dictionaryResults = extractFoodKeywords(query);
    console.log("📚 Dictionary results:", dictionaryResults);

    // If dictionary found everything or we don't have HuggingFace key, use dictionary results
    const hfApiKey = process.env.HUGGINGFACE_API_KEY;
    const openaiApiKey = process.env.OPENAI_API_KEY;

    if (!hfApiKey && !openaiApiKey) {
      console.log("⚠️ No API keys available, using dictionary only");
      return res.status(200).json({ keywords: dictionaryResults });
    }

    // If dictionary found all fields, return immediately
    if (dictionaryResults.food && dictionaryResults.cuisine && dictionaryResults.location) {
      console.log("✅ Dictionary found all fields, returning");
      return res.status(200).json({ keywords: dictionaryResults });
    }

    // Try HuggingFace first (free), then OpenAI as fallback
    let nlpResults = { food: '', cuisine: '', location: '' };
    
    if (hfApiKey) {
      console.log("🤖 Using HuggingFace NLP for enhancement...");
      nlpResults = await enhanceWithHuggingFace(query, hfApiKey);
    } else if (openaiApiKey) {
      console.log("🤖 Using OpenAI for enhancement...");
      nlpResults = await enhanceWithOpenAI(query, openaiApiKey);
    }

    // Merge results, prioritizing dictionary matches
    const finalKeywords = {
      food: dictionaryResults.food || nlpResults.food || '',
      cuisine: dictionaryResults.cuisine || nlpResults.cuisine || '',
      location: dictionaryResults.location || nlpResults.location || ''
    };

    console.log("✨ Final keywords:", finalKeywords);
    return res.status(200).json({ keywords: finalKeywords });

  } catch (err) {
    console.error("❌ Error:", err);
    // Fallback to dictionary results even if NLP fails
    const fallbackResults = extractFoodKeywords(query);
    return res.status(200).json({ 
      keywords: fallbackResults,
      warning: 'NLP processing failed, using basic extraction'
    });
  }
}

async function enhanceWithHuggingFace(query, apiKey) {
  try {
    const response = await fetch(
      "https://api-inference.huggingface.co/models/facebook/bart-large-mnli",
      {
        headers: { 
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({
          inputs: query,
          parameters: {
            candidate_labels: [
              "indian food", "chinese food", "italian food", "continental food",
              "south indian", "north indian", "street food", "punjabi food",
              "mumbai", "delhi", "bangalore", "chennai", "hyderabad", "pune", "kolkata",
              "breakfast", "lunch", "dinner", "snack", "biryani", "dosa", "burger"
            ]
          },
          options: { wait_for_model: true }
        }),
        signal: AbortSignal.timeout(8000)
      }
    );

    if (!response.ok) {
      throw new Error(`HuggingFace API error: ${response.status}`);
    }

    const data = await response.json();
    const keywords = { food: '', cuisine: '', location: '' };
    
    if (data.labels && data.scores) {
      for (let i = 0; i < Math.min(3, data.labels.length); i++) {
        const label = data.labels[i];
        const score = data.scores[i];
        
        if (score > 0.3) {
          if (label.includes('indian') && !keywords.cuisine) {
            keywords.cuisine = label.includes('south') ? 'south indian' : 
                              label.includes('north') ? 'north indian' : 'indian';
          } else if (['chinese', 'italian', 'continental', 'punjabi'].some(c => label.includes(c)) && !keywords.cuisine) {
            keywords.cuisine = label.replace(' food', '');
          } else if (['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune', 'kolkata'].includes(label) && !keywords.location) {
            keywords.location = label;
          } else if (['biryani', 'dosa', 'burger'].includes(label) && !keywords.food) {
            keywords.food = label;
          }
        }
      }
    }

    return keywords;
  } catch (error) {
    console.error("HuggingFace enhancement failed:", error);
    return { food: '', cuisine: '', location: '' };
  }
}

async function enhanceWithOpenAI(query, apiKey) {
  try {
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
        max_tokens: 150,
        temperature: 0
      }),
      signal: AbortSignal.timeout(8000)
    });

    if (!openaiRes.ok) {
      const errorData = await openaiRes.json();
      throw new Error(`OpenAI API error: ${openaiRes.status} - ${errorData.error?.message || 'Unknown error'}`);
    }

    const data = await openaiRes.json();
    const content = data.choices?.[0]?.message?.content || '';
    const jsonMatch = content.match(/{[\s\S]*}/);
    
    if (!jsonMatch) {
      throw new Error('Could not extract JSON from OpenAI response');
    }

    return JSON.parse(jsonMatch[0]);
  } catch (error) {
    console.error("OpenAI enhancement failed:", error);
    return { food: '', cuisine: '', location: '' };
  }
}
