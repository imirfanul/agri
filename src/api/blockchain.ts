import api from "./index"

export const createBlock = async (blockData: any) => {
  const response = await api.post("/blockchain", blockData)
  return response.data
}

export const getBlocks = async () => {
  const response = await api.get("/blockchain")
  return response.data
}

export const getBlockById = async (id: string) => {
  const response = await api.get(`/blockchain/${id}`)
  return response.data
}

export const verifyBlockchain = async () => {
  const response = await api.get("/blockchain/verify")
  return response.data
}

