// Estimate token usage and cost
function estimateTokens(prompt = '', response = '') {
    const wordCount = (prompt + ' ' + response).split(/\s+/).length;
    return Math.round(wordCount * 1.5); // crude estimation
  }
  
  module.exports = { estimateTokens };
  