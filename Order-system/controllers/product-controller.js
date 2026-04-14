const asyncHandler = require("../config/catchAsyncError");
const ApiError = require("../config/error");
const Product = require("../models/product-model");

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, inStock } = req.body;

  if (!name || !price || !category || !inStock) {
    throw new ApiError("all fields are required !", 400);
  }
  const newProduct = await Product.create({ name, price, category, inStock });
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct,
  });
});

module.exports = createProduct;
