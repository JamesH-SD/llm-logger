// src/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const logRoute = require('./routes/log');     // POST /log
const logsRoute = require('./routes/logs');   // GET /logs

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Mount routes
app.use('/', logRoute);   // POST /log
app.use('/', logsRoute);  // GET /logs

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Backend server running on port ${PORT}`);
});
