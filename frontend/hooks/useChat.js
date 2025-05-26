import { useState, useCallback } from 'react';

export function useChat(apiUrl) {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]); // { role, content, agent? }

  const sendMessage = useCallback(async (text) => {
    // append user message
    setMessages(m => [...m, { role: 'user', content: text }]);

    // call backend
    const res = await fetch(`${apiUrl}/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: text, conversationId })
    });
    const body = await res.json();

    if (res.ok) {
      // update conversationId if new
      if (!conversationId && body.conversationId) {
        setConversationId(body.conversationId);
      }
      // append assistant reply
      setMessages(m => [...m, { role: 'assistant', content: body.reply, agent: body.agent.name }]);
    } else {
      // handle error
      setMessages(m => [...m, { role: 'assistant', content: `Error: ${body.error}` }]);
    }
  }, [apiUrl, conversationId]);

  return {
    messages,
    sendMessage,
    conversationId
  };
}

