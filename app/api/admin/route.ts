import { NextResponse } from "next/server";

import prisma from "@/app/libs/prismadb";

interface IParams {
  userId?: string;
}

export async function POST(request: Request) {
  const userIdd = await request.json();
  const userId = userIdd.id;
  console.log(userIdd.id);

  if (!userId || typeof userId !== "string") {
    throw new Error("Invalid ID");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const newRole = user?.role === "ADMIN" ? "USER" : "ADMIN";

  const listing = await prisma.user.updateMany({
    where: {
      id: userId,
    },
    data: {
      role: newRole,
    },
  });

  return NextResponse.json(listing);
}
