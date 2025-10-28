import express from "express";
import cors from "cors";
import { connectDB } from "./Utils/connect.js";
import rootRouter from "./routes/index.js";
import dotenv from "dotenv";
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/cabzee", rootRouter);

const PORT = process.env.PORT || 5000;
dotenv.config();
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running at http://localhost:${PORT}`);
  });
});
