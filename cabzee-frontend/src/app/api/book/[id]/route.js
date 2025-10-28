import { NextResponse } from "next/server";
import { connectDB } from "@/app/utils/connect";
import { Booking } from "@/app/models/User"; // Booking model
import { Ride } from "@/app/models/User"; // Ride model (add this!)

export async function GET(req, { params }) {
  try {
    await connectDB();

    const userId = params.id;
    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const bookings = await Booking.find({ userId });

    // Join each booking with its ride
    const result = await Promise.all(
      bookings.map(async (booking) => {
        const ride = await Ride.findOne({ rideId: booking.rideId }); // or use _id
        return {
          ...booking._doc,
          rideDetails: ride || {},
        };
      })
    );

    return NextResponse.json(result, { status: 200 });
  } catch (error) {
    console.error("Failed to fetch rides:", error);
    return new NextResponse("Failed to fetch rides", { status: 500 });
  }
}
