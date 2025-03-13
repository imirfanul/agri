const express = require("express")
const router = express.Router()
const {
  createEquipment,
  getEquipments,
  getEquipmentById,
  updateEquipment,
  deleteEquipment,
} = require("../controllers/equipmentController")
const { protect, admin } = require("../middleware/authMiddleware")

router.route("/").get(getEquipments).post(protect, createEquipment)
router.route("/:id").get(getEquipmentById).put(protect, admin, updateEquipment).delete(protect, admin, deleteEquipment)

module.exports = router
```  admin, updateEquipment)
  .delete(protect, admin, deleteEquipment);

module.exports = router;

