// copy into enhanced-agentic-support/frontend/src/hooks/useChat.js
import { useState } from 'react';
import { chatApi } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);

  async function sendMessage(text) {
    setIsTyping(true);
    setMessages(prev => [...prev, { role:'user', content:text }]);
    const res = await chatApi.sendMessage(text, conversationId);

    setConversationId(res.conversationId);
    setCurrentAgent(res.agent.name);
    setMessages(prev => [...prev, { role:'assistant', content:res.reply }]);
    setIsTyping(false);
  }

  return { messages, isTyping, sendMessage, currentAgent };
}

