import express from "express";
import userRouter from "./user.js";
import rideRouter from "./rides.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/rides", rideRouter);

export default router;
