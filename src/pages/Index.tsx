"use client"

import { useState } from "react"
import MainLayout from "@/components/MainLayout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useBlockchain } from "@/context/BlockchainContext"
import TransactionForm from "@/components/TransactionForm"
import BlockchainDisplay from "@/components/BlockchainDisplay"

const Index = () => {
  const { saveFarmerData, saveCustomerData } = useBlockchain()

  // Farmer form state
  const [farmerName, setFarmerName] = useState("")
  const [farmerId, setFarmerId] = useState("")
  const [farmerAddress, setFarmerAddress] = useState("")
  const [cropName, setCropName] = useState("")
  const [cropPrice, setCropPrice] = useState("")

  // Customer form state
  const [customerName, setCustomerName] = useState("")
  const [customerId, setCustomerId] = useState("")
  const [customerEmail, setCustomerEmail] = useState("")
  const [customerLocation, setCustomerLocation] = useState("")
  const [tradeLicense, setTradeLicense] = useState("")

  const handleSaveFarmerData = () => {
    if (!farmerName || !farmerId || !farmerAddress || !cropName || !cropPrice) {
      alert("Please fill all fields in the farmer form")
      return
    }

    saveFarmerData({
      name: farmerName,
      id: farmerId,
      address: farmerAddress,
      cropName,
      cropPrice,
    })

    // Clear form
    setFarmerName("")
    setFarmerId("")
    setFarmerAddress("")
    setCropName("")
    setCropPrice("")
  }

  const handleSaveCustomerData = () => {
    if (!customerName || !customerId || !customerEmail || !customerLocation || !tradeLicense) {
      alert("Please fill all fields in the customer form")
      return
    }

    saveCustomerData({
      name: customerName,
      id: customerId,
      email: customerEmail,
      location: customerLocation,
      tradeLicense,
    })

    // Clear form
    setCustomerName("")
    setCustomerId("")
    setCustomerEmail("")
    setCustomerLocation("")
    setTradeLicense("")
  }

  return (
    <MainLayout>
      <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-agri-green mb-8 mt-8">Blockchain in Agriculture</h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {/* Farmer Registration Form */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-agri-green">Farmer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="farmerName">Farmer Name</Label>
                  <Input
                    id="farmerName"
                    value={farmerName}
                    onChange={(e) => setFarmerName(e.target.value)}
                    placeholder="Enter farmer name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmerId">Farmer ID</Label>
                  <Input
                    id="farmerId"
                    value={farmerId}
                    onChange={(e) => setFarmerId(e.target.value)}
                    placeholder="Enter farmer ID"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="farmerAddress">Farmer Address</Label>
                  <Input
                    id="farmerAddress"
                    value={farmerAddress}
                    onChange={(e) => setFarmerAddress(e.target.value)}
                    placeholder="Enter farmer address"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropName">Crop Name</Label>
                  <Input
                    id="cropName"
                    value={cropName}
                    onChange={(e) => setCropName(e.target.value)}
                    placeholder="Enter crop name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="cropPrice">Crop Price</Label>
                  <Input
                    id="cropPrice"
                    value={cropPrice}
                    onChange={(e) => setCropPrice(e.target.value)}
                    placeholder="Enter crop price"
                    required
                  />
                </div>

                <Button className="w-full bg-agri-green hover:bg-agri-dark-green" onClick={handleSaveFarmerData}>
                  Save Farmer Information
                </Button>
              </CardContent>
            </Card>

            {/* Customer Registration Form */}
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-agri-green">Customer Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="customerName">Customer Name</Label>
                  <Input
                    id="customerName"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    placeholder="Enter customer name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerId">Customer ID</Label>
                  <Input
                    id="customerId"
                    value={customerId}
                    onChange={(e) => setCustomerId(e.target.value)}
                    placeholder="Enter customer ID"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerEmail">Customer Email</Label>
                  <Input
                    id="customerEmail"
                    type="email"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    placeholder="Enter customer email"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="customerLocation">Customer Location</Label>
                  <Input
                    id="customerLocation"
                    value={customerLocation}
                    onChange={(e) => setCustomerLocation(e.target.value)}
                    placeholder="Enter customer location"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="tradeLicense">Trade License</Label>
                  <Input
                    id="tradeLicense"
                    value={tradeLicense}
                    onChange={(e) => setTradeLicense(e.target.value)}
                    placeholder="Enter trade license"
                    required
                  />
                </div>

                <Button className="w-full bg-agri-green hover:bg-agri-dark-green" onClick={handleSaveCustomerData}>
                  Save Customer Information
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Transaction Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 max-w-5xl mx-auto">
            <TransactionForm />
            <BlockchainDisplay />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Index

