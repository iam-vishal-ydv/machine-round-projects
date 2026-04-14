const asyncHandler = require("../config/catchAsyncError");
const ApiError = require("../config/error");
const Product = require("../models/product-model");
const Order = require("../models/order.model");

const createOrder = asyncHandler(async (req, res) => {
  const { userId, product } = req.body;
  if (!userId || product.length == 0) {
    throw new ApiError("All feilds are required !", 400);
  }
  let totalAmount = 0;
  let productIds = product.map((pro) => pro.productId);
  const productsFromDB = await Product.find({
    _id: { $in: productIds },
  });
  const productMap = new Map();
  productsFromDB.forEach((p) => {
    productMap.set(p._id.toString(), p);
  });

  for (const ele of product) {
    if (!ele.productId || !ele.quantity) {
      throw new ApiError("All fields are required!", 400);
    }

    const pro = productMap.get(ele.productId.toString());

    if (!pro) {
      throw new ApiError("Product not found!", 404);
    }

    totalAmount += pro.price * ele.quantity;
  }

  const newOrder = await Order.create({
    userId,
    product,
    totalAmount,
  });
  res.status(201).json({
    success: true,
    message: "Order create successfully",
    data: newOrder,
  });
});

const fetchMyorder = asyncHandler(async (req, res) => {
  const userId = req.userId;

  const userOrder = await Order.find({ userId })
    .populate("userId", "username email -_id")
    .populate("product.productId", "name price -_id");
  res.status(200).json({
    success: true,
    message: "fecth order successfully",
    data: userOrder,
  });
});

const fetchSingleOrder = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userId = req.userId;
  if (!id) {
    throw new ApiError("Id is required");
  }
  const fetchOrder = await Order.findOne({
    _id: id,
    userId,
  })
    .populate("userId", "username email -_id")
    .populate("product.productId", "name price -_id");

  res.status(200).json({
    success: true,
    message: "Order fetch successfully",
    data: fetchOrder,
  });
});

const ordersStats = asyncHandler(async (req, res) => {
  const stats = await Order.aggregate([
    {
      $group: {
        _id: null,
        totalOrder: { $sum: 1 },
        TotalRevenue: { $sum: "$totalAmount" },
        avgOrder: { $avg: "$totalAmount" },
      },
    },
    {
      $project: {
        _id: 0,
        totalOrder: 1,
        TotalRevenue: 1,
        avgOrder: 1,
      },
    },
  ]);
  res.status(200).json({
    succes: true,
    message: "Stats fetch successfully",
    data: stats,
  });
});

module.exports = {
  createOrder,
  fetchMyorder,
  fetchSingleOrder,
  ordersStats,
};
