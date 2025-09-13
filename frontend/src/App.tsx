import { Outlet } from "react-router"
import { Navbar } from "./components/Navbar"
import Footer from "./components/Footer"
import ScrollToTop from "./components/ScrollToTop"
import { AIProvider, useAI } from "./contexts/AIContext"
import AiCard from "./components/AiCard"
import { DndContext } from '@dnd-kit/core'
import type { DragEndEvent } from '@dnd-kit/core'

const AppContent: React.FC = () => {
  const { showAI, position, updatePosition } = useAI()
  
  const handleDragEnd = (event: DragEndEvent) => {
    const { delta } = event
    if (delta) {
      const cardWidth = 400 // AiCard 宽度
      const cardHeight = 600 // AiCard 最大高度
      const newX = Math.max(0, Math.min(window.innerWidth - cardWidth, position.x + delta.x))
      const newY = Math.max(0, Math.min(window.innerHeight - cardHeight, position.y + delta.y))
      updatePosition(newX, newY)
    }
  }
  
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <Navbar/>
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6">
        <Outlet/>
      </main>
      <Footer/>
      <ScrollToTop/>
      
      {/* AI 卡片 - 全局显示 */}
      {showAI && (
        <div className="z-50">
          <AiCard />
        </div>
      )}
    </DndContext>
  )
}

const App: React.FC = () => {
  return (
    <AIProvider>
      <AppContent />
    </AIProvider>
  )
}

export default App