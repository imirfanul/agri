const express = require("express")
const router = express.Router()
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController")
const { protect } = require("../middleware/authMiddleware")

router.route("/").get(getProducts).post(protect, createProduct)
router.route("/:id").get(getProductById).put(protect, updateProduct).delete(protect, deleteProduct)

module.exports = router

