
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// FETCH ALL PRODUCTS
export const GET = async (req: NextRequest) => {
  // Extracting query parameters from the request URL
  const { searchParams } = new URL(req.url);
  const cat = searchParams.get("cat"); // Retrieving the 'cat' parameter from the query string

  try {
    // Querying the database to fetch products based on the category or featured status
    const products = await prisma.product.findMany({
      where: {
        ...(cat ? { catSlug: cat } : { isFeatured: true }), // Conditional filtering based on category or featured status
      },
    });

    // Returning the fetched products in the response with a status of 200 (OK)
    return new NextResponse(JSON.stringify(products), { status: 200 });
  } catch (err) {
    console.log(err);
    // Returning a generic error message in case of a database query error, with a status of 500 (Internal Server Error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// Creating a new product
export const POST = async (req: NextRequest) => {
  try {
    // Parsing the JSON data from the request body
    const body = await req.json();

    // Creating a new product in the database using Prisma's create method
    const product = await prisma.product.create({
      data: body,
    });

    // Returning the created product in the response with a status of 201 (Created)
    return new NextResponse(JSON.stringify(product), { status: 201 });
  } catch (err) {
    console.log(err);
    // Returning a generic error message in case of a database creation error, with a status of 500 (Internal Server Error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
