"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import * as authApi from "@/api/auth"

type User = {
  _id: string
  name: string
  email: string
  role: string
  token: string
}

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role?: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast()
  const [user, setUser] = useState<User | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(true)

  // Load user from localStorage on initial render
  useEffect(() => {
    const token = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (token && storedUser) {
      setUser(JSON.parse(storedUser))
      setIsAuthenticated(true)
    }

    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      setLoading(true)
      const userData = await authApi.login(email, password)

      setUser(userData)
      setIsAuthenticated(true)

      localStorage.setItem("token", userData.token)
      localStorage.setItem("user", JSON.stringify(userData))

      toast({
        title: "Login Successful",
        description: `Welcome back, ${userData.name}!`,
      })
    } catch (error) {
      console.error("Login error:", error)
      toast({
        title: "Login Failed",
        description: error.response?.data?.message || "Invalid credentials",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const register = async (name: string, email: string, password: string, role = "customer") => {
    try {
      setLoading(true)
      await authApi.register(name, email, password, role)

      toast({
        title: "Registration Successful",
        description: "Your account has been created. You can now log in.",
      })
    } catch (error) {
      console.error("Registration error:", error)
      toast({
        title: "Registration Failed",
        description: error.response?.data?.message || "Registration failed",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setIsAuthenticated(false)
    localStorage.removeItem("token")
    localStorage.removeItem("user")

    toast({
      title: "Logged Out",
      description: "You have been successfully logged out.",
    })
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        register,
        logout,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

