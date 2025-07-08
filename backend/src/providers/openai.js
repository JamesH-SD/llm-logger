const { OpenAI } = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function callOpenAI({ prompt, model }) {
  const start = Date.now();
  const res = await openai.chat.completions.create({
    model,
    messages: [{ role: 'user', content: prompt }],
  });
  const latency = Date.now() - start;
  const usage = res.usage || {};
  const response = res.choices?.[0]?.message?.content || '';
  const tokens = usage.total_tokens || 0;

  return { response, tokens, latency };
}

module.exports = { callOpenAI };
