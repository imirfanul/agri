"use client"

import { Link, useLocation } from "react-router-dom"
import { useAuth } from "@/context/AuthContext"
import { Button } from "./ui/button"
import { LogOutIcon, UserIcon } from "lucide-react"

const Navbar = () => {
  const location = useLocation()
  const { isAuthenticated, user, logout } = useAuth()

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <nav className="bg-black/80 backdrop-blur-sm text-white py-4 fixed w-full top-0 left-0 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-xl font-bold text-agri-green">AgriChain</div>

        <ul className="flex justify-center space-x-4">
          <li>
            <Link
              to="/"
              className={`font-bold px-3 py-2 rounded-md transition-colors ${isActive("/") ? "bg-agri-green text-white" : "hover:bg-agri-green/80"}`}
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/farmer"
              className={`font-bold px-3 py-2 rounded-md transition-colors ${isActive("/farmer") ? "bg-agri-green text-white" : "hover:bg-agri-green/80"}`}
            >
              Farmer
            </Link>
          </li>
          <li>
            <Link
              to="/customer"
              className={`font-bold px-3 py-2 rounded-md transition-colors ${isActive("/customer") ? "bg-agri-green text-white" : "hover:bg-agri-green/80"}`}
            >
              Customer
            </Link>
          </li>
          <li>
            <Link
              to="/equipments"
              className={`font-bold px-3 py-2 rounded-md transition-colors ${isActive("/equipments") ? "bg-agri-green text-white" : "hover:bg-agri-green/80"}`}
            >
              Equipments
            </Link>
          </li>
          <li>
            <Link
              to="/about"
              className={`font-bold px-3 py-2 rounded-md transition-colors ${isActive("/about") ? "bg-agri-green text-white" : "hover:bg-agri-green/80"}`}
            >
              About
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-2">
          {isAuthenticated ? (
            <>
              <div className="flex items-center mr-2">
                <UserIcon className="h-4 w-4 mr-1" />
                <span className="text-sm">{user?.name}</span>
              </div>
              <Button variant="ghost" size="sm" onClick={logout} className="text-white hover:bg-agri-green/20">
                <LogOutIcon className="h-4 w-4 mr-1" />
                Logout
              </Button>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-white hover:bg-agri-green/20">
                  Login
                </Button>
              </Link>
              <Link to="/register">
                <Button size="sm" className="bg-agri-green hover:bg-agri-dark-green">
                  Register
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Navbar

