import MainLayout from "@/components/MainLayout"
import { useBlockchain } from "@/context/BlockchainContext"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const Customer = () => {
  const { customerData } = useBlockchain()

  // Sample customer data for the table
  const sampleCustomers = [
    {
      name: "Michael Johnson",
      id: "C001",
      email: "michaelj@example.com",
      location: "New York",
      tradeLicense: "TL001",
    },
    {
      name: "Susan Williams",
      id: "C002",
      email: "susanw@example.com",
      location: "California",
      tradeLicense: "TL002",
    },
    {
      name: "Thomas Anderson",
      id: "C003",
      email: "tanderson@example.com",
      location: "Texas",
      tradeLicense: "TL003",
    },
    {
      name: "Emily Davis",
      id: "C004",
      email: "emilyd@example.com",
      location: "Florida",
      tradeLicense: "TL004",
    },
    {
      name: "James Wilson",
      id: "C005",
      email: "jamesw@example.com",
      location: "Washington",
      tradeLicense: "TL005",
    },
  ]

  return (
    <MainLayout>
      <div className="min-h-screen pt-20 pb-10 bg-gradient-to-b from-white to-gray-100">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold text-center text-agri-green mb-8 mt-8">Customer Information</h1>

          {customerData && (
            <Card className="shadow-md mb-10 max-w-3xl mx-auto">
              <CardHeader>
                <CardTitle className="text-2xl text-agri-green">Your Customer Profile</CardTitle>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-600">Customer Name:</h3>
                  <p className="text-lg">{customerData.name}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Customer ID:</h3>
                  <p className="text-lg">{customerData.id}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Customer Email:</h3>
                  <p className="text-lg">{customerData.email}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Customer Location:</h3>
                  <p className="text-lg">{customerData.location}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-600">Trade License:</h3>
                  <p className="text-lg">{customerData.tradeLicense}</p>
                </div>
              </CardContent>
            </Card>
          )}

          <div className="mt-8">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-2xl text-agri-green">Customer Directory</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableCaption>List of registered customers in the system</TableCaption>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer Name</TableHead>
                      <TableHead>Customer ID</TableHead>
                      <TableHead>Customer Email</TableHead>
                      <TableHead>Customer Location</TableHead>
                      <TableHead>Trade License</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {sampleCustomers.map((customer, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{customer.name}</TableCell>
                        <TableCell>{customer.id}</TableCell>
                        <TableCell>{customer.email}</TableCell>
                        <TableCell>{customer.location}</TableCell>
                        <TableCell>{customer.tradeLicense}</TableCell>
                      </TableRow>
                    ))}
                    {customerData && (
                      <TableRow className="bg-agri-green/10">
                        <TableCell className="font-medium">{customerData.name}</TableCell>
                        <TableCell>{customerData.id}</TableCell>
                        <TableCell>{customerData.email}</TableCell>
                        <TableCell>{customerData.location}</TableCell>
                        <TableCell>{customerData.tradeLicense}</TableCell>
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

export default Customer

