import express from "express";
import { Ride } from "../models/User.js";
const rideRouter = express.Router();

rideRouter.post("/publish", async (req, res) => {
  try {
    const { from, to, date, time, seats, price, contact_number, createdBy } =
      await req.body;

    if (
      !from ||
      !to ||
      !date ||
      !time ||
      !seats ||
      !price ||
      !contact_number ||
      !createdBy
    ) {
      return res.status(400).json({ message: "Please fill all the fields" });
    }

    const rideId = Math.floor(Math.random() * 1000000);
    const newRide = new Ride({
      rideId,
      from,
      to,
      date,
      time,
      seats,
      price,
      contact_number,
      createdBy,
    });

    await newRide.save();

    return res.status(201).json({
      message: "Ride published successfully",
      ride: newRide,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Publishing ride failed" });
  }
});

rideRouter.get("/rides", async (req, res) => {
  try {
    const rides = await Ride.find().sort({ date: 1, time: 1 });

    if (!rides || rides.length === 0) {
      return res.status(404).json({ message: "No rides available" });
    }

    return res.status(200).json(rides);
  } catch (error) {
    console.error("Failed to fetch rides:", error);
    return res.status(500).json({ message: "Failed to fetch rides" });
  }
});
export default rideRouter;
