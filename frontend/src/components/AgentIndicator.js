// copy into enhanced-agentic-support/frontend/src/components/AgentIndicator.js
import React from 'react';
import { useChat } from '../hooks/useChat';

export default function AgentIndicator() {
  const { currentAgent } = useChat();
  return <div style={{ marginBottom: 8, fontWeight: 'bold' }}>Agent: {currentAgent || '…'}</div>;
}

