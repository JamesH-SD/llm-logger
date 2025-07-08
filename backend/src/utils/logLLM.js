const axios = require('axios');
const { getTokenCost } = require('./tokenPricing');
const { callOpenAI } = require('../providers/openai');
const { callAnthropic } = require('../providers/anthropic');
const { callAzure } = require('../providers/azure');

const providerMap = {
  openai: callOpenAI,
  anthropic: callAnthropic,
  azure: callAzure
};

async function logLLM({ prompt, model = 'gpt-3.5-turbo', provider = 'openai', projectId = 1 }) {
  const handler = providerMap[provider];
  if (!handler) throw new Error(`Unsupported provider: ${provider}`);

  const { response, tokens, latency } = await handler({ prompt, model });
  const cost = getTokenCost(provider, model, tokens);

  await axios.post('http://localhost:3000/log', {
    prompt,
    response,
    model,
    tokens,
    cost,
    latency,
    provider,
    projectId
  }, {
    headers: {
      'x-api-key': process.env.API_KEY_SECRET,
    }
  });

  return { prompt, response, tokens, cost, latency };
}

module.exports = { logLLM };
