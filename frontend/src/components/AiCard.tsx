import React, { useState, useRef, useEffect } from 'react'
import ReactMarkdown from 'react-markdown'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'
import 'katex/dist/katex.min.css'
import { getBaseUrl } from '../utils/baseUrl'
import { useAI } from '../contexts/AIContext'
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
}

const AiCard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { hideAI, position } = useAI() // updatePosition 在 App 组件中使用
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: 'ai-card',
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    position: 'fixed' as const,
    left: `${position.x}px`,
    top: `${position.y}px`,
  }

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input.trim()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(`${getBaseUrl()}/api/ai/chat-stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: [...messages, userMessage]
        }),
      })

      if (!response.ok) {
        throw new Error('Network response was not ok')
      }

      const reader = response.body?.getReader()
      if (!reader) {
        throw new Error('No response body')
      }

      const decoder = new TextDecoder()
      let assistantContent = ''

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: ''
      }

      setMessages(prev => [...prev, assistantMessage])

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n')

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              // 处理后端返回的格式: { type: 'text-delta', text: delta }
              if (data.type === 'text-delta' && data.text) {
                assistantContent += data.text
                setMessages(prev => 
                  prev.map(msg => 
                    msg.id === assistantMessage.id 
                      ? { ...msg, content: assistantContent }
                      : msg
                  )
                )
              } else if (data.type === 'done') {
                // 流式传输完成
                break
              } else if (data.error) {
                throw new Error(data.error)
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
              console.warn('Failed to parse chunk:', line, e)
            }
          }
        }
      }
    } catch (error) {
      console.error('Error:', error)
      setMessages(prev => [...prev, {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: '抱歉，发生了错误，请稍后重试。'
      }])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div 
      ref={setNodeRef}
      style={style}
      className={`bg-white rounded-lg shadow-lg border border-gray-200 px-4 py-6 w-96 h-[600px] flex flex-col z-50 select-none ${
        isDragging ? 'opacity-50 shadow-2xl' : ''
      }`}
    >
      {/* 拖拽手柄 */}
      <div 
        className='flex justify-between items-center mb-4 cursor-move select-none hover:bg-gray-50 rounded px-2 py-1 transition-colors'
        {...attributes}
        {...listeners}
        title="拖拽移动窗口"
      >
        <div className='flex items-center gap-2'>
          <div className='flex gap-1'>
            <div className='w-1 h-1 bg-gray-400 rounded-full'></div>
            <div className='w-1 h-1 bg-gray-400 rounded-full'></div>
            <div className='w-1 h-1 bg-gray-400 rounded-full'></div>
          </div>
          <span className='text-xs text-gray-500 ml-2'>阅见君AI</span>
        </div>
        <button 
          onPointerDown={(e) => e.stopPropagation()}
          onClick={(e) => { e.stopPropagation(); hideAI(); }}
          className='text-gray-400 hover:text-gray-600 text-xl leading-none p-1 rounded hover:bg-gray-200 transition-colors'
          onMouseDown={(e) => e.stopPropagation()} // 防止拖拽时触发关闭
          title="关闭"
        >
          ×
        </button>
      </div>
      <div 
        className='space-y-3 flex-1 overflow-auto custom-scrollbar border rounded p-3 bg-gray-50'
        onMouseDown={(e) => e.stopPropagation()} // 防止在内容区域拖拽
      >
        {messages.map(m => (
          <div key={m.id} className={m.role === 'user' ? 'text-right' : 'text-left'}>
            <div className={`inline-block px-3 py-2 rounded max-w-[80%] ${m.role === 'user' ? 'bg-blue-50' : 'bg-gray-50'}`}>
              {m.role === 'assistant' ? (
                <div className='text-sm prose prose-sm max-w-none'>
                  <ReactMarkdown
                    remarkPlugins={[remarkMath]}
                    rehypePlugins={[rehypeKatex]}
                    components={{
                      // 自定义 Markdown 组件样式
                      h1: ({ children }) => <h1 className="text-lg font-bold mb-2">{children}</h1>,
                      h2: ({ children }) => <h2 className="text-base font-bold mb-2">{children}</h2>,
                      h3: ({ children }) => <h3 className="text-sm font-bold mb-1">{children}</h3>,
                      p: ({ children }) => <p className="mb-2">{children}</p>,
                      ul: ({ children }) => <ul className="list-disc list-inside mb-2">{children}</ul>,
                      ol: ({ children }) => <ol className="list-decimal list-inside mb-2">{children}</ol>,
                      li: ({ children }) => <li className="mb-1">{children}</li>,
                      code: ({ children, className }) => {
                        const isInline = !className
                        return isInline ? (
                          <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                        ) : (
                          <code className="block bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto">{children}</code>
                        )
                      },
                      pre: ({ children }) => <pre className="bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto mb-2">{children}</pre>,
                      blockquote: ({ children }) => <blockquote className="border-l-4 border-gray-300 pl-3 italic mb-2">{children}</blockquote>,
                      a: ({ children, href }) => <a href={href} className="text-blue-600 underline" target="_blank" rel="noopener noreferrer">{children}</a>,
                      strong: ({ children }) => <strong className="font-bold">{children}</strong>,
                      em: ({ children }) => <em className="italic">{children}</em>,
                    }}
                  >
                    {m.content}
                  </ReactMarkdown>
                </div>
              ) : (
                <span className='text-sm whitespace-pre-wrap'>{m.content}</span>
              )}
            </div>
          </div>
        ))}
        {isLoading && <div className='text-gray-400 text-sm'>生成中...</div>}
        <div ref={messagesEndRef} />
      </div>

      <form 
        onSubmit={handleSubmit} 
        className='mt-4 flex gap-2'
        onMouseDown={(e) => e.stopPropagation()} // 防止在输入区域拖拽
      >
        <input
          className='flex-1 border rounded px-3 py-2'
          placeholder='问点什么...'
          value={input}
          onChange={handleInputChange}
        />
        <button
          type='submit'
          className='bg-primary text-white px-4 py-2 rounded disabled:opacity-60'
          disabled={isLoading}
        >发送</button>
      </form>
    </div>
  )
}

export default AiCard