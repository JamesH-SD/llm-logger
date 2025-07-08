const { Anthropic } = require('@anthropic-ai/sdk');
const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });

async function callAnthropic({ prompt, model }) {
  const start = Date.now();
  const res = await anthropic.messages.create({
    model,
    max_tokens: 1024,
    messages: [{ role: 'user', content: prompt }],
  });
  const latency = Date.now() - start;
  const response = res.content?.[0]?.text || '';
  const tokens = res.usage?.input_tokens + res.usage?.output_tokens || 0;

  return { response, tokens, latency };
}

module.exports = { callAnthropic };
