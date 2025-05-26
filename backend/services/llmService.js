// copy into enhanced-agentic-support/backend/services/llmService.js
const OpenAI = require('openai');
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

class LLMService {
  async queryLLM(messages, opts = {}) {
    const { model='gpt-3.5-turbo', maxTokens=500, temperature=0.7, systemPrompt } = opts;
    const msgs = systemPrompt ? [{ role:'system', content:systemPrompt }, ...messages] : messages;
    const res = await openai.chat.completions.create({ model, messages: msgs, max_tokens: maxTokens, temperature });
    return res.choices[0].message.content.trim();
  }
  async classifyIntent(text) {
    const sys = `You are an intent classifier… respond with billing, technical, sales, or general.`;
    return (await this.queryLLM([{ role:'user', content:text }], { systemPrompt: sys, maxTokens:10, temperature:0.1 }))
      .toLowerCase();
  }
}

module.exports = new LLMService();

