// backend/utils/tokenPricing.js

const pricing = {
    openai: {
      'gpt-3.5-turbo': 0.0015, // per 1K tokens
      'gpt-4': 0.03,
      'gpt-4-turbo': 0.01,
    },
    anthropic: {
      'claude-3-opus': 0.015,
      'claude-3-sonnet': 0.003,
    },
    cohere: {
      'command-r': 0.002,
    },
  };
  
  function estimateTokenCost(provider, model, tokens) {
    const rate = pricing[provider]?.[model];
    if (!rate) return null;
    return (tokens * rate) / 1000;
  }
  
  module.exports = { estimateTokenCost };
  