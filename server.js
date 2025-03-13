const express = require("express")
const cors = require("cors")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const path = require("path")

// Load environment variables
dotenv.config()

// Routes
let userRoutes, farmerRoutes, customerRoutes, equipmentRoutes, blockchainRoutes, productRoutes
let errorMiddleware

// Initialize Express app
const app = express()

// Middleware
app.use(express.json())
app.use(cors())

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "AgriChain API is running" })
})

// Connect to MongoDB and initialize routes
const connectDB = async () => {
  try {
    // Only import these after we know we can connect to MongoDB
    // This helps with Vercel's cold starts
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${mongoose.connection.host}`)

    // Import routes after successful connection
    userRoutes = require("./server/routes/userRoutes")
    farmerRoutes = require("./server/routes/farmerRoutes")
    customerRoutes = require("./server/routes/customerRoutes")
    equipmentRoutes = require("./server/routes/equipmentRoutes")
    blockchainRoutes = require("./server/routes/blockchainRoutes")
    productRoutes = require("./server/routes/productRoutes")

    // Import error middleware
    errorMiddleware = require("./server/middleware/errorMiddleware")

    // API Routes
    app.use("/api/users", userRoutes)
    app.use("/api/farmers", farmerRoutes)
    app.use("/api/customers", customerRoutes)
    app.use("/api/equipments", equipmentRoutes)
    app.use("/api/blockchain", blockchainRoutes)
    app.use("/api/products", productRoutes)

    // Error Handling Middleware
    app.use(errorMiddleware.notFound)
    app.use(errorMiddleware.errorHandler)
  } catch (error) {
    console.error(`Error: ${error.message}`)
    // Don't exit the process in production, just log the error
    if (process.env.NODE_ENV !== "production") {
      process.exit(1)
    }
  }
}

// Connect to database
connectDB()

// Serve static assets in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("dist"))

  app.get("*", (req, res) => {
    // Don't serve the frontend for API routes
    if (req.path.startsWith("/api/")) {
      return res.status(404).json({ message: "API endpoint not found" })
    }
    res.sendFile(path.resolve(__dirname, "dist", "index.html"))
  })
}

// For local development
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 5000
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

// Export for Vercel
module.exports = app

