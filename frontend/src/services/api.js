// copy into enhanced-agentic-support/frontend/src/services/api.js
import axios from 'axios';
const baseURL = process.env.REACT_APP_API_URL || 'http://localhost:4000/api';
const api = axios.create({ baseURL, timeout: 30000 });

export const chatApi = {
  sendMessage: (message, conversationId) =>
    api.post('/chat', { message, conversationId }).then(r => r.data)
};

