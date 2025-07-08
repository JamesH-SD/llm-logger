const { OpenAIClient, AzureKeyCredential } = require('@azure/openai');
const endpoint = process.env.AZURE_OPENAI_ENDPOINT;
const key = process.env.AZURE_OPENAI_KEY;
const client = new OpenAIClient(endpoint, new AzureKeyCredential(key));

async function callAzure({ prompt, model }) {
  const start = Date.now();
  const res = await client.getChatCompletions(model, [{ role: 'user', content: prompt }]);
  const latency = Date.now() - start;
  const response = res.choices?.[0]?.message?.content || '';
  const tokens = res.usage?.totalTokens || 0;

  return { response, tokens, latency };
}

module.exports = { callAzure };
