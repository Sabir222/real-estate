import prisma from "@/app/libs/prismadb";

interface IParams {
  searchedCity?: string;
}

export default async function getCitySearch(params: IParams) {
  try {
    const { searchedCity } = params;

    const listing = await prisma.listing.findMany({
      where: {
        city: searchedCity,
      },
    });

    if (!listing) {
      return null;
    }

    const formattedListings = listing.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toString(),
    }));

    return formattedListings;
  } catch (error: any) {
    throw new Error(error);
  }
}
