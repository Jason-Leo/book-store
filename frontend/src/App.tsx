import { Outlet } from "react-router"
import { Navbar } from "./components/Navbar"


const App: React.FC = () => {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6">
        <Outlet/>
      </main>
      <footer className="max-w-screen-2xl mx-auto">Footer</footer>
    </>
  )
}

export default App