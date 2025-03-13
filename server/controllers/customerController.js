const Customer = require("../models/Customer")
const User = require("../models/User")

// @desc    Create a customer
// @route   POST /api/customers
// @access  Private
const createCustomer = async (req, res) => {
  const { customerId, name, email, location, tradeLicense } = req.body

  const customerExists = await Customer.findOne({ customerId })

  if (customerExists) {
    res.status(400)
    throw new Error("Customer ID already exists")
  }

  const customer = await Customer.create({
    user: req.user._id,
    customerId,
    name,
    email,
    location,
    tradeLicense,
  })

  if (customer) {
    // Update user role to customer if not already
    if (req.user.role !== "admin") {
      await User.findByIdAndUpdate(req.user._id, { role: "customer" })
    }

    res.status(201).json(customer)
  } else {
    res.status(400)
    throw new Error("Invalid customer data")
  }
}

// @desc    Get all customers
// @route   GET /api/customers
// @access  Public
const getCustomers = async (req, res) => {
  const customers = await Customer.find({})
  res.json(customers)
}

// @desc    Get customer by ID
// @route   GET /api/customers/:id
// @access  Public
const getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (customer) {
    res.json(customer)
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
}

// @desc    Update customer
// @route   PUT /api/customers/:id
// @access  Private
const updateCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (customer) {
    // Check if user is the customer or an admin
    if (customer.user.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      res.status(401)
      throw new Error("Not authorized")
    }

    customer.name = req.body.name || customer.name
    customer.email = req.body.email || customer.email
    customer.location = req.body.location || customer.location
    customer.tradeLicense = req.body.tradeLicense || customer.tradeLicense

    const updatedCustomer = await customer.save()
    res.json(updatedCustomer)
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
}

// @desc    Delete customer
// @route   DELETE /api/customers/:id
// @access  Private/Admin
const deleteCustomer = async (req, res) => {
  const customer = await Customer.findById(req.params.id)

  if (customer) {
    await customer.remove()
    res.json({ message: "Customer removed" })
  } else {
    res.status(404)
    throw new Error("Customer not found")
  }
}

module.exports = {
  createCustomer,
  getCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
}

