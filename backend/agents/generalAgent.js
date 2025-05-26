// copy into enhanced-agentic-support/backend/agents/generalAgent.js
const Base = require('./baseAgent');
class GeneralAgent extends Base {
  constructor() {
    super('Generalist', 'I handle general questions.', []);
  }
  matches(intent) { return intent==='general'; }
}
module.exports = GeneralAgent;

