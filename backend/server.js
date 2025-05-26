const path = require('path');
console.log('⏱️  NODE_ENV:', process.env.NODE_ENV, '— FRONTEND_URL raw:', process.env.FRONTEND_URL);
require('dotenv').config({
  path: path.resolve(__dirname, '../.env'),
});
console.log('🛠️  Loaded FRONTEND_URL:', process.env.FRONTEND_URL);

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('./middleware/rateLimiter');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');
const chatRoute = require('./routes/chat');
const healthRoute = require('./routes/health');

const app = express();
const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000,https://localhost:3000';
const allowedOrigins = frontendUrl.split(',').map(url => url.trim());

console.log('Loaded FRONTEND_URL:',allowedOrigins);

app.use(helmet());
app.use(cors({
  origin: (origin, cb) => {
    if (!origin) return cb(null, true);
    if (allowedOrigins.includes(origin)) return cb(null, true);
    cb(new Error('Not allowed by CORS'));
  },
  credentials: true
}));
app.use(rateLimiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));
app.use(logger);

app.use('/api/health', healthRoute);
app.use('/api/chat', chatRoute);

app.use('*', (req, res) => res.status(404).json({ error: 'Route not found' }));
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`🚀 Backend running on port ${PORT}`));

