// frontend/utils/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

export const fetchLogs = async () => {
  return axios.get(`${API_BASE_URL}/logs`, {
    headers: {
      'x-api-key': process.env.NEXT_PUBLIC_API_KEY || ''
    }
  });
};

