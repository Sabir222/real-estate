import getCurrentUser from "@/app/actions/getCurrentUser";
import { NextResponse } from "next/server";
import prisma from "@/app/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.error();

  const body = await request.json();
  const {
    title,
    description,
    price,
    imageSrc,
    bathroomCount,
    lat,
    lng,
    roomCount,
    country,
    city,
  } = body;

  const listing = await prisma.listing.create({
    data: {
      title,
      description,
      price: parseInt(price, 10),
      imageSrc,
      bathroomCount,
      lat: parseFloat(lat),
      lng: parseFloat(lng),
      roomCount,
      city,
      country,
    },
  });
  return NextResponse.json(listing);
}
