import type React from "react"

interface FooterProps {
  isGreen?: boolean
}

const Footer: React.FC<FooterProps> = ({ isGreen = true }) => {
  return (
    <footer className={`${isGreen ? "bg-agri-green" : "bg-black/80"} text-white py-4 text-center mt-auto w-full`}>
      <p>&copy; 2025 Blockchain Agriculture System. All rights reserved.</p>
    </footer>
  )
}

export default Footer

