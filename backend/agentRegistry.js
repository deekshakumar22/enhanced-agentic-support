// copy into enhanced-agentic-support/backend/agentRegistry.js
const BillingAgent   = require('./agents/billingAgent');
const TechnicalAgent = require('./agents/technicalAgent');
const SalesAgent     = require('./agents/salesAgent');
const GeneralAgent   = require('./agents/generalAgent');

const agents = [
  new BillingAgent(),
  new TechnicalAgent(),
  new SalesAgent(),
  new GeneralAgent()
];

function selectAgent(intent) {
  return agents.find(a => a.matches(intent)) || agents.find(a => a instanceof GeneralAgent);
}

module.exports = { selectAgent };

