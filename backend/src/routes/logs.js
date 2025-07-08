// routes/logs.js
const express = require('express');
const router = express.Router();
const pool = require('../db');

router.get('/logs', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM logs ORDER BY created_dtm DESC LIMIT 100');
    res.json(result.rows);
  } catch (err) {
    console.error('DB Fetch Error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
