import prisma from "@/db";
import { postSchema } from "@/types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();

    const parsedData = postSchema.safeParse(reqBody);
    if (!parsedData.success) {
      return NextResponse.json(
        { error: parsedData.error.errors },
        { status: 400 }
      );
    }
    const { title, description, userId } = parsedData.data;

    const newTask = await prisma.post.create({
      data: { title, description, userId },
    });

    return NextResponse.json(
      { message: "Task created successfully", success: true, newTask },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}

export async function GET(request: NextRequest) {
  console.log("entered posts with userid");
  const searchParams = request.nextUrl.searchParams;

  //@ts-expect-error the code is error
  const userId: string = searchParams.get("id");
  try {
    const posts = await prisma.post.findMany({ where: { userId } });
    return NextResponse.json({ posts }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
