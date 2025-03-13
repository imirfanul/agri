const Equipment = require("../models/Equipment")

// @desc    Create equipment
// @route   POST /api/equipments
// @access  Private
const createEquipment = async (req, res) => {
  const { shopName, availableEquip, fertilizer, tradeLicense, shopLocation, image } = req.body

  const equipment = await Equipment.create({
    shopName,
    availableEquip,
    fertilizer,
    tradeLicense,
    shopLocation,
    image,
  })

  if (equipment) {
    res.status(201).json(equipment)
  } else {
    res.status(400)
    throw new Error("Invalid equipment data")
  }
}

// @desc    Get all equipment
// @route   GET /api/equipments
// @access  Public
const getEquipments = async (req, res) => {
  const equipments = await Equipment.find({})
  res.json(equipments)
}

// @desc    Get equipment by ID
// @route   GET /api/equipments/:id
// @access  Public
const getEquipmentById = async (req, res) => {
  const equipment = await Equipment.findById(req.params.id)

  if (equipment) {
    res.json(equipment)
  } else {
    res.status(404)
    throw new Error("Equipment not found")
  }
}

// @desc    Update equipment
// @route   PUT /api/equipments/:id
// @access  Private/Admin
const updateEquipment = async (req, res) => {
  const equipment = await Equipment.findById(req.params.id)

  if (equipment) {
    equipment.shopName = req.body.shopName || equipment.shopName
    equipment.availableEquip = req.body.availableEquip || equipment.availableEquip
    equipment.fertilizer = req.body.fertilizer || equipment.fertilizer
    equipment.tradeLicense = req.body.tradeLicense || equipment.tradeLicense
    equipment.shopLocation = req.body.shopLocation || equipment.shopLocation
    equipment.image = req.body.image || equipment.image

    const updatedEquipment = await equipment.save()
    res.json(updatedEquipment)
  } else {
    res.status(404)
    throw new Error("Equipment not found")
  }
}

// @desc    Delete equipment
// @route   DELETE /api/equipments/:id
// @access  Private/Admin
const deleteEquipment = async (req, res) => {
  const equipment = await Equipment.findById(req.params.id)

  if (equipment) {
    await equipment.remove()
    res.json({ message: "Equipment removed" })
  } else {
    res.status(404)
    throw new Error("Equipment not found")
  }
}

module.exports = {
  createEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
}

