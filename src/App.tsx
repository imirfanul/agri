import { Toaster } from "@/components/ui/toaster"
import { Toaster as Sonner } from "@/components/ui/sonner"
import { TooltipProvider } from "@/components/ui/tooltip"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import { BlockchainProvider } from "./context/BlockchainContext"
import { AuthProvider } from "./context/AuthContext"
import ProtectedRoute from "./components/ProtectedRoute"
import Index from "./pages/Index"
import Farmer from "./pages/Farmer"
import Customer from "./pages/Customer"
import Equipments from "./pages/Equipments"
import About from "./pages/About"
import Login from "./pages/Login"
import Register from "./pages/Register"
import NotFound from "./pages/NotFound"

const queryClient = new QueryClient()

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <BlockchainProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Index />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/farmer"
                element={
                  <ProtectedRoute>
                    <Farmer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/customer"
                element={
                  <ProtectedRoute>
                    <Customer />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/equipments"
                element={
                  <ProtectedRoute>
                    <Equipments />
                  </ProtectedRoute>
                }
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </BlockchainProvider>
    </AuthProvider>
  </QueryClientProvider>
)

export default App

