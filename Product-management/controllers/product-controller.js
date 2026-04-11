const asyncHandler = require("../middleware/catchAsyncError");
const Product = require("../models/product-model");
const ApiError = require("../utils/error-class");

const createProduct = asyncHandler(async (req, res) => {
  const { name, price, category, inStock } = req.body;

  if (!name || !price || !category || !inStock) {
    throw ApiError("all fields are required !", 400);
  }
  const newProduct = await Product.create({ name, price, category, inStock });
  res.status(201).json({
    success: true,
    message: "Product created successfully",
    data: newProduct,
  });
});

const fetchAllProducts = asyncHandler(async (req, res) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const sort = req.query.sort || "createdAt";
  const { search, category, inStock } = req.query;

  const query = {};
  if (category) query.category = category;
  if (inStock !== undefined) {
    query.inStock = inStock === "true";
  }

  if (search && search.trim() !== "") {
    query.name = { $regex: search, $options: "i" };
  }
  const skip = (page - 1) * limit;
  const total = await Product.countDocuments(query);
  const totalPages = Math.ceil(total / limit);
  const fetchProduct = await Product.find(query)
    .skip(skip)
    .limit(limit)
    .sort(sort);

  res.status(200).json({
    success: true,
    message:
      ~fetchProduct.length === 0
        ? "There is no product"
        : "Fetch all products successfully",
    count: fetchProduct.length,
    total,
    page,
    pages: totalPages,
    data: fetchProduct,
  });
});

module.exports = {
  createProduct,
  fetchAllProducts,
};
