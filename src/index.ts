import cors from "cors";
import express from "express";
import { config } from "./config/config";
import { errorHandler } from "./middlware/errorHandler";
import authRoute from "./modules/auth/routes/auth.route";
import orderRoute from "./modules/order/routes/order.route";
import productsRoute from "./modules/products/routes/products.route";
import userRoute from "./modules/user/routes/user.route";
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", authRoute);
app.use("/api", userRoute);
app.use("/api", productsRoute);
app.use("/api", orderRoute);

// routes
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// global error handler
app.use(errorHandler);

// listen
app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
