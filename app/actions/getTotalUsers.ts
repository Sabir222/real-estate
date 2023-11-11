import prisma from "@/app/libs/prismadb";

export default async function getTotalUsers() {
  try {
    const Users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeUsers = Users.map((user) => ({
      ...user,
      createdAt: user.createdAt.toISOString(),
      updatedAt: user.updatedAt.toISOString(),
      emailVerified: user.emailVerified?.toISOString() || null,
    }));
    return safeUsers;
  } catch (error: any) {
    throw new Error(error);
  }
}
