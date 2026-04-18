const Product = require("../models/product.model");
const apiError = require("../utils/error");

const createProductService = async (name, category, price, isStock) => {
  const newProduct = await Product.create({ name, category, price, isStock });
  return newProduct;
};
const updateProductService = async (id, body) => {
  const updateProduct = await Product.findByIdAndUpdate(id, body, {
    new: true,
    runValidators: true,
  });
  if (!updateProduct) {
    throw new apiError("Product not found", 404);
  }
  return updateProduct;
};
const deleteProductServiece = async (id) => {
  const deleteFromDB = await Product.findByIdAndDelete(id);
  if (!deleteFromDB) {
    throw new apiError("Product not found", 404);
  }
  return deleteFromDB;
};
const getAllProductService = async () => {
  const getFromDB = await Product.find({});
  return getFromDB;
};

module.exports = {
  createProductService,
  updateProductService,
  getAllProductService,
  deleteProductServiece,
};
