const request = require('supertest');
const express = require('express');
const logRoute = require('../../src/routes/log');
const logsRoute = require('../../src/routes/logs');
const pool = require('..//../src/db');

const app = express();
app.use(express.json());
app.use('/', logRoute);
app.use('/', logsRoute);

describe('LLM Logger API Routes', () => {
  test('POST /log - should save a log entry', async () => {
    const res = await request(app).post('/log').send({
      prompt: 'Test prompt',
      response: 'Test response',
      model: 'gpt-3.5-turbo',
      tokens: 50,
      cost: 0.0015,
      latency: 100,
      projectId: 1
    });

    expect(res.statusCode).toBe(201);
    expect(res.body.message).toBe('Log saved');
  });

  test('GET /logs - should return logs', async () => {
    const res = await request(app).get('/logs');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});

afterAll(async () => {
    await pool.end(); // Closes the DB connection pool
  });
