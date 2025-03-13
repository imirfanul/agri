const Farmer = require("../models/Farmer")
const User = require("../models/User")

// @desc    Create a farmer
// @route   POST /api/farmers
// @access  Private
const createFarmer = async (req, res) => {
  const { farmerId, name, address, cropName, cropPrice } = req.body

  const farmerExists = await Farmer.findOne({ farmerId })

  if (farmerExists) {
    res.status(400)
    throw new Error("Farmer ID already exists")
  }

  const farmer = await Farmer.create({
    user: req.user._id,
    farmerId,
    name,
    address,
    cropName,
    cropPrice,
  })

  if (farmer) {
    // Update user role to farmer
    await User.findByIdAndUpdate(req.user._id, { role: "farmer" })

    res.status(201).json(farmer)
  } else {
    res.status(400)
    throw new Error("Invalid farmer data")
  }
}

// @desc    Get all farmers
// @route   GET /api/farmers
// @access  Public
const getFarmers = async (req, res) => {
  const farmers = await Farmer.find({})
  res.json(farmers)
}

// @desc    Get farmer by ID
// @route   GET /api/farmers/:id
// @access  Public
const getFarmerById = async (req, res) => {
  const farmer = await Farmer.findById(req.params.id)

  if (farmer) {
    res.json(farmer)
  } else {
    res.status(404)
    throw new Error("Farmer not found")
  }
}

// @desc    Update farmer
// @route   PUT /api/farmers/:id
// @access  Private
const updateFarmer = async (req, res) => {
  const farmer = await Farmer.findById(req.params.id)

  if (farmer) {
    // Check if user is the farmer or an admin
    if (farmer.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized")
    }

    farmer.name = req.body.name || farmer.name
    farmer.address = req.body.address || farmer.address
    farmer.cropName = req.body.cropName || farmer.cropName
    farmer.cropPrice = req.body.cropPrice || farmer.cropPrice

    const updatedFarmer = await farmer.save()
    res.json(updatedFarmer)
  } else {
    res.status(404)
    throw new Error("Farmer not found")
  }
}

// @desc    Delete farmer
// @route   DELETE /api/farmers/:id
// @access  Private/Admin
const deleteFarmer = async (req, res) => {
  const farmer = await Farmer.findById(req.params.id)

  if (farmer) {
    await farmer.remove()
    res.json({ message: "Farmer removed" })
  } else {
    res.status(404)
    throw new Error("Farmer not found")
  }
}

module.exports = {
  createFarmer,
  getFarmers,
  getFarmerById,
  updateFarmer,
  deleteFarmer,
}

