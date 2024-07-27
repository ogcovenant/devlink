import { NextRequest, NextResponse } from "next/server";
import STATUS from "@/config/status";
import db from "@/config/dbconfig";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { ENVIRONMENTS } from "@/utils/constants";

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
    const user = await db.user.findUnique({
      where: {
        email: email,
      },
    });

    if (!user?.id) {
      return NextResponse.json(
        { msg: "User with email not found" },
        { status: STATUS.notFound }
      );
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json(
        { msg: "Incorrect password" },
        { status: STATUS.unauthorized }
      );
    }

    const jwtPayload = {
      id: user.id
    }

    const token = jwt.sign(jwtPayload, ENVIRONMENTS.JWT_SECRET as string);

    const response = NextResponse.json(
      { msg: "User logged in successfully" },
      { status: STATUS.ok }
    );

    response.cookies.set("s:id", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    return response

  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { msg: "An unexpected error occurred", err },
      { status: STATUS.serverError }
    );
  }
}
