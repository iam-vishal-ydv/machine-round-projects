const express = require("express");
const {
  createOrder,
  fetchMyorder,
  fetchSingleOrder,
  ordersStats,
} = require("../controllers/order-controller");
const authMiddleware = require("../middleware/authMIddleware");

const router = express.Router();

router.post("/create", createOrder);
router.get("/my", authMiddleware, fetchMyorder);
router.get("/stats", authMiddleware, ordersStats);
router.get("/:id", authMiddleware, fetchSingleOrder);

module.exports = router;
