import STATUS from "@/config/status";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { ENVIRONMENTS } from "@/utils/constants";
import db from "@/config/dbconfig";

export async function GET(req: NextRequest) {
  const cookies = req.cookies;
  const token = String(cookies.get("s:id")?.value);

  if (!token) {
    return NextResponse.json({}, { status: STATUS.forbidden });
  }

  let data;

  try {
    jwt.verify(token, ENVIRONMENTS.JWT_SECRET as string, (err, decoded) => {
      data = decoded;
    });

    const userData = await db.user.findUnique({
      where: {
        //@ts-ignore
        id: data.id,
      },
      include: {
        profile: true,
      },
    });

    const user = {
      id: userData?.id,
      email: userData?.email,
      profile: userData?.profile,
    };

    if (!user?.email) {
      return NextResponse.json({}, { status: STATUS.notFound });
    }

    return NextResponse.json({ user }, { status: STATUS.ok });
  } catch (err) {
    return NextResponse.json({}, { status: STATUS.serverError });
  }
}
