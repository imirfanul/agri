const mongoose = require("mongoose")

const blockSchema = mongoose.Schema(
  {
    blockId: {
      type: String,
      required: true,
    },
    sender: {
      type: String,
      required: true,
    },
    receiver: {
      type: String,
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    productId: {
      type: String,
    },
    productInfo: {
      type: String,
    },
    previousHash: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
    hash: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Block = mongoose.model("Block", blockSchema)

module.exports = Block

