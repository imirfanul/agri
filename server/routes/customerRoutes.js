const express = require("express")
const router = express.Router()
const {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} = require("../controllers/customerController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route("/").get(getCustomers).post(protect, createCustomer)
router.route("/:id").get(getCustomerById).put(protect, updateCustomer).delete(protect, admin, deleteCustomer)

module.exports = router

