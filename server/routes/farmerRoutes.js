const express = require("express")
const router = express.Router()
const {
  createFarmer,
  getFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
} = require("../controllers/farmerController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route("/").get(getFarmers).post(protect, createFarmer)
router.route("/:id").get(getFarmerById).put(protect, updateFarmer).delete(protect, admin, deleteFarmer)

module.exports = router

