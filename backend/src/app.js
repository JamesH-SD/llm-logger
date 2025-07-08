// app.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const validateApiKey = require('./middleware/auth');
const logRoutes = require('./routes/logs');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(validateApiKey);
app.use(logRoutes);

module.exports = app;
