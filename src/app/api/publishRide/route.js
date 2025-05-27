import { connectDB } from "@/app/utils/connect";
import { Ride } from "@/app/models/User";
import { NextResponse } from "next/server";
export async function POST(req) {
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
      contact_number, // Placeholder, you might want to change this
      createdBy,
    });

    await newRide.save();

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
  try {
    await connectDB();

    const rides = await Ride.find().sort({ date: 1, time: 1 }); // sorted by date and time
    return NextResponse.json(rides, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch rides:", error);
    return new NextResponse("Failed to fetch rides", { status: 500 });
  }
}
