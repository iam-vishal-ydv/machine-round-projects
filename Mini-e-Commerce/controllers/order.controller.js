const apiError = require("../utils/error");
const asyncHandler = require("../config/asyncHandler");
const {
  createOrderService,
  myOrderService,
  fetchOrderByIdService,
  updateStatusService,
  orderStatsService,
} = require("../services/order.service");

const createOrder = asyncHandler(async (req, res) => {
  const user = req.user;
  const { products } = req.body;
  if (!products && !products.length > 0) {
    throw new apiError("Product is required", 400);
  }

  const useService = await createOrderService(user._id, products);
  res.status(201).json({
    sucess: true,
    message: "Order create successfully",
    data: useService,
  });
});

const myOrder = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const useService = await myOrderService(userId);
  res.status(200).json({
    sucess: true,
    message: "Fetch my order",
    data: useService,
  });
});
const fecthOrderById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  console.log(id);
  const userId = req.user._id;
  if (!id) {
    throw new apiError("Id is missing", 400);
  }

  const useService = await fetchOrderByIdService(userId, id);

  res.status(200).json({
    success: true,
    message: "fetch single order successfully",
    data: useService,
  });
});
const updateDateOrderStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  if (!status) {
    throw new apiError("status is required", 400);
  }
  const useService = await updateStatusService(id, status);
  res.status(200).json({
    sucess: true,
    message: "Status updated sucess fully",
    data: useService,
  });
});
const orderStats = asyncHandler(async (req, res) => {
  const useService = await orderStatsService();
  res.status(200).json({
    sucess: true,
    message: "Stats fetch successfully",
    data: useService,
  });
});

module.exports = {
  createOrder,
  myOrder,
  fecthOrderById,
  updateDateOrderStatus,
  orderStats,
};
