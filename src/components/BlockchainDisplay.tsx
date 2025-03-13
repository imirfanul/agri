import { useBlockchain } from "@/context/BlockchainContext"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"

const BlockchainDisplay = () => {
  const { blocks } = useBlockchain()

  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold text-center mb-4">Blockchain</h2>
      <div className="space-y-4">
        {blocks.map((block) => (
          <Card key={block.id} className="border border-agri-green/30 shadow-sm">
            <CardHeader>
              <CardTitle className="text-lg text-agri-green">Block #{block.id}</CardTitle>
              <CardDescription>Timestamp: {new Date(block.timestamp).toLocaleString()}</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
              <div>
                <span className="font-semibold">Sender: </span>
                {block.sender}
              </div>
              <div>
                <span className="font-semibold">Receiver: </span>
                {block.receiver}
              </div>
              <div>
                <span className="font-semibold">Amount: </span>
                {block.amount}
              </div>
              {block.productId && (
                <div>
                  <span className="font-semibold">Product: </span>
                  {block.productInfo || block.productId}
                </div>
              )}
              <div>
                <span className="font-semibold">Previous Hash: </span>
                <span className="font-mono text-xs break-all">{block.previousHash.slice(0, 15)}...</span>
              </div>
              <div className="md:col-span-2">
                <span className="font-semibold">Hash: </span>
                <span className="font-mono text-xs break-all">{block.hash.slice(0, 30)}...</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BlockchainDisplay

