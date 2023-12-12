
import { prisma } from "@/utils/connect";
import { NextResponse } from "next/server";

// FETCH ALL CATEGORIES
export const GET = async () => {
  try {
    // Fetching all categories from the database using Prisma's findMany method
    const categories = await prisma.category.findMany();

    // Returning the categories in the response with a status of 200 (OK)
    return new NextResponse(JSON.stringify(categories), { status: 200 });
  } catch (err) {
    console.log(err);
    // Returning a generic error message in case of a fetch error, with a status of 500 (Internal Server Error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
