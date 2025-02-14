import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import bcryptjs from "bcryptjs";
import { SignUpDataSchema, signUpSchema } from "@/types";

export async function POST(request: NextRequest) {
  try {
    const reqbody: SignUpDataSchema = await request.json();
    const parsedData = signUpSchema.safeParse(reqbody);

    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.errors },
        { status: 400 }
      );
    }

    const { name, email, password } = parsedData.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUser = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        newUser,
      },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
