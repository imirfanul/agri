const mongoose = require("mongoose")

const farmerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    farmerId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    cropName: {
      type: String,
      required: true,
    },
    cropPrice: {
      type: Number,
      required: true,
    },
    crops: [
      {
        name: String,
        quantity: Number,
        price: Number,
        available: Boolean,
      },
    ],
  },
  {
    timestamps: true,
  },
)

const Farmer = mongoose.model("Farmer", farmerSchema)

module.exports = Farmer

