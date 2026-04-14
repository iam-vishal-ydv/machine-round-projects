const express = require("express");
const dotenv = require("dotenv");

const errorMiddleware = require("./middleware/errorMiddleware");
const userRoutes = require("./routes/user-routes.js");
const productRoutes = require("./routes/product-routes.js");
const orderRoutes = require("./routes/order-routes");
const connectDB = require("./db");
dotenv.config();

connectDB(process.env.DB_URI);
const app = express();

app.use(express.json());
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1", productRoutes);
app.use("/api/v1/orders", orderRoutes);

const PORT_NO = process.env.PORT_NO || 8000;

app.use(errorMiddleware);

app.listen(PORT_NO, () => {
  console.log("Server running on port no :", PORT_NO);
});
