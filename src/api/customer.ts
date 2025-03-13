import api from "./index"

export const createCustomer = async (customerData: any) => {
  const response = await api.post("/customers", customerData)
  return response.data
}

export const getCustomers = async () => {
  const response = await api.get("/customers")
  return response.data
}

export const getCustomerById = async (id: string) => {
  const response = await api.get(`/customers/${id}`)
  return response.data
}

export const updateCustomer = async (id: string, customerData: any) => {
  const response = await api.put(`/customers/${id}`, customerData)
  return response.data
}

export const deleteCustomer = async (id: string) => {
  const response = await api.delete(`/customers/${id}`)
  return response.data
}

