// copy into enhanced-agentic-support/backend/middleware/logger.js
module.exports = (req, res, next) => {
  console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
  next();
};

