const express = require("express")
const router = express.Router()
const { createBlock, getBlocks, getBlockById, verifyBlockchain } = require("../controllers/blockchainController")
const { protect } = require("../middleware/authMiddleware")

router.route("/").get(getBlocks).post(protect, createBlock)
router.route("/verify").get(verifyBlockchain)
router.route("/:id").get(getBlockById)

module.exports = router

