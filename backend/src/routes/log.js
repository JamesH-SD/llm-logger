// routes/log.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/log', async (req, res) => {
  const { prompt, response, model, tokens = null, cost = null, latency = null, projectId = 1 } = req.body;

  try {
    await pool.query(
      'INSERT INTO logs (project_id, model, prompt, response, tokens, cost, latency) VALUES ($1, $2, $3, $4, $5, $6, $7)',
      [projectId, model, prompt, response, tokens, cost, latency]
    );
    res.status(201).json({ message: 'Log saved' });
  } catch (err) {
    console.error('DB Insert Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
