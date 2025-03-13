const Block = require("../models/Block")
const CryptoJS = require("crypto-js")

// Secure hash function using SHA-256
const calculateHash = (timestamp, sender, receiver, amount, previousHash, productId) => {
  const data = timestamp + sender + receiver + amount + (productId || "") + previousHash
  return CryptoJS.SHA256(data).toString()
}

// @desc    Create a new block
// @route   POST /api/blockchain
// @access  Private
const createBlock = async (req, res) => {
  const { sender, receiver, amount, productId, productInfo } = req.body

  // Get the last block
  const blocks = await Block.find({}).sort({ blockId: -1 }).limit(1)
  const lastBlock = blocks.length > 0 ? blocks[0] : null

  const blockId = lastBlock ? (Number.parseInt(lastBlock.blockId) + 1).toString() : "0"
  const previousHash = lastBlock ? lastBlock.hash : "0"
  const timestamp = new Date().toISOString()
  const hash = calculateHash(timestamp, sender, receiver, amount, previousHash, productId)

  const block = await Block.create({
    blockId,
    sender,
    receiver,
    amount,
    productId,
    productInfo,
    previousHash,
    timestamp,
    hash,
  })

  if (block) {
    res.status(201).json(block)
  } else {
    res.status(400)
    throw new Error("Invalid block data")
  }
}

// @desc    Get all blocks
// @route   GET /api/blockchain
// @access  Public
const getBlocks = async (req, res) => {
  const blocks = await Block.find({}).sort({ blockId: 1 })
  res.json(blocks)
}

// @desc    Get block by ID
// @route   GET /api/blockchain/:id
// @access  Public
const getBlockById = async (req, res) => {
  const block = await Block.findOne({ blockId: req.params.id })

  if (block) {
    res.json(block)
  } else {
    res.status(404)
    throw new Error("Block not found")
  }
}

// @desc    Verify blockchain integrity
// @route   GET /api/blockchain/verify
// @access  Public
const verifyBlockchain = async (req, res) => {
  const blocks = await Block.find({}).sort({ blockId: 1 })

  let isValid = true
  const invalidBlocks = []

  for (let i = 1; i < blocks.length; i++) {
    const currentBlock = blocks[i]
    const previousBlock = blocks[i - 1]

    // Check if previous hash matches
    if (currentBlock.previousHash !== previousBlock.hash) {
      isValid = false
      invalidBlocks.push(currentBlock.blockId)
    }

    // Recalculate hash to verify
    const calculatedHash = calculateHash(
      currentBlock.timestamp,
      currentBlock.sender,
      currentBlock.receiver,
      currentBlock.amount,
      currentBlock.previousHash,
      currentBlock.productId,
    )

    if (calculatedHash !== currentBlock.hash) {
      isValid = false
      invalidBlocks.push(currentBlock.blockId)
    }
  }

  res.json({
    isValid,
    invalidBlocks,
    message: isValid ? "Blockchain is valid" : "Blockchain has been tampered with",
  })
}

module.exports = {
  createBlock,
  getBlocks,
  getBlockById,
  verifyBlockchain,
}

