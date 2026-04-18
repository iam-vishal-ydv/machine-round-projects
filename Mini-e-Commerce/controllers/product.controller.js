const asyncHandler = require("../config/asyncHandler");
const {
  createProductService,
  updateProductService,
  getAllProductService,
  deleteProductServiece,
} = require("../services/product.service");
const apiError = require("../utils/error");

const createProductController = asyncHandler(async (req, res) => {
  const { name, category, price, isStock } = req.body;

  if (!name || !category || !price || !isStock) {
    throw new apiError("All fieldls are required", 400);
  }
  const newProduct = await createProductService(name, category, price, isStock);
  res.status(201).json({
    success: true,
    message: "Create product successfully",
    data: newProduct,
  });
});
const updateProductController = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new apiError("Id is missing", 400);
  }
  const updateProduct = await updateProductService(id, req.body);

  res.status(201).json({
    success: true,
    message: "Update product  successfully",
    data: updateProduct,
  });
});

const getAllProduct = asyncHandler(async (req, res) => {
  const getFromService = await getAllProductService();
  res.status(200).json({
    success: true,
    message: "Fetch all products",
    data: getFromService,
  });
});

const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  if (!id) {
    throw new apiError("Id is missing");
  }
  const deletePro = await deleteProductServiece(id);

  res.status(204).json({
    success: true,
    message: "Product deleted",
  });
});

module.exports = {
  createProductController,
  updateProductController,
  getAllProduct,
  deleteProduct,
};
