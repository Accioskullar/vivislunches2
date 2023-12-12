
import { prisma } from "@/utils/connect";
import { NextRequest, NextResponse } from "next/server";

// CHANGE THE STATUS OF AN ORDER
export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } }
) => {
  // Extracting order ID from the request parameters
  const { id } = params;

  try {
    // Parsing the request body to get the new order status
    const body = await req.json();

    // Updating the order status in the database using Prisma's update method
    await prisma.order.update({
      where: {
        id: id,
      },
      data: { status: body },
    });

    // Returning a success message in the response with a status of 200 (OK)
    return new NextResponse(
      JSON.stringify({ message: "Order has been updated!" }),
      { status: 200 }
    );
  } catch (err) {
    console.log(err);
    // Returning a generic error message in case of an update error, with a status of 500 (Internal Server Error)
    return new NextResponse(
      JSON.stringify({ message: "Something went wrong!" }),
      { status: 500 }
    );
  }
};
