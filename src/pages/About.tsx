import MainLayout from "@/components/MainLayout"
import { Card, CardContent } from "@/components/ui/card"

const About = () => {
  return (
    <MainLayout>
      <div className="hero-bg min-h-screen flex items-center justify-center">
        <div className="hero-content container mx-auto px-4 py-20 mt-12">
          <Card className="max-w-3xl mx-auto bg-black/70 text-white">
            <CardContent className="p-8">
              <h1 className="text-4xl font-bold mb-6 text-center text-agri-green">About Blockchain in Agriculture</h1>

              <div className="space-y-6 text-lg">
                <p>
                  Blockchain technology is revolutionizing the agriculture industry. By using secure, decentralized data
                  storage and smart contracts, we can ensure transparency, reduce fraud, and streamline the supply chain
                  in the agricultural industry. With Proof of Work (PoW) and Ethereum-based systems, the entire process
                  from farming to customer transactions can be made more efficient and trustworthy.
                </p>

                <p>
                  Our platform aims to create a fair and transparent agricultural ecosystem by leveraging blockchain
                  technology to manage farming, trade, and equipment. Whether you're a farmer, customer, or supplier,
                  our solution empowers everyone to access critical information in real-time, ensuring the best possible
                  experience for all participants.
                </p>

                <p>The benefits of using blockchain in agriculture include:</p>

                <ul className="list-disc pl-6 space-y-2">
                  <li>Complete transparency in the supply chain</li>
                  <li>Reduced fraud through immutable record-keeping</li>
                  <li>Enhanced traceability of agricultural products</li>
                  <li>Direct farmer-to-consumer connections, reducing intermediaries</li>
                  <li>Improved food safety through verified product origins</li>
                  <li>Smart contracts for automated, trustless transactions</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </MainLayout>
  )
}

export default About

