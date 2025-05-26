// copy into enhanced-agentic-support/backend/middleware/errorHandler.js
const winston = require('winston');
const logger = winston.createLogger({
  level: 'error',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.File({ filename: 'error.log' }),
    new winston.transports.Console()
  ]
});

module.exports = (err, req, res, next) => {
  logger.error({ message: err.message, stack: err.stack });
  const isDev = process.env.NODE_ENV === 'development';
  res.status(err.status || 500).json({
    error: err.message,
    ...(isDev && { stack: err.stack })
  });
};

