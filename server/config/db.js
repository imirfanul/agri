const mongoose = require("mongoose")

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    return conn
  } catch (error) {
    console.error(`Error: ${error.message}`)
    // Don't exit the process in production, just log the error
    if (process.env.NODE_ENV !== "production") {
      process.exit(1)
    }
    throw error
  }
}

module.exports = connectDB

