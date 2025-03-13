const mongoose = require("mongoose")

const customerSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    customerId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    tradeLicense: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Customer = mongoose.model("Customer", customerSchema)

module.exports = Customer

