// copy into enhanced-agentic-support/frontend/src/components/MessageBubble.js
import React from 'react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div style={{
      textAlign: isUser ? 'right' : 'left',
      margin: '4px 0'
    }}>
      <div style={{
        display: 'inline-block',
        background: isUser ? '#007bff' : '#e5e5ea',
        color: isUser ? '#fff' : '#000',
        padding: '8px 12px',
        borderRadius: 16,
        maxWidth: '80%'
      }}>
        {message.content}
      </div>
    </div>
  );
}

