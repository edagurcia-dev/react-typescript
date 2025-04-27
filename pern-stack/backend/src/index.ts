import express from "express";
import colors from "colors";
import { connectDB } from "./config/db";
import productRouter from "./routes/product.routes";

connectDB();

const server = express();

server.use(express.json());

const port = process.env.PORT || 3000;

server.use("/api/v1/products", productRouter);

server.listen(port, () => {
  console.log(colors.bgGreen(`Server running on port ${port}`));
});
