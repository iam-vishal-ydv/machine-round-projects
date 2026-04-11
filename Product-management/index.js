const express = require("express");
const dotenv = require("dotenv");

const databaseConnect = require("./db/index");

const errorMiddlewre = require("./middleware/error-middleware");
const productRoutes = require("./routes/product-routes");

databaseConnect();

dotenv.config();

const app = express();

app.use(express.json());

app.use("/api", productRoutes);

let port_no = process.env.PORT_NO || 8000;

app.use(errorMiddlewre);
app.listen(port_no, () => {
  console.log("Server running port :", port_no);
});
