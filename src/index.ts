import cors from "cors";
import express from "express";
import { config } from "./config/config";
import authRoute from "./modules/auth/routes/auth.route";
const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use("/api", authRoute);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
