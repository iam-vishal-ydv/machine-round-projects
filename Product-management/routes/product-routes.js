const express = require("express");
const {
  createProduct,
  fetchAllProducts,
} = require("../controllers/product-controller");

const router = express.Router();

router.post("/products", createProduct);
router.get("/products", fetchAllProducts);

module.exports = router;
