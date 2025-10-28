import { connectDB } from "@/app/utils/connect";
import { Booking } from "@/app/models/User"; // ✅ adjust if needed
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const {
      rideId,
      userId,
      seatsBooked,
      contact_number,
      from,
      to,
      date,
      time,
      price,
    } = await req.json();

    if (
      !rideId ||
      !userId ||
      !seatsBooked ||
      !contact_number ||
      !from ||
      !to ||
      !date ||
      !time ||
      !price
    ) {
      return new NextResponse("Please fill all the fields", { status: 400 });
    }

    await connectDB();

    const newBooking = new Booking({
      rideId,
      userId,
      seatsBooked,
      contact_number,
      from,
      to,
      date,
      time,
      price,
    });

    await newBooking.save();

    return NextResponse.json(
      {
        message: "Booking created successfully",
        booking: newBooking,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking creation error:", error);
    return new NextResponse("Booking creation failed", { status: 500 });
  }
}
