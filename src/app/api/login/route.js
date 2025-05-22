export async function POST(req) {
  try {
    await connectDB();
    const { email, password } = await req.json();

    if (!email || !password) {
      return new NextResponse("Please fill all the fields", { status: 400 });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return new NextResponse("User not found", { status: 404 });
    }

    if (user.password != password) {
      return new NextResponse("Incorrect password", { status: 401 });
    }
    return NextResponse.json(
      {
        message: "Login successful",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new NextResponse("Login failed", { status: 500 });
  }
}
