// server.js
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
require('dotenv').config();

const app = express();
app.use(cors());
const port = 3000;

// PostgreSQL pool
const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  database: process.env.DB_NAME,
  password: process.env.DB_PASS,
  port: 5432,
  ssl: {
    rejectUnauthorized: false
  }
});

// Middleware
app.use(bodyParser.json());

// API key middleware using .env secret
app.use((req, res, next) => {
  const apiKey = req.header('x-api-key');
  if (!apiKey || apiKey !== process.env.API_KEY_SECRET) {
    return res.status(403).json({ error: 'Unauthorized' });
  }
  next();
});

// POST /log endpoint
app.post('/log', async (req, res) => {
  const { prompt, response, model, tokens = null, cost = null, latency = null } = req.body;

  try {
    await pool.query(
      'INSERT INTO logs (project_id, model, prompt, response, tokens, cost, latency) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [1, model, prompt, response, tokens, cost, latency] // project_id hardcoded for now
    );
    res.status(201).json({ message: 'Log saved' });
  } catch (err) {
    console.error('DB Insert Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// ✅ NEW: GET /logs endpoint
app.get('/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM logs ORDER BY created_at DESC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Fetch Error:', err);
    res.status(500).json({ error: 'Failed to fetch logs' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`✅ LLM Logger API running at http://localhost:${port}`);
});
