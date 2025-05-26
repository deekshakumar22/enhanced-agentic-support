// copy into enhanced-agentic-support/backend/agents/technicalAgent.js
const Base = require('./baseAgent');
class TechnicalAgent extends Base {
  constructor() {
    super('Technical Support Specialist', 'I resolve technical issues.', ['troubleshooting','errors','configs']);
  }
  matches(intent) { return intent==='technical'; }
}
module.exports = TechnicalAgent;

