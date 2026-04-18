const express = require("express");
const {
  createOrder,
  myOrder,
  fecthOrderById,
  updateDateOrderStatus,
  orderStats,
} = require("../controllers/order.controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/isAdmin-middleware");
const validateObjectId = require("../middlewares/check-id-middleware");
const router = express.Router();
router.post("/order", authMiddleware, createOrder);
router.get("/order/my", authMiddleware, myOrder);
router.get("/order/:id", validateObjectId, authMiddleware, fecthOrderById);
router.patch(
  "/order/:id/status",
  validateObjectId,
  authMiddleware,
  adminMiddleware,
  updateDateOrderStatus,
);

router.get("/admin/stats", authMiddleware, adminMiddleware, orderStats);

module.exports = router;
