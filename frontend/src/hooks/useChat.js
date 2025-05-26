import { useState } from 'react';
import { chatApi } from '../services/api';

export function useChat() {
  const [messages, setMessages] = useState([]);
  const [conversationId, setConversationId] = useState(null);
  const [isTyping, setIsTyping] = useState(false);
  const [currentAgent, setCurrentAgent] = useState(null);

  async function sendMessage(text) {
    setIsTyping(true);
    // add user message
    setMessages(prev => [...prev, { role: 'user', content: text }]);

    // call the API
    const res = await chatApi.sendMessage(text, conversationId);
    const { conversationId: newId, primary, secondary } = res;

    // update state
    setConversationId(newId);
    setCurrentAgent(primary.name);
    setMessages(prev => [
      ...prev,
      // primary reply
      { role: 'assistant', content: primary.reply, agent: primary.name },
      // optional: show each secondary insight as its own bubble
      ...secondary.map(s => ({ role: 'assistant', content: s.reply, agent: s.agent }))
    ]);

    setIsTyping(false);
  }

  return { messages, isTyping, sendMessage, currentAgent };
}

