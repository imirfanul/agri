import api from "./index"

export const createEquipment = async (equipmentData: any) => {
  const response = await api.post("/equipments", equipmentData)
  return response.data
}

export const getEquipments = async () => {
  const response = await api.get("/equipments")
  return response.data
}

export const getEquipmentById = async (id: string) => {
  const response = await api.get(`/equipments/${id}`)
  return response.data
}

export const updateEquipment = async (id: string, equipmentData: any) => {
  const response = await api.put(`/equipments/${id}`, equipmentData)
  return response.data
}

export const deleteEquipment = async (id: string) => {
  const response = await api.delete(`/equipments/${id}`)
  return response.data
}

