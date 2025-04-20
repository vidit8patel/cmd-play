function mapGeminiToGame(mystery) {
  return {
    ...mystery,
    challenges: (mystery.challenges || []).map(ch => ({
      prompt: ch.clue_description,
      template: ch.partial_query,
      answer: ch.correct_answer,
      hint: ch.hint,
      concept: ch.sql_concept,
      expected_output: ch.expected_output,
    }))
  };
}

export async function fetchGeminiMystery() {
  const url = 'http://localhost:5001/api/gemini';

  const prompt = `You are an AI game master creating an interactive  mystery game for middle and high school students. Generate a new, original mystery each time with:\n\n1. A catchy, suspenseful story intro (max 120 words)\n2. 4-6 suspects (name, occupation, 1-sentence personality)\n3. 3-5 SQL challenges, each with:\n   - A clue description\n   - A partially-completed SQL query (with blanks)\n   - The correct answer (full query)\n   - A hint\n   - The SQL concept taught\n   - Expected output description\n4. A dramatic case conclusion (reveal murderer, how evidence led to them, and a congratulatory remark)\n\nRespond in JSON with keys: intro, suspects, challenges, conclusion. Make it age-appropriate, fun, and logical!`;

  const body = {
    contents: [{ parts: [{ text: prompt }] }]
  };

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw new Error('Failed to fetch Gemini story');

  const data = await response.json();
  let content = data.candidates?.[0]?.content?.parts?.[0]?.text || '';
  console.log('Gemini raw content:', content); // <-- log raw output

  try {
    content = content.replace(/```json|```/g, '').trim();
    // Fix invalid escape sequences for JSON
    content = content.replace(/\\([^"\\/bfnrtu])/g, '\\\\$1');
    const parsed = JSON.parse(content);
    console.log('Parsed Gemini mystery:', parsed); // <-- log parsed output
    return mapGeminiToGame(parsed);
  } catch (e) {
    console.error('Failed to parse Gemini response:', e, content);
    throw new Error('Failed to parse Gemini response: ' + e.message + '\n' + content);
  }
}
