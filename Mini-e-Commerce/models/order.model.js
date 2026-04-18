const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
        },
      },
    ],

    status: {
      type: String,
      default: "pending",
      enum: ["pending", "completed"],
    },
    totalAmount: {
      type: Number,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Order", orderSchema);
