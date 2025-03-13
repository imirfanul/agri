import MainLayout from "@/components/MainLayout"
import { useBlockchain } from "@/context/BlockchainContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const Farmer = () => {
  const { farmerData } = useBlockchain()

  // Sample farm data for the table
  const sampleFarmers = [
    {
      name: "John Doe",
      id: "F123",
      email: "johndoe@example.com",
      address: "123 Farm Road",
      crops: "Rice",
      available: "500kg",
    },
    {
      name: "Jane Smith",
      id: "F124",
      email: "janesmith@example.com",
      address: "456 Greenfield",
      crops: "Wheat",
      available: "600kg",
    },
    {
      name: "David Brown",
      id: "F125",
      email: "davidbrown@example.com",
      address: "789 Orchard St.",
      crops: "Potatoes",
      available: "300kg",
    },
    {
      name: "Maria Garcia",
      id: "F126",
      email: "mariagarcia@example.com",
      address: "101 Vineyard Ave",
      crops: "Grapes",
      available: "250kg",
    },
    {
      name: "Robert Chen",
      id: "F127",
      email: "robertchen@example.com",
      address: "202 Corn Field",
      crops: "Corn",
      available: "800kg",
    },
  ]

  return (
    <MainLayout>
      <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-agri-green mb-8 mt-8">Farmer Information</h1>

          {farmerData && (
            <Card className="shadow-md mb-10 max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-agri-green">Your Farmer Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-600">Farmer Name:</h3>
                  <p className="text-lg">{farmerData.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Farmer ID:</h3>
                  <p className="text-lg">{farmerData.id}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Farmer Address:</h3>
                  <p className="text-lg">{farmerData.address}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Crop Name:</h3>
                  <p className="text-lg">{farmerData.cropName}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Crop Price:</h3>
                  <p className="text-lg">{farmerData.cropPrice}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-agri-green">Farmer Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>List of registered farmers in the system</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Farmer Name</TableHead>
                      <TableHead>Farmer ID</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Address</TableHead>
                      <TableHead>Crops Item</TableHead>
                      <TableHead>Available Crops</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleFarmers.map((farmer, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{farmer.name}</TableCell>
                        <TableCell>{farmer.id}</TableCell>
                        <TableCell>{farmer.email}</TableCell>
                        <TableCell>{farmer.address}</TableCell>
                        <TableCell>{farmer.crops}</TableCell>
                        <TableCell>{farmer.available}</TableCell>
                      </TableRow>
                    ))}
                    {farmerData && (
                      <TableRow className="bg-agri-green/10">
                        <TableCell className="font-medium">{farmerData.name}</TableCell>
                        <TableCell>{farmerData.id}</TableCell>
                        <TableCell>-</TableCell>
                        <TableCell>{farmerData.address}</TableCell>
                        <TableCell>{farmerData.cropName}</TableCell>
                        <TableCell>Just Added</TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </MainLayout>
  )
}

export default Farmer

