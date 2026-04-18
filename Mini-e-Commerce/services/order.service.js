const Order = require("../models/order.model");
const Product = require("../models/product.model");
const apiError = require("../utils/error");
const mongoose = require("mongoose");
const User = require("../models/user.model");

const createOrderService = async (userId, products) => {
  if (!userId) {
    throw new apiError("userId  is required");
  }
  const productIds = products.map((pro) => pro.productId);
  const getProductFromDB = await Product.find({
    _id: {
      $in: [productIds],
    },
  });
  let totalAmount = 0;
  const productMap = new Map();
  getProductFromDB.forEach((pro) => productMap.set(pro._id.toString(), pro));
  for (const ele of products) {
    if (!ele.productId || !ele.quantity) {
      throw new apiError("All fields are required!", 400);
    }
    let pro = productMap.get(ele.productId.toString());
    if (!pro) {
      throw new apiError("Product not found!", 404);
    }

    totalAmount += pro.price * ele.quantity;
  }
  const create = await Order.create({ userId, products, totalAmount });
  return create;
};

const myOrderService = async (userId) => {
  if (!userId) {
    throw new apiError("id is required", 400);
  }

  const orders = await Order.find({ userId })
    .populate("userId", "username email -_id ")
    .populate("products.productId", "name category price -_id ");

  if (!orders.length) {
    throw new apiError("Order not found", 404);
  }

  return orders;
};

const fetchOrderByIdService = async (userId, id) => {
  const orders = await Order.findOne({
    _id: id,
    userId,
  })
    .populate("userId", "username email -_id")
    .populate("products.productId", "name category price -_id ");

  if (orders === null) {
    throw new apiError("Order not found", 404);
  }
  return orders;
};

const updateStatusService = async (id, status) => {
  console.log(status, "status");
  console.log(id, "id");
  const updateStatus = await Order.findByIdAndUpdate(
    id,
    { status },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!updateStatus) {
    throw new apiError("Order not found", 404);
  }
  return updateStatus;
};
const orderStatsService = async () => {
  const [totalUsers, totalProducts, totalOrders, totalRevenue] =
    await Promise.all([
      User.countDocuments(),
      Product.countDocuments(),
      Order.countDocuments(),
      Order.aggregate([
        {
          $group: {
            _id: null,
            totalRevenue: { $sum: "$totalAmount" },
          },
        },
      ]),
    ]);
  console.log();
  return {
    totalUsers,
    totalProducts,
    totalOrders,
    totalRevenue: totalRevenue[0].totalRevenue,
  };
};

module.exports = {
  createOrderService,
  myOrderService,
  fetchOrderByIdService,
  updateStatusService,
  orderStatsService,
};
