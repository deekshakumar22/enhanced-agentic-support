// copy into enhanced-agentic-support/backend/agents/baseAgent.js
class BaseAgent {
  constructor(name, desc, caps=[]) { this.name = name; this.description = desc; this.capabilities = caps; }
  getSystemPrompt() {
    return `You are ${this.name}, ${this.description}. Capabilities: ${this.capabilities.join(', ')}.`;
  }
  async handle(msg, history, llm) {
    const messages = history.map(m => ({ role:m.role, content:m.content })).concat({ role:'user', content:msg });
    return await llm.queryLLM(messages, { systemPrompt: this.getSystemPrompt() });
  }
  matches(intent) { return false; }
}
module.exports = BaseAgent;

