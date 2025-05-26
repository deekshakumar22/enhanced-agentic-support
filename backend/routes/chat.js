const express = require('express');
const Joi = require('joi');
const router = express.Router();
const mcpServer = require('../services/mcpServer');
const conversationService = require('../services/conversationService');

const schema = Joi.object({
  message: Joi.string().min(1).max(1000).required(),
  conversationId: Joi.string().optional()
});

router.post('/', async (req, res, next) => {
  try {
    const { error, value } = schema.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message });

    let { message, conversationId } = value;
    if (!conversationId) {
      conversationId = conversationService.createConversation();
    }

    // Use MCPServer to handle the message
    const result = await mcpServer.handleMessage({ conversationId, message });

    // Update conversationService for compatibility
    conversationService.addMessage(conversationId, { role: 'user', content: message });
    conversationService.addMessage(conversationId, { role: 'assistant', content: result.primary.reply, agent: result.primary.name });
    result.secondary.forEach(sec => {
      conversationService.addMessage(conversationId, { role: 'assistant', content: sec.reply, agent: sec.agent });
    });

    res.json(result);
  } catch (err) {
    next(err);
  }
});

router.get('/:conversationId', (req, res, next) => {
  try {
    const conv = conversationService.getConversation(req.params.conversationId);
    if (!conv) return res.status(404).json({ error: 'Not found' });
    res.json(conv);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

