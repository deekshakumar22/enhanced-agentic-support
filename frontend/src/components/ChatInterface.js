// copy into enhanced-agentic-support/frontend/src/components/ChatInterface.js
import React, { useState } from 'react';
import { useChat } from '../hooks/useChat';
import MessageBubble from './MessageBubble';
import TypingIndicator from './TypingIndicator';
import AgentIndicator from './AgentIndicator';

export default function ChatInterface() {
  const { messages, isTyping, sendMessage } = useChat();
  const [input, setInput] = useState('');

  const onSend = () => {
    if (!input) return;
    sendMessage(input);
    setInput('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 16 }}>
      <AgentIndicator />
      <div style={{ border: '1px solid #ccc', borderRadius: 8, padding: 16, minHeight: 300 }}>
        {messages.map((m, i) => <MessageBubble key={i} message={m} />)}
        {isTyping && <TypingIndicator />}
      </div>
      <div style={{ marginTop: 8 }}>
        <input
          style={{ width: '80%', padding: 8 }}
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && onSend()}
        />
        <button onClick={onSend} disabled={!input} style={{ padding: 8, marginLeft: 8 }}>
          Send
        </button>
      </div>
    </div>
  );
}

