const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const errorMiddleware = require("./middlewares/error-middleware");
const authRoutes = require("./routes/auth.routes");
const productRoutes = require("./routes/admin.product.routes");
const orderRoutes = require("./routes/order.routes");
const connectDB = require("./db/index");

connectDB(process.env.DB_URI);

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api", productRoutes);
app.use("/api", orderRoutes);
const PORT = process.env.PORT;

app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log("Server running on port No:", PORT);
});
