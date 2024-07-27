import db from "@/config/dbconfig";
import STATUS from "@/config/status";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ENVIRONMENTS } from "@/utils/constants";
import jwt from 'jsonwebtoken';

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // Check if the user already exists
    const existingUser = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (existingUser) {
      return NextResponse.json(
        { msg: "User with email already exists" },
        { status: STATUS.conflict }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, ENVIRONMENTS.HASHSALT);

    // Create the user in the database
    const user = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    // Prepare the JWT payload
    const jwtPayload = {
      id: user.id,
    };

    // Sign the JWT
    const token = jwt.sign(jwtPayload, ENVIRONMENTS.JWT_SECRET as string);
    console.log(ENVIRONMENTS.HASHSALT)
    console.log(ENVIRONMENTS.JWT_SECRET)

    // Prepare the response
    const response = NextResponse.json(
      { msg: "User created successfully" },
      { status: STATUS.created }
    );

    // Set the cookie with the token
    response.cookies.set("s:id", token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict', // Use 'strict' for security
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    });

    return response;

  } catch (err) {
    console.error(err);
    console.log(ENVIRONMENTS.HASHSALT)
    console.log(ENVIRONMENTS.JWT_SECRET)
    return NextResponse.json(
      { msg: "An unexpected error occurred", err },
      { status: STATUS.serverError }
    );
    
  }
}
