import { connectDB } from "@/app/utils/connect";
import { Ride } from "@/app/models/User";
import { NextResponse } from "next/server";
import { createClient } from "redis";

const REDIS_QUEUE = "rides";

const redisClient = createClient({
  url: "redis://localhost:6379",
});

async function ensureRedisConnection() {
  if (!redisClient.isOpen) {
    await redisClient.connect();
  }
}
export async function POST(req) {
  await ensureRedisConnection();
  try {
    const { from, to, date, time, seats, price, contact_number, createdBy } =
      await req.json();

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
      return new NextResponse("Please fill all the fields", { status: 400 });
    }

    await connectDB();

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
    await redisClient.lPush(REDIS_QUEUE, JSON.stringify(newRide));

    return NextResponse.json(
      {
        message: "Ride published successfully",
        ride: newRide,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Publishing ride failed", { status: 500 });
  }
}
export async function GET() {
  await ensureRedisConnection();
  try {
    const ride = await redisClient.rPop(REDIS_QUEUE);
    if (ride) {
      return NextResponse.json(JSON.parse(ride), { status: 200 });
    }

    await connectDB();
    const rides = await Ride.find().sort({ date: 1, time: 1 });

    if (!rides || rides.length === 0) {
      return new NextResponse("No rides available", { status: 404 });
    }

    return NextResponse.json(rides, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch rides:", error);
    return new NextResponse("Failed to fetch rides", { status: 500 });
  }
}
