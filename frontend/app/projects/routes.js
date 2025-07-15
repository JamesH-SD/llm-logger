// backend/routes/projects.js
const express = require('express')
const pool = require('../db')
const router = express.Router()

// GET /projects
router.get('/', async (req, res) => {
  try {
    const { rows } = await pool.query(`
      SELECT project_id, project_name, model, created_by, created_dtm
      FROM projects
      ORDER BY created_dtm DESC
      LIMIT 100
    `)
    res.json(rows)
  } catch (err) {
    console.error('DB Fetch Error:', err)
    res.status(500).json({ error: 'Internal server error' })
  }
})

module.exports = router
