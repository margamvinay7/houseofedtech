import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { postSchema } from "@/types";
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;
  try {
    const post = await prisma.post.findUnique({ where: { id } });
    return NextResponse.json(post, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("in udpate");
  try {
    const id = params.id;
    const reqBody = await request.json();
    console.log("req", reqBody);
    const parsedData = postSchema.safeParse(reqBody);
    if (!parsedData.success) {
      console.log("error", parsedData.error.errors);
      return NextResponse.json(
        { error: parsedData.error.errors },
        { status: 400 }
      );
    }
    const { title, description, userId } = parsedData.data;

    const updatedTask = await prisma.post.update({
      where: { id },
      data: { title, description, userId },
    });

    return NextResponse.json(updatedTask, { status: 201 });
  } catch (error) {
    console.log("error", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  console.log("in delete");
  try {
    const id = params.id;

    await prisma.post.delete({ where: { id } });
    return NextResponse.json(
      { message: "Task deleted Successfully" },
      { status: 201 }
    );
  } catch (error: unknown) {
    return NextResponse.json({ error: error }, { status: 500 });
  }
}
