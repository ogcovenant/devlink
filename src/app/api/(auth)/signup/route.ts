import db from "@/config/dbconfig";
import STATUS from "@/config/status";
import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { ENVIRONMENTS } from "@/utils/constants";
import * as jwt from 'jsonwebtoken'

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();

  try {
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
  } catch (err) {
    if (err) {
      return NextResponse.json(
        { msg: "an unxpected error occured \n", err },
        { status: STATUS.serverError }
      );
    }
  }

  const hashedPassword = await bcrypt.hash(password, ENVIRONMENTS.HASHSALT);

  try {
    const user = await db.user.create({
      data: {
        email: email,
        password: hashedPassword,
      },
    });

    const jwtPayload = {
      id: user.id
    }

    const token = jwt.sign(jwtPayload, ENVIRONMENTS.JWTSECRET as string)

    const response =  NextResponse.json(
      { msg: "User created successfully" },
      { status: STATUS.created }
    );

    response.cookies.set("s:id", token, {
      expires: new Date().setDate(30),
      secure: true,
      httpOnly: true,
      sameSite:"strict"
    })

  } catch (err) {
    if (err) {
      return NextResponse.json(
        { msg: "an unxpected error occured \n", err },
        { status: STATUS.serverError }
      );
    }
  }
}
