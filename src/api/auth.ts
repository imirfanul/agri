import api from "./index"

export const login = async (email: string, password: string) => {
  const response = await api.post("/users/login", { email, password })
  return response.data
}

export const register = async (name: string, email: string, password: string, role = "customer") => {
  const response = await api.post("/users", { name, email, password, role })
  return response.data
}

export const getUserProfile = async () => {
  const response = await api.get("/users/profile")
  return response.data
}

export const updateUserProfile = async (userData: any) => {
  const response = await api.put("/users/profile", userData)
  return response.data
}

