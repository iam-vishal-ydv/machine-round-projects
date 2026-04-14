const express = require("express");
const createProduct = require("../controllers/product-controller");

const router = express.Router();

router.post("/products", createProduct);

module.exports = router;
