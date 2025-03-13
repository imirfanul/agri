import api from "./index"

export const createProduct = async (productData: any) => {
  const response = await api.post("/products", productData)
  return response.data
}

export const getProducts = async () => {
  const response = await api.get("/products")
  return response.data
}

export const getProductById = async (id: string) => {
  const response = await api.get(`/products/${id}`)
  return response.data
}

export const updateProduct = async (id: string, productData: any) => {
  const response = await api.put(`/products/${id}`, productData)
  return response.data
}

export const deleteProduct = async (id: string) => {
  const response = await api.delete(`/products/${id}`)
  return response.data
}

