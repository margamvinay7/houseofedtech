import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { LoginDataSchema, loginSchema } from "@/types";
import bcryptjs from "bcryptjs";

export async function POST(request: NextRequest) {
  console.log("entered Login");
  try {
    const reqBody: LoginDataSchema = await request.json();
    const parsedData = loginSchema.safeParse(reqBody);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.errors },
        { status: 400 }
      );
    }

    const { email, password } = parsedData.data;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return NextResponse.json(
        { error: "user does not exist" },
        { status: 400 }
      );
    }

    const isValidPassword = await bcryptjs.compare(password, user.password);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid Password" }, { status: 400 });
    }

    const token = jwt.sign(
      {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      process.env.TOKEN_SECRET as string,
      {
        expiresIn: "1d",
      }
    );
    const response = NextResponse.json({
      message: "Login Successful",
      success: true,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
      token,
    });

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    response.cookies.set("userId", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    return response;
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
