"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useBlockchain } from "@/context/BlockchainContext"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

type Product = {
  id: string
  name: string
  price: number
  category: string
}

const TransactionForm = () => {
  const { addBlock, farmerData } = useBlockchain()
  const [sender, setSender] = useState("")
  const [receiver, setReceiver] = useState("")
  const [amount, setAmount] = useState("")
  const [selectedProduct, setSelectedProduct] = useState("")
  const [products, setProducts] = useState<Product[]>([])

  // Sample products - in a real app, these would come from an API or context
  useEffect(() => {
    const sampleProducts: Product[] = [
      { id: "1", name: "Rice", price: 25, category: "Grain" },
      { id: "2", name: "Wheat", price: 20, category: "Grain" },
      { id: "3", name: "Potatoes", price: 15, category: "Vegetable" },
      { id: "4", name: "Tomatoes", price: 10, category: "Vegetable" },
      { id: "5", name: "Apples", price: 30, category: "Fruit" },
    ]

    // Add farmer's crop if available
    if (farmerData?.cropName) {
      sampleProducts.push({
        id: "farmer-1",
        name: farmerData.cropName,
        price: Number.parseInt(farmerData.cropPrice) || 0,
        category: "Farmer Product",
      })
    }

    setProducts(sampleProducts)
  }, [farmerData])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!sender || !receiver || !amount || !selectedProduct) {
      alert("Please fill all fields")
      return
    }

    const product = products.find((p) => p.id === selectedProduct)
    const productInfo = product ? `${product.name} (${product.category})` : ""

    addBlock(sender, receiver, Number.parseInt(amount), selectedProduct, productInfo)

    // Clear form
    setSender("")
    setReceiver("")
    setAmount("")
    setSelectedProduct("")
  }

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardHeader>
        <CardTitle className="text-center text-2xl text-agri-green">Blockchain Transaction</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="sender">Sender</Label>
            <Input
              id="sender"
              value={sender}
              onChange={(e) => setSender(e.target.value)}
              placeholder="Enter sender name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="receiver">Receiver</Label>
            <Input
              id="receiver"
              value={receiver}
              onChange={(e) => setReceiver(e.target.value)}
              placeholder="Enter receiver name"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="product">Product</Label>
            <Select value={selectedProduct} onValueChange={setSelectedProduct}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {products.map((product) => (
                  <SelectItem key={product.id} value={product.id}>
                    {product.name} - ${product.price} ({product.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input
              id="amount"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              required
            />
          </div>

          <Button type="submit" className="w-full bg-agri-green hover:bg-agri-dark-green">
            Submit Transaction
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}

export default TransactionForm

