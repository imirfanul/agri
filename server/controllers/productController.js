const Product = require("../models/Product")
const Farmer = require("../models/Farmer")

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Farmer
const createProduct = async (req, res) => {
  const { name, price, category, description, quantity, image } = req.body

  // Check if user is a farmer
  const farmer = await Farmer.findOne({ user: req.user._id })

  if (!farmer && req.user.role !== "admin") {
    res.status(401)
    throw new Error("Only farmers can add products")
  }

  const product = await Product.create({
    name,
    price,
    category,
    description,
    quantity,
    image,
    farmer: farmer ? farmer._id : null,
  })

  if (product) {
    res.status(201).json(product)
  } else {
    res.status(400)
    throw new Error("Invalid product data")
  }
}

// @desc    Get all products
// @route   GET /api/products
// @access  Public
const getProducts = async (req, res) => {
  const products = await Product.find({}).populate("farmer", "name")
  res.json(products)
}

// @desc    Get product by ID
// @route   GET /api/products/:id
// @access  Public
const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id).populate("farmer", "name")

  if (product) {
    res.json(product)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
}

// @desc    Update product
// @route   PUT /api/products/:id
// @access  Private/Farmer
const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    // Check if user is the farmer who created the product or an admin
    const farmer = await Farmer.findOne({ user: req.user._id })

    if ((!farmer || product.farmer.toString() !== farmer._id.toString()) && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized")
    }

    product.name = req.body.name || product.name
    product.price = req.body.price || product.price
    product.category = req.body.category || product.category
    product.description = req.body.description || product.description
    product.quantity = req.body.quantity || product.quantity
    product.image = req.body.image || product.image

    const updatedProduct = await product.save()
    res.json(updatedProduct)
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
}

// @desc    Delete product
// @route   DELETE /api/products/:id
// @access  Private/Farmer/Admin
const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id)

  if (product) {
    // Check if user is the farmer who created the product or an admin
    const farmer = await Farmer.findOne({ user: req.user._id })

    if ((!farmer || product.farmer.toString() !== farmer._id.toString()) && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized")
    }

    await product.remove()
    res.json({ message: "Product removed" })
  } else {
    res.status(404)
    throw new Error("Product not found")
  }
}

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
}

