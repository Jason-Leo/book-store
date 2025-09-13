const OpenAI = require('openai')

const openai = new OpenAI({
  apiKey: process.env.DASHSCOPE_API_KEY,
  baseURL: 'https://dashscope.aliyuncs.com/compatible-mode/v1',
})

// POST /api/ai/chat-stream
// body: { model?: string, messages: [{ role: 'system'|'user'|'assistant', content: string }] }
// SSE streaming
const streamChat = async (req, res) => {
  try {
    const { messages = [], model = 'qwen-plus' } = req.body || {}
    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: 'messages is required' })
    }

    // SSE headers
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8')
    res.setHeader('Cache-Control', 'no-cache, no-transform')
    res.setHeader('Connection', 'keep-alive')
    res.flushHeaders && res.flushHeaders()

    const completion = await openai.chat.completions.create({
      model,
      messages,
      stream: true,
    })

    for await (const chunk of completion) {
      const choice = chunk?.choices?.[0]
      const delta = choice?.delta?.content ?? choice?.message?.content ?? ''
      if (delta) {
        // Vercel AI SDK Data Stream format
        res.write(`data: ${JSON.stringify({ type: 'text-delta', text: delta })}\n\n`)
      }
    }

    // Signal done in Data Stream format
    res.write(`data: ${JSON.stringify({ type: 'done' })}\n\n`)
    res.end()
  } catch (err) {
    if (!res.headersSent) {
      res.status(500).json({ message: 'AI stream failed', error: err?.message || String(err) })
    } else {
      res.write(`data: ${JSON.stringify({ error: err?.message || String(err) })}\n\n`)
      res.end()
    }
  }
}

module.exports = {
  streamChat,
}


