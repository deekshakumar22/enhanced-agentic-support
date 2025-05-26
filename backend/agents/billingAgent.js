// copy into enhanced-agentic-support/backend/agents/billingAgent.js
const Base = require('./baseAgent');
class BillingAgent extends Base {
  constructor() {
    super('Billing Specialist', 'I handle billing & payments.', ['refunds','invoices','subscriptions']);
  }
  matches(intent) { return intent==='billing'; }
}
module.exports = BillingAgent;

