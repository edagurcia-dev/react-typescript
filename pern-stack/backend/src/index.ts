import express from "express";
import colors from "colors";
import cors, { CorsOptions } from "cors";
import morgan from "morgan";
import { connectDB } from "./config/db";
import productRouter from "./routes/product.routes";

connectDB();

const server = express();

const corsOptions: CorsOptions = {
  origin: function (origin, callback) {
    if (origin === process.env.FRONTEND_URL) {
      callback(null, true);
    } else {
      callback(new Error("Error de CORS"));
    }
  },
};

server.use(cors(corsOptions));

server.use(express.json());

server.use(morgan("dev"));

const port = process.env.PORT || 3000;

server.use("/api/v1/products", productRouter);

server.listen(port, () => {
  console.log(colors.bgGreen(`Express server running on port ${port}`));
});
