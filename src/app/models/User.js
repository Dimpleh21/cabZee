import mongoose from "mongoose";
import { type } from "os";
const userschema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
});
export const User = mongoose.models.User || mongoose.model("User", userschema);
const rideschema = new mongoose.Schema({
  rideId: { type: Number, unique: true },
  from: { type: String, required: true },
  to: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String, required: true },
  seats: { type: Number, required: true },
  price: { type: Number, required: true },
  contact_number: { type: String, required: true },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});
export const Ride = mongoose.models.Ride || mongoose.model("Ride", rideschema);

const bookingschema = new mongoose.Schema(
  {
    rideId: { type: Number, required: true },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    seatsBooked: { type: Number, required: true },
    contact_number: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    price: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);
export const Booking =
  mongoose.models.Booking || mongoose.model("Booking", bookingschema);
