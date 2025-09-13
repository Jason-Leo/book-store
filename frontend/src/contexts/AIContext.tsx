import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'

interface AIContextType {
  showAI: boolean
  toggleAI: () => void
  hideAI: () => void
  position: { x: number; y: number }
  updatePosition: (x: number, y: number) => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error('useAI must be used within an AIProvider')
  }
  return context
}

interface AIProviderProps {
  children: ReactNode
}

export const AIProvider: React.FC<AIProviderProps> = ({ children }) => {
  const [showAI, setShowAI] = useState(false)
  
  // 从 localStorage 恢复位置，如果没有则使用默认位置
  const getInitialPosition = () => {
    if (typeof window === 'undefined') return { x: 800, y: 100 }
    
    const saved = localStorage.getItem('ai-card-position')
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        return { 
          x: Math.max(0, Math.min(window.innerWidth - 400, parsed.x)),
          y: Math.max(0, Math.min(window.innerHeight - 600, parsed.y))
        }
      } catch (e) {
        console.warn('Failed to parse saved position:', e)
      }
    }
    
    return { 
      x: window.innerWidth - 420, 
      y: window.innerHeight - 620 
    }
  }
  
  const [position, setPosition] = useState(getInitialPosition)

  const toggleAI = () => {
    setShowAI(prev => !prev)
  }

  const hideAI = () => {
    setShowAI(false)
  }

  const updatePosition = (x: number, y: number) => {
    const newPosition = { x, y }
    setPosition(newPosition)
    // 保存到 localStorage
    if (typeof window !== 'undefined') {
      localStorage.setItem('ai-card-position', JSON.stringify(newPosition))
    }
  }

  return (
    <AIContext.Provider value={{ showAI, toggleAI, hideAI, position, updatePosition }}>
      {children}
    </AIContext.Provider>
  )
}
