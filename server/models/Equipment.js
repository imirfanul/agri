const mongoose = require("mongoose")

const equipmentSchema = mongoose.Schema(
  {
    shopName: {
      type: String,
      required: true,
    },
    availableEquip: {
      type: String,
      required: true,
    },
    fertilizer: {
      type: String,
      required: true,
    },
    tradeLicense: {
      type: String,
      required: true,
    },
    shopLocation: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
)

const Equipment = mongoose.model("Equipment", equipmentSchema)

module.exports = Equipment

