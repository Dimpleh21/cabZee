import mongoose from "mongoose";
import { type } from "os";
const userschema = new mongoose.Schema({
  name: String,
  email: { type: String, required: true, unique: true },
  password: String,
});
export const User = mongoose.models.User || mongoose.model("User", userschema);
