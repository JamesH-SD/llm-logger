// pages/index.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    async function fetchLogs() {
      try {
        const response = await axios.get('http://localhost:3000/logs', {
          headers: {
            'x-api-key': process.env.NEXT_PUBLIC_API_KEY
          }
        });
        setLogs(response.data);
      } catch (err) {
        console.error('Failed to fetch logs:', err);
      }
    }
    fetchLogs();
  }, []);

  return (
    <main style={{ padding: '2rem' }}>
      <h1>LLM Logs</h1>
      <table border={1} cellPadding={8}>
        <thead>
          <tr>
            <th>Prompt</th>
            <th>Response</th>
            <th>Model</th>
            <th>Tokens</th>
            <th>Latency</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((log) => (
            <tr key={log.id}>
              <td>{log.prompt}</td>
              <td>{log.response}</td>
              <td>{log.model}</td>
              <td>{log.tokens || '-'}</td>
              <td>{log.latency || '-'}</td>
              <td>{new Date(log.created_at).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
