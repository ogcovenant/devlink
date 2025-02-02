import db from "@/config/dbconfig";
import STATUS from "@/config/status";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ENVIRONMENTS } from "@/utils/constants";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

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

    const hashedPassword = await bcrypt.hash(password, ENVIRONMENTS.HASHSALT);

    const user = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const jwtPayload = {
      id: user.id,
    };

    const token = jwt.sign(jwtPayload, ENVIRONMENTS.JWT_SECRET as string);

    const response = NextResponse.json(
      { msg: "User created successfully" },
      { status: STATUS.created }
    );

    response.cookies.set("s:id", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return response;
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "An unexpected error occurred", err },
      { status: STATUS.serverError }
    );
  }
}
