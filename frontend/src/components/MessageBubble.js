import React from 'react';

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  const speaker = isUser ? 'You' : (message.agent || 'Agent');

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
        {/* show speaker label for non-user */}
        {!isUser && (
          <div style={{
            fontSize: '0.75em',
            marginBottom: 4,
            fontWeight: 500,
            opacity: 0.7
          }}>
            {speaker}
          </div>
        )}
        {message.content}
      </div>
    </div>
  );
}


