const express = require("express");
const {
  createProductController,
  updateProductController,
  getAllProduct,
  deleteProduct,
} = require("../controllers/product.controller");
const authMiddleware = require("../middlewares/auth-middleware");
const adminMiddleware = require("../middlewares/isAdmin-middleware");
const validateObjectId = require("../middlewares/check-id-middleware");
const router = express.Router();

router.post(
  "/admin/products",
  authMiddleware,
  adminMiddleware,

  createProductController,
);

router.put(
  "/admin/products/:id",
  authMiddleware,
  adminMiddleware,
  validateObjectId,
  updateProductController,
);

router.delete(
  "/admin/products/:id",
  authMiddleware,
  adminMiddleware,
  validateObjectId,
  deleteProduct,
);

router.get("/products", getAllProduct);
module.exports = router;
