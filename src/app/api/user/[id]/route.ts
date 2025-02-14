import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

// get user with posts
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const user = await prisma.user.findUnique({
      where: { id },
      include: { posts: true },
    });
    const userData = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      createdAt: user?.createdAt,
      posts: user?.posts,
    };

    return NextResponse.json({ userData }, { status: 200 });
  } catch (error: unknown) {
    console.error("Error fetching posts:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
