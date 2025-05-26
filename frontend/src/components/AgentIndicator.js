import React from 'react';
import { useChat } from '../hooks/useChat';

export default function AgentIndicator() {
  const { currentAgent } = useChat();
  return (
    <div style={{
      marginBottom: 8,
      fontWeight: 'bold',
      fontSize: '1em'
    }}>
      Primary Agent: {currentAgent || '…'}
    </div>
  );
}

