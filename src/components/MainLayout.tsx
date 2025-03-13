import type React from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"

interface MainLayoutProps {
  children: React.ReactNode
  showGreenFooter?: boolean
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, showGreenFooter = true }) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">{children}</main>
      <Footer isGreen={showGreenFooter} />
    </div>
  )
}

export default MainLayout

