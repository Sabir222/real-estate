import prisma from "@/app/libs/prismadb";
import { type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const query = searchParams ? searchParams.get("q") : null;
  try {
    const listing = await prisma.listing.findMany({
      where: {
        city: query?.toLocaleLowerCase() as string,
      },
    });

    if (!listing || listing.length === 0) {
      return null;
    }

    const formattedListings = listing.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toString(),
    }));

    return Response.json(formattedListings);
  } catch (error: any) {
    throw new Error(error);
  }
}
