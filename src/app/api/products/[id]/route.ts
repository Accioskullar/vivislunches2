
import { getAuthSession } from "@/utils/auth";
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// GET SINGLE PRODUCT
export const GET = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  // Extracting the 'id' parameter from the request URL
  const { id } = params;

  try {
    // Querying the database to fetch a single product based on the provided ID
    const product = await prisma.product.findUnique({
      where: {
        id: id,
      },
    });

    // Returning the fetched product in the response with a status of 200 (OK)
    return new NextResponse(JSON.stringify(product), { status: 200 });
  } catch (err) {
    console.log(err);
    // Returning a generic error message in case of a database query error, with a status of 500 (Internal Server Error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};

// DELETE SINGLE PRODUCT
export const DELETE = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  // Extracting the 'id' parameter from the request URL
  const { id } = params;

  // Fetching the user session using the getAuthSession utility function
  const session = await getAuthSession();

  // Checking if the user is an admin
  if (session?.user.isAdmin) {
    try {
      // Deleting the product from the database based on the provided ID
      await prisma.product.delete({
        where: {
          id: id,
        },
      });

      // Returning a success message in the response with a status of 200 (OK)
      return new NextResponse(JSON.stringify("Product has been deleted!"), {
        status: 200,
      });
    } catch (err) {
      console.log(err);
      // Returning a generic error message in case of a database deletion error, with a status of 500 (Internal Server Error)
      return new NextResponse(
        JSON.stringify({ message: "Something went wrong!" }),
        { status: 500 }
      );
    }
  }

  // Returning a forbidden message if the user is not an admin, with a status of 403 (Forbidden)
  return new NextResponse(
    JSON.stringify({ message: "You are not allowed!" }),
    {
      status: 403,
    }
  );
};
