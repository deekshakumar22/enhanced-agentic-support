// copy into enhanced-agentic-support/backend/agents/salesAgent.js
const Base = require('./baseAgent');
class SalesAgent extends Base {
  constructor() {
    super('Sales Consultant', 'I help with product info & demos.', ['features','pricing','upgrades']);
  }
  matches(intent) { return intent==='sales'; }
}
module.exports = SalesAgent;

