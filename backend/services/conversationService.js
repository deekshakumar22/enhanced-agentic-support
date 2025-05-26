// copy into enhanced-agentic-support/backend/services/conversationService.js
const { v4: uuidv4 } = require('uuid');

class ConversationService {
  constructor() { this.conversations = new Map(); }
  createConversation() {
    const id = uuidv4();
    this.conversations.set(id, { id, messages: [], createdAt: new Date(), lastActive: new Date(), currentAgent: null });
    return id;
  }
  getConversation(id) { return this.conversations.get(id); }
  addMessage(id, msg) {
    const conv = this.getConversation(id);
    if (!conv) throw new Error('Not found');
    conv.messages.push({ ...msg, timestamp: new Date() });
    conv.lastActive = new Date();
    return conv;
  }
  updateAgent(id, name) {
    const conv = this.getConversation(id);
    if (conv) conv.currentAgent = name;
  }
  getRecentMessages(id, n=10) {
    const conv = this.getConversation(id);
    return conv ? conv.messages.slice(-n) : [];
  }
}

module.exports = new ConversationService();

