// pages/api/search-hybrid.js
import { extractFoodKeywords } from '../../lib/food_variations';

export default async function handler(req, res) {
  console.log("🔔 /api/search-hybrid endpoint hit");
  
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { query } = req.body || {};
  if (!query || typeof query !== 'string') {
    return res.status(400).json({ error: 'Invalid query input' });
  }

  try {
    // First try dictionary-based extraction (fast and reliable)
    const dictionaryResults = extractFoodKeywords(query);
    console.log("📚 Dictionary results:", dictionaryResults);

    // If dictionary found everything, return immediately
    if (dictionaryResults.food && dictionaryResults.cuisine && dictionaryResults.location) {
      return res.status(200).json({ keywords: dictionaryResults });
    }

    // Use NLP as fallback for missing fields
    const apiKey = process.env.HUGGINGFACE_API_KEY;
    if (!apiKey) {
      console.log("⚠️ No HuggingFace API key, using dictionary only");
      return res.status(200).json({ keywords: dictionaryResults });
    }

    console.log("🤖 Using NLP for enhanced extraction...");
    
    const nlpResults = await enhanceWithNLP(query, apiKey);
    
    // Merge results, prioritizing dictionary matches
    const finalKeywords = {
      food: dictionaryResults.food || nlpResults.food || '',
      cuisine: dictionaryResults.cuisine || nlpResults.cuisine || '',
      location: dictionaryResults.location || nlpResults.location || ''
    };

    console.log("✨ Final keywords:", finalKeywords);
    return res.status(200).json({ keywords: finalKeywords });

  } catch (error) {
    console.error("❌ Error:", error);
    // Fallback to dictionary results even if NLP fails
    const fallbackResults = extractFoodKeywords(query);
    return res.status(200).json({ 
      keywords: fallbackResults,
      warning: 'NLP processing failed, using basic extraction'
    });
  }
}

async function enhanceWithNLP(query, apiKey) {
  try {
    // Use a more focused NLP approach for the missing information
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
              "south indian", "north indian", "street food", "restaurant",
              "mumbai", "delhi", "bangalore", "chennai", "hyderabad", "pune",
              "breakfast", "lunch", "dinner", "snack", "delivery", "takeaway"
            ]
          },
          options: { wait_for_model: true }
        }),
        signal: AbortSignal.timeout(8000)
      }
    );

    if (!response.ok) {
      throw new Error(`NLP API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Extract information from classification results
    const keywords = { food: '', cuisine: '', location: '' };
    
    if (data.labels && data.scores) {
      for (let i = 0; i < Math.min(3, data.labels.length); i++) {
        const label = data.labels[i];
        const score = data.scores[i];
        
        if (score > 0.3) { // Confidence threshold
          if (label.includes('indian') && !keywords.cuisine) {
            keywords.cuisine = label.includes('south') ? 'south indian' : 
                              label.includes('north') ? 'north indian' : 'indian';
          } else if (['chinese', 'italian', 'continental'].includes(label) && !keywords.cuisine) {
            keywords.cuisine = label;
          } else if (['mumbai', 'delhi', 'bangalore', 'chennai', 'hyderabad', 'pune'].includes(label) && !keywords.location) {
            keywords.location = label;
          }
        }
      }
    }

    return keywords;
  } catch (error) {
    console.error("NLP enhancement failed:", error);
    return { food: '', cuisine: '', location: '' };
  }
}
