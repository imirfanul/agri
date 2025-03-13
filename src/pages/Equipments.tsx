"use client"

import type React from "react"
import { useState, useRef } from "react"
import MainLayout from "@/components/MainLayout"
import { useBlockchain } from "@/context/BlockchainContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

const Equipments = () => {
  const { equipmentData, addEquipment } = useBlockchain()

  const [shopName, setShopName] = useState("")
  const [availableEquip, setAvailableEquip] = useState("")
  const [fertilizer, setFertilizer] = useState("")
  const [tradeLicense, setTradeLicense] = useState("")
  const [shopLocation, setShopLocation] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)

  // Sample equipment data
  const sampleEquipments = [
    {
      shopName: "Farm Tech Solutions",
      availableEquip: "Tractors, Harvesters",
      fertilizer: "Organic Compost",
      tradeLicense: "FTS001",
      shopLocation: "Chicago, IL",
      image: "https://source.unsplash.com/random/100x100/?tractor",
    },
    {
      shopName: "Green Growth Supplies",
      availableEquip: "Irrigation Systems",
      fertilizer: "NPK Fertilizer",
      tradeLicense: "GGS002",
      shopLocation: "Portland, OR",
      image: "https://source.unsplash.com/random/100x100/?irrigation",
    },
    {
      shopName: "Harvest Helper Co.",
      availableEquip: "Drones, Sensors",
      fertilizer: "Phosphate Rich",
      tradeLicense: "HHC003",
      shopLocation: "Austin, TX",
      image: "https://source.unsplash.com/random/100x100/?drone",
    },
  ]

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleAddEquipment = () => {
    if (!shopName || !availableEquip || !fertilizer || !tradeLicense || !shopLocation || !previewImage) {
      alert("Please fill all fields and add an image")
      return
    }

    addEquipment({
      shopName,
      availableEquip,
      fertilizer,
      tradeLicense,
      shopLocation,
      image: previewImage,
    })

    // Clear form
    setShopName("")
    setAvailableEquip("")
    setFertilizer("")
    setTradeLicense("")
    setShopLocation("")
    setPreviewImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <MainLayout>
      <div className="min-h-screen pt-20 pb-20 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-agri-green mb-8 mt-8">Equipment Information</h1>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Left Gallery */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-4 text-agri-green">Equipment Gallery</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                {sampleEquipments.map((equip, index) => (
                  <img
                    key={index}
                    src={equip.image}
                    alt={equip.shopName}
                    className="w-full h-28 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform"
                  />
                ))}
                {equipmentData.map((equip, index) => (
                  <img
                    key={`user-${index}`}
                    src={equip.image}
                    alt={equip.shopName}
                    className="w-full h-28 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-2">
              <Card className="shadow-md mb-8">
                <CardHeader>
                  <CardTitle className="text-2xl text-agri-green">Add New Equipment</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="shopName">Shop Name</Label>
                    <Input
                      id="shopName"
                      value={shopName}
                      onChange={(e) => setShopName(e.target.value)}
                      placeholder="Enter shop name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="availableEquip">Available Equipment</Label>
                    <Input
                      id="availableEquip"
                      value={availableEquip}
                      onChange={(e) => setAvailableEquip(e.target.value)}
                      placeholder="Enter available equipment"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="fertilizer">Available Fertilizer</Label>
                    <Input
                      id="fertilizer"
                      value={fertilizer}
                      onChange={(e) => setFertilizer(e.target.value)}
                      placeholder="Enter available fertilizer"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tradeLicense">Trade License</Label>
                    <Input
                      id="tradeLicense"
                      value={tradeLicense}
                      onChange={(e) => setTradeLicense(e.target.value)}
                      placeholder="Enter trade license"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shopLocation">Shop Location</Label>
                    <Input
                      id="shopLocation"
                      value={shopLocation}
                      onChange={(e) => setShopLocation(e.target.value)}
                      placeholder="Enter shop location"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="shopImage">Shop Image</Label>
                    <Input
                      id="shopImage"
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                    {previewImage && (
                      <div className="mt-2">
                        <img src={previewImage} alt="Preview" className="h-24 object-cover rounded-md" />
                      </div>
                    )}
                  </div>

                  <Button className="w-full bg-agri-green hover:bg-agri-dark-green" onClick={handleAddEquipment}>
                    Add Equipment
                  </Button>
                </CardContent>
              </Card>

              <Card className="shadow-md">
                <CardHeader>
                  <CardTitle className="text-2xl text-agri-green">Equipment Directory</CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableCaption>List of available equipment and supplies</TableCaption>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Shop Name</TableHead>
                        <TableHead>Equipment</TableHead>
                        <TableHead>Fertilizer</TableHead>
                        <TableHead>License</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Image</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {sampleEquipments.map((equip, index) => (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{equip.shopName}</TableCell>
                          <TableCell>{equip.availableEquip}</TableCell>
                          <TableCell>{equip.fertilizer}</TableCell>
                          <TableCell>{equip.tradeLicense}</TableCell>
                          <TableCell>{equip.shopLocation}</TableCell>
                          <TableCell>
                            <img src={equip.image} alt={equip.shopName} className="w-10 h-10 object-cover rounded-md" />
                          </TableCell>
                        </TableRow>
                      ))}
                      {equipmentData.map((equip, index) => (
                        <TableRow key={`user-${index}`} className="bg-agri-green/10">
                          <TableCell className="font-medium">{equip.shopName}</TableCell>
                          <TableCell>{equip.availableEquip}</TableCell>
                          <TableCell>{equip.fertilizer}</TableCell>
                          <TableCell>{equip.tradeLicense}</TableCell>
                          <TableCell>{equip.shopLocation}</TableCell>
                          <TableCell>
                            <img src={equip.image} alt={equip.shopName} className="w-10 h-10 object-cover rounded-md" />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Right Gallery */}
            <div className="lg:col-span-1">
              <h3 className="text-xl font-semibold mb-4 text-agri-green">Featured Equipment</h3>
              <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
                <img
                  src="https://source.unsplash.com/random/100x100/?modern-farm"
                  alt="Modern Farm"
                  className="w-full h-28 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform"
                />
                <img
                  src="https://source.unsplash.com/random/100x100/?smart-agriculture"
                  alt="Smart Agriculture"
                  className="w-full h-28 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform"
                />
                <img
                  src="https://source.unsplash.com/random/100x100/?fertilizer"
                  alt="Fertilizer"
                  className="w-full h-28 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform"
                />
                <img
                  src="https://source.unsplash.com/random/100x100/?farm-technology"
                  alt="Farm Technology"
                  className="w-full h-28 object-cover rounded-lg shadow-sm hover:scale-105 transition-transform"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Equipments

