"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { useToast } from "@/components/ui/use-toast"
import * as blockchainApi from "@/api/blockchain"
import * as farmerApi from "@/api/farmer"
import * as customerApi from "@/api/customer"
import * as equipmentApi from "@/api/equipment"
import * as productApi from "@/api/product"

type Block = {
  _id: string
  blockId: string
  sender: string
  receiver: string
  amount: number
  productId?: string
  productInfo?: string
  previousHash: string
  timestamp: string
  hash: string
}

type FarmerData = {
  _id: string
  name: string
  farmerId: string
  address: string
  cropName: string
  cropPrice: number
}

type CustomerData = {
  _id: string
  name: string
  customerId: string
  email: string
  location: string
  tradeLicense: string
}

type EquipmentData = {
  _id: string
  shopName: string
  availableEquip: string
  fertilizer: string
  tradeLicense: string
  shopLocation: string
  image: string
}

type ProductData = {
  _id: string
  name: string
  price: number
  category: string
  description?: string
  quantity: number
  image?: string
  farmer?: string
}

interface BlockchainContextType {
  blocks: Block[]
  addBlock: (
    sender: string,
    receiver: string,
    amount: number,
    productId?: string,
    productInfo?: string,
  ) => Promise<void>
  farmerData: FarmerData | null
  saveFarmerData: (data: any) => Promise<void>
  customerData: CustomerData | null
  saveCustomerData: (data: any) => Promise<void>
  equipmentData: EquipmentData[]
  addEquipment: (data: any) => Promise<void>
  products: ProductData[]
  addProduct: (data: any) => Promise<void>
  loading: boolean
}

const BlockchainContext = createContext<BlockchainContextType | undefined>(undefined)

export const useBlockchain = () => {
  const context = useContext(BlockchainContext)
  if (context === undefined) {
    throw new Error("useBlockchain must be used within a BlockchainProvider")
  }
  return context
}

export const BlockchainProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { toast } = useToast()
  const [blocks, setBlocks] = useState<Block[]>([])
  const [farmerData, setFarmerData] = useState<FarmerData | null>(null)
  const [customerData, setCustomerData] = useState<CustomerData | null>(null)
  const [equipmentData, setEquipmentData] = useState<EquipmentData[]>([])
  const [products, setProducts] = useState<ProductData[]>([])
  const [loading, setLoading] = useState<boolean>(true)

  // Load data on initial render
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true)

        // Load blockchain
        const blocksData = await blockchainApi.getBlocks()
        setBlocks(blocksData)

        // Load products
        const productsData = await productApi.getProducts()
        setProducts(productsData)

        // Load equipment
        const equipmentData = await equipmentApi.getEquipments()
        setEquipmentData(equipmentData)

        // Load farmer and customer data if user is logged in
        const token = localStorage.getItem("token")
        if (token) {
          try {
            const farmersData = await farmerApi.getFarmers()
            const customersData = await customerApi.getCustomers()

            // Find farmer and customer data for the current user
            const user = JSON.parse(localStorage.getItem("user") || "{}")

            if (user._id) {
              const userFarmer = farmersData.find((f: any) => f.user === user._id)
              const userCustomer = customersData.find((c: any) => c.user === user._id)

              if (userFarmer) setFarmerData(userFarmer)
              if (userCustomer) setCustomerData(userCustomer)
            }
          } catch (error) {
            console.error("Error loading user data:", error)
          }
        }
      } catch (error) {
        console.error("Error loading data:", error)
        toast({
          title: "Error",
          description: "Failed to load data. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadData()
  }, [toast])

  const addBlock = async (
    sender: string,
    receiver: string,
    amount: number,
    productId?: string,
    productInfo?: string,
  ) => {
    try {
      setLoading(true)

      const newBlock = await blockchainApi.createBlock({
        sender,
        receiver,
        amount,
        productId,
        productInfo,
      })

      setBlocks([...blocks, newBlock])

      toast({
        title: "Transaction Successful",
        description: `Transaction from ${sender} to ${receiver} for ${amount} has been added to the blockchain.`,
      })
    } catch (error) {
      console.error("Error adding block:", error)
      toast({
        title: "Transaction Failed",
        description: error.response?.data?.message || "Failed to add transaction",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const saveFarmerData = async (data: any) => {
    try {
      setLoading(true)

      const savedFarmer = await farmerApi.createFarmer({
        farmerId: data.id,
        name: data.name,
        address: data.address,
        cropName: data.cropName,
        cropPrice: Number.parseFloat(data.cropPrice),
      })

      setFarmerData(savedFarmer)

      toast({
        title: "Farmer Data Saved",
        description: "Farmer information has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving farmer data:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save farmer data",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const saveCustomerData = async (data: any) => {
    try {
      setLoading(true)

      const savedCustomer = await customerApi.createCustomer({
        customerId: data.id,
        name: data.name,
        email: data.email,
        location: data.location,
        tradeLicense: data.tradeLicense,
      })

      setCustomerData(savedCustomer)

      toast({
        title: "Customer Data Saved",
        description: "Customer information has been saved successfully.",
      })
    } catch (error) {
      console.error("Error saving customer data:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to save customer data",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const addEquipment = async (data: any) => {
    try {
      setLoading(true)

      const savedEquipment = await equipmentApi.createEquipment(data)

      setEquipmentData([...equipmentData, savedEquipment])

      toast({
        title: "Equipment Added",
        description: "Equipment information has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding equipment:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add equipment",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  const addProduct = async (data: any) => {
    try {
      setLoading(true)

      const savedProduct = await productApi.createProduct(data)

      setProducts([...products, savedProduct])

      toast({
        title: "Product Added",
        description: "Product has been added successfully.",
      })
    } catch (error) {
      console.error("Error adding product:", error)
      toast({
        title: "Error",
        description: error.response?.data?.message || "Failed to add product",
        variant: "destructive",
      })
      throw error
    } finally {
      setLoading(false)
    }
  }

  return (
    <BlockchainContext.Provider
      value={{
        blocks,
        addBlock,
        farmerData,
        saveFarmerData,
        customerData,
        saveCustomerData,
        equipmentData,
        addEquipment,
        products,
        addProduct,
        loading,
      }}
    >
      {children}
    </BlockchainContext.Provider>
  )
}

