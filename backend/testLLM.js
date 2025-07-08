// backend/testLLM.js
require('dotenv').config();
const { logLLM } = require('./src/utils/logLLM');

(async () => {
  const result = await logLLM('Explain quantum computing in simple terms');
  console.log('✅ Logged LLM Interaction:', result);
})();
