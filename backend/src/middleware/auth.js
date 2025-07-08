// middleware/auth.js
require('dotenv').config();

function validateApiKey(req, res, next) {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
}

module.exports = validateApiKey;
