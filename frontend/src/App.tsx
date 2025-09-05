import { Outlet } from "react-router"
import { Navbar } from "./components/Navbar"
import Footer from "./components/Footer"


const App: React.FC = () => {
  return (
    <>
      <Navbar/>
      <main className="min-h-screen max-w-screen-2xl mx-auto px-4 py-6">
        <Outlet/>
      </main>
      <Footer/>
    </>
  )
}

export default App