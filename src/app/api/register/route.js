import { connectDB } from "@/app/utils/connect";
import { User } from "@/app/models/User";
import { NextResponse } from "next/server";
export async function POST(req) {
  try {
    const { name, email, password } = await req.json();
    if (!name || !email || !password) {
      return new NextResponse("Please fill all the fields", { status: 400 });
    }
    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new NextResponse("User already exists", { status: 409 });
    }
    const newUser = new User({ name, email, password });
    await newUser.save();
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: newUser._id,
          name: newUser.name,
          email: newUser.email,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Registration failed", { status: 500 });
  }
}
