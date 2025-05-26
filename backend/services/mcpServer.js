
const { v4: uuidv4 } = require('uuid');
const llmService = require('./llmService');
const { selectAgent, agents } = require('../agentRegistry');

/**
 * MCPServer implements a simple Model-Context-Protocol orchestration:
 *  - Model: the LLM classifier and completion engine
 *  - Context: conversation history per session
 *  - Protocol: routing and aggregation rules among agents
 */
class MCPServer {
  constructor() {
    this.contextStore = new Map(); // conversationId -> { history, currentProtocol }
  }

  /**
   * Initialize or retrieve conversation context
   */
  getContext(conversationId) {
    if (!this.contextStore.has(conversationId)) {
      this.contextStore.set(conversationId, { history: [], protocol: null });
    }
    return this.contextStore.get(conversationId);
  }

  /**
   * Main entry: handle incoming user message
   */
  async handleMessage({ conversationId, message }) {
    // 1. Context: retrieve history
    const context = this.getContext(conversationId);
    context.history.push({ role: 'user', content: message });

    // 2. Model: classify intent
    const intent = await llmService.classifyIntent(message);

    // 3. Protocol: select primary agent and route
    const primary = selectAgent(intent);
    const primaryReply = await primary.handle(message, context.history, llmService);
    context.history.push({ role: 'assistant', content: primaryReply, agent: primary.name });

    // 4. Protocol: gather secondary insights
    const secondary = [];
    for (const agent of agents) {
      if (agent.name !== primary.name) {
        const followUp = `User asked about ${intent}. Any additional insights?`;
        const reply = await agent.handle(followUp, context.history, llmService);
        secondary.push({ agent: agent.name, reply });
        context.history.push({ role: 'assistant', content: reply, agent: agent.name });
      }
    }

    return { conversationId, intent, primary: { name: primary.name, reply: primaryReply }, secondary };
  }

  /**
   * Optionally clear context
   */
  clearContext(conversationId) {
    this.contextStore.delete(conversationId);
  }
}

module.exports = new MCPServer();
